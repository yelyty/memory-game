import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Card } from "./store";

/**
 * Utility function to merge class names conditionally.
 * @param inputs - Class names to merge.
 * @returns Merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Shuffles the emojis and returns an array of Card objects.
 * Each emoji appears twice in the game.
 * @param emojis - Array of emoji strings.
 * @returns Array of Card objects with shuffled emojis.
 */
export function getShuffledEmojis(emojis: string[]): Card[] {
	const unique = [...emojis].sort(() => Math.random() - 0.5).slice(0, 18);
	const shuffled = [...unique, ...unique].sort(() => Math.random() - 0.5);
	return shuffled.map((emoji, index) => ({
		id: index,
		value: emoji,
		isOpen: false,
		isMatched: false,
	}));
}
