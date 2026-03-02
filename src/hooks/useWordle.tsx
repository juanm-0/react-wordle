import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
  type LetterStatus,
  WORD_LENGTH,
  getGuessStatuses,
} from "../utils/gameLogic";

type KeyboardStatusMap = Record<string, LetterStatus>;
interface GameState {
  guesses: string[];
  currentGuess: string;
}

export const useWordle = (solution: string) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameover] = useState(false);

  // Set up a Ref to be used by keyboard component
  const stateRef = useRef<GameState>({ guesses, currentGuess });
  stateRef.current = { guesses, currentGuess };

  // Memoized calculation for keyboard colors in UI
  // Iterates through each guess in the guesses list
  // If Green, always update style. If Yellow, only update if we haven't already marked it Green
  // Else, we only need to update the map if the letter appears for the first time
  const keyboardStatus = useMemo(() => {
    const statusMap: KeyboardStatusMap = {};
    guesses.forEach((word) => {
      const statuses = getGuessStatuses(word, solution);
      word.split("").forEach((letter, i) => {
        const oldStatus = statusMap[letter];
        const newStatus = statuses[i];
        if (newStatus === "GREEN") statusMap[letter] = "GREEN";
        else if (newStatus === "YELLOW" && oldStatus !== "GREEN")
          statusMap[letter] = "YELLOW";
        else if (!oldStatus) statusMap[letter] = "GRAY";
      });
    });
    return statusMap;
  }, [guesses, solution]);

  // Use a Ref instead of depending on guesses and currentGuesses to avoid having to recreate this function
  // after every keystroke
  const onKeyPress = useCallback((key: string) => {
    const { guesses: latestGuesses, currentGuess: latestGuess } =
      stateRef.current;
    if (/^[a-z]$/i.test(key)) {
      setCurrentGuess((prev) =>
        prev.length < WORD_LENGTH ? (prev + key).toUpperCase() : prev
      );
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }

    if (key === "Enter") {
      if (latestGuesses.length >= 6) return;
      if (latestGuess.length === WORD_LENGTH) {
        const newGuesses = [...latestGuesses, latestGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => onKeyPress(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  return { guesses, currentGuess, isGameOver, keyboardStatus, onKeyPress };
};
