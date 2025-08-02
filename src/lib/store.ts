import { create } from "zustand";
import emojis from '../emojis';

type Card = {
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
	highlightedCardId: number | null;
	tries: number;
};

type MemoryGameActions = {
	reset: () => void;
	handleCardClick: (id: number) => void;
};

function getShuffledEmojis() {
	// Take a random sample of 18 unique emojis, then duplicate and shuffle
	const unique = [...emojis].sort(() => Math.random() - 0.5).slice(0, 18);
	const shuffled = [...unique, ...unique].sort(() => Math.random() - 0.5);
	return shuffled.map((emoji, index) => ({
		id: index,
		value: emoji,
		isOpen: false,
		isMatched: false,
	}));
}

export const useMemoryGameStore = create<MemoryGameState & MemoryGameActions>((set) => ({
	cards: getShuffledEmojis(),
	reset: () => {
		set({
			cards: getShuffledEmojis(),
			openedCards: [],
			matchedCards: [],
			isGameOver: false,
			highlightedCardId: null,
			tries: 0,
		});
	},
	openedCards: [],
	matchedCards: [],
	tries: 0,
	isGameOver: false,
	highlightedCardId: null,
	handleCardClick: (id: number) => {
		set((state) => {
			const clickedCard = state.cards.find((card) => card.id === id);
			if (!clickedCard || clickedCard.isMatched || clickedCard.isOpen) return {};

			if (state.openedCards.length === 2) return {};

			const updatedCards = state.cards.map((card) =>
				card.id === id ? { ...card, isOpen: true } : card
			);
			const updatedOpenedCards = [...state.openedCards, { ...clickedCard, isOpen: true }];

			if (updatedOpenedCards.length === 2) {
				const [card1, card2] = updatedOpenedCards;
				if (card1.value === card2.value) {
					// It's a match
					const matchedCards = updatedCards.map((card) =>
						card.id === card1.id || card.id === card2.id
							? { ...card, isMatched: true }
							: card
					);
					return {
						cards: matchedCards,
						openedCards: [],
						matchedCards: [...state.matchedCards, card1, card2],
						isGameOver: matchedCards.every((card) => card.isMatched),
						highlightedCardId: null,
						tries: state.tries,
					};
				} else {
					setTimeout(() => {
						set((current) => {
							const closedCards = current.cards.map((card) =>
								card.id === card1.id || card.id === card2.id
									? { ...card, isOpen: false }
									: card
							);
							return {
								cards: closedCards,
								openedCards: [],
								highlightedCardId: null,
								tries: current.tries + 1,
							};
						});
					}, 1000);
					return {
						cards: updatedCards,
						openedCards: updatedOpenedCards,
						highlightedCardId: card2.id,
						tries: state.tries + 1,
					};
				}
			}
			return {
				cards: updatedCards,
				openedCards: updatedOpenedCards,
				highlightedCardId: null,
				tries: state.tries + 1,
			};
		});
	},
}));
