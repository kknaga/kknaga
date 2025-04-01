"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ChatBox from "./Chatbox";
import EmbeddingVisualizer from "./EmbeddingVisualizer";

interface BetaGPTProps {
  tokens: string[];
}

// Simple vector similarity function (cosine similarity)
const cosineSimilarity = (a: number[], b: number[]) => {
  let dotProduct = 0;
  let aMagnitude = 0;
  let bMagnitude = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    aMagnitude += a[i] * a[i];
    bMagnitude += b[i] * b[i];
  }

  aMagnitude = Math.sqrt(aMagnitude);
  bMagnitude = Math.sqrt(bMagnitude);

  return dotProduct / (aMagnitude * bMagnitude);
};

export default function BetaGPT({ tokens }: BetaGPTProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [inProgressMessage, setInProgressMessage] = useState<string | null>(
    null
  );
  const isUserTurn = messages.length % 2 === 0;

  const tokenEmbeddings = useMemo(() => {
    return tokens.map((token) => ({
      text: token,
      embedding: Array.from({ length: 8 }, () => Math.random() * 2 - 1),
    }));
  }, [tokens]);

  const findSimilarTokens = useCallback(
    (context: string, count: number) => {
      const contextEmbedding = Array.from(
        { length: 8 },
        () => Math.random() * 2 - 1
      );

      return tokenEmbeddings
        .map((token) => ({
          ...token,
          similarity: cosineSimilarity(token.embedding, contextEmbedding),
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, count);
    },
    [tokenEmbeddings]
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

      let position = 0;
      let shouldStop = false;

      do {
        let context = [...msg].join(" ");
        if (msg.length === 0) {
          context = lastMessage;
        }

        const similarTokens = findSimilarTokens(context, 10);

        const selectedToken = similarTokens[Math.floor(Math.random() * 3)].text;
        msg.push(selectedToken);

        await new Promise((resolve) =>
          setTimeout(resolve, 100 + Math.random() * 300)
        );
        setInProgressMessage(msg.join(" "));

        position++;
        shouldStop = position > 15 || Math.random() < 0.1;
      } while (!shouldStop);

      setMessages((m) => m.concat(msg.join(" ")));
      setInProgressMessage(null);
    })();
  }, [isUserTurn, messages, findSimilarTokens]);

  return (
    <div>
      <div className="chat-full">
        <ChatBox
          botId={2}
          messages={messages}
          inProgressMessage={inProgressMessage}
          attentionDebug={null}
        />

        <form className="input" onSubmit={send}>
          <input
            type="text"
            value={userInput}
            placeholder="Chat with BetaGPT..."
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
        <h3>About BetaGPT</h3>
        <p>
          BetaGPT demonstrates the second step in language model evolution,
          incorporating token embeddings and basic context awareness.
        </p>
        <ul>
          <li>
            Uses vector embeddings to represent words in a mathematical space
          </li>
          <li>
            Demonstrates how tokens can relate to each other by similarity
          </li>
          <li>Shows how token position influences the generation process</li>
          <li>Introduces the concept of context-dependent predictions</li>
        </ul>
        <p>
          Unlike BarelyGPT's completely random output, BetaGPT attempts to
          choose tokens that might relate to your message and previous tokens by
          using vector similarity.
        </p>
      </div>

      {/* Add embedding visualizer */}
      <EmbeddingVisualizer tokens={tokenEmbeddings} />
    </div>
  );
}
