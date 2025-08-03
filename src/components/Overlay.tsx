import type { ReactNode } from "react";
import { Button } from "./ui/button";

export type OverlayProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
};

export default function Overlay({
  title,
  description,
  children,
  buttonText,
  onButtonClick,
}: OverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center z-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col items-center max-w-sm w-full text-center animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{title}</h2>
        {description && (
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            {description}
          </p>
        )}
        {children}
        <Button
          className="px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow hover:shadow-lg hover:bg-blue-800 transition-all duration-300"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
