import clsx from "clsx";
import { Card, CardTitle } from "./components/ui/card";

export type MemoryCardStatus = "default" | "error" | "success";

type MemoryCardProps = {
  value: string;
  isOpen?: boolean;
  onClick: () => void;
  status?: MemoryCardStatus;
};

export default function MemoryCard({
  value,
  isOpen = false,
  onClick,
  status = "default",
}: MemoryCardProps) {
  const handleClick = () => {
    if (!isOpen && status !== "success") {
      onClick();
    }
  };

  const baseCardClasses =
    "aspect-square flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 w-full h-full";

  return (
    <div
      className="flip-card aspect-square w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      <div className={clsx("flip-card-inner", { "rotate-y-180": isOpen })}>
        {/* Front Face */}
        <div className="flip-card-front">
          <Card className={clsx(baseCardClasses, "border border-gray-200")}>
            <CardTitle className="text-3xl font-bold text-gray-700 select-none" />
          </Card>
        </div>

        {/* Back Face */}
        <div className="flip-card-back">
          <Card
            className={clsx(baseCardClasses, {
              "border border-gray-200": status === "default",
              "border-2 border-red-500": status === "error",
              "border-2 border-green-500": status === "success",
            })}
          >
            <CardTitle className="text-6xl font-bold text-gray-700 select-none">
              {value}
            </CardTitle>
          </Card>
        </div>
      </div>
    </div>
  );
}
