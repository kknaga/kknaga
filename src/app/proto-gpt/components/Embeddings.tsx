"use client";
import { useState, useEffect, useMemo } from "react";

const Embeddings = ({ tokens = [] }: { tokens: string[] }) => {
  const [selectedToken, setSelectedToken] = useState("");
  const [embeddingSize, setEmbeddingSize] = useState(8);

  const generateEmbedding = (token: string, size: number) => {
    const embedding = [];

    let seed = 0;
    for (let i = 0; i < token.length; i++) {
      seed += token.charCodeAt(i);
    }

    for (let i = 0; i < size; i++) {
      const val = Math.sin(seed * i * 0.1) * Math.cos(seed * (i + 1) * 0.1);
      embedding.push(val);
    }

    return embedding;
  };

  const tokenEmbeddings = useMemo(() => {
    const result: Record<string, number[]> = {};

    if (!tokens || tokens.length === 0) {
      const defaultTokens = [
        "cat",
        "dog",
        "pet",
        "animal",
        "walk",
        "run",
        "computer",
        "laptop",
      ];
      defaultTokens.forEach((token) => {
        result[token] = generateEmbedding(token, embeddingSize);
      });

      if (!selectedToken && defaultTokens.length > 0) {
        setSelectedToken(defaultTokens[0]);
      }

      return result;
    }

    tokens.forEach((token) => {
      if (token && token.trim() !== "") {
        result[token] = generateEmbedding(token, embeddingSize);
      }
    });

    if (!selectedToken && tokens.length > 0) {
      setSelectedToken(tokens[0]);
    }

    return result;
  }, [tokens, embeddingSize, selectedToken]);

  useEffect(() => {
    if (
      tokens &&
      tokens.length > 0 &&
      (!selectedToken || !tokens.includes(selectedToken))
    ) {
      setSelectedToken(tokens[0]);
    }
  }, [tokens, selectedToken]);

  const maxValue = useMemo(() => {
    let max = 0;
    Object.values(tokenEmbeddings).forEach((embedding) => {
      embedding.forEach((value) => {
        max = Math.max(max, Math.abs(value));
      });
    });
    return max;
  }, [tokenEmbeddings]);

  const getColor = (value: number) => {
    if (value > 0) {
      const intensity = Math.floor((value / maxValue) * 255);
      return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
    } else {
      const intensity = Math.floor((Math.abs(value) / maxValue) * 255);
      return `rgb(255, ${255 - intensity}, ${255 - intensity * 0.7})`;
    }
  };

  const calculateSimilarity = (token1: string, token2: string) => {
    if (!tokenEmbeddings[token1] || !tokenEmbeddings[token2]) return 0;

    const embedding1 = tokenEmbeddings[token1];
    const embedding2 = tokenEmbeddings[token2];

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

  const sortedBySimularity = useMemo(() => {
    if (!selectedToken) return Object.keys(tokenEmbeddings);

    return Object.keys(tokenEmbeddings)
      .filter((token) => token !== selectedToken)
      .sort((a, b) => {
        const simA = calculateSimilarity(selectedToken, a);
        const simB = calculateSimilarity(selectedToken, b);
        return simB - simA;
      });
  }, [selectedToken, tokenEmbeddings]);

  return (
    <div className="content-section">
      <p>
        Turning tokens into <strong>embeddings</strong> is how AI models begin
        to understand meaning. An embedding is a list of numbers (a vector) that
        represents a token in a "meaning space."
      </p>

      <div className="embedding-explanation example">
        <h4>What Are Embeddings?</h4>
        <p>
          Imagine a giant room where similar words are placed close together. In
          this room:
        </p>
        <ul>
          <li>"Dog" and "puppy" would be near each other</li>
          <li>"Hot" and "cold" might be in opposite corners</li>
          <li>"Computer" and "laptop" would be neighbors</li>
        </ul>
        <p>
          This "room" actually has hundreds of dimensions (not just 3), allowing
          for extremely subtle relationships between words.
        </p>
      </div>

      <div className="embedding-interactive example">
        <h4>Explore Token Embeddings</h4>
        <p>
          Select a token to see its embedding vector and find similar tokens:
        </p>

        <div className="token-controls">
          <div className="token-selector">
            <label htmlFor="token-select">Token:</label>
            <select
              id="token-select"
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="token-dropdown"
              disabled={Object.keys(tokenEmbeddings).length === 0}
            >
              {Object.keys(tokenEmbeddings).map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>

          <div className="embedding-size-control">
            <label htmlFor="embedding-size">Embedding Size:</label>
            <input
              id="embedding-size"
              type="range"
              min="4"
              max="16"
              step="2"
              value={embeddingSize}
              onChange={(e) => setEmbeddingSize(parseInt(e.target.value))}
              className="size-slider"
            />
            <span className="size-value">{embeddingSize}</span>
          </div>
        </div>

        {selectedToken && (
          <div className="selected-token-info">
            <div className="embeddings-table">
              <h5>Embedding for "{selectedToken}"</h5>
              <div className="vector-visualization">
                {tokenEmbeddings[selectedToken]?.map((value, index) => (
                  <div
                    key={index}
                    className="vector-cell"
                    style={{
                      backgroundColor: getColor(value),
                      width: `${(Math.abs(value) / maxValue) * 100}%`,
                      marginLeft: value < 0 ? "auto" : "0",
                    }}
                    title={`Dimension ${index}: ${value.toFixed(3)}`}
                  >
                    <span className="dimension-label">{index}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="similar-tokens">
              <h5>Most Similar Tokens</h5>
              <div className="similarity-list">
                {sortedBySimularity.slice(0, 5).map((token) => {
                  const similarity = calculateSimilarity(selectedToken, token);
                  return (
                    <div
                      key={token}
                      className="similarity-item"
                      onClick={() => setSelectedToken(token)}
                    >
                      <span className="similar-token">{token}</span>
                      <div className="similarity-bar-container">
                        <div
                          className="similarity-bar"
                          style={{ width: `${Math.max(similarity * 100, 0)}%` }}
                        ></div>
                        <span className="similarity-value">
                          {(similarity * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="tokens-comparison">
          <h5>All Tokens Comparison</h5>
          <div className="all-tokens-grid">
            {Object.entries(tokenEmbeddings).map(([token, embedding]) => (
              <div
                key={token}
                className={`token-row ${
                  token === selectedToken ? "selected-token" : ""
                }`}
                onClick={() => setSelectedToken(token)}
              >
                <div className="token-label">{token}</div>
                <div className="token-vector">
                  {embedding.map((value, idx) => (
                    <div
                      key={idx}
                      className="vector-mini-cell"
                      style={{ backgroundColor: getColor(value) }}
                      title={`Value: ${value.toFixed(3)}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="visualization-note">
          In this visualization, blue represents positive values and orange
          represents negative values. The intensity of the color shows the
          magnitude of each value. Similar tokens will have similar patterns in
          their embeddings.
        </p>
      </div>

      <div className="embedding-math">
        <h4>How Embeddings Work</h4>
        <p>
          The model learns these vectors during training. Initially random, they
          gradually shift so that:
        </p>
        <ul>
          <li>Words used in similar contexts end up with similar vectors</li>
          <li>The distance between vectors reflects semantic relationships</li>
          <li>
            Vector directions can capture analogies (like "king - man + woman =
            queen")
          </li>
        </ul>
        <p>
          In real models, embeddings are typically 256 to 1024 dimensions,
          allowing for rich representations of meaning.
        </p>
      </div>
    </div>
  );
};

export default Embeddings;
