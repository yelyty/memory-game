import { create } from "zustand";
type Card = {
	id: number;
	value: string;
	isOpen: boolean;
	isMatched: boolean;
};

type MemoryGameState = {
	cards: Card[];
	openedCards: Card[];
	matchedCards: Card[];
	isGameOver: boolean;
	highlightedCardId: number | null;
};

type MemoryGameActions = {
	reset: () => void;
	handleCardClick: (id: number) => void;
};

const EMOJIS = [
	"😊",
	"🐶",
	"🍕",
	"🚗",
	"🌟",
	"🎈",
	"🏀",
	"🌈",
	"🐱",
	"🍦",
	"🎵",
	"🚀",
	"🌻",
	"🎉",
	"🍩",
	"🐻",
	"🌍",
	"🎂",
];

const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

export const useMemoryGameStore = create<MemoryGameState & MemoryGameActions>((set, _get, store) => ({
	cards: shuffledEmojis.map((emoji, index) => ({
		id: index,
		value: emoji,
		isOpen: false,
		isMatched: false,
	})),
	reset: () => {
		set(store.getInitialState())
	},
	openedCards: [], // Do I need this?
	matchedCards: [],
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
							};
						});
					}, 1000);
					return {
						cards: updatedCards,
						openedCards: updatedOpenedCards,
						highlightedCardId: card2.id,
					};
				}
			}
			return {
				cards: updatedCards,
				openedCards: updatedOpenedCards,
				highlightedCardId: null,
			};
		});
	},
}));
