import Overlay from "./Overlay";

type GameOverProps = {
  tries: number;
  time: number;
  onRestart: () => void;
};

export default function GameOver({ tries, time, onRestart }: GameOverProps) {
  return (
    <Overlay
      title="🎉 Congratulations!"
      description="You completed the game."
      buttonText="Play Again"
      onButtonClick={onRestart}
    >
      <div className="w-full mb-6 space-y-2 text-lg">
        <p>
          <span className="font-semibold">Tries:</span>{" "}
          <span className="text-blue-600">{tries}</span>
        </p>
        <p>
          <span className="font-semibold">Time:</span>{" "}
          <span className="text-green-600">{time}s</span>
        </p>
      </div>
    </Overlay>
  );
}
