export type LetterStatus = "GREEN" | "YELLOW" | "GRAY";
export const WORD_LENGTH = 5;

/*
    Use to calculate the status of each letter in a guess relative to the solution
    Do a two-pass frequency map alg for duplicated letters
*/
export function getGuessStatuses(
  guess: string,
  solution: string
): LetterStatus[] {
  const splitSolution = solution.toUpperCase().split("");
  const splitGuess = guess.toUpperCase().split("");
  const solutionMap = new Int32Array(26);
  const statuses = Array(WORD_LENGTH).fill("GRAY");

  // Build the tally of characters of the solution
  // Normalize by subtracting 65 (65 = 'A' index)
  for (let char of splitSolution) {
    solutionMap[char.charCodeAt(0) - 65]++;
  }

  // First pass for exact match of letter
  // Decrement the count of the character in our frequency map
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "GREEN";
      solutionMap[letter.charCodeAt(0) - 65]--;
    }
  });

  // Second pass for letter existing, but in the wrong position
  // Only need to process non-matched ones, ie. not 'GREEN'
  splitGuess.forEach((letter, i) => {
    if (statuses[i] !== "GREEN") {
      const code = letter.charCodeAt(0) - 65;
      if (solutionMap[code] > 0) {
        statuses[i] = "YELLOW";
        solutionMap[code]--;
      }
    }
  });

  return statuses;
}
