"use client";
import { useState, useEffect, useCallback } from "react";

export default function Tokenizer({
  corpus = "The quick brown fox jumps over the lazy dog. AI models like transformers use attention to understand context.",
  onTokensGenerated = () => {},
}: {
  corpus?: string;
  onTokensGenerated?: (tokens: string[]) => void;
}) {
  const [inputText, setInputText] = useState(corpus);
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenMap, setTokenMap] = useState<{ [key: string]: number }>({});

  const tokenize = useCallback((text: string): string[] => {
    return text
      .toLowerCase()
      .split(/[\s.,!?;:()\[\]{}'"\/\\<>-]+/)
      .filter((token) => token.length > 0);
  }, []);

  const generateTokenMap = useCallback(
    (tokenList: string[]): { [key: string]: number } => {
      const uniqueTokens = Array.from(new Set(tokenList));
      const map: { [key: string]: number } = {};

      uniqueTokens.forEach((token, index) => {
        map[token] = index + 1;
      });

      return map;
    },
    []
  );

  useEffect(() => {
    const tokenList = tokenize(inputText);
    const map = generateTokenMap(tokenList);

    setTokens(tokenList);
    setTokenMap(map);
    onTokensGenerated(tokenList);
  }, [inputText, tokenize, generateTokenMap, onTokensGenerated]);

  return (
    <div className="tokenizer">
      <h3>Corpus</h3>
      <textarea
        className="corpus-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={5}
        placeholder="Enter text for tokenization..."
      />

      <div className="tokenization-results">
        <div className="tokens-section">
          <h3>Generated Tokens</h3>
          <div className="tokens-list">
            {tokens.map((token, index) => (
              <span key={index} className="token">
                {token}
              </span>
            ))}
          </div>
        </div>

        <div className="token-mapping">
          <h3>Token Mapping (to Numbers)</h3>
          <div className="mapping-list">
            {Object.entries(tokenMap).map(([token, id]) => (
              <div key={token} className="mapping-item">
                <span className="token-text">{token}</span>
                <span className="token-id">{id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .tokenizer {
          width: 100%;
          margin-bottom: 20px;
        }

        .corpus-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          margin-bottom: 16px;
        }

        .tokenization-results {
          display: flex;
          gap: 20px;
        }

        .tokens-section,
        .token-mapping {
          flex: 1;
          background-color: #f9f9f9;
          border-radius: 4px;
          padding: 12px;
        }

        .tokens-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .token {
          background-color: #e0f7fa;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 14px;
        }

        .mapping-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 300px;
          overflow-y: auto;
        }

        .mapping-item {
          display: flex;
          justify-content: space-between;
          background-color: #f0f0f0;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .token-text {
          font-weight: bold;
        }

        .token-id {
          background-color: #3498db;
          color: white;
          padding: 0 6px;
          border-radius: 10px;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
