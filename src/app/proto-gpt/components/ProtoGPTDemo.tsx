"use client";
import { useCallback, useEffect, useState } from "react";
import ChatBox from "./Chatbox";

import "./ProtoGPTDemo.scss";

const mockEmbeddings: Record<string, number[]> = {
  hello: [0.8, 0.2, 0.1, 0.0],
  hi: [0.7, 0.3, 0.1, 0.0],
  hey: [0.6, 0.3, 0.2, 0.0],
  goodbye: [0.1, 0.1, 0.8, 0.2],
  bye: [0.2, 0.1, 0.7, 0.3],
  thanks: [0.3, 0.7, 0.2, 0.1],
  thank: [0.3, 0.8, 0.1, 0.0],
  help: [0.2, 0.8, 0.2, 0.1],
  name: [0.4, 0.4, 0.4, 0.0],
  you: [0.5, 0.5, 0.0, 0.0],
  how: [0.6, 0.4, 0.0, 0.1],
  what: [0.7, 0.3, 0.0, 0.1],
  why: [0.8, 0.2, 0.0, 0.1],
  when: [0.7, 0.3, 0.0, 0.2],
  where: [0.6, 0.3, 0.0, 0.3],
  who: [0.5, 0.3, 0.0, 0.4],
  which: [0.4, 0.3, 0.0, 0.5],
};

const responseTemplates = [
  { category: "greeting", responses: ["Hi there!", "Hello!", "Greetings!"] },
  {
    category: "farewell",
    responses: ["Goodbye!", "See you later!", "Until next time!"],
  },
  {
    category: "gratitude",
    responses: ["You're welcome!", "No problem!", "Happy to help!"],
  },
  {
    category: "identity",
    responses: ["I'm BetaGPT!", "My name is BetaGPT.", "They call me BetaGPT."],
  },
  {
    category: "assistance",
    responses: [
      "I can chat with you, but I'm still pretty basic.",
      "What would you like to talk about?",
      "I'm here to demonstrate basic embeddings and attention!",
    ],
  },
  {
    category: "question",
    responses: [
      "That's a good question.",
      "I'm thinking about that.",
      "Let me try to answer that.",
    ],
  },
  {
    category: "default",
    responses: [
      "That's interesting!",
      "Tell me more about that.",
      "I see what you mean.",
      "Interesting perspective!",
    ],
  },
];

export default function BetaGPT() {
  const [messages, setMessages] = useState<string[]>([]);
  const isUserTurn = messages.length % 2 === 0;
  const [userInput, setUserInput] = useState("");
  const [inProgressMessage, setInProgressMessage] = useState<string | null>(
    null
  );
  const [attentionVisualization, setAttentionVisualization] = useState<
    Record<string, number>
  >({});

  const getEmbedding = (word: string): number[] => {
    const cleanWord = word.toLowerCase().replace(/[^\w\s]/gi, "");

    return mockEmbeddings[cleanWord] || [0, 0, 0, 0];
  };

  const dotProduct = (vec1: number[], vec2: number[]): number => {
    let sum = 0;
    for (let i = 0; i < vec1.length; i++) {
      sum += vec1[i] * vec2[i];
    }
    return sum;
  };

  const computeAttention = (
    input: string
  ): { category: string; attention: Record<string, number> } => {
    const tokens = input.split(/\s+/);

    const tokenEmbeddings = tokens.map((token) => getEmbedding(token));

    const keys: Record<string, number[]> = {
      greeting: [0.7, 0.2, 0.1, 0.0],
      farewell: [0.2, 0.1, 0.7, 0.2],
      gratitude: [0.3, 0.7, 0.2, 0.1],
      identity: [0.5, 0.4, 0.2, 0.0],
      assistance: [0.2, 0.8, 0.2, 0.1],
      question: [0.7, 0.3, 0.0, 0.2],
      default: [0.4, 0.4, 0.4, 0.4],
    };

    const scores: Record<string, number> = {};
    for (const [category, key] of Object.entries(keys)) {
      let categoryScore = 0;
      for (const embedding of tokenEmbeddings) {
        categoryScore += dotProduct(embedding, key);
      }
      scores[category] = tokens.length > 0 ? categoryScore / tokens.length : 0;
    }

    const tokenAttention: Record<string, number> = {};
    const topCategory = Object.entries(scores).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    const topKey = keys[topCategory];

    for (let i = 0; i < tokens.length; i++) {
      tokenAttention[tokens[i]] = dotProduct(tokenEmbeddings[i], topKey);
    }

    let maxScore = -Infinity;
    let maxCategory = "default";

    for (const [category, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxCategory = category;
      }
    }

    return { category: maxCategory, attention: tokenAttention };
  };

  const generateResponse = (category: string): string => {
    const template =
      responseTemplates.find((t) => t.category === category) ||
      responseTemplates.find((t) => t.category === "default");
    const responses = template?.responses || [
      "I'm not sure how to respond to that.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const send = useCallback(() => {
    if (!userInput.trim()) return;
    setUserInput("");
    setMessages((prev) => prev.concat(userInput));
  }, [userInput]);

  useEffect(() => {
    (async () => {
      if (isUserTurn) {
        return;
      }

      const userMessage = messages[messages.length - 1];

      const { category, attention } = computeAttention(userMessage);

      setAttentionVisualization(attention);

      const response = generateResponse(category);

      const words = response.split(" ");
      let currentResponse = "";

      for (let i = 0; i < words.length; i++) {
        currentResponse += (i > 0 ? " " : "") + words[i];
        setInProgressMessage(currentResponse);
        await new Promise((resolve) =>
          setTimeout(resolve, 250 + Math.random() * 350)
        );
      }

      setMessages((m) => m.concat(response));
      setInProgressMessage(null);
    })();
  }, [isUserTurn, messages]);

  return (
    <div>
      <div className="chat-full">
        <ChatBox
          botId={2}
          messages={messages}
          inProgressMessage={inProgressMessage}
        />

        {Object.keys(attentionVisualization).length > 0 && (
          <div className="attention-visualization">
            <h4>Attention Mechanism</h4>
            <div className="tokens-attention">
              {Object.entries(attentionVisualization).map(([token, score]) => (
                <div key={token} className="token-attention">
                  <span className="token-text">{token}</span>
                  <div className="attention-bar-container">
                    <div
                      className="attention-bar"
                      style={{
                        width: `${Math.max(5, Math.min(100, score * 100))}%`,
                        backgroundColor: `rgba(140, 110, 84, ${Math.max(
                          0.3,
                          Math.min(1, score)
                        )})`,
                      }}
                    />
                  </div>
                  <span className="attention-score">{score.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          className="input"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            type="text"
            value={userInput}
            placeholder="Chat with BetaGPT..."
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="btn"
            onClick={send}
            disabled={!isUserTurn || !userInput.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
