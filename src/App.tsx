import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Calendar, Sparkles } from "lucide-react";
import FloatingHearts from "./components/FloatingHearts";

type NoBtnPosition =
  | { mode: "static" }
  | { mode: "fixed"; top: number; left: number };

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState<NoBtnPosition>({ mode: "static" });

  // If you ever want "only start running after first hover", keep this.
  const hasMoved = useRef(false);

  const triggerConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff69b4", "#ff1493", "#ffffff"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff69b4", "#ff1493", "#ffffff"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  };

  const handleYesClick = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Use real button size (if available). Otherwise fall back.
    const btn = document.getElementById("no-btn");
    const rect = btn?.getBoundingClientRect();

    const btnWidth = rect?.width ?? 130;
    const btnHeight = rect?.height ?? 58;

    const padding = 16;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Keep it inside viewport (and avoid landing under the top bar)
    const minLeft = padding;
    const minTop = padding + 10;

    const maxLeft = Math.max(minLeft, vw - btnWidth - padding);
    const maxTop = Math.max(minTop, vh - btnHeight - padding);

    const left = minLeft + Math.random() * (maxLeft - minLeft);
    const top = minTop + Math.random() * (maxTop - minTop);

    setNoBtnPos({ mode: "fixed", left, top });
    hasMoved.current = true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Main Card */}
      <div className="z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white transform transition-all hover:scale-[1.02] duration-300">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full bg-pink-100 ${!accepted ? "floating" : ""}`}>
            {accepted ? (
              <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
            ) : (
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
            )}
          </div>
        </div>

        {!accepted ? (
          <div className="text-center space-y-8">
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 font-bold drop-shadow-sm leading-tight">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 min-h-[120px]">
              {/* YES Button */}
              <button
                onClick={handleYesClick}
                className="group relative px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 w-full md:w-auto overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Yes, definitely! <Heart className="w-5 h-5 fill-current" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
              </button>

              {/* NO Button (dodges but never vanishes) */}
              <button
                id="no-btn"
                onMouseEnter={moveNoButton}
                onMouseMove={moveNoButton}     // makes it harder to “trap”
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                style={
                  noBtnPos.mode === "fixed"
                    ? {
                        position: "fixed",
                        top: noBtnPos.top,
                        left: noBtnPos.left,
                        zIndex: 9999, // ensure it stays above the card
                      }
                    : undefined
                }
                className={`px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white text-xl font-bold rounded-full shadow-md transition-all duration-200 w-full md:w-auto cursor-pointer ${
                  noBtnPos.mode === "fixed" ? "runaway-btn" : ""
                }`}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 font-bold">
              Congratulations!
            </h1>
            <h2 className="text-2xl font-bold text-gray-800">It's a Date! ❤️</h2>

            <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 flex flex-col items-center gap-3">
              <Calendar className="w-10 h-10 text-rose-500 mb-2" />
              <p className="text-lg text-gray-700">Your Valentine's date is booked for:</p>
              <p className="text-2xl font-bold text-rose-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                Saturday, 14 Feb 2026
              </p>
            </div>

            <p className="text-gray-500 italic">See you there! (Don't be late) 😉</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 text-pink-400 text-sm font-semibold opacity-70">
        Made with ❤️ for you
      </div>
    </div>
  );
};

export default App;
