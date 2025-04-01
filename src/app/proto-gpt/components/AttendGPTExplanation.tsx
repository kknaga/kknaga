"use client";
import React from "react";

const AttendGPTExplanation: React.FC = () => {
  return (
    <div className="content-section">
      <p>
        AttendGPT introduces self-attention, allowing the model to consider
        relationships between words when responding. This is a major step toward
        more coherent outputs.
      </p>

      <div className="attend-explanation">
        <h4>How AttendGPT Works</h4>
        <p>
          While BetaGPT could only look at individual tokens in isolation,
          AttendGPT:
        </p>
        <ol>
          <li>Processes the entire input sequence at once</li>
          <li>Calculates attention between all pairs of tokens</li>
          <li>Creates context-aware representations</li>
          <li>Uses these to generate more coherent responses</li>
        </ol>
      </div>

      <div className="attend-abilities">
        <h4>What AttendGPT Can Do</h4>
        <p>With self-attention, the model can now:</p>
        <ul>
          <li>Understand pronouns (knowing what "it" refers to)</li>
          <li>Maintain subject-verb agreement</li>
          <li>Complete phrases consistently</li>
          <li>Recognize basic patterns in language</li>
        </ul>
        <p>
          While still simple compared to full-scale language models, AttendGPT
          demonstrates the power of attention mechanisms.
        </p>
      </div>

      <div className="attend-limitations">
        <h4>Limitations</h4>
        <p>AttendGPT still has significant limitations:</p>
        <ul>
          <li>No deep understanding of concepts</li>
          <li>Limited memory for long contexts</li>
          <li>No knowledge beyond its training data</li>
          <li>Single-layer attention (vs. many layers in real models)</li>
        </ul>
      </div>

      <div className="attention-how-to">
        <h4>How to Use the Demo</h4>
        <p>
          Type a message in the input box and send it to AttendGPT. The model
          will:
        </p>
        <ul>
          <li>Process your input by breaking it into tokens</li>
          <li>
            Display an attention visualization showing how words relate to each
            other
          </li>
          <li>Generate a response influenced by these attention patterns</li>
        </ul>
        <p>
          The visualization includes a heatmap where brighter colors represent
          stronger connections between tokens. Watch how different words pay
          attention to each other!
        </p>
      </div>
    </div>
  );
};

export default AttendGPTExplanation;
