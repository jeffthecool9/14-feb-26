import React from 'react';
import Background from './components/Background';
import LetterCard from './components/LetterCard';

const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen flex items-center justify-center px-4 py-12 md:px-8">
      <Background />
      
      {/* Content Container */}
      <div className="z-10 w-full flex justify-center">
        <LetterCard />
      </div>

      {/* Decorative overlaid gradient for cinematic feel */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-0"></div>
    </main>
  );
};

export default App;
