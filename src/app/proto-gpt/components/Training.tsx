"use client";
import React, { useState, useEffect, useRef } from "react";

const TrainingLoopVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [iteration, setIteration] = useState(1);
  const [lossHistory] = useState([
    0.95, 0.82, 0.74, 0.67, 0.61, 0.56, 0.52, 0.49, 0.47, 0.45,
  ]);
  const [prediction, setPrediction] = useState({
    mat: 0.2,
    chair: 0.6,
    floor: 0.15,
    table: 0.05,
  });
  const [weights, setWeights] = useState({
    "cat-mat": 0.3,
    "sat-mat": 0.25,
    "on-mat": 0.2,
    "the-mat": 0.15,
  });

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const maxSteps = 4;

  const context = "The cat sat on the";
  const target = "mat";

  const currentLoss =
    lossHistory[Math.min(iteration - 1, lossHistory.length - 1)];

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps - 1) {
            setIteration((iter) => Math.min(iter + 1, 10));
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    const progress = Math.min((iteration - 1) / 9, 1);
    setPrediction({
      mat: 0.2 + progress * 0.6,
      chair: 0.6 - progress * 0.4,
      floor: 0.15 - progress * 0.1,
      table: 0.05 - progress * 0.02,
    });

    setWeights({
      "cat-mat": 0.3 + progress * 0.4,
      "sat-mat": 0.25 + progress * 0.35,
      "on-mat": 0.2 + progress * 0.3,
      "the-mat": 0.15 + progress * 0.25,
    });
  }, [iteration]);

  const getActiveClass = (stepIndex: number) =>
    currentStep === stepIndex ? "active-step" : "";

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setIsAutoPlaying(false);
  };

  const nextIteration = () => {
    if (iteration < 10) {
      setIteration(iteration + 1);
      setCurrentStep(0);
    }
  };

  const prevIteration = () => {
    if (iteration > 1) {
      setIteration(iteration - 1);
      setCurrentStep(0);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const resetDemo = () => {
    setIteration(1);
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  const renderPredictionBars = () => {
    return Object.entries(prediction).map(([token, prob]) => (
      <div key={token} className="prediction-bar-container">
        <div className="prediction-label">
          <span className="token-text">{token}</span>
          <span className="prob-text">{Math.round(prob * 100)}%</span>
        </div>
        <div className="prediction-bar-bg">
          <div
            className={`prediction-bar ${
              token === target ? "target-token" : ""
            }`}
            style={{ width: `${prob * 100}%` }}
          ></div>
        </div>
      </div>
    ));
  };

  const renderWeightConnections = () => {
    return Object.entries(weights).map(([connection, weight]) => {
      const [from, to] = connection.split("-");
      return (
        <div key={connection} className="weight-connection">
          <div className="connection-tokens">
            <span className="token-pill">{from}</span>
            <span className="connection-arrow">→</span>
            <span className="token-pill target-token">{to}</span>
          </div>
          <div className="weight-bar-bg">
            <div
              className="weight-bar"
              style={{ width: `${weight * 100}%` }}
            ></div>
          </div>
          <div className="weight-value">{weight.toFixed(2)}</div>
        </div>
      );
    });
  };

  const renderLossGraph = () => {
    const maxLoss = Math.max(...lossHistory);
    const graphHeight = 150;

    return (
      <div className="loss-graph">
        <div className="graph-y-axis">
          <div className="y-label">Loss</div>
          <div className="y-ticks">
            <div className="y-tick">1.0</div>
            <div className="y-tick">0.5</div>
            <div className="y-tick">0.0</div>
          </div>
        </div>
        <div className="graph-content">
          {lossHistory.map((loss, i) => (
            <div
              key={i}
              className={`graph-bar ${i < iteration ? "graph-bar-filled" : ""}`}
              style={{
                height: `${(loss / maxLoss) * graphHeight}px`,
              }}
            >
              {i < iteration && <div className="graph-point"></div>}
              {i === iteration - 1 && (
                <div className="current-loss">{loss.toFixed(2)}</div>
              )}
            </div>
          ))}
        </div>
        <div className="graph-x-axis">
          <div className="x-label">Training Iterations</div>
          <div className="x-ticks">
            {[1, 5, 10].map((tick) => (
              <div key={tick} className="x-tick">
                {tick}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="training-loop-visualization">
      <div className="training-intro">
        <p>
          Language models learn through a process of trial, error, and
          adjustment. The training loop is the heart of how these models
          improve.
        </p>
      </div>

      <div className="training-controls">
        <div className="iteration-display">
          <span>Iteration: {iteration}/10</span>
          <span className="loss-display">
            Current Loss: {currentLoss.toFixed(2)}
          </span>
        </div>
        <div className="iteration-controls">
          <button
            className="btn control-btn"
            onClick={prevIteration}
            disabled={iteration <= 1}
          >
            ← Prev Iteration
          </button>
          <button className="btn control-btn" onClick={resetDemo}>
            Reset
          </button>
          <button className="btn control-btn" onClick={toggleAutoPlay}>
            {isAutoPlaying ? "Pause" : "Auto Play"}
          </button>
          <button
            className="btn control-btn"
            onClick={nextIteration}
            disabled={iteration >= 10}
          >
            Next Iteration →
          </button>
        </div>
      </div>

      <div className="training-process-nav">
        <button
          className={`process-nav-btn ${getActiveClass(0)}`}
          onClick={() => goToStep(0)}
        >
          1. Forward Pass
        </button>
        <button
          className={`process-nav-btn ${getActiveClass(1)}`}
          onClick={() => goToStep(1)}
        >
          2. Loss Calculation
        </button>
        <button
          className={`process-nav-btn ${getActiveClass(2)}`}
          onClick={() => goToStep(2)}
        >
          3. Backward Pass
        </button>
        <button
          className={`process-nav-btn ${getActiveClass(3)}`}
          onClick={() => goToStep(3)}
        >
          4. Weight Update
        </button>
      </div>

      <div className="training-visualization">
        <div className="training-phase">
          {currentStep === 0 && (
            <div className="forward-pass phase-content">
              <h4>Forward Pass</h4>
              <div className="phase-description">
                <p>
                  The model processes the input sequence and predicts the next
                  token based on current weights.
                </p>
                <div className="input-context">
                  <div className="context-label">Input:</div>
                  <div className="context-tokens">
                    {context.split(" ").map((word, i) => (
                      <span key={i} className="token-pill">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="prediction-section">
                  <h5>Token Probabilities:</h5>
                  <div className="prediction-bars">
                    {renderPredictionBars()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="loss-calculation phase-content">
              <h4>Loss Calculation</h4>
              <div className="phase-description">
                <p>
                  The model compares its prediction with the actual correct
                  token ("mat") and calculates the error.
                </p>
                <div className="target-section">
                  <div className="actual-target">
                    <div className="target-label">Actual next word:</div>
                    <div className="token-pill target-token">{target}</div>
                  </div>
                  <div className="target-explanation">
                    <p>The correct probability distribution should be:</p>
                    <div className="ideal-distribution">
                      <div className="ideal-token">
                        <span className="token-text">{target}:</span>
                        <span className="token-prob">100%</span>
                      </div>
                      <div className="ideal-token">
                        <span className="token-text">other tokens:</span>
                        <span className="token-prob">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="loss-explanation">
                  <h5>Cross-Entropy Loss: {currentLoss.toFixed(4)}</h5>
                  <p>
                    Lower loss means better predictions. The loss is high when
                    the model assigns low probability to the correct token.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="backward-pass phase-content">
              <h4>Backward Pass</h4>
              <div className="phase-description">
                <p>
                  The model determines which weights contributed to the error
                  and calculates how they should change.
                </p>
                <div className="gradient-flow">
                  <h5>Gradient Flow</h5>
                  <p>The error signal flows backward through the network:</p>
                  <div className="flow-diagram">
                    <div className="flow-node error-node">Error Signal</div>
                    <div className="flow-arrow">↓</div>
                    <div className="flow-node">Output Layer</div>
                    <div className="flow-arrow">↓</div>
                    <div className="flow-node">Hidden Layers</div>
                    <div className="flow-arrow">↓</div>
                    <div className="flow-node">Token Embeddings</div>
                  </div>
                </div>
                <div className="gradient-explanation">
                  <p>
                    For each weight, the model calculates how a small change
                    would affect the loss. This creates a gradient - a direction
                    for improvement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="weight-update phase-content">
              <h4>Weight Update</h4>
              <div className="phase-description">
                <p>
                  The model adjusts its weights to reduce the error in future
                  predictions.
                </p>
                <div className="weight-section">
                  <h5>Connection Strengths:</h5>
                  <div className="weight-connections">
                    {renderWeightConnections()}
                  </div>
                  <div className="update-explanation">
                    <p>
                      Connections that predict "{target}" correctly are
                      strengthened. With each iteration, the model gets better
                      at predicting the right token.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="training-progress">
          <h4>Training Progress</h4>
          <div className="loss-over-time">{renderLossGraph()}</div>
          <div className="progress-explanation">
            <p>
              As training progresses, the loss decreases, indicating the model
              is learning the patterns in the data.
            </p>
          </div>
        </div>
      </div>

      <div className="training-phases-explanation">
        <div className="training-steps">
          <h4>The Training Loop</h4>
          <ol>
            <li>
              <strong>Forward Pass</strong>: The model makes its best guess at
              predicting the next token based on current knowledge
            </li>
            <li>
              <strong>Loss Calculation</strong>: We measure how wrong the model
              was (the "loss")
            </li>
            <li>
              <strong>Backward Pass</strong>: We calculate how each part of the
              model contributed to the error
            </li>
            <li>
              <strong>Weight Update</strong>: We adjust the model's parameters
              slightly to reduce future errors
            </li>
          </ol>
        </div>

        <div className="training-example">
          <h4>Simple Example</h4>
          <p>If training on the phrase "The cat sat on the mat":</p>
          <ol>
            <li>
              Given "The cat sat on the", the model might predict "chair" with
              60% confidence
            </li>
            <li>The correct answer was "mat", so we calculate the error</li>
            <li>We trace back to see which weights led to this mistake</li>
            <li>
              We adjust those weights so "mat" becomes more likely in this
              context next time
            </li>
          </ol>
        </div>

        <div className="training-scale">
          <h4>The Scale of Training</h4>
          <p>Real language models:</p>
          <ul>
            <li>Train on billions or trillions of tokens</li>
            <li>Repeat this process for days or weeks on powerful computers</li>
            <li>Use advanced optimization techniques to learn efficiently</li>
            <li>
              Gradually improve until they can generate coherent, relevant text
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingLoopVisualization;
