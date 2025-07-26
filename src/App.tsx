import "./App.css";
import { Card, CardTitle } from "./components/ui/card";
import { useState, useEffect, useRef } from "react";

function MemoryCard() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
          <Card className="aspect-square flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 w-full h-full">
            <CardTitle className="text-3xl font-bold text-gray-700 select-none">
              😊
            </CardTitle>
          </Card>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-6 gap-2 w-[800px] p-1">
        {Array.from({ length: 36 }, (_, index) => (
          <MemoryCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
