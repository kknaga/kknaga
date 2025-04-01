"use client";
import React from "react";
import "./TokenPredictionVisualizer.scss";

interface TokenPrediction {
  token: string;
  score: number;
}

interface TokenPredictionVisualizerProps {
  predictions: TokenPrediction[];
  selectedToken?: string;
}

const TokenPredictionVisualizer: React.FC<TokenPredictionVisualizerProps> = ({
  predictions,
  selectedToken,
}) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="token-prediction-visualizer empty">
        <h3>Token Prediction Visualizer</h3>
        <p>No prediction data available yet.</p>
      </div>
    );
  }

  const sortedPredictions = [...predictions].sort((a, b) => b.score - a.score);

  const maxScore = Math.max(...sortedPredictions.map((p) => p.score));

  const normalizedPredictions = sortedPredictions.map((prediction) => ({
    ...prediction,
    normalizedScore: prediction.score / maxScore,
  }));

  return (
    <div className="token-prediction-visualizer">
      <h3>Next Token Prediction</h3>

      <div className="predictions-explanation">
        <p>
          This visualization shows the most likely next tokens based on the
          current context. Each token's probability is influenced by the
          attention patterns shown above.
        </p>
      </div>

      <div className="predictions-container">
        {normalizedPredictions.slice(0, 8).map((prediction, index) => (
          <div
            key={`prediction-${index}`}
            className={`prediction-item ${
              prediction.token === selectedToken ? "selected" : ""
            }`}
          >
            <div className="prediction-token">{prediction.token}</div>
            <div className="prediction-bar-container">
              <div
                className="prediction-bar"
                style={{ width: `${prediction.normalizedScore * 100}%` }}
              ></div>
            </div>
            <div className="prediction-score">
              {(prediction.normalizedScore * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

      <div className="token-selection-explanation">
        {selectedToken ? (
          <p>
            The token <strong>"{selectedToken}"</strong> was selected as the
            next token in the sequence. In a real model, the selection would use
            sampling with temperature to add creativity.
          </p>
        ) : (
          <p>
            The next token will be selected from these candidates, with higher
            probability tokens more likely to be chosen. Some randomness is
            applied to increase diversity in the output.
          </p>
        )}
      </div>

      <div className="model-comparison">
        <h4>Comparison with Simpler Models</h4>
        <div className="comparison-grid">
          <div className="comparison-item">
            <h5>BarelyGPT</h5>
            <p>Completely random token selection with no context awareness.</p>
          </div>
          <div className="comparison-item">
            <h5>BetaGPT</h5>
            <p>
              Uses token embeddings to find related tokens, but has limited
              context understanding.
            </p>
          </div>
          <div className="comparison-item">
            <h5>AttendGPT</h5>
            <p>
              Uses attention to weigh the importance of all previous tokens,
              creating more coherent predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPredictionVisualizer;
