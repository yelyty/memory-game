import Overlay from "./Overlay";

type StartGameProps = {
  onStart: () => void;
};

export default function StartGame({ onStart }: StartGameProps) {
  return (
    <Overlay
      title="Memory Game"
      description="Test your memory skills! Flip the cards and find all pairs as fast as you can."
      buttonText="Start Game"
      onButtonClick={onStart}
    />
  );
}
