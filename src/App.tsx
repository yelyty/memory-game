import "./App.css";
import { Card, CardTitle } from "./components/ui/card";
import { useState } from "react";

function MemoryCard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="flip-card aspect-square w-full h-full cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-card-inner w-full h-full transition-transform duration-500"
        style={{ transform: isOpen ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="flip-card-front absolute w-full h-full">
          <Card className="aspect-square flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200 w-full h-full">
            <CardTitle className="text-3xl font-bold text-gray-700 select-none">
              {/* Front face content, can be empty or a placeholder */}
            </CardTitle>
          </Card>
        </div>
        <div className="flip-card-back absolute w-full h-full">
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
