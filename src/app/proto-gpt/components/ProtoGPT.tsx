"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

const predictions = [
  {
    word: "predicting",
    score: 0.91,
    next: [
      {
        word: "the",
        score: 0.85,
        next: [
          {
            word: "next",
            score: 0.88,
            next: [
              {
                word: "word",
                score: 0.92,
                next: [
                  {
                    word: "in",
                    score: 0.94,
                    next: [
                      {
                        word: "a",
                        score: 0.89,
                        next: [
                          {
                            word: "sequence",
                            score: 0.87,
                            next: [],
                          },
                          {
                            word: "conversation",
                            score: 0.76,
                            next: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                word: "response",
                score: 0.75,
                next: [
                  {
                    word: "based",
                    score: 0.92,
                    next: [
                      {
                        word: "on",
                        score: 0.97,
                        next: [
                          {
                            word: "patterns",
                            score: 0.82,
                            next: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    word: "using",
    score: 0.87,
    next: [
      {
        word: "artificial",
        score: 0.93,
        next: [
          {
            word: "intelligence",
            score: 0.96,
            next: [
              {
                word: "algorithms",
                score: 0.85,
                next: [],
              },
              {
                word: "models",
                score: 0.79,
                next: [],
              },
            ],
          },
          {
            word: "flavors",
            score: 0.02,
            next: [],
          },
        ],
      },
      {
        word: "machine",
        score: 0.88,
        next: [
          {
            word: "learning",
            score: 0.95,
            next: [
              {
                word: "techniques",
                score: 0.86,
                next: [],
              },
            ],
          },
          {
            word: "telepathy",
            score: 0.04,
            next: [],
          },
        ],
      },
    ],
  },
  {
    word: "analyzing",
    score: 0.74,
    next: [
      {
        word: "user",
        score: 0.91,
        next: [
          {
            word: "input",
            score: 0.93,
            next: [
              {
                word: "and",
                score: 0.89,
                next: [
                  {
                    word: "generating",
                    score: 0.86,
                    next: [
                      {
                        word: "responses",
                        score: 0.91,
                        next: [],
                      },
                      {
                        word: "confusion",
                        score: 0.12,
                        next: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            word: "dreams",
            score: 0.07,
            next: [],
          },
        ],
      },
    ],
  },
  {
    word: "processing",
    score: 0.68,
    next: [
      {
        word: "natural",
        score: 0.94,
        next: [
          {
            word: "language",
            score: 0.97,
            next: [
              {
                word: "patterns",
                score: 0.85,
                next: [],
              },
            ],
          },
          {
            word: "ingredients",
            score: 0.04,
            next: [],
          },
        ],
      },
    ],
  },
];

type Prediction = {
  word: string;
  score: number;
  next: Prediction[];
};

export default function ProtoGPT() {
  const [currentPredictions, setCurrentPredictions] =
    useState<Prediction[]>(predictions);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isSource, setIsSource] = useState<boolean>(false);

  const predict = useCallback(() => {
    const possiblePredictions = currentPredictions.filter(
      (prediction) => prediction.score > 0.5
    );
    const selectedPrediction =
      possiblePredictions[
        Math.floor(Math.random() * possiblePredictions.length)
      ];

    setCurrentPredictions(selectedPrediction.next);
    setSelectedWords((prev) => prev.concat(selectedPrediction.word));
  }, [currentPredictions]);

  const reset = useCallback(() => {
    setCurrentPredictions(predictions);
    setSelectedWords([]);
  }, []);

  return (
    <div className="container">
      <p>
        Chat bots such as ChatGPT and Gemini work by guessing what the next word
        in a sequence might be, and picking one of the words with a high
        liklihood of coming next.
      </p>

      <div className="end">
        <button
          className="btn"
          disabled={selectedWords.length === 0}
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="btn"
          disabled={currentPredictions.length === 0}
          onClick={predict}
        >
          Predict
        </button>
      </div>
      <div className="example">
        <h2>
          Chat bots work by{" "}
          <strong>
            {selectedWords.join(" ")}
            {currentPredictions.length > 0 && " _____"}
          </strong>
        </h2>
        {currentPredictions.length > 0 && (
          <ul>
            {currentPredictions.map((prediction) => (
              <li key={prediction.word}>
                {prediction.word} ({prediction.score})
              </li>
            ))}
          </ul>
        )}
      </div>

      <p>
        They don&apos;t see the conversation between them and users as a chat
        but rather as a chat log with descriptions of each side&apos;s role and
        they complete that.
      </p>

      <div className="end">
        <button className="btn" onClick={() => setIsSource((prev) => !prev)}>
          {isSource ? "Switch to chat" : "Switch to source"}
        </button>
      </div>
      <div className="example">
        {isSource ? (
          <div className="source">
            <p>
              System: You are an assistant explaining the ProtoGPT tool. Be
              informative and encouraging.
            </p>

            <p>User: What is ProtoGPT?</p>

            <p>
              Assistant: It&apos;s a tool designed to help you understand how AI
              chat assistants work internally.
            </p>

            <p>User: How does it do that?</p>

            <p>
              Assistant: By guiding you through simplified versions of bots,
              starting from random responses up to basic attention mechanisms.
            </p>
          </div>
        ) : (
          <div className="chat">
            <p>What is ProtoGPT?</p>
            <div>
              <Image src={"/1.png"} width={56} height={56} alt="" />
              <p>
                It&apos;s a tool designed to help you understand how AI chat
                assistants work internally.
              </p>
            </div>
            <p>How does it do that?</p>
            <div>
              <Image src={"/1.png"} width={56} height={56} alt="" />
              <p>
                By guiding you through simplified versions of bots, starting
                from random responses up to basic attention mechanisms.
              </p>
            </div>
          </div>
        )}
      </div>
      <p>
        We will go through each concept that large language models are built on,
        and every two concepts we will try to use what we have learned so far to
        build an AI chat bot to get why it needs all these parts to work
        properly and to have a little bit of interactivity.
      </p>
    </div>
  );
}
