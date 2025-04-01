/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import AttentionMaps from "./AttentionMaps";

const AttentionMapsIntegration: React.FC = () => {
  return (
    <div className="attention-integration-container">
      <h2>Understanding Attention Maps</h2>

      <p>
        One of the key innovations in transformer models is the attention
        mechanism. Attention maps visualize how different tokens in a sequence
        interact with each other.
      </p>

      <div className="example">
        <h4>Why Attention Matters</h4>
        <p>
          In natural language, context is everything. The meaning of a word
          depends on the words around it. For example, the word "bank" could
          refer to a financial institution or the side of a river, depending on
          context.
        </p>

        <p>
          Attention mechanisms allow tokens to "look at" other tokens when
          forming their representations, focusing more on relevant words and
          less on irrelevant ones.
        </p>
      </div>

      <div className="attention-visualization-wrapper">
        <AttentionMaps />
      </div>

      <div className="example">
        <h4>Attention in Transformers</h4>
        <p>
          In transformer architectures like those used in ChatGPT and other
          modern LLMs:
        </p>
        <ul>
          <li>Each token looks at every other token (including itself)</li>
          <li>
            Attention weights determine how much information to gather from each
            token
          </li>
          <li>These weights are learned during training, not hardcoded</li>
          <li>
            Multiple "attention heads" can focus on different linguistic
            patterns
          </li>
        </ul>
      </div>

      <div className="example">
        <h4>Multi-head Attention</h4>
        <p>
          Real transformer models use multiple attention heads, each
          specializing in different linguistic patterns. One head might focus on
          subject-verb relationships, while another tracks pronoun references.
        </p>
        <p>
          The visualization above shows a simplified single-head attention
          pattern. In practice, the combination of multiple heads creates even
          more sophisticated contextual understanding.
        </p>
      </div>

      <h4>How This Connects to Other Concepts</h4>
      <p>Attention maps build on several concepts we've explored:</p>
      <ul>
        <li>
          <strong>Tokenization</strong>: Words are broken into tokens before
          attention is applied
        </li>
        <li>
          <strong>Embeddings</strong>: Token vectors form the input to the
          attention mechanism
        </li>
        <li>
          <strong>Query, Key, Value</strong>: These three projections drive the
          attention process, with attention scores calculated between Query and
          Key vectors
        </li>
      </ul>
      <p>
        After attention is applied, the resulting contextual representations
        gain a deeper understanding of the relationships between tokens.
      </p>
    </div>
  );
};

export default AttentionMapsIntegration;
