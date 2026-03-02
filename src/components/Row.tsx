import { WORD_LENGTH, getGuessStatuses } from "../utils/gameLogic";

interface RowProps {
  guess: string;
  isSubmitted: boolean;
  solution: string;
}

export const Row = ({ guess, isSubmitted, solution }: RowProps) => {
  const statuses = isSubmitted
    ? getGuessStatuses(guess, solution)
    : Array(WORD_LENGTH).fill("");

  // Ensures we render 5 tiles
  const tiles = guess.padEnd(WORD_LENGTH, " ").split("");

  return (
    <div className="row">
      {tiles.map((char, i) => {
        const statusClass = isSubmitted
          ? statuses[i]
          : char !== " "
          ? "active"
          : "";
        return (
          <div key={i} className={`tile ${statusClass}`}>
            {char}
          </div>
        );
      })}
    </div>
  );
};
