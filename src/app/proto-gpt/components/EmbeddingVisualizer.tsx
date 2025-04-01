"use client";
import React, { useState } from "react";

import "./EmbeddingVisualizer.scss";

interface EmbeddingVisualizerProps {
  tokens: Array<{
    text: string;
    embedding: number[];
  }>;
}

const EmbeddingVisualizer: React.FC<EmbeddingVisualizerProps> = ({
  tokens,
}) => {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const toggleToken = (token: string) => {
    if (selectedTokens.includes(token)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== token));
    } else {
      if (selectedTokens.length < 3) {
        setSelectedTokens([...selectedTokens, token]);
      }
    }
  };

  const selectedTokenData = tokens
    .filter((token) => selectedTokens.includes(token.text))
    .map((token) => ({
      ...token,

      normalizedEmbedding: token.embedding.map((val) => {
        const minVal = Math.min(...token.embedding);
        const maxVal = Math.max(...token.embedding);
        const range = maxVal - minVal;
        return range ? (val - minVal) / range : 0.5;
      }),
    }));

  const calculateSimilarity = (embedding1: number[], embedding2: number[]) => {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      magnitude1 += embedding1[i] * embedding1[i];
      magnitude2 += embedding2[i] * embedding2[i];
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    return dotProduct / (magnitude1 * magnitude2);
  };

  const similarities =
    selectedTokenData.length > 1
      ? selectedTokenData
          .map((token1, i) =>
            selectedTokenData.slice(i + 1).map((token2) => ({
              token1: token1.text,
              token2: token2.text,
              similarity: calculateSimilarity(
                token1.embedding,
                token2.embedding
              ),
            }))
          )
          .flat()
      : [];

  return (
    <div className="embedding-visualizer">
      <h3>Token Embedding Visualizer</h3>

      <div className="token-selection">
        <p>Select up to 3 tokens to compare their embeddings:</p>
        <div className="token-buttons">
          {tokens.slice(0, 20).map((token) => (
            <button
              key={token.text}
              className={`token-button ${
                selectedTokens.includes(token.text) ? "selected" : ""
              }`}
              onClick={() => toggleToken(token.text)}
            >
              {token.text}
            </button>
          ))}
        </div>
      </div>

      {selectedTokenData.length > 0 && (
        <div className="embeddings-display">
          <h4>Embedding Vectors</h4>

          <div className="embedding-vectors">
            {selectedTokenData.map((token) => (
              <div key={token.text} className="token-embedding">
                <div className="token-label">{token.text}</div>
                <div className="vector-visualization">
                  {token.normalizedEmbedding.map((value, i) => (
                    <div
                      key={i}
                      className="vector-component"
                      style={{
                        height: `${value * 60}px`,
                        backgroundColor: `rgba(140, 110, 84, ${value.toFixed(
                          2
                        )})`,
                      }}
                      title={`Dimension ${i}: ${token.embedding[i].toFixed(3)}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {similarities.length > 0 && (
            <div className="similarity-display">
              <h4>Token Similarities</h4>
              <div className="similarities">
                {similarities.map((sim, i) => (
                  <div key={i} className="similarity-pair">
                    <span>
                      {sim.token1} ↔ {sim.token2}:
                    </span>
                    <div className="similarity-bar-container">
                      <div
                        className="similarity-bar"
                        style={{
                          width: `${((sim.similarity + 1) / 2) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="similarity-value">
                      {sim.similarity.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="embedding-explanation">
        <p>
          Token embeddings convert words into vectors of numbers, placing
          semantically similar words close to each other in a mathematical
          space. This visualization shows how different tokens are represented
          as vectors, and how similar they are to each other.
        </p>
        <p>
          In real language models, these embedding vectors are learned during
          training and capture meaning, allowing the model to understand
          relationships between words.
        </p>
      </div>
    </div>
  );
};

export default EmbeddingVisualizer;
