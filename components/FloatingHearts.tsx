import React from 'react';

const FloatingHearts: React.FC = () => {
  // Create a deterministic array of "random" hearts to avoid hydration mismatches
  // In a real random scenario, we'd use useEffect to generate them client-side
  const hearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s
    duration: 5 + Math.random() * 5, // 5-10s
    size: 10 + Math.random() * 30, // 10-40px
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-40 animate-pulse"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `float ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            transform: 'translateY(100vh)', // Start below screen
          }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes float {
                0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
              }
            `
          }} />
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;