// Simple tokenizer for demonstration purposes
// This tokenizer splits text into words and punctuation

export const tokenize = (text: string): string[] => {
  if (!text || text.trim() === '') {
    return [];
  }


  const tokens = text
    .trim()
    .split(/(\s+|[.,!?;:'"()[\]{}])/g)
    .filter(token => token.trim() !== '');

  return tokens;
};

// Function to calculate similarity between two tokens
// This is a simple implementation for demonstration
export const calculateTokenSimilarity = (token1: string, token2: string): number => {
  token1 = token1.toLowerCase();
  token2 = token2.toLowerCase();


  if (token1 === token2) {
    return 1.0;
  }


  const set1 = new Set(token1.split(''));
  const set2 = new Set(token2.split(''));

  const intersection = new Set([...set1].filter(char => set2.has(char)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
};

// Function to generate random but deterministic vector from a token
export const generateTokenVector = (token: string, dimensions: number = 8, seed: number = 42): number[] => {
  const vector: number[] = [];
  const tokenLower = token.toLowerCase();

  for (let i = 0; i < dimensions; i++) {

    let value = 0;

    for (let j = 0; j < tokenLower.length; j++) {
      value += tokenLower.charCodeAt(j) * Math.sin(seed + i * j * 0.1) * 0.1;
    }


    value = Math.sin(value) * 0.8;

    vector.push(value);
  }

  return vector;
};