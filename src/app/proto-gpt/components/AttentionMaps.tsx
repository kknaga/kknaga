import React, { useState, useEffect } from "react";
import styles from "./AttentionMaps.module.scss";
import { tokenize } from "@/app/proto-gpt/tokenize";

interface TokenData {
  token: string;
  id: number;
}

interface AttentionScore {
  fromToken: TokenData;
  toToken: TokenData;
  score: number;
}

const AttentionMaps: React.FC = () => {
  const [inputText, setInputText] = useState<string>("The dog chased its tail");
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [attentionMap, setAttentionMap] = useState<AttentionScore[][]>([]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  useEffect(() => {
    if (inputText.trim() === "") return;

    const tokenizedText = tokenize(inputText);
    const tokensWithIds = tokenizedText.map((token, index) => ({
      token,
      id: index,
    }));

    setTokens(tokensWithIds);
    setSelectedTokenIndex(0);
  }, [inputText]);

  useEffect(() => {
    if (tokens.length === 0) return;
    const newAttentionMap: AttentionScore[][] = [];

    for (let i = 0; i < tokens.length; i++) {
      const row: AttentionScore[] = [];
      for (let j = 0; j < tokens.length; j++) {
        const score = calculateAttentionScore(i, j);
        row.push({
          fromToken: tokens[i],
          toToken: tokens[j],
          score,
        });
      }
      newAttentionMap.push(row);
    }

    setAttentionMap(newAttentionMap);
  }, [tokens]);

  const calculateAttentionScore = (
    fromIndex: number,
    toIndex: number
  ): number => {
    if (tokens.length === 0) return 0;

    let score = fromIndex === toIndex ? 0.8 : 0.1;

    const distance = Math.abs(fromIndex - toIndex);
    const distanceScore = distance === 0 ? 0 : (1 / (distance + 1)) * 0.4;
    score += distanceScore;

    const fromToken = tokens[fromIndex].token.toLowerCase();
    const toToken = tokens[toIndex].token.toLowerCase();

    if (
      ["the", "a", "an"].includes(fromToken) &&
      !["the", "a", "an", "is", "are", "was", "were"].includes(toToken)
    ) {
      if (toIndex === fromIndex + 1) {
        score += 0.3;
      }
    }

    if (
      ["he", "she", "it", "they", "his", "her", "its", "their"].includes(
        fromToken
      )
    ) {
      if (toIndex < fromIndex) {
        score += 0.25;
      }
    }

    if (
      ["chased", "ran", "jumped", "ate", "slept", "walked", "said"].includes(
        fromToken
      )
    ) {
      if (toIndex < fromIndex) {
        score += 0.2;
      }
      if (toIndex > fromIndex) {
        score += 0.2;
      }
    }

    return Math.min(score, 0.95);
  };

  const getColor = (value: number): string => {
    return `rgba(140, 110, 84, ${value.toFixed(2)})`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className={styles.attentionMapsContainer}>
      <div className="content-section">
        <p>
          Attention maps show how tokens in a sequence relate to each other.
          They're like relationship diagrams for words.
        </p>

        <div className={styles.inputSection}>
          <h4>Try it yourself</h4>
          <p>Enter text to see how different tokens attend to each other:</p>
          <textarea
            className={styles.textInput}
            value={inputText}
            onChange={handleTextChange}
            placeholder="Enter a sentence..."
            rows={3}
          />
        </div>

        {tokens.length > 0 && (
          <div className={styles.visualizationContainer}>
            <div className={styles.tokenSelector}>
              <h4>Select a token to see its attention pattern:</h4>
              <div className={styles.tokenButtons}>
                {tokens.map((token, index) => (
                  <button
                    key={index}
                    className={`${styles.tokenButton} ${
                      selectedTokenIndex === index ? styles.selectedToken : ""
                    }`}
                    onClick={() => setSelectedTokenIndex(index)}
                  >
                    {token.token}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.attentionVisualization}>
              <h4>Attention Map for "{tokens[selectedTokenIndex]?.token}"</h4>
              <div className={styles.attentionMap}>
                <div className={styles.attentionHeader}>
                  <div className={styles.attentionCorner}></div>
                  {tokens.map((token, index) => (
                    <div
                      key={`header-${index}`}
                      className={styles.attentionLabel}
                    >
                      {token.token}
                    </div>
                  ))}
                </div>

                <div className={styles.attentionRows}>
                  {attentionMap.length > 0 && (
                    <>
                      <div className={styles.attentionRowLabel}>
                        {tokens[selectedTokenIndex].token}
                      </div>
                      <div className={styles.attentionRow}>
                        {attentionMap[selectedTokenIndex].map((cell, idx) => (
                          <div
                            key={`att-${idx}`}
                            className={styles.attentionCell}
                            style={{
                              backgroundColor: getColor(cell.score),
                            }}
                          >
                            <span className={styles.attentionScore}>
                              {cell.score.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.attentionExplanation}>
                <p>
                  This row shows how much the token "
                  {tokens[selectedTokenIndex]?.token}" attends to each other
                  token in the sequence. Darker colors indicate stronger
                  attention.
                </p>
              </div>
            </div>

            <div className={styles.fullAttentionMap}>
              <button
                className={`btn ${styles.toggleButton}`}
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </button>

              <h4>Full Attention Heatmap</h4>
              <div className={styles.heatmapContainer}>
                <div className={styles.heatmapCorner}></div>
                <div className={styles.heatmapColumnHeaders}>
                  {tokens.map((token, index) => (
                    <div key={`col-${index}`} className={styles.heatmapHeader}>
                      {token.token}
                    </div>
                  ))}
                </div>
                <div className={styles.heatmapRowHeaders}>
                  {tokens.map((token, index) => (
                    <div key={`row-${index}`} className={styles.heatmapHeader}>
                      {token.token}
                    </div>
                  ))}
                </div>
                <div className={styles.heatmap}>
                  {attentionMap.map((row, i) => (
                    <div key={`row-${i}`} className={styles.heatmapRow}>
                      {row.map((cell, j) => (
                        <div
                          key={`cell-${i}-${j}`}
                          className={`${styles.heatmapCell} ${
                            i === selectedTokenIndex ? styles.selectedRow : ""
                          } ${
                            j === selectedTokenIndex
                              ? styles.selectedColumn
                              : ""
                          }`}
                          style={{
                            backgroundColor: getColor(cell.score),
                          }}
                          title={`From "${cell.fromToken.token}" to "${
                            cell.toToken.token
                          }": ${cell.score.toFixed(2)}`}
                        >
                          <span className={styles.heatmapValue}>
                            {cell.score.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {showExplanation && (
          <>
            <div className="attention-explanation example">
              <h4>What Are Attention Maps?</h4>
              <p>An attention map is a grid where:</p>
              <ul>
                <li>Each row represents a token in your sequence</li>
                <li>Each column also represents a token</li>
                <li>
                  The value at position (row, column) shows how much the row
                  token "pays attention to" the column token
                </li>
              </ul>
              <p>Darker colors indicate stronger attention weights.</p>
            </div>

            <div className="attention-patterns example">
              <h4>Common Patterns</h4>
              <p>Attention maps often reveal interesting patterns:</p>
              <ul>
                <li>
                  <strong>Diagonal lines</strong>: Tokens paying attention to
                  themselves
                </li>
                <li>
                  <strong>Vertical stripes</strong>: Important tokens that many
                  others pay attention to
                </li>
                <li>
                  <strong>Connections between related words</strong>: Like
                  subjects and verbs, or pronouns and their referents
                </li>
              </ul>
            </div>

            <div className="attention-example example">
              <h4>Example: "The dog chased its tail"</h4>
              <p>In this sentence:</p>
              <ul>
                <li>
                  "its" would strongly attend to "dog" (showing the connection)
                </li>
                <li>
                  "chased" might attend to both "dog" (subject) and "tail"
                  (object)
                </li>
                <li>Each token also attends somewhat to itself</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttentionMaps;
