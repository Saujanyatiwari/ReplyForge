import { useState, useCallback } from 'react';
import type { Reply, QuickAction, Situation, DesiredOutcome } from '../types';
import { generateReplies } from '../services/geminiService';
import { buildGenerationPrompt, buildQuickActionPrompt } from '../utils/promptBuilder';
import { parseApiError } from '../utils/validators';

interface GenerationInput {
  incomingMessage: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role: string;
  writingExamples: string[];
  apiKey: string;
}

export function useGeneration() {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (input: GenerationInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = buildGenerationPrompt({
        incomingMessage: input.incomingMessage,
        situation: input.situation,
        desiredOutcome: input.desiredOutcome,
        role: input.role || undefined,
        writingExamples: input.writingExamples.length > 0 ? input.writingExamples : undefined,
      });

      const response = await generateReplies(prompt, input.apiKey);

      const mapped: Reply[] = response.replies.map((r, i) => ({
        id: `reply-${Date.now()}-${i}`,
        title: r.title,
        content: r.content,
      }));

      setReplies(mapped);
      setRiskAnalysis(response.risk_analysis);
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refineReply = useCallback(
    async (
      replyId: string,
      action: QuickAction,
      situation: Situation,
      desiredOutcome: DesiredOutcome,
      apiKey: string
    ) => {
      const target = replies.find((r) => r.id === replyId);
      if (!target) return;

      // Mark the specific reply as loading by temporarily tagging it
      setReplies((prev) =>
        prev.map((r) =>
          r.id === replyId ? { ...r, title: r.title + ' (refining…)' } : r
        )
      );
      setError(null);

      try {
        const prompt = buildQuickActionPrompt({
          originalReply: target.content,
          action,
          situation,
          desiredOutcome,
        });

        const response = await generateReplies(prompt, apiKey);
        const refined = response.replies[0];

        if (refined) {
          setReplies((prev) =>
            prev.map((r) =>
              r.id === replyId
                ? { ...r, title: refined.title, content: refined.content }
                : r
            )
          );
        }
      } catch (err) {
        // Restore original title on error
        setReplies((prev) =>
          prev.map((r) =>
            r.id === replyId
              ? { ...r, title: target.title }
              : r
          )
        );
        setError(parseApiError(err));
      }
    },
    [replies]
  );

  const clearReplies = useCallback(() => {
    setReplies([]);
    setRiskAnalysis([]);
    setError(null);
  }, []);

  return {
    replies,
    riskAnalysis,
    isLoading,
    error,
    generate,
    refineReply,
    clearReplies,
  };
}
