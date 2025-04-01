"use client";
import { useState, useEffect, useMemo } from "react";

const Tokenization = ({ corpus }: { corpus: string }) => {
  const [inputText, setInputText] = useState(
    "I'm going to the supermarket to buy some ice cream."
  );
  const [localTokens, setLocalTokens] = useState<string[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [vocabulary, setVocabulary] = useState<string[]>([]);

  useEffect(() => {
    if (!corpus) return;

    const buildVocabulary = (text: string) => {
      const words = text
        .toLowerCase()
        .replace(/[^\w\s''']/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 0);

      const wordCounts: Record<string, number> = {};
      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });

      return Object.entries(wordCounts)
        .filter(([, count]) => count > 1)
        .map(([word]) => word)
        .sort();
    };

    const addAffixes = (basicVocab: string[]) => {
      const commonAffixes = [
        "un",
        "re",
        "dis",
        "pre",
        "post",
        "anti",
        "super",
        "ing",
        "ed",
        "s",
        "'s",
        "ly",
        "er",
        "est",
        "ment",
      ];

      return [...basicVocab, ...commonAffixes];
    };

    const addSpecialTokens = (vocab: string[]) => {
      const specialTokens = [
        ".",
        ",",
        "!",
        "?",
        ":",
        ";",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "'m",
        "'re",
        "'ve",
        "'ll",
        "'d",
        "n't",
      ];

      return [...vocab, ...specialTokens];
    };

    const basicVocab = buildVocabulary(corpus);
    const withAffixes = addAffixes(basicVocab);
    const fullVocab = addSpecialTokens(withAffixes);

    setVocabulary(fullVocab);
  }, [corpus]);

  const tokenizeText = useMemo(() => {
    return (text: string, vocab: string[]) => {
      if (!text || !vocab || vocab.length === 0) return [];

      const sortedVocab = [...vocab].sort((a, b) => b.length - a.length);

      const tokens = [];
      let remainingText = text;

      while (remainingText.length > 0) {
        let matchFound = false;

        for (const word of sortedVocab) {
          if (remainingText.toLowerCase().startsWith(word.toLowerCase())) {
            tokens.push(remainingText.substring(0, word.length));
            remainingText = remainingText.substring(word.length);
            matchFound = true;
            break;
          }
        }

        if (!matchFound) {
          tokens.push(remainingText[0]);
          remainingText = remainingText.substring(1);
        }
      }

      return tokens;
    };
  }, []);

  const generateTokenIds = (tokens: string[], vocab: string[]) => {
    return tokens.map((token) => {
      const index = vocab.findIndex(
        (v) => v.toLowerCase() === token.toLowerCase()
      );

      return index !== -1 ? index : vocab.length;
    });
  };

  useEffect(() => {
    if (vocabulary.length === 0) return;

    const newTokens = tokenizeText(inputText, vocabulary);
    setLocalTokens(newTokens);
    setTokenIds(generateTokenIds(newTokens, vocabulary));
  }, [inputText, vocabulary, tokenizeText]);

  const corpusStats = useMemo(() => {
    if (!corpus) return { words: 0, chars: 0 };

    const words = corpus.split(/\s+/).filter((w) => w.length > 0).length;
    const chars = corpus.length;

    return { words, chars };
  }, [corpus]);

  const countTokens = localTokens.length;
  const uniqueTokens = new Set(localTokens.map((t) => t.toLowerCase())).size;
  const unknownTokens = tokenIds.filter(
    (id) => id === vocabulary.length
  ).length;

  return (
    <div className="content-section">
      <p>
        Before an AI can understand text, it needs to break it down into
        manageable pieces called <strong>tokens</strong>.
      </p>

      <div className="tokenization-explanation example">
        <h4>What Are Tokens?</h4>
        <p>Tokens aren't just whole words. They can be:</p>

        <ul className="token-types">
          <li>Common prefixes (like "un-" or "re-")</li>
          <li>Word stems ("play" in "playing")</li>
          <li>Suffixes ("-ing", "-ed", "-s")</li>
          <li>Complete words ("cat", "the")</li>
          <li>Parts of longer words ("super" + "hero")</li>
          <li>Punctuation marks ("!", "?")</li>
          <li>Special characters ("@", "#")</li>
        </ul>

        <p>
          Most modern language models use between 50,000 to 100,000 unique
          tokens. This vocabulary is carefully chosen to efficiently represent
          most text while keeping the model's size manageable.
        </p>
      </div>

      <div className="corpus-info example">
        <h4>Learning From a Corpus</h4>
        <p>
          The model's vocabulary is built from a <strong>corpus</strong> - a
          large collection of text that serves as training data.
        </p>

        <div className="corpus-stats">
          <div className="stat-item">
            <span className="stat-label">Corpus Size:</span>
            <span className="stat-value">
              {corpusStats.chars.toLocaleString()} characters
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Word Count:</span>
            <span className="stat-value">
              {corpusStats.words.toLocaleString()} words
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Vocabulary Size:</span>
            <span className="stat-value">
              {vocabulary.length.toLocaleString()} tokens
            </span>
          </div>
        </div>

        <p className="corpus-note">
          From this corpus, the model builds a vocabulary of the most common and
          useful tokens to recognize.
        </p>
      </div>

      <div className="tokenization-interactive example">
        <h4>Try Tokenization</h4>
        <p>
          Enter some text below to see how it gets tokenized using the
          vocabulary learned from the corpus:
        </p>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to tokenize..."
          className="tokenization-input"
        />

        <div className="token-stats">
          <div className="stat-item">
            <span className="stat-label">Total Tokens:</span>
            <span className="stat-value">{countTokens}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unique Tokens:</span>
            <span className="stat-value">{uniqueTokens}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unknown Tokens:</span>
            <span className="stat-value">{unknownTokens}</span>
          </div>
        </div>

        <div className="token-visualization">
          <h5>Tokenized Result:</h5>
          <div className="token-result">
            {localTokens.map((token, index) => (
              <div
                key={index}
                className={`token-chip ${
                  tokenIds[index] === vocabulary.length ? "unknown-token" : ""
                }`}
                title={
                  tokenIds[index] === vocabulary.length
                    ? "Not in vocabulary"
                    : `Token ID: ${tokenIds[index]}`
                }
              >
                {token}
              </div>
            ))}
          </div>
        </div>

        <div className="token-ids">
          <h5>Token IDs:</h5>
          <div className="id-mapping">
            {localTokens.map((token, index) => (
              <div
                key={index}
                className={`id-pair ${
                  tokenIds[index] === vocabulary.length ? "unknown-pair" : ""
                }`}
              >
                <span className="token-text">{token}</span>
                <span className="token-id">
                  {tokenIds[index] === vocabulary.length
                    ? "<UNK>"
                    : tokenIds[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tokenization-process example">
        <h4>From Text to Numbers</h4>
        <p>
          Computers don't understand text, so each token gets converted to a
          unique number ID in the model's vocabulary.
        </p>

        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h5>Input Text</h5>
              <div className="step-example">"Hello world!"</div>
            </div>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h5>Tokenization</h5>
              <div className="step-example">["Hello", "world", "!"]</div>
            </div>
          </div>

          <div className="process-arrow">→</div>

          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h5>Token IDs</h5>
              <div className="step-example">[243, 1025, 106]</div>
            </div>
          </div>
        </div>

        <p className="process-note">
          These numbers are what the AI model actually processes. The conversion
          between tokens and IDs happens using a lookup table called the
          vocabulary.
        </p>
      </div>

      <div className="vocabulary-info example">
        <h4>Extracted Vocabulary</h4>
        <p>
          Here's a small sample of the vocabulary extracted from the corpus:
        </p>

        <div className="vocab-sample">
          <ol className="vocab-item">
            {vocabulary.slice(0, 20).map((word, index) => (
              <li key={index} className="vocab-word">
                {word}
              </li>
            ))}
          </ol>
          {vocabulary.length > 20 && (
            <div className="vocab-more">
              ...and {vocabulary.length - 20} more tokens
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tokenization;
