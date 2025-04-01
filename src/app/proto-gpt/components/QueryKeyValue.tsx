"use client";
import React, { useState } from "react";
import styles from "./QueryKeyValue.module.scss";

// Define TypeScript interfaces
export interface TokenData {
  token: string;
  id: number;
}

export interface VectorData {
  query: number[];
  key: number[];
  value: number[];
}

export interface EmbeddingsData {
  tokens: TokenData[];

  getVectors?: (token: TokenData, type: string) => number[];

  calculateAttention?: (queryIdx: number, keyIdx: number) => number;
}

interface QueryKeyValueProps {
  embeddings?: EmbeddingsData;
}

const QueryKeyValue: React.FC<QueryKeyValueProps> = ({ embeddings }) => {
  const defaultTokens: TokenData[] = [
    { token: "The", id: 0 },
    { token: "cat", id: 1 },
    { token: "sat", id: 2 },
    { token: "on", id: 3 },
    { token: "the", id: 4 },
    { token: "mat", id: 5 },
  ];

  const tokens = embeddings?.tokens || defaultTokens;

  const [selectedToken, setSelectedToken] = useState<number>(0);
  const [showAttention, setShowAttention] = useState<boolean>(false);

  const defaultGenerateVectors = (token: TokenData, type: string): number[] => {
    const seed = token.id * 123 + type.charCodeAt(0);
    return Array(8)
      .fill(0)
      .map((_, i) => {
        return Math.sin(seed + i * 0.7) * 0.8;
      });
  };

  const defaultCalculateAttention = (
    queryIdx: number,
    keyIdx: number
  ): number => {
    const distance = Math.abs(queryIdx - keyIdx);
    const baseSimilarity = distance === 0 ? 0.9 : (1 / (distance + 1)) * 0.7;

    let bonusAttention = 0;

    if (
      tokens[queryIdx].token.toLowerCase() === "the" &&
      ["cat", "mat"].includes(tokens[keyIdx].token)
    ) {
      bonusAttention = 0.3;
    }

    if (
      tokens[queryIdx].token === "sat" &&
      ["cat", "mat"].includes(tokens[keyIdx].token)
    ) {
      bonusAttention = 0.25;
    }

    if (
      tokens[queryIdx].token === "on" &&
      (tokens[keyIdx].token === "sat" || tokens[keyIdx].token === "mat")
    ) {
      bonusAttention = 0.4;
    }

    return Math.min(0.95, baseSimilarity + bonusAttention);
  };

  const generateVectors = embeddings?.getVectors || defaultGenerateVectors;
  const calculateAttention =
    embeddings?.calculateAttention || defaultCalculateAttention;

  const getColor = (value: number, type: string): string => {
    const colors: Record<string, string[]> = {
      query: ["#e1f5fe", "#01579b"],
      key: ["#e8f5e9", "#2e7d32"],
      value: ["#fff3e0", "#e65100"],
      attention: ["#f5f5f5", "#8C6E54"],
    };

    const scale = value < 0 ? 0 : value > 1 ? 1 : value;
    const colorStart = colors[type][0];
    const colorEnd = colors[type][1];

    const r1 = parseInt(colorStart.slice(1, 3), 16);
    const g1 = parseInt(colorStart.slice(3, 5), 16);
    const b1 = parseInt(colorStart.slice(5, 7), 16);

    const r2 = parseInt(colorEnd.slice(1, 3), 16);
    const g2 = parseInt(colorEnd.slice(3, 5), 16);
    const b2 = parseInt(colorEnd.slice(5, 7), 16);

    const r = Math.round(r1 + scale * (r2 - r1));
    const g = Math.round(g1 + scale * (g2 - g1));
    const b = Math.round(b1 + scale * (b2 - b1));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const getTokenVectors = (tokenId: number): VectorData => {
    const token = tokens.find((t) => t.id === tokenId) || tokens[0];
    return {
      query: generateVectors(token, "q"),
      key: generateVectors(token, "k"),
      value: generateVectors(token, "v"),
    };
  };

  const attentionMap = tokens.map((queryToken, i) => {
    return tokens.map((keyToken, j) => {
      return {
        score: calculateAttention(i, j),
        queryToken: queryToken.token,
        keyToken: keyToken.token,
      };
    });
  });

  const getWeightedOutput = (queryTokenIdx: number): number[] => {
    const attentionScores = tokens.map((_, keyIdx) =>
      calculateAttention(queryTokenIdx, keyIdx)
    );

    const sum = attentionScores.reduce((acc, val) => acc + val, 0);
    const normalizedScores = attentionScores.map((score) => score / sum);

    const weightedValues = Array(8).fill(0);

    tokens.forEach((keyToken, keyIdx) => {
      const valueVector = generateVectors(keyToken, "v");
      const weight = normalizedScores[keyIdx];

      valueVector.forEach((val, i) => {
        weightedValues[i] += val * weight;
      });
    });

    return weightedValues;
  };

  const selectedVectors = getTokenVectors(selectedToken);
  const weightedOutput = getWeightedOutput(selectedToken);

  return (
    <div className="content-section">
      <p>
        The heart of a transformer model is its attention mechanism, which
        relies on three important projections: <strong>Query</strong>,{" "}
        <strong>Key</strong>, and <strong>Value</strong>.
      </p>

      <div className="qkv-analogy example">
        <h4>A Library Analogy</h4>
        <p>Think of attention like searching for books in a library:</p>
        <ul>
          <li>
            <strong>Query (Q)</strong>: What you're looking for, your search
            terms
          </li>
          <li>
            <strong>Key (K)</strong>: The catalog entries that help you find
            relevant books
          </li>
          <li>
            <strong>Value (V)</strong>: The actual books with the information
            you want
          </li>
        </ul>
      </div>

      <div className="interactive-demo example">
        <h4>Interactive QKV Demonstration</h4>

        <p>
          Select a token to see its Query, Key, and Value vectors, and how it
          interacts with other tokens:
        </p>

        <div className={styles.tokenSelector}>
          <div className={styles.tokenButtons}>
            {tokens.map((token) => (
              <button
                key={token.id}
                className={`${styles.tokenButton} ${
                  selectedToken === token.id ? styles.selectedToken : ""
                }`}
                onClick={() => setSelectedToken(token.id)}
              >
                {token.token}
              </button>
            ))}
          </div>

          <div className={styles.viewSelector}>
            <button
              className={`btn ${!showAttention ? styles.selectedView : ""}`}
              onClick={() => setShowAttention(false)}
            >
              Show QKV Vectors
            </button>
            <button
              className={`btn ${showAttention ? styles.selectedView : ""}`}
              onClick={() => setShowAttention(true)}
            >
              Show Attention Map
            </button>
          </div>
        </div>

        {!showAttention ? (
          <div className={styles.vectorVisualization}>
            <div className={styles.vectorContainer}>
              <h5>Query Vector</h5>
              <div className={styles.vectorRow}>
                {selectedVectors.query.map((value, idx) => (
                  <div
                    key={`q-${idx}`}
                    className={styles.vectorCell}
                    style={{
                      backgroundColor: getColor(Math.abs(value), "query"),
                      width: `${Math.abs(value) * 100}%`,
                      maxWidth: "100%",
                    }}
                  >
                    <span className={styles.dimensionLabel}>
                      {value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.vectorContainer}>
              <h5>Key Vector</h5>
              <div className={styles.vectorRow}>
                {selectedVectors.key.map((value, idx) => (
                  <div
                    key={`k-${idx}`}
                    className={styles.vectorCell}
                    style={{
                      backgroundColor: getColor(Math.abs(value), "key"),
                      width: `${Math.abs(value) * 100}%`,
                      maxWidth: "100%",
                    }}
                  >
                    <span className={styles.dimensionLabel}>
                      {value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.vectorContainer}>
              <h5>Value Vector</h5>
              <div className={styles.vectorRow}>
                {selectedVectors.value.map((value, idx) => (
                  <div
                    key={`v-${idx}`}
                    className={styles.vectorCell}
                    style={{
                      backgroundColor: getColor(Math.abs(value), "value"),
                      width: `${Math.abs(value) * 100}%`,
                      maxWidth: "100%",
                    }}
                  >
                    <span className={styles.dimensionLabel}>
                      {value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${styles.vectorContainer} ${styles.outputContainer}`}
            >
              <h5>Weighted Output (After Attention)</h5>
              <div className={styles.vectorRow}>
                {weightedOutput.map((value, idx) => (
                  <div
                    key={`out-${idx}`}
                    className={`${styles.vectorCell} ${styles.outputCell}`}
                    style={{
                      backgroundImage: `linear-gradient(to right, #e1f5fe, #8C6E54)`,
                      width: `${Math.abs(value) * 100}%`,
                      maxWidth: "100%",
                      opacity: Math.abs(value) * 0.9 + 0.1,
                    }}
                  >
                    <span className={styles.dimensionLabel}>
                      {value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.vectorExplanation}>
              <p>
                The weighted output shows how the token's representation changes
                after considering context through attention. Notice how it
                combines information from all tokens, but gives more weight to
                relevant tokens.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.attentionVisualization}>
            <h5>Attention Map for "{tokens[selectedToken].token}"</h5>
            <div className={styles.attentionMap}>
              <div className={styles.attentionHeader}>
                <div className={styles.attentionCorner}></div>
                {tokens.map((token) => (
                  <div
                    key={`header-${token.id}`}
                    className={styles.attentionLabel}
                  >
                    {token.token}
                  </div>
                ))}
              </div>

              <div className={styles.attentionRows}>
                <div className={styles.attentionRowLabel}>
                  {tokens[selectedToken].token}
                </div>
                <div className={styles.attentionRow}>
                  {attentionMap[selectedToken].map((cell, idx) => (
                    <div
                      key={`att-${idx}`}
                      className={styles.attentionCell}
                      style={{
                        backgroundColor: getColor(cell.score, "attention"),
                      }}
                    >
                      <span className={styles.attentionScore}>
                        {cell.score.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.attentionExplanation}>
              <p>
                This row shows how much the token "{tokens[selectedToken].token}
                " attends to each other token in the sequence. Darker colors
                indicate stronger attention. Notice how it focuses on
                semantically relevant tokens.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="qkv-process example">
        <h4>How QKV Works</h4>
        <p>For each token in your input:</p>
        <ol>
          <li>
            Its embedding is transformed into three separate vectors: Q, K, and
            V
          </li>
          <li>
            The Query of each token is compared with the Keys of all tokens
          </li>
          <li>
            This comparison produces "attention scores" showing how relevant
            each token is
          </li>
          <li>
            These scores are used to create a weighted sum of the Value vectors
          </li>
          <li>
            The result is a new representation that captures relationships
            between tokens
          </li>
        </ol>
      </div>

      <div className="qkv-math example">
        <h4>The Math (Simplified)</h4>
        <p>For token A wanting to gather information:</p>
        <ol>
          <li>Calculate how related A is to each token (including itself)</li>
          <li>Use those relationships as weights</li>
          <li>Take a weighted average of all value vectors</li>
        </ol>
        <p>This lets token A "pay attention" to relevant context.</p>
      </div>
    </div>
  );
};

export default QueryKeyValue;
