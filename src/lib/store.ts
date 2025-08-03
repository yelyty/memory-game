import { create } from "zustand";
import emojis from "@/emojis";
import { getShuffledEmojis } from "./utils";

export type Card = {
	id: number;
	value: string;
	isOpen: boolean;
	isMatched: boolean;
};

export type MemoryGameState = {
	cards: Card[];
	openedCards: Card[];
	matchedCards: Card[];
	isGameOver: boolean;
	tries: number;
};

type MemoryGameActions = {
	reset: () => void;
	handleCardClick: (id: number) => void;
};

function getInitialState(emojis: string[]): MemoryGameState {
	return {
		cards: getShuffledEmojis(emojis),
		openedCards: [],
		matchedCards: [],
		isGameOver: false,
		tries: 0,
	};
}

export const useMemoryGameStore = create<MemoryGameState & MemoryGameActions>(
	(set, get) => ({
		...getInitialState([]),
		reset: () => {
			set(getInitialState(emojis));
		},

		handleCardClick: (id: number) => {
			const state = get();
			const clickedCard = state.cards.find(card => card.id === id);

			if (!clickedCard || clickedCard.isMatched || clickedCard.isOpen) return;

			if (state.openedCards.length === 2) return;

			const updatedCards = state.cards.map(card =>
				card.id === id ? { ...card, isOpen: true } : card
			);

			const updatedOpenedCards = [...state.openedCards, { ...clickedCard, isOpen: true }];

			set({
				cards: updatedCards,
				openedCards: updatedOpenedCards,
			});

			if (updatedOpenedCards.length === 2) {
				const [card1, card2] = updatedOpenedCards;

				if (card1.value === card2.value) {
					// It's a match
					const matchedCards = updatedCards.map(card =>
						card.id === card1.id || card.id === card2.id
							? { ...card, isMatched: true }
							: card
					);
					set({
						cards: matchedCards,
						openedCards: [],
						matchedCards: [...state.matchedCards, card1, card2],
						isGameOver: matchedCards.every(card => card.isMatched),
						tries: state.tries + 1,
					});
				} else {
					setTimeout(() => {
						set(current => ({
							cards: current.cards.map(card =>
								card.id === card1.id || card.id === card2.id
									? { ...card, isOpen: false }
									: card
							),
							openedCards: [],
							tries: current.tries + 1,
						}));
					}, 500);
				}
			}
		},
	})
);
