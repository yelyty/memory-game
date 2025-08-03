import { useState, useRef, useCallback, useEffect } from "react";

export default function useGameTimer() {
	const [seconds, setSeconds] = useState<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startTimer = useCallback(() => {
		if (!intervalRef.current) {
			intervalRef.current = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);
		}
	}, []);

	const stopTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const resetTimer = useCallback(() => {
		setSeconds(0);
		stopTimer();
	}, [stopTimer]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return {
		seconds,
		startTimer,
		stopTimer,
		resetTimer,
	};
}
