import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import { Position } from './types';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [noBtnPosition, setNoBtnPosition] = useState<Position>({
    position: 'static',
    top: 'auto',
    left: 'auto',
  });
  
  // Ref to track if the button has moved at least once to switch to absolute positioning
  const hasMoved = useRef(false);

  const handleYesClick = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ff1493', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff1493', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    // Prevent default to stop clicks on mobile/desktop
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Button dimensions (safe estimate including padding/shadow)
    const btnWidth = 120; 
    const btnHeight = 60;
    const padding = 20; // Minimum distance from screen edge

    // Calculate maximum allowed positions
    const maxLeft = viewportWidth - btnWidth - padding;
    const maxTop = viewportHeight - btnHeight - padding;

    // Ensure we don't have negative ranges
    const safeMaxLeft = Math.max(padding, maxLeft);
    const safeMaxTop = Math.max(padding, maxTop);

    // Generate random position within safe bounds
    // Range: [padding, safeMaxLeft]
    const newLeft = padding + Math.random() * (safeMaxLeft - padding);
    const newTop = padding + Math.random() * (safeMaxTop - padding);

    setNoBtnPosition({
      position: 'fixed',
      left: newLeft,
      top: newTop,
    });
    
    hasMoved.current = true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Main Card */}
      <div className="z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white transform transition-all hover:scale-[1.02] duration-300">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full bg-pink-100 ${!accepted ? 'floating' : ''}`}>
             {accepted ? (
                <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
             ) : (
                <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
             )}
          </div>
        </div>

        {!accepted ? (
          /* Question Section */
          <div className="text-center space-y-8">
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 font-bold drop-shadow-sm leading-tight">
              Will you be my Valentine?
            </h1>
            
            <p className="text-gray-600 text-lg">
              I promise chocolate, flowers, and bad jokes! 🌹
            </p>

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

              {/* NO Button */}
              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                style={
                   noBtnPosition.position === 'fixed'
                    ? { position: 'fixed', top: noBtnPosition.top, left: noBtnPosition.left, zIndex: 50 }
                    : {}
                }
                className={`px-8 py-4 bg-gray-400 text-white text-xl font-bold rounded-full shadow-md transition-all duration-200 w-full md:w-auto cursor-pointer ${noBtnPosition.position === 'fixed' ? 'runaway-btn' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          /* Success Section */
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 font-bold">
              Congratulations!
            </h1>
            <h2 className="text-2xl font-bold text-gray-800">
              It's a Date! ❤️
            </h2>
            
            <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 flex flex-col items-center gap-3">
              <Calendar className="w-10 h-10 text-rose-500 mb-2" />
              <p className="text-lg text-gray-700">Your Valentine's date is booked for:</p>
              <p className="text-2xl font-bold text-rose-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                Saturday, 14 Feb 2026
              </p>
            </div>
            
            <p className="text-gray-500 italic">
              See you there! (Don't be late) 😉
            </p>
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