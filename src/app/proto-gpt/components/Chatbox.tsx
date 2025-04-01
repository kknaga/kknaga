"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import "./Chatbox.scss";

interface AttentionDebug {
  tokens: string[];
  attentionScores: number[][];
}

interface ChatBoxProps {
  messages: string[];
  inProgressMessage: string | null;
  botId: 1 | 2 | 3 | 4;
  attentionDebug?: AttentionDebug | null;
}

export default function ChatBox({
  messages,
  inProgressMessage,
  botId,
  attentionDebug,
}: ChatBoxProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showAttention, setShowAttention] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, inProgressMessage]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  const getAttentionColor = (value: number) => {
    return `rgba(140, 110, 84, ${value.toFixed(2)})`;
  };

  const processedAttentionDebug = attentionDebug
    ? {
        tokens:
          attentionDebug.tokens.length > 15
            ? attentionDebug.tokens.slice(0, 15)
            : attentionDebug.tokens,
        attentionScores:
          attentionDebug.tokens.length > 15
            ? attentionDebug.attentionScores
                .slice(0, 15)
                .map((row) => row.slice(0, 15))
            : attentionDebug.attentionScores,
      }
    : null;

  return (
    <div className="chat-container">
      <div ref={chatContainerRef} className="chat-box">
        {messages
          .concat(inProgressMessage ? [inProgressMessage] : [])
          .map((message, index) => (
            <div
              key={index + message}
              className={`message ${index % 2 === 0 ? "user" : "gpt"}`}
            >
              {index % 2 === 1 && (
                <Image src={`/${botId}.png`} width={56} height={56} alt="" />
              )}
              <div className="message-content">
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            </div>
          ))}
      </div>

      {/* Attention visualization for AttendGPT (botId 3) */}
      {botId === 3 &&
        processedAttentionDebug &&
        processedAttentionDebug.tokens.length > 0 && (
          <div className="attention-debug">
            <button
              className={`attention-toggle ${showAttention ? "active" : ""}`}
              onClick={() => setShowAttention(!showAttention)}
            >
              {showAttention ? "Hide Attention Map" : "Show Attention Map"}
            </button>

            {showAttention && (
              <div className="attention-heatmap">
                <div className="attention-header">
                  <div className="corner-space"></div>
                  {processedAttentionDebug.tokens.map((token, i) => (
                    <div
                      key={`header-${i}`}
                      className="token-label"
                      title={token}
                    >
                      {token.length > 5 ? `${token.substring(0, 4)}…` : token}
                    </div>
                  ))}
                </div>

                {processedAttentionDebug.attentionScores.map((row, fromIdx) => (
                  <div key={`row-${fromIdx}`} className="attention-row">
                    <div
                      className="token-label"
                      title={processedAttentionDebug.tokens[fromIdx]}
                    >
                      {processedAttentionDebug.tokens[fromIdx].length > 5
                        ? `${processedAttentionDebug.tokens[fromIdx].substring(
                            0,
                            4
                          )}…`
                        : processedAttentionDebug.tokens[fromIdx]}
                    </div>
                    {row.map((score, toIdx) => (
                      <div
                        key={`cell-${fromIdx}-${toIdx}`}
                        className="attention-cell"
                        style={{ backgroundColor: getAttentionColor(score) }}
                        title={`${processedAttentionDebug.tokens[fromIdx]} → ${
                          processedAttentionDebug.tokens[toIdx]
                        }: ${(score * 100).toFixed(1)}%`}
                      >
                        <span className="attention-value">
                          {(score * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="attention-explanation">
                  <p>
                    This heatmap shows how each token (row) attends to other
                    tokens (columns). Darker cells indicate stronger attention
                    weights.
                  </p>
                  {attentionDebug && attentionDebug.tokens.length > 15 && (
                    <p>
                      <strong>Note:</strong> Showing only first 15 tokens for
                      readability.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
