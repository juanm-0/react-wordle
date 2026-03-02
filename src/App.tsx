import "./App.css";
import { useWordle } from "./hooks/useWordle";
import { Row } from "./components/Row";
import Keyboard from "./components/Keyboard";

// Wire this to an API
const SOLUTION = "HELLO";
const MAX_GUESSES = 6;

function App() {
  const { guesses, currentGuess, keyboardStatus, isGameOver } =
    useWordle(SOLUTION);

  return (
    <div className="wordle-container">
      <header>
        <h1>WORDLE</h1>
      </header>

      <main className="grid">
        {/* Render 6 Rows */}
        {[...Array(MAX_GUESSES)].map((_, i) => (
          <Row
            key={i}
            // Pass currentGuess if we are in the current row, otherwise take submitted guess or empty string
            guess={i === guesses.length ? currentGuess : guesses[i] || ""}
            isSubmitted={i < guesses.length}
            solution={SOLUTION}
          />
        ))}
      </main>

      <footer className="footer">
        <Keyboard status={keyboardStatus} />
      </footer>
    </div>
  );
}

export default App;
