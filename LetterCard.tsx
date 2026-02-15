import React, { useState, useEffect } from 'react';
import { CONFESSION_TEXT } from '../constants';
import { Heart, Send, Moon } from 'lucide-react';

const LetterCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    // Simple entrance animation trigger
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRelease = () => {
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className={`
        flex flex-col items-center justify-center h-full px-6 text-center transition-opacity duration-2000
        ${isSent ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="mb-6 animate-bounce text-slate-400">
          <Moon size={48} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif text-slate-200 mb-4 tracking-wide">Released</h2>
        <p className="text-slate-400 font-light max-w-md">
          Your message has been released into the digital void. Maybe, just maybe, the wind will carry it to Suki.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`
        relative w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 
        rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      {/* Decorative top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="p-8 md:p-12 relative">
        {/* Quote Icon Background */}
        <div className="absolute top-6 left-6 opacity-5">
           <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-white">
             <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
           </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 p-3 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Heart className="text-indigo-300 w-6 h-6 animate-pulse" fill="rgba(165, 180, 252, 0.2)" />
          </div>

          <div className="space-y-6 text-center">
            <h1 className="font-serif text-3xl md:text-4xl text-slate-100 italic tracking-wider">
              A Message for Suki
            </h1>
            
            <div className="w-16 h-px bg-indigo-500/30 mx-auto my-4"></div>

            <p className="font-serif text-lg md:text-xl leading-relaxed text-slate-300 whitespace-pre-line tracking-wide">
              "{CONFESSION_TEXT}"
            </p>
          </div>

          <div className="mt-12 w-full flex justify-center">
            <button 
              onClick={handleRelease}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-light text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <span className="mr-2">Release Message</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer subtle text */}
      <div className="absolute bottom-4 right-6 text-xs text-slate-600 font-mono">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default LetterCard;
