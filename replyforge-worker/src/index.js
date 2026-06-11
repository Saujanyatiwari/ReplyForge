const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
	});
}

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: CORS_HEADERS });
		}

		if (request.method !== 'POST') {
			return jsonResponse({ error: 'method_not_allowed' }, 405);
		}

		let body;
		try {
			body = await request.json();
		} catch {
			return jsonResponse({ error: 'invalid_json' }, 400);
		}

		const { situation, outcome, role, incomingMessage, writingExamples } = body;

		// Rate limit by IP: max 10 requests per day
		const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
		const today = new Date().toISOString().slice(0, 10);
		const rateLimitKey = `ratelimit:${ip}:${today}`;

		const currentCount = parseInt((await env.RATE_LIMIT_KV.get(rateLimitKey)) || '0', 10);
		if (currentCount >= 10) {
			return jsonResponse({ error: 'daily_limit_reached' }, 429);
		}

		// Increment count; expire after 25h to survive midnight edge cases
		ctx.waitUntil(
			env.RATE_LIMIT_KV.put(rateLimitKey, String(currentCount + 1), { expirationTtl: 90000 }),
		);

		const systemPrompt = `You are a professional communication assistant. Generate exactly 3 reply variations as JSON with this structure: { "replies": [{ "label": string, "content": string }] }. Use labels "Firm", "Diplomatic", "Brief" in that order. Return only valid JSON, no explanation.`;

		const userPrompt = [
			`Role: ${role || 'Not specified'}`,
			`Situation: ${situation || 'Not specified'}`,
			`Desired outcome: ${outcome || 'Not specified'}`,
			`Incoming message to reply to:\n${incomingMessage}`,
			writingExamples ? `Writing style examples:\n${writingExamples}` : null,
		]
			.filter(Boolean)
			.join('\n\n');

		let groqRes;
		try {
			groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.GROQ_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'llama-3.3-70b-versatile',
					messages: [
						{ role: 'system', content: systemPrompt },
						{ role: 'user', content: userPrompt },
					],
					temperature: 0.7,
					response_format: { type: 'json_object' },
				}),
			});
		} catch {
			return jsonResponse({ error: 'generation_failed' }, 500);
		}

		if (!groqRes.ok) {
			return jsonResponse({ error: 'generation_failed' }, 500);
		}

		try {
			const groqData = await groqRes.json();
			const parsed = JSON.parse(groqData.choices[0].message.content);
			return jsonResponse(parsed);
		} catch {
			return jsonResponse({ error: 'generation_failed' }, 500);
		}
	},
};
