import React, { useState, useEffect } from 'react';
import { BREAKING_NEWS } from '../data/newsData';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface BreakingTickerProps {
  onSelectHeadline?: (headline: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onSelectHeadline }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BREAKING_NEWS.length) % BREAKING_NEWS.length);
  };

  return (
    <div
      className="bg-[#3B1E68] text-white border-b border-[#2C1550] px-4 py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Flash Label */}
        <div className="flex items-center gap-1.5 shrink-0 bg-[#F15A24] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px]">
          <Zap className="w-3.5 h-3.5" />
          <span>Flash Info</span>
        </div>

        {/* Ticker Item */}
        <div className="flex-1 overflow-hidden">
          <p
            onClick={() => onSelectHeadline?.(BREAKING_NEWS[currentIndex])}
            className="truncate font-medium hover:underline cursor-pointer transition-opacity duration-300 text-stone-100"
          >
            {BREAKING_NEWS[currentIndex]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0 text-purple-200">
          <span className="text-[11px] font-mono mr-1 tabular-nums">
            {currentIndex + 1}/{BREAKING_NEWS.length}
          </span>
          <button
            onClick={handlePrev}
            aria-label="Dépêche précédente"
            className="p-1 hover:text-white hover:bg-purple-900/60 rounded transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Dépêche suivante"
            className="p-1 hover:text-white hover:bg-purple-900/60 rounded transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
