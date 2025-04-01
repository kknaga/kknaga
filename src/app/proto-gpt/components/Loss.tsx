"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./PredictionsLoss.module.scss";

const PredictionsLoss = () => {
  const [userInput, setUserInput] = useState("The cat sat on the");
  const [targetWord, setTargetWord] = useState("mat");
  const [predictions, setPredictions] = useState([
    { token: "mat", probability: 0.45, color: "#8C6E54" },
    { token: "chair", probability: 0.3, color: "#A3876F" },
    { token: "floor", probability: 0.15, color: "#B9A18A" },
    { token: "table", probability: 0.08, color: "#D0BCA6" },
    { token: "dog", probability: 0.02, color: "#E6D7C1" },
  ]);
  const [loss, setLoss] = useState(0);
  const [lossHistory, setLossHistory] = useState([
    { iteration: 1, loss: 2.3 },
    { iteration: 2, loss: 1.9 },
    { iteration: 3, loss: 1.5 },
    { iteration: 4, loss: 1.2 },
    { iteration: 5, loss: 0.9 },
    { iteration: 6, loss: 0.7 },
    { iteration: 7, loss: 0.6 },
    { iteration: 8, loss: 0.5 },
    { iteration: 9, loss: 0.5 },
    { iteration: 10, loss: 0.4 },
  ]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [presetExamples] = useState([
    { context: "The cat sat on the", target: "mat", set: "common" },
    { context: "I need to go to the", target: "store", set: "common" },
    { context: "The stars shine in the night", target: "sky", set: "common" },
    {
      context: "The bank account has a low",
      target: "balance",
      set: "financial",
    },
    {
      context: "The river bank was covered with",
      target: "reeds",
      set: "nature",
    },
  ]);
  const [iteration, setIteration] = useState(1);

  const calculateLoss = useCallback(
    (correctToken) => {
      const correctTokenPrediction = predictions.find(
        (p) => p.token === correctToken
      );
      if (!correctTokenPrediction) return -Math.log(0.01);

      return -Math.log(correctTokenPrediction.probability);
    },
    [predictions]
  );

  const generatePredictions = useCallback(
    (context, correctToken) => {
      const newPredictions = [];
      let remainingProbability = 1;

      setIsRevealed(false);

      const correctTokenProbability = Math.min(0.1 + iteration * 0.035, 0.45);
      remainingProbability -= correctTokenProbability;

      newPredictions.push({
        token: correctToken,
        probability: correctTokenProbability,
        color: "#8C6E54",
      });

      let possibleWords = [];
      if (context.includes("cat") && context.includes("sat")) {
        possibleWords = [
          "chair",
          "floor",
          "table",
          "rug",
          "couch",
          "bench",
          "sofa",
        ];
      } else if (context.includes("go to the")) {
        possibleWords = [
          "store",
          "market",
          "mall",
          "shop",
          "bank",
          "office",
          "park",
        ];
      } else if (context.includes("night")) {
        possibleWords = [
          "sky",
          "time",
          "air",
          "breeze",
          "darkness",
          "stars",
          "moon",
        ];
      } else if (context.includes("bank account")) {
        possibleWords = [
          "balance",
          "number",
          "interest",
          "fee",
          "deposit",
          "withdrawal",
          "statement",
        ];
      } else if (context.includes("river bank")) {
        possibleWords = [
          "reeds",
          "mud",
          "sand",
          "grass",
          "rocks",
          "trees",
          "soil",
        ];
      } else {
        possibleWords = [
          "time",
          "place",
          "thing",
          "person",
          "way",
          "day",
          "world",
        ];
      }

      possibleWords = possibleWords.filter((word) => word !== correctToken);

      const selectedTokens = [];
      for (let i = 0; i < 4 && possibleWords.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleWords.length);
        selectedTokens.push(possibleWords[randomIndex]);
        possibleWords.splice(randomIndex, 1);
      }

      const colors = ["#A3876F", "#B9A18A", "#D0BCA6", "#E6D7C1"];
      selectedTokens.forEach((token, index) => {
        const tokenProb =
          (remainingProbability * 0.5 ** index) /
          (1 - 0.5 ** selectedTokens.length);
        newPredictions.push({
          token,
          probability: tokenProb,
          color: colors[index],
        });
        remainingProbability -= tokenProb;
      });

      newPredictions.sort((a, b) => b.probability - a.probability);

      setPredictions(newPredictions);

      const newLoss = -Math.log(
        newPredictions.find((p) => p.token === correctToken).probability
      );
      setLoss(newLoss);

      return newPredictions;
    },
    [iteration]
  );

  const selectExample = (example: any) => {
    setUserInput(example.context);
    setTargetWord(example.target);
    setIsRevealed(false);
    setIteration(1);

    const newLossHistory = Array(10).map((_, i) => ({
      iteration: i + 1,
      loss: 2.5 * Math.exp(-0.2 * i) + 0.4,
    }));
    setLossHistory(newLossHistory);

    generatePredictions(example.context, example.target);
  };

  const revealTarget = () => {
    setIsRevealed(true);
    const newLoss = calculateLoss(targetWord);
    setLoss(newLoss);
  };

  const nextIteration = () => {
    if (iteration < 10) {
      const nextIter = iteration + 1;
      setIteration(nextIter);
      generatePredictions(userInput, targetWord);
    }
  };

  useEffect(() => {
    generatePredictions(userInput, targetWord);
  }, [generatePredictions, userInput, targetWord]);

  return (
    <div className="content-section">
      <p>
        To improve, language models need a way to measure how wrong they are.
        This is where prediction and loss calculations come in.
      </p>

      <div className="prediction-explanation">
        <h4>How Prediction Works</h4>
        <p>For each position in a sequence, the model:</p>
        <ol>
          <li>Processes all previous tokens</li>
          <li>
            Outputs a probability distribution across all possible next tokens
          </li>
          <li>The highest probability token is the model's prediction</li>
        </ol>
      </div>

      <div className="loss-explanation">
        <h4>What is Loss?</h4>
        <p>
          Loss is a measure of prediction error. In language models, we
          typically use:
        </p>
        <ul>
          <li>
            <strong>Cross-entropy loss</strong>: Measures the difference between
            predicted probabilities and the actual correct answer
          </li>
          <li>
            <strong>Lower loss = better predictions</strong>: A perfect
            prediction has zero loss
          </li>
        </ul>
      </div>

      <div className="example">
        <h4>Interactive Example</h4>
        <p>
          Try seeing how the model predicts the next word and calculates loss.
        </p>

        <div className="token-selector" style={{ marginBottom: "16px" }}>
          <p>Choose an example:</p>
          <div className={styles.exampleSelector}>
            {presetExamples.map((example, index) => (
              <button
                key={index}
                className={`btn ${styles.exampleButton}`}
                onClick={() => selectExample(example)}
              >
                {example.context} ___
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.flexRow}>
            <div className={styles.column}>
              <p style={{ marginBottom: "8px" }}>
                <strong>Context:</strong>
              </p>
              <div className={styles.contextBox}>{userInput}</div>
            </div>

            <div className={styles.column}>
              <p style={{ marginBottom: "8px" }}>
                <strong>Target word:</strong>
              </p>
              <div
                className={`${styles.targetBox} ${
                  isRevealed ? styles.revealed : styles.hidden
                }`}
              >
                {isRevealed ? targetWord : "?"}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <p style={{ marginBottom: "8px" }}>
              <strong>Model predictions (iteration {iteration}/10):</strong>
            </p>
            <div
              style={{
                backgroundColor: "#fdefc8",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className={`${styles.tokenRow} ${
                    prediction.token === targetWord && isRevealed
                      ? styles.highlighted
                      : ""
                  }`}
                >
                  <div className={styles.tokenLabel}>{prediction.token}</div>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.predictionBar}
                      style={{
                        backgroundColor: prediction.color,
                        height: "24px",
                        width: `${prediction.probability * 100}%`,
                      }}
                    />
                  </div>
                  <div className={styles.tokenProbability}>
                    {(prediction.probability * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <p style={{ marginBottom: "8px" }}>
              <strong>Cross-entropy loss:</strong>
            </p>
            <div
              style={{
                backgroundColor: "#fdefc8",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className={styles.lossFormula}>
                <code>Loss = -log(P(correct token))</code>
              </div>
              <div
                className={`${styles.lossValue} ${
                  isRevealed ? styles.revealed : styles.hidden
                }`}
              >
                {isRevealed ? loss.toFixed(3) : "?"}
              </div>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button
              className="btn"
              onClick={revealTarget}
              disabled={isRevealed}
            >
              Reveal Target
            </button>
            <button
              className="btn"
              onClick={nextIteration}
              disabled={!isRevealed || iteration >= 10}
            >
              Next Iteration →
            </button>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h4>Loss Over Training Iterations</h4>
          <p>Watch how the loss decreases as the model learns:</p>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lossHistory.slice(0, iteration)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="iteration"
                  label={{
                    value: "Training Iteration",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{ value: "Loss", angle: -90, position: "insideLeft" }}
                  domain={[0, 2.5]}
                />
                <Tooltip
                  formatter={(value) => [value.toFixed(3), "Loss"]}
                  labelFormatter={(value) => `Iteration ${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#8C6E54"
                  strokeWidth={2}
                  dot={{ fill: "#8C6E54", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="loss-example">
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
          This creates two completely different prediction patterns for the same
          word, capturing its different meanings in context.
        </p>
      </div>

      <div className="loss-trends">
        <h4>Training Progress</h4>
        <p>During training:</p>
        <ul>
          <li>Loss typically starts high (many wrong predictions)</li>
          <li>Gradually decreases as the model learns patterns</li>
          <li>Eventually plateaus when the model reaches its capacity</li>
          <li>
            Too low a loss can indicate overfitting (memorizing instead of
            learning)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PredictionsLoss;
