export function tokenize(vocab: string) {
  return Array.from(new Set(vocab.split(/\s/)))
}