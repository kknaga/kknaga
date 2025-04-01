"use client";
import { useState, useEffect } from "react";

// Embedding size for our vectors
const EMBEDDING_SIZE = 8;

// Simple utility to create a random embedding vector
const createRandomEmbedding = () => {
  return Array.from({ length: EMBEDDING_SIZE }, () => Math.random() * 2 - 1);
};

export default function EmbeddingsVisualization({
  tokens = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog"],
}: {
  tokens?: string[];
}) {
  const [embeddings, setEmbeddings] = useState<{ [key: string]: number[] }>({});
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  useEffect(() => {
    const newEmbeddings: { [key: string]: number[] } = {};

    const uniqueTokens = Array.from(new Set(tokens));
    uniqueTokens.forEach((token) => {
      newEmbeddings[token] = createRandomEmbedding();
    });

    setEmbeddings(newEmbeddings);

    if (uniqueTokens.length > 0 && !selectedToken) {
      setSelectedToken(uniqueTokens[0]);
    }
  }, [tokens]);

  const projectQKV = (embedding: number[]) => {
    if (!embedding) return { query: [], key: [], value: [] };

    const halfSize = Math.floor(embedding.length / 2);

    return {
      query: embedding.slice(0, halfSize),
      key: embedding.slice(0, halfSize).map((v) => v * 1.2),
      value: embedding.slice(halfSize),
    };
  };

  const selectedQKV = selectedToken
    ? projectQKV(embeddings[selectedToken])
    : null;

  const normalizeVector = (vec: number[]) => {
    if (!vec || vec.length === 0) return [];
    const max = Math.max(...vec.map((v) => Math.abs(v)));
    return vec.map((v) => v / (max || 1));
  };

  return (
    <div className="embeddings-visualization">
      <h3>Token Embeddings</h3>

      <div className="token-selector">
        {Object.keys(embeddings).map((token) => (
          <button
            key={token}
            className={`token-button ${
              token === selectedToken ? "selected" : ""
            }`}
            onClick={() => setSelectedToken(token)}
          >
            {token}
          </button>
        ))}
      </div>

      {selectedToken && (
        <div className="embedding-details">
          <h4>Embedding for "{selectedToken}"</h4>

          <div className="vector-visualization">
            {normalizeVector(embeddings[selectedToken]).map((value, i) => (
              <div
                key={`emb-${i}`}
                className="vector-unit"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor:
                    value > 0
                      ? `rgba(52, 152, 219, ${Math.abs(value)})`
                      : `rgba(231, 76, 60, ${Math.abs(value)})`,
                }}
                title={`Dim ${i}: ${embeddings[selectedToken][i].toFixed(3)}`}
              />
            ))}
          </div>

          <h4>QKV Projections</h4>

          {selectedQKV && (
            <div className="qkv-visualizations">
              <div className="qkv-group">
                <h5>Query Vector</h5>
                <div className="vector-row">
                  {normalizeVector(selectedQKV.query).map((value, i) => (
                    <div
                      key={`q-${i}`}
                      className="vector-unit"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor:
                          value > 0
                            ? `rgba(52, 152, 219, ${Math.abs(value)})`
                            : `rgba(231, 76, 60, ${Math.abs(value)})`,
                      }}
                      title={`Q[${i}]: ${selectedQKV.query[i].toFixed(3)}`}
                    />
                  ))}
                </div>
                <p className="vector-description">
                  The Query vector represents "what is this token looking for?"
                </p>
              </div>

              <div className="qkv-group">
                <h5>Key Vector</h5>
                <div className="vector-row">
                  {normalizeVector(selectedQKV.key).map((value, i) => (
                    <div
                      key={`k-${i}`}
                      className="vector-unit"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor:
                          value > 0
                            ? `rgba(46, 204, 113, ${Math.abs(value)})`
                            : `rgba(155, 89, 182, ${Math.abs(value)})`,
                      }}
                      title={`K[${i}]: ${selectedQKV.key[i].toFixed(3)}`}
                    />
                  ))}
                </div>
                <p className="vector-description">
                  The Key vector represents "what does this token contain?"
                </p>
              </div>

              <div className="qkv-group">
                <h5>Value Vector</h5>
                <div className="vector-row">
                  {normalizeVector(selectedQKV.value).map((value, i) => (
                    <div
                      key={`v-${i}`}
                      className="vector-unit"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor:
                          value > 0
                            ? `rgba(230, 126, 34, ${Math.abs(value)})`
                            : `rgba(41, 128, 185, ${Math.abs(value)})`,
                      }}
                      title={`V[${i}]: ${selectedQKV.value[i].toFixed(3)}`}
                    />
                  ))}
                </div>
                <p className="vector-description">
                  The Value vector represents "what information does this token
                  provide?"
                </p>
              </div>
            </div>
          )}

          <div className="explanation">
            <h4>How QKV Works in Attention</h4>
            <p>
              1. Each token's embedding is projected into three different
              vectors: Query (Q), Key (K), and Value (V).
            </p>
            <p>
              2. When computing attention, the Query of one token is matched
              against the Keys of all tokens to determine relevance.
            </p>
            <p>
              3. For each token, the dot product of its Query with every other
              token's Key produces attention scores.
            </p>
            <p>
              4. These scores determine how much each token's Value contributes
              to the final output.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .embeddings-visualization {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }
        
        .token-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .token-button {
          background-color: #eee;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .token-button:hover {
          background-color: #ddd;
        }
        
        .token-button.selected {
          background-color: #3498db;
          color: white;
        }
        
        .embedding-details {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .vector-visualization, .vector-row {
          display: flex;
          gap: 2px;
          margin: 12px 0;
        }
        
        .vector-unit {
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 2px;
          transition: transform 0.2s;
        }
        
        .vector-unit:hover {
          transform: scale(1.2);
          z-index: 10;
        }
        
        .qkv-visualizations {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .qkv-group {
          background-color: #f7f7f7;
          border-radius: 6px;
          padding: 12px;
        }
        
        .vector-description {
          font-size: 14px;
          color: #666;
          margin-top: 8px;
        }
        
        .explanation {
          margin-top: 24px;
          padding: 16px;
          background-color: #e8f4fc;
          border-radius: 6px;
        }
        
        .explanation p {
          margin: 8px 0;
        }}
      `}</style>
    </div>
  );
}
