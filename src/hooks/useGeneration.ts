import { useState, useCallback } from 'react';
import type { Reply, QuickAction, Situation, DesiredOutcome } from '../types';
import { generateReplies } from '../services/geminiService';
import { parseApiError } from '../utils/validators';

interface GenerationInput {
  incomingMessage: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role: string;
  writingExamples: string[];
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
      const response = await generateReplies({
        situation: input.situation,
        outcome: input.desiredOutcome,
        role: input.role || '',
        incomingMessage: input.incomingMessage,
        writingExamples: input.writingExamples,
      });

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
      desiredOutcome: DesiredOutcome
    ) => {
      const target = replies.find((r) => r.id === replyId);
      if (!target) return;

      setReplies((prev) =>
        prev.map((r) =>
          r.id === replyId ? { ...r, title: r.title + ' (refining…)' } : r
        )
      );
      setError(null);

      try {
        const actionDescriptions: Record<QuickAction, string> = {
          firmer: 'more assertive and firm',
          'more-polite': 'warmer and more polite',
          shorter: 'significantly shorter',
          'more-human': 'more conversational and human-sounding',
          'more-confident': 'more confident and authoritative',
        };

        const response = await generateReplies({
          situation,
          outcome: desiredOutcome,
          role: '',
          incomingMessage: `Please rewrite this message to make it ${actionDescriptions[action]}:\n\n"${target.content}"`,
          writingExamples: [],
        });
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
        setReplies((prev) =>
          prev.map((r) =>
            r.id === replyId ? { ...r, title: target.title } : r
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
