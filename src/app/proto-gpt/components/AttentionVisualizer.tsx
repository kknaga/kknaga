"use client";
import React, { useState } from "react";

import "./AttentionVisualizer.scss";

interface AttentionData {
  tokens: string[];
  attentionScores: number[][];
}

interface AttentionVisualizerProps {
  attentionData: AttentionData;
}

const AttentionVisualizer: React.FC<AttentionVisualizerProps> = ({
  attentionData,
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null);

  const getAttentionColor = (value: number) => {
    return `rgba(140, 110, 84, ${value.toFixed(2)})`;
  };

  const getTopConnections = (tokenIndex: number) => {
    if (
      !attentionData ||
      !attentionData.attentionScores ||
      tokenIndex === null
    ) {
      return [];
    }

    const row = attentionData.attentionScores[tokenIndex];
    return row
      .map((score, index) => ({
        tokenIndex: index,
        token: attentionData.tokens[index],
        score,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  if (
    !attentionData ||
    !attentionData.tokens ||
    attentionData.tokens.length === 0
  ) {
    return (
      <div className="attention-visualizer empty">
        <h3>Attention Visualizer</h3>
        <p>
          No attention data available yet. Generate a response to see the
          attention mechanism in action.
        </p>
      </div>
    );
  }

  const isLargeAttentionMap = attentionData.tokens.length > 20;
  const displayTokens = isLargeAttentionMap
    ? attentionData.tokens.slice(0, 20)
    : attentionData.tokens;

  const displayScores = isLargeAttentionMap
    ? attentionData.attentionScores.slice(0, 20).map((row) => row.slice(0, 20))
    : attentionData.attentionScores;

  return (
    <div className="attention-visualizer">
      <h3>Self-Attention Visualizer</h3>

      <div className="attention-explanation">
        <p>
          The heatmap below shows how each token (row) attends to other tokens
          (columns) in the sequence. Darker cells indicate stronger attention
          weights - where the model is "focusing" more.
        </p>
        <p>
          Click on any token to see its attention pattern or click on any cell
          to see the specific connection.
        </p>
        {isLargeAttentionMap && (
          <p className="warning">
            <strong>Note:</strong> Showing only the first 20 tokens for better
            visualization.
          </p>
        )}
      </div>

      <div className="attention-matrix">
        {/* Column headers - the tokens being attended to */}
        <div className="matrix-headers">
          <div className="corner-placeholder"></div>
          {displayTokens.map((token, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={`column-header ${
                selectedColIndex === colIndex ? "selected" : ""
              }`}
              onClick={() =>
                setSelectedColIndex(
                  colIndex === selectedColIndex ? null : colIndex
                )
              }
              title={token}
            >
              {token.length > 6 ? token.substring(0, 5) + "…" : token}
            </div>
          ))}
        </div>

        {/* Rows - each token attending to others */}
        <div className="matrix-rows">
          {displayScores.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="matrix-row">
              {/* Row header - the token doing the attending */}
              <div
                className={`row-header ${
                  selectedRowIndex === rowIndex ? "selected" : ""
                }`}
                onClick={() =>
                  setSelectedRowIndex(
                    rowIndex === selectedRowIndex ? null : rowIndex
                  )
                }
                title={displayTokens[rowIndex]}
              >
                {displayTokens[rowIndex].length > 8
                  ? displayTokens[rowIndex].substring(0, 7) + "…"
                  : displayTokens[rowIndex]}
              </div>

              {/* Attention scores */}
              {row.map((score, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`attention-cell ${
                    selectedRowIndex === rowIndex ||
                    selectedColIndex === colIndex
                      ? "highlighted"
                      : ""
                  }`}
                  style={{ backgroundColor: getAttentionColor(score) }}
                  onClick={() => {
                    setSelectedRowIndex(rowIndex);
                    setSelectedColIndex(colIndex);
                  }}
                  title={`${displayTokens[rowIndex]} → ${
                    displayTokens[colIndex]
                  }: ${(score * 100).toFixed(1)}%`}
                >
                  <span className="score-value">
                    {(score * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Details about selected attention connection */}
      {selectedRowIndex !== null && (
        <div className="attention-details">
          <h4>Attention Analysis</h4>

          <div className="selected-token">
            <strong>Selected token:</strong> "
            {attentionData.tokens[selectedRowIndex]}"
          </div>

          <div className="top-connections">
            <h5>Top Attention Connections</h5>
            <div className="connections-list">
              {getTopConnections(selectedRowIndex).map((connection, i) => (
                <div key={`connection-${i}`} className="connection-item">
                  <div className="connection-token">"{connection.token}"</div>
                  <div className="connection-bar-container">
                    <div
                      className="connection-bar"
                      style={{ width: `${connection.score * 100}%` }}
                    ></div>
                  </div>
                  <div className="connection-score">
                    {(connection.score * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedColIndex !== null && (
            <div className="specific-connection">
              <h5>Specific Connection</h5>
              <p>
                "{attentionData.tokens[selectedRowIndex]}" attends to "
                {attentionData.tokens[selectedColIndex]}" with a weight of{" "}
                {(
                  attentionData.attentionScores[selectedRowIndex][
                    selectedColIndex
                  ] * 100
                ).toFixed(1)}
                %
              </p>
              <p className="connection-explanation">
                This means when processing the token "
                {attentionData.tokens[selectedRowIndex]}", the model assigns{" "}
                {(
                  attentionData.attentionScores[selectedRowIndex][
                    selectedColIndex
                  ] * 100
                ).toFixed(1)}
                % of its attention to "{attentionData.tokens[selectedColIndex]}
                ".
              </p>
            </div>
          )}
        </div>
      )}

      <div className="technical-explanation">
        <h4>How Self-Attention Works</h4>
        <ol>
          <li>
            Each token is converted to three vectors: <strong>Query</strong>,{" "}
            <strong>Key</strong>, and <strong>Value</strong>
          </li>
          <li>
            The <strong>Query</strong> of each token is compared with the{" "}
            <strong>Keys</strong> of all tokens to produce attention scores
          </li>
          <li>
            Attention scores are normalized using softmax to create a
            probability distribution (weights must sum to 1)
          </li>
          <li>
            Each token's representation is updated by taking a weighted sum of
            all token <strong>Values</strong>, using the attention weights
          </li>
        </ol>
        <p>
          This mechanism allows tokens to "pay attention" to relevant parts of
          the input sequence, regardless of their position. This ability to
          capture long-range dependencies is what makes transformer models so
          powerful compared to earlier approaches.
        </p>
      </div>
    </div>
  );
};

export default AttentionVisualizer;
