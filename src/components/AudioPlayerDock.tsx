import React, { useState, useEffect } from 'react';
import { Play, Pause, X, RotateCcw, RotateCw, Volume2, Headphones } from 'lucide-react';

interface AudioPlayerDockProps {
  title: string;
  subtitle: string;
  duration: string;
  onClose: () => void;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({
  title,
  subtitle,
  duration,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-14 md:bottom-4 inset-x-4 max-w-3xl mx-auto z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-stone-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-stone-800 p-3 sm:p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#3B1E68] text-[#F15A24] flex items-center justify-center shrink-0 border border-purple-500/20">
              <Headphones className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#F15A24] uppercase tracking-wider block">
                {subtitle}
              </span>
              <p className="text-xs font-semibold text-stone-100 truncate">
                {title}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              title="-15s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-[#F15A24] hover:bg-[#DE4E19] text-white transition-transform active:scale-95 shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              title="+15s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-stone-400 tabular-nums">
              <span>{duration}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors ml-1"
              title="Fermer le lecteur"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.min(100, Math.max(0, clickPos * 100)));
          }}
          className="w-full h-1 bg-stone-800 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden"
        >
          <div
            className="bg-[#F15A24] h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
