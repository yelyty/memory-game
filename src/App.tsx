import { useEffect, useState, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useMemoryGameStore } from "./lib/store";
import Header from "./components/Header";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import StartGame from "./components/StartGame";
import useGameTimer from "./hooks/useGameTimer";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const [cards, openedCards, tries, isGameOver] = useMemoryGameStore(
    useShallow((state) => [
      state.cards,
      state.openedCards,
      state.tries,
      state.isGameOver,
    ])
  );

  const handleCardClick = useMemoryGameStore((state) => state.handleCardClick);
  const resetGame = useMemoryGameStore((state) => state.reset);

  const { seconds, resetTimer, startTimer, stopTimer } = useGameTimer();

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [gameStarted, isGameOver, startTimer, stopTimer]);

  useEffect(() => {
    if (tries === 0) resetTimer();
  }, [tries, resetTimer]);

  const handleStart = useCallback(() => {
    resetGame();
    setGameStarted(true);
    startTimer();
  }, [resetGame, setGameStarted, startTimer]);

  const handleRestart = useCallback(() => {
    setGameStarted(true);
    resetGame();
    resetTimer();
    setTimeout(() => {
      startTimer();
    }, 0);
  }, [setGameStarted, resetGame, resetTimer, startTimer]);

  if (!gameStarted) {
    return <StartGame onStart={handleStart} />;
  }

  if (isGameOver) {
    return <GameOver tries={tries} time={seconds} onRestart={handleRestart} />;
  }

  return (
    <div
      className={
        "flex items-center justify-center bg-gray-100 flex-col relative min-h-screen"
      }
    >
      <Header tries={tries} time={seconds} onReset={handleRestart} />
      <Board
        cards={cards}
        openedCards={openedCards}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default App;
