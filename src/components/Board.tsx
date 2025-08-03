import { getCardStatus } from "@/utils/utils";
import type { Card } from "@/lib/store";

import MemoryCard from "./MemoryCard";

export type BoardProps = {
  cards: Card[];
  openedCards: Card[];
  handleCardClick: (id: number) => void;
};

export default function Board({
  cards,
  openedCards,
  handleCardClick,
}: BoardProps) {
  return (
    <div className="grid grid-cols-6 gap-2 w-[800px] p-1">
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          value={card.value}
          isOpen={card.isOpen}
          status={getCardStatus(card, openedCards)}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}
