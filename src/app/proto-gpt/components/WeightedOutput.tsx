"use client";
import React, { useState, useEffect } from "react";

const WeightedOutput = () => {
  const contexts = [
    {
      id: "money",
      name: "Financial Context",
      sentence: ["I", "deposited", "money", "in", "the", "bank"],
      targetIndex: 5,
      description:
        'In a financial context, "bank" is strongly connected to terms like "money" and "deposited".',
    },
    {
      id: "river",
      name: "Nature Context",
      sentence: ["I", "sat", "by", "the", "river", "bank"],
      targetIndex: 5,
      description:
        'In a nature context, "bank" is strongly connected to terms like "river" and "sat by".',
    },
    {
      id: "custom",
      name: "Custom Sentence",
      sentence: ["The", "cat", "sat", "on", "the", "mat"],
      targetIndex: 2,
      description: "Explore how tokens interact in this custom sentence.",
    },
  ];

  const [activeContext, setActiveContext] = useState(contexts[0]);
  const [customSentence, setCustomSentence] = useState(
    contexts[2].sentence.join(" ")
  );
  const [customTargetWord, setCustomTargetWord] = useState(
    contexts[2].sentence[contexts[2].targetIndex]
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [highlightConnections] = useState(true);

  useEffect(() => {
    if (activeContext.id === "custom") {
      const tokens = customSentence
        .split(/\s+/)
        .filter((token) => token.length > 0);
      let targetIndex = tokens.indexOf(customTargetWord);
      if (targetIndex === -1) targetIndex = 0;

      const updatedCustomContext = {
        ...contexts[2],
        sentence: tokens,
        targetIndex: targetIndex,
      };

      contexts[2] = updatedCustomContext;
    }
  }, [customSentence, customTargetWord, activeContext.id]);

  const generateVector = (token, contextType, index, sentenceTokens) => {
    const seed = token.charCodeAt(0) * 123 + contextType.charCodeAt(0);
    const contextInfluence = new Array(8).fill(0);

    sentenceTokens.forEach((contextToken, ctxIndex) => {
      if (ctxIndex !== index) {
        const influence = 1 / (Math.abs(ctxIndex - index) + 1);
        const contextSeed = contextToken.charCodeAt(0) * 57;

        for (let i = 0; i < 8; i++) {
          contextInfluence[i] +=
            Math.sin(contextSeed + i * 0.7) * influence * 0.3;
        }
      }
    });

    return Array(8)
      .fill(0)
      .map((_, i) => {
        const baseValue = Math.sin(seed + i * 0.7) * 0.6;
        return parseFloat((baseValue + contextInfluence[i]).toFixed(2));
      });
  };

  const calculateAttention = (queryIdx, keyIdx, sentenceTokens) => {
    const queryToken = sentenceTokens[queryIdx];
    const keyToken = sentenceTokens[keyIdx];

    const distance = Math.abs(queryIdx - keyIdx);
    let score = distance === 0 ? 0.9 : (1 / (distance + 1)) * 0.7;

    if (
      activeContext.id === "money" &&
      queryIdx === activeContext.targetIndex
    ) {
      if (keyToken === "money" || keyToken === "deposited") {
        score = Math.min(0.95, score + 0.3);
      }
    } else if (
      activeContext.id === "river" &&
      queryIdx === activeContext.targetIndex
    ) {
      if (keyToken === "river" || keyToken === "sat") {
        score = Math.min(0.95, score + 0.3);
      }
    } else {
      if (keyToken === "the" && ["cat", "mat"].includes(queryToken)) {
        score = Math.min(0.95, score + 0.15);
      }
      if (queryToken === "sat" && ["cat", "mat"].includes(keyToken)) {
        score = Math.min(0.95, score + 0.25);
      }
    }

    return parseFloat(score.toFixed(2));
  };

  const calculateWeightedOutput = (queryIdx, sentenceTokens) => {
    const attentionScores = sentenceTokens.map((_, keyIdx) =>
      calculateAttention(queryIdx, keyIdx, sentenceTokens)
    );

    const sum = attentionScores.reduce((acc, val) => acc + val, 0);
    const normalizedScores = attentionScores.map((score) => score / sum);

    const weightedOutput = Array(8).fill(0);

    sentenceTokens.forEach((token, keyIdx) => {
      const valueVector = generateVector(token, "v", keyIdx, sentenceTokens);
      const weight = normalizedScores[keyIdx];

      valueVector.forEach((val, i) => {
        weightedOutput[i] += val * weight;
      });
    });

    return weightedOutput.map((val) => parseFloat(val.toFixed(2)));
  };

  const getVectorColor = (value, type) => {
    const colors = {
      value: ["#fff3e0", "#e65100"],
      weighted: ["#e8f5e9", "#2e7d32"],
      attention: ["#f5f5f5", "#8C6E54"],
    };

    const absValue = Math.abs(value);
    const scale = absValue > 1 ? 1 : absValue;

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

  const handleCustomSentenceChange = (e) => {
    setCustomSentence(e.target.value);
  };

  const handleCustomTargetChange = (e) => {
    setCustomTargetWord(e.target.value);
  };

  const handleContextChange = (context) => {
    setActiveContext(context);
  };

  const tokens = activeContext.sentence;
  const targetIdx = activeContext.targetIndex;
  const targetToken = tokens[targetIdx];

  const valueVectors = tokens.map((token, idx) =>
    generateVector(token, "v", idx, tokens)
  );

  const attentionScores = tokens.map((_, keyIdx) =>
    calculateAttention(targetIdx, keyIdx, tokens)
  );

  const sum = attentionScores.reduce((acc, val) => acc + val, 0);
  const normalizedScores = attentionScores.map((score) => score / sum);

  const weightedOutput = calculateWeightedOutput(targetIdx, tokens);

  return (
    <div className="content-section">
      <p>
        Once a model calculates attention scores, it combines them with Value
        vectors to create context-aware representations for each token. This
        interactive component shows how a token's meaning changes based on its
        context through the attention mechanism.
      </p>

      <div className="example">
        <h4>Interactive Context Demonstration</h4>

        <div
          className="flex"
          style={{ justifyContent: "space-between", marginBottom: "16px" }}
        >
          <div>
            <h5>Select a Context:</h5>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {contexts.map((context) => (
                <button
                  key={context.id}
                  className="btn"
                  style={{
                    opacity: activeContext.id === context.id ? 1 : 0.7,
                    backgroundColor:
                      activeContext.id === context.id ? "#5A4636" : "#8C6E54",
                  }}
                  onClick={() => handleContextChange(context)}
                >
                  {context.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeContext.id === "custom" && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ marginBottom: "8px" }}>
              <label htmlFor="customSentence">Custom Sentence:</label>
              <input
                id="customSentence"
                type="text"
                value={customSentence}
                onChange={handleCustomSentenceChange}
                style={{ width: "100%", marginTop: "4px" }}
              />
            </div>
            <div>
              <label htmlFor="customTarget">Target Word:</label>
              <input
                id="customTarget"
                type="text"
                value={customTargetWord}
                onChange={handleCustomTargetChange}
                style={{ width: "120px", marginTop: "4px" }}
              />
            </div>
          </div>
        )}

        <div style={{ marginBottom: "24px" }}>
          <h5>Sentence Context:</h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              padding: "16px",
              backgroundColor: "#fef8e6",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          >
            {tokens.map((token, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 12px",
                  borderRadius: "16px",
                  backgroundColor: idx === targetIdx ? "#5A4636" : "#8C6E54",
                  color: "#F5F1E6",
                  fontWeight: idx === targetIdx ? "bold" : "normal",
                }}
              >
                {token}
              </div>
            ))}
          </div>
          <p style={{ marginTop: "8px", fontStyle: "italic" }}>
            {activeContext.description}
          </p>
        </div>

        <div>
          <h5>Attention Visualization:</h5>
          <div
            style={{
              backgroundColor: "#fef8e6",
              borderRadius: "8px",
              padding: "16px",
              marginTop: "8px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                How much "{targetToken}" attends to each token:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {tokens.map((token, idx) => (
                  <div
                    key={idx}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "80px",
                        fontWeight: idx === targetIdx ? "bold" : "normal",
                      }}
                    >
                      {token}:
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: "24px",
                        backgroundColor: "rgba(140, 110, 84, 0.1)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: `${attentionScores[idx] * 100}%`,
                          height: "100%",
                          backgroundColor: getVectorColor(
                            attentionScores[idx],
                            "attention"
                          ),
                          borderRadius: "12px",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "0",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        {attentionScores[idx].toFixed(2)} (
                        {(normalizedScores[idx] * 100).toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  Combining Value Vectors with Attention:
                </div>
                <button
                  className="btn"
                  style={{ padding: "4px 12px", fontSize: "14px" }}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide Details" : "Show Details"}
                </button>
              </div>

              {showAdvanced && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ marginBottom: "8px", fontStyle: "italic" }}>
                    Each token's Value vector (simplified to 8 dimensions):
                  </div>
                  {tokens.map((token, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                        opacity: highlightConnections
                          ? normalizedScores[idx] * 1.5 + 0.3
                          : 1,
                      }}
                    >
                      <div
                        style={{
                          width: "160px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: idx === targetIdx ? "bold" : "normal",
                          }}
                        >
                          {token}
                        </span>
                        {highlightConnections && (
                          <div
                            style={{
                              height: "8px",
                              width: "40px",
                              backgroundColor: "rgba(140, 110, 84, 0.1)",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${normalizedScores[idx] * 100}%`,
                                height: "100%",
                                backgroundColor: getVectorColor(
                                  normalizedScores[idx],
                                  "attention"
                                ),
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          gap: "2px",
                          height: "24px",
                        }}
                      >
                        {valueVectors[idx].map((value, vIdx) => (
                          <div
                            key={vIdx}
                            style={{
                              flex: 1,
                              backgroundColor: getVectorColor(
                                Math.abs(value),
                                "value"
                              ),
                              position: "relative",
                              borderRadius: "2px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                left: "1px",
                                right: "1px",
                                fontSize: "8px",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                              }}
                            >
                              {value.toFixed(1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  Weighted Sum (Final Output) for "{targetToken}":
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    backgroundColor: "rgba(140, 110, 84, 0.05)",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                      height: "32px",
                    }}
                  >
                    {weightedOutput.map((value, vIdx) => (
                      <div
                        key={vIdx}
                        style={{
                          flex: 1,
                          backgroundColor: getVectorColor(
                            Math.abs(value),
                            "weighted"
                          ),
                          borderRadius: "4px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: Math.abs(value) > 0.5 ? "#fff" : "#333",
                        }}
                      >
                        {value.toFixed(2)}
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: "8px", fontStyle: "italic" }}>
                    This is the context-aware representation of "{targetToken}"
                    after combining all the Value vectors with their attention
                    weights. Notice how it's different from a simple embedding
                    because it now incorporates information from relevant
                    context tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="weighted-explanation example">
        <h4>How Weighted Output Works</h4>
        <p>
          After calculating how much each token should attend to every other
          token:
        </p>
        <ol>
          <li>The model takes those attention scores (weights)</li>
          <li>Multiplies each Value vector by its corresponding weight</li>
          <li>Adds all these weighted Values together</li>
          <li>
            The result is a new representation that captures relevant context
          </li>
        </ol>
      </div>

      <div className="weighted-example example">
        <h4>Example: The word "bank"</h4>
        <p>Consider the word "bank" in two different sentences:</p>
        <ol>
          <li>"I deposited money in the bank"</li>
          <li>"I sat by the river bank"</li>
        </ol>
        <p>
          In the first sentence, "bank" would heavily attend to "money" and
          "deposited". In the second, it would attend to "river" and "sat".
        </p>
        <p>
          This creates two completely different weighted outputs for the same
          word, capturing its different meanings in context.
        </p>
      </div>

      <div className="multi-head example">
        <h4>Multi-Head Attention</h4>
        <p>
          Real transformers actually use multiple "attention heads" in parallel.
          Each head can focus on different types of relationships:
        </p>
        <ul>
          <li>One head might track subject-verb relationships</li>
          <li>Another could focus on adjective-noun pairs</li>
          <li>A third might capture broader thematic connections</li>
        </ul>
        <p>
          These multiple perspectives are combined for a richer understanding.
        </p>
      </div>
    </div>
  );
};

export default WeightedOutput;
