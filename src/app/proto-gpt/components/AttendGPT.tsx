"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ChatBox from "./Chatbox";
import AttentionVisualizer from "./AttentionVisualizer";
import TokenPredictionVisualizer from "./TokenPredictionVisualizer";

interface AttendGPTProps {
  tokens: string[];
}

// Vector operations
const dotProduct = (a: number[], b: number[]) => {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
};

const normalize = (vector: number[]) => {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map((val) => val / magnitude);
};

export default function AttendGPT({ tokens }: AttendGPTProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [inProgressMessage, setInProgressMessage] = useState<string | null>(
    null
  );
  const [attentionDebug, setAttentionDebug] = useState<{
    tokens: string[];
    attentionScores: number[][];
  } | null>(null);
  const [tokenPredictions, setTokenPredictions] = useState<
    Array<{ token: string; score: number }>
  >([]);
  const [selectedNextToken, setSelectedNextToken] = useState<
    string | undefined
  >();
  const isUserTurn = messages.length % 2 === 0;

  const tokenData = useMemo(() => {
    const embeddingDim = 16;

    return tokens.map((token) => {
      const embedding = Array.from(
        { length: embeddingDim },
        () => Math.random() * 2 - 1
      );

      const queryVector = Array.from(
        { length: embeddingDim },
        () => Math.random() * 2 - 1
      );
      const keyVector = Array.from(
        { length: embeddingDim },
        () => Math.random() * 2 - 1
      );
      const valueVector = Array.from(
        { length: embeddingDim },
        () => Math.random() * 2 - 1
      );

      return {
        text: token,
        embedding: normalize(embedding),
        query: normalize(queryVector),
        key: normalize(keyVector),
        value: normalize(valueVector),
      };
    });
  }, [tokens]);

  const computeAttention = useCallback(
    (contextTokens: string[]) => {
      if (contextTokens.length === 0)
        return { tokens: [], attentionScores: [] };

      const tokensData = contextTokens.map((token) => {
        const found = tokenData.find((t) => t.text === token);
        if (!found) {
          return tokenData[Math.floor(Math.random() * tokenData.length)];
        }
        return found;
      });

      const attentionScores = tokensData.map((tokenA) => {
        return tokensData.map((tokenB) => {
          return dotProduct(tokenA.query, tokenB.key);
        });
      });

      const normalizedScores = attentionScores.map((row) => {
        const expScores = row.map((score) => Math.exp(score));
        const sum = expScores.reduce((a, b) => a + b, 0);
        return expScores.map((score) => score / sum);
      });

      return {
        tokens: contextTokens,
        attentionScores: normalizedScores,
      };
    },
    [tokenData]
  );

  const predictNextToken = useCallback(
    (context: string[]) => {
      if (context.length === 0) {
        return tokenData[Math.floor(Math.random() * tokenData.length)].text;
      }

      const attention = computeAttention(context);
      setAttentionDebug(attention);

      const lastTokenIndex = context.length - 1;
      const attentionWeights = attention.attentionScores[lastTokenIndex];

      const tokenScores = tokenData.map((token) => {
        const contextVector = context.map((_, i) => {
          const tokenIndex = i;
          const weight = attentionWeights[tokenIndex];
          const tokenVector =
            tokenData.find((t) => t.text === context[i])?.embedding ||
            Array(16).fill(0);
          return tokenVector.map((v) => v * weight);
        });

        const aggregatedContext = contextVector[0].map((_, i) => {
          return (
            contextVector.reduce((sum, vec) => sum + vec[i], 0) /
            contextVector.length
          );
        });

        const similarity = dotProduct(aggregatedContext, token.embedding);

        return {
          token: token.text,
          score: similarity,
        };
      });

      const sortedTokens = tokenScores.sort((a, b) => b.score - a.score);
      const topTokens = sortedTokens.slice(0, 5);

      setTokenPredictions(sortedTokens.slice(0, 8));

      const selectedIndex = Math.floor(
        Math.random() * Math.min(3, topTokens.length)
      );
      const nextToken = topTokens[selectedIndex].token;

      setSelectedNextToken(nextToken);

      return nextToken;
    },
    [tokenData, computeAttention]
  );

  const send = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!userInput) return;

      setUserInput("");
      setMessages((prev) => prev.concat(userInput));
    },
    [userInput]
  );

  useEffect(() => {
    if (isUserTurn) return;

    (async () => {
      const msg: string[] = [];
      const lastMessage = messages[messages.length - 1];
      const userWords = lastMessage.split(/\s+/).filter(Boolean);

      if (userWords.length > 0) {
        const seedWord =
          userWords[Math.floor(Math.random() * userWords.length)];

        const closestToken =
          tokenData.find(
            (t) => t.text.toLowerCase() === seedWord.toLowerCase()
          ) || tokenData[Math.floor(Math.random() * tokenData.length)];

        msg.push(closestToken.text);
        await new Promise((resolve) => setTimeout(resolve, 200));
        setInProgressMessage(msg.join(" "));
      }

      let shouldStop = false;
      do {
        const nextToken = predictNextToken(msg);
        msg.push(nextToken);

        await new Promise((resolve) =>
          setTimeout(resolve, 150 + Math.random() * 200)
        );
        setInProgressMessage(msg.join(" "));

        shouldStop = msg.length > 20 || Math.random() < 0.1;
      } while (!shouldStop);

      setMessages((m) => m.concat(msg.join(" ")));
      setInProgressMessage(null);
    })();
  }, [isUserTurn, messages, predictNextToken, tokenData]);

  return (
    <div>
      <div className="chat-full">
        <ChatBox
          botId={3}
          messages={messages}
          inProgressMessage={inProgressMessage}
          attentionDebug={attentionDebug}
        />

        <form className="input" onSubmit={send}>
          <input
            type="text"
            value={userInput}
            placeholder="Chat with AttendGPT..."
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => send()}
            disabled={!isUserTurn || !userInput}
          >
            Send
          </button>
        </form>
      </div>

      <div className="example">
        <h3>About AttendGPT</h3>
        <p>
          AttendGPT demonstrates the third step in language model evolution by
          adding self-attention mechanisms, the core innovation of transformer
          models.
        </p>
        <ul>
          <li>
            Implements simplified Query, Key, Value (QKV) attention mechanism
          </li>
          <li>
            Captures relationships between all tokens in a sequence, not just
            neighbors
          </li>
          <li>
            Uses attention weights to create more contextually relevant
            predictions
          </li>
          <li>
            Demonstrates how attention "focuses" on the most relevant parts of
            input
          </li>
        </ul>
        <p>
          While still simplified, AttendGPT shows how modern language models use
          attention to weigh the importance of different words in context, a key
          breakthrough that powers models like GPT, LLaMA, and others.
        </p>
      </div>

      {/* Add attention visualizer */}
      {attentionDebug && <AttentionVisualizer attentionData={attentionDebug} />}

      {/* Add token prediction visualizer */}
      {tokenPredictions.length > 0 && (
        <TokenPredictionVisualizer
          predictions={tokenPredictions}
          selectedToken={selectedNextToken}
        />
      )}
    </div>
  );
}
