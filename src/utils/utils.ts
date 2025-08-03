import type { Card } from "../lib/store";

export type CardStatus = "default" | "error" | "success";


export function getCardStatus(card: Card, openedCards: Card[]): CardStatus {
	if (card.isMatched) return "success";

	const isCurrentlyOpened = openedCards.some((c) => c.id === card.id);
	if (!isCurrentlyOpened) return "default";

	if (openedCards.length === 1) return "success";

	if (openedCards.length === 2) {
		const [first, second] = openedCards;
		if (first.value === second.value) return "success";

		return card.id === second.id ? "error" : "success";
	}

	return "default";
}