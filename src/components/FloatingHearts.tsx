import React, { useMemo } from "react";

type HeartItem = {
  id: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const FloatingHearts: React.FC = () => {
  const hearts = useMemo<HeartItem[]>(() => {
    const count = 14;
    return Array.from({ length: count }).map((_, i) => ({
      id: `h-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 10 + Math.random() * 18,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 3,
      opacity: 0.12 + Math.random() * 0.18,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            opacity: h.opacity,
            animation: `floaty ${h.duration}s ease-in-out ${h.delay}s infinite`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span style={{ fontSize: h.size, lineHeight: 1 }}>❤️</span>
        </div>
      ))}

      <style>{`
        @keyframes floaty {
          0%   { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          50%  { transform: translate(-50%, -50%) translateY(-18px) rotate(10deg); }
          100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
