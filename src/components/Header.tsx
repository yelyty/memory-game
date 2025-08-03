import { Button } from "./ui/button";

type HeaderProps = {
  tries: number;
  time: number;
  onReset: () => void;
};

export default function Header({ tries, time, onReset }: HeaderProps) {
  return (
    <div className="flex align-center justify-between w-full max-w-3xl p-4">
      <div className="text-lg font-semibold">
        Tries: <span className="text-blue-600">{tries}</span>
      </div>
      <div className="text-lg font-semibold ml-8">
        Time: <span className="text-green-600">{time}s</span>
      </div>
      <Button
        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={onReset}
      >
        Reset Game
      </Button>
    </div>
  );
}
