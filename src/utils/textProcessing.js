export const MAX_LENGTH = 100;

const textToSequences = (text, wordIndex) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => wordIndex[word] || 0);
};

const padSequence = (sequence) => {
  const paddedSequence = [...sequence];
  while (paddedSequence.length < MAX_LENGTH) paddedSequence.push(0);
  return paddedSequence.slice(0, MAX_LENGTH);
};

export const processText = (text, wordIndex) => {
  const sequences = textToSequences(text, wordIndex);
  return padSequence(sequences);
};
