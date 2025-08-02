import "./App.css";
import { Button } from "./components/ui/button";
import { useMemoryGameStore } from "./lib/store";
import MemoryCard from "./MemoryCard";
import { useShallow } from "zustand/react/shallow";

function App() {
  const [cards, openedCards] = useMemoryGameStore(
    useShallow((state) => [state.cards, state.openedCards])
  );
  const handleCardClick = useMemoryGameStore((state) => state.handleCardClick);
  const resetGame = useMemoryGameStore((state) => state.reset);
  const tries = useMemoryGameStore((state) => state.tries);

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-col">
      <div className="flex align-center justify-between w-full max-w-3xl p-4">
        <div className="text-lg font-semibold">
          Tries: <span className="text-blue-600">{tries}</span>
        </div>
        <Button
          className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 w-[800px] p-1">
        {cards.map((card) => {
          const { id, value, isOpen, isMatched } = card;
          const isCurrentlyOpened = openedCards.some(
            (openedCard) => openedCard.id === id
          );
          let status: "default" | "error" | "success" = "default";
          if (isMatched) {
            status = "success";
          } else if (isCurrentlyOpened) {
            if (openedCards.length === 1) {
              status = "success";
            } else if (openedCards.length === 2) {
              const [firstCard, secondCard] = openedCards;
              if (firstCard.value === secondCard.value) {
                status = "success";
              } else {
                if (id === firstCard.id) {
                  status = "success";
                } else if (id === secondCard.id) {
                  status = "error";
                }
              }
            }
          }
          return (
            <MemoryCard
              key={id}
              value={value}
              isOpen={isOpen}
              status={status}
              onClick={() => handleCardClick(id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
