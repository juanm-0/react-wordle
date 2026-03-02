import React from "react";
import { type LetterStatus } from "../utils/gameLogic";

interface KeyboardProps {
  status: Record<string, LetterStatus>;
}

// Wrap the component in React.memo
const Keyboard = React.memo(({ status }: KeyboardProps) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  console.log("Keyboard Rendered!"); // You'll see this only when a guess is submitted

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((letter) => {
            // Get the color class (GREEN, YELLOW, GRAY, or empty)
            const colorClass = status[letter] || "";

            return (
              <div key={letter} className={`key ${colorClass}`}>
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Keyboard;
