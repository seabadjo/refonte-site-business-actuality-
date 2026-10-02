import React from 'react';
import { MARKET_DATA } from '../data/newsData';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface MarketTickerProps {
  onOpenLiveTv?: () => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onOpenLiveTv }) => {
  // Format current date in French
  const today = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="bg-stone-900 text-stone-300 text-xs border-b border-stone-800 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Date & Location */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 text-stone-400">
          <span className="font-medium text-stone-200">{formattedDate}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Abidjan (GMT)</span>
        </div>

        {/* Live Market Bar */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 text-[11px] font-mono tabular-nums">
          <div className="flex items-center gap-1.5 shrink-0 text-[#F15A24] font-sans font-bold uppercase tracking-wider text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24] animate-ping" />
            Marchés BRVM & Matières Premières
          </div>

          <div className="flex items-center gap-5 whitespace-nowrap">
            {MARKET_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <span className="text-stone-400 font-sans text-xs">{item.name}:</span>
                <span className="font-semibold text-stone-200">{item.value}</span>
                <span
                  className={`flex items-center text-[10px] ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct TV Action trigger */}
        <button
          onClick={onOpenLiveTv}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors uppercase tracking-wider shrink-0"
        >
          <Radio className="w-3 h-3 animate-pulse" />
          <span>BA TV Direct</span>
        </button>
      </div>
    </div>
  );
};
