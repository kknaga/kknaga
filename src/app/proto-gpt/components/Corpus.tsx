"use client";
import { useState, useMemo } from "react";
import "./Corpus.scss";

const Corpus = ({ defaultCorpus }: { defaultCorpus: string }) => {
  const [localCorpus, setLocalCorpus] = useState(defaultCorpus);
  const [activeTab, setActiveTab] = useState<"edit" | "visualize">("edit");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);

  const corpusStats = useMemo(() => {
    if (!localCorpus)
      return {
        words: 0,
        chars: 0,
        sentences: 0,
        paragraphs: 0,
        uniqueWords: 0,
      };

    const text = localCorpus;
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    const chars = text.length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    const uniqueWords = new Set(
      words.map((word) => word.toLowerCase().replace(/[^\w']/g, ""))
    ).size;

    return {
      words: words.length,
      chars,
      sentences,
      paragraphs,
      uniqueWords,
    };
  }, [localCorpus]);

  const wordFrequency = useMemo(() => {
    if (!localCorpus) return [];

    const words = localCorpus
      .toLowerCase()
      .replace(/[^\w\s']/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30);
  }, [localCorpus]);

  const handleUpdate = () => {
    setLocalCorpus(localCorpus);
  };

  const handleReset = () => {
    setLocalCorpus(defaultCorpus);
  };

  const handleHighlight = (word: string) => {
    if (highlightedWords.includes(word)) {
      setHighlightedWords(highlightedWords.filter((w) => w !== word));
    } else {
      setHighlightedWords([...highlightedWords, word]);
    }
  };

  const visualizedCorpus = useMemo(() => {
    if (!localCorpus || highlightedWords.length === 0) return localCorpus;

    const regex = new RegExp(`\\b(${highlightedWords.join("|")})\\b`, "gi");

    return localCorpus
      .split("\n")
      .map((paragraph, i) => {
        const highlightedParagraph = paragraph.replace(
          regex,
          (match) => `<span class="highlighted-word">${match}</span>`
        );

        return `<p key=${i}>${highlightedParagraph}</p>`;
      })
      .join("");
  }, [localCorpus, highlightedWords]);

  const filteredWords = useMemo(() => {
    if (!searchTerm) return wordFrequency;
    return wordFrequency.filter(([word]) =>
      word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [wordFrequency, searchTerm]);

  const corpusExamples = [
    {
      name: "Shakespeare",
      sample:
        "To be, or not to be, that is the question:\nWhether 'tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of troubles\nAnd by opposing end them.",
    },
    {
      name: "Technical",
      sample:
        "Machine learning is a branch of artificial intelligence that focuses on the use of data and algorithms to mimic human learning processes. It enables computers to improve their performance over time by continuously analyzing patterns in data.",
    },
    {
      name: "Simple",
      sample:
        "The cat sat on the mat. It was a sunny day. Birds flew in the sky. The dog played in the garden. Children laughed as they ran around the playground.",
    },
  ];

  return (
    <div className="content-section">
      <p>
        Language models learn from a <strong>corpus</strong> - a large
        collection of text that serves as training data. The quality and
        diversity of this corpus shapes what the model can understand and
        generate.
      </p>

      <div className="corpus-explanation example">
        <h4>What Is a Corpus?</h4>
        <p>
          A corpus (plural: corpora) is the foundational text used to train
          language models. It typically includes:
        </p>
        <ul>
          <li>Books, articles, and academic papers</li>
          <li>Websites and blog posts</li>
          <li>Conversations and dialogue</li>
          <li>Technical documentation</li>
          <li>Creative writing</li>
        </ul>
        <p>
          Large language models like GPT-4 are trained on corpora containing
          hundreds of billions of words from diverse sources. The corpus below
          is much smaller, but illustrates the concept.
        </p>
      </div>

      <div className="corpus-tabs">
        <button
          className={`corpus-tab ${activeTab === "edit" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Corpus
        </button>
        <button
          className={`corpus-tab ${
            activeTab === "visualize" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("visualize")}
        >
          Visualize
        </button>
      </div>

      {activeTab === "edit" ? (
        <div className="corpus-editor example">
          <h4>Training Corpus</h4>
          <p>Edit this corpus to change what the model learns from:</p>

          <div className="example-buttons">
            {corpusExamples.map((example, index) => (
              <button
                key={index}
                className="example-button"
                onClick={() => setLocalCorpus(example.sample)}
              >
                Load {example.name} Example
              </button>
            ))}
          </div>

          <textarea
            value={localCorpus}
            onChange={(e) => setLocalCorpus(e.target.value)}
            className="corpus-textarea"
            placeholder="Enter text that will serve as the training corpus..."
          />

          <div className="corpus-controls end">
            <button className="btn" onClick={handleReset}>
              Reset
            </button>
            <button className="btn" onClick={handleUpdate}>
              Update Corpus
            </button>
          </div>
        </div>
      ) : (
        <div className="corpus-visualization example">
          <h4>Corpus Analysis</h4>

          <div className="corpus-word-frequency">
            <h5>Word Frequency</h5>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="frequency-list">
              {filteredWords.map(([word, count], index) => (
                <div
                  key={index}
                  className={`frequency-item ${
                    highlightedWords.includes(word)
                      ? "frequency-highlighted"
                      : ""
                  }`}
                  onClick={() => handleHighlight(word)}
                >
                  <span className="word">{word}</span>
                  <div className="frequency-bar-container">
                    <div
                      className="frequency-bar"
                      style={{
                        width: `${Math.min(
                          100,
                          (count / filteredWords[0][1]) * 100
                        )}%`,
                      }}
                    ></div>
                    <span className="count">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="corpus-preview">
            <h5>Corpus Preview</h5>
            <p className="highlight-instruction">
              {highlightedWords.length > 0
                ? `Highlighting: ${highlightedWords.join(", ")}`
                : "Click on words in the frequency list to highlight them in the corpus"}
            </p>
            <div
              className="corpus-text"
              dangerouslySetInnerHTML={{ __html: visualizedCorpus }}
            />
          </div>
        </div>
      )}

      <div className="corpus-stats example">
        <h4>Corpus Statistics</h4>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">
              {corpusStats.chars.toLocaleString()}
            </div>
            <div className="stat-label">Characters</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {corpusStats.words.toLocaleString()}
            </div>
            <div className="stat-label">Words</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {corpusStats.uniqueWords.toLocaleString()}
            </div>
            <div className="stat-label">Unique Words</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {corpusStats.sentences.toLocaleString()}
            </div>
            <div className="stat-label">Sentences</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {corpusStats.paragraphs.toLocaleString()}
            </div>
            <div className="stat-label">Paragraphs</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {((corpusStats.uniqueWords / corpusStats.words) * 100).toFixed(1)}
              %
            </div>
            <div className="stat-label">Vocabulary Density</div>
          </div>
        </div>
      </div>

      <div className="corpus-importance example">
        <h4>Why Corpus Matters</h4>
        <div className="importance-grid">
          <div className="importance-item">
            <h5>Domain Knowledge</h5>
            <p>
              A model trained on medical texts will understand healthcare
              terminology, while one trained on legal documents will grasp legal
              concepts.
            </p>
          </div>
          <div className="importance-item">
            <h5>Bias</h5>
            <p>
              If the corpus contains biases (gender, racial, political), the
              model may reproduce these biases in its outputs.
            </p>
          </div>
          <div className="importance-item">
            <h5>Vocabulary</h5>
            <p>
              The model can only learn words and phrases present in its training
              corpus. Rare terms need sufficient examples.
            </p>
          </div>
          <div className="importance-item">
            <h5>Style</h5>
            <p>
              The writing style, tone, and formality in the corpus influence how
              the model expresses itself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corpus;
