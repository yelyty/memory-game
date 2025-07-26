import "./App.css";
import { Button } from "./components/ui/button";
import { Card, CardTitle } from "./components/ui/card";
import { useMemoryGameStore } from "./lib/store";

type MemoryCardProps = {
  value: string;
  isOpen?: boolean;
  isMatched?: boolean;
  onClick?: () => void;
};

function MemoryCard({
  value,
  isOpen,
  isMatched,
  onClick,
  highlighted,
  greenBorder,
}: MemoryCardProps & { highlighted?: boolean; greenBorder?: boolean }) {
  const handleClick = () => {
    if (!isOpen && !isMatched) {
      onClick?.();
    }
  };

  return (
    <div
      className="flip-card aspect-square w-full h-full cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-card-inner w-full h-full"
        style={{
          transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flip-card-front absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Card className="aspect-square flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 w-full h-full">
            <CardTitle className="text-3xl font-bold text-gray-700 select-none">
              {/* Front face content, can be empty or a placeholder */}
            </CardTitle>
          </Card>
        </div>
        <div
          className="flip-card-back absolute w-full h-full"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Card
            className={`aspect-square flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border w-full h-full${
              isOpen && isMatched
                ? " border-1 border-green-500"
                : highlighted && !isMatched
                ? " border-2 border-red-500"
                : greenBorder && !isMatched
                ? " border-2 border-green-500"
                : " border border-gray-200"
            }`}
          >
            <CardTitle className="text-6xl font-bold text-gray-700 select-none">
              {value}
            </CardTitle>
          </Card>
        </div>
      </div>
    </div>
  );
}

function App() {
  const cards = useMemoryGameStore((state) => state.cards);
  const highlightedCardId = useMemoryGameStore(
    (state) => state.highlightedCardId
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
        {cards.map(({ id, value, isOpen, isMatched }) => {
          // Green border for any open card that is not matched and not highlighted (red)
          const greenBorder = isOpen && !isMatched && highlightedCardId !== id;
          return (
            <MemoryCard
              key={id}
              value={value}
              isOpen={isOpen}
              isMatched={isMatched}
              highlighted={highlightedCardId === id && !isMatched}
              greenBorder={greenBorder}
              onClick={() => handleCardClick(id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
