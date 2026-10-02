import React from 'react';
import { Home, Tv, Radio, Bookmark, Search } from 'lucide-react';
import { CategoryId } from '../types';

interface MobileBottomNavProps {
  currentCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenLiveTv: () => void;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenLiveTv,
  onOpenBookmarks,
  onOpenSearch,
  bookmarksCount,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 py-2 px-3">
      <div className="flex items-center justify-around">
        <button
          onClick={() => {
            onSelectCategory('tous');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentCategory === 'tous'
              ? 'text-[#3B1E68] dark:text-[#F15A24] font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Accueil</span>
        </button>

        <button
          onClick={() => onSelectCategory('videos')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            currentCategory === 'videos'
              ? 'text-[#3B1E68] dark:text-[#F15A24] font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Vidéos TV</span>
        </button>

        {/* Central Direct TV Action button */}
        <button
          onClick={onOpenLiveTv}
          className="flex flex-col items-center gap-1 -mt-4 bg-[#F15A24] text-white py-2 px-3 rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          <Radio className="w-5 h-5 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-wide">Direct</span>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium text-stone-500 dark:text-stone-400"
        >
          <Bookmark className="w-4 h-4" />
          <span>Favoris</span>
          {bookmarksCount > 0 && (
            <span className="absolute top-0 right-3 w-3.5 h-3.5 bg-[#F15A24] text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
              {bookmarksCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium text-stone-500 dark:text-stone-400"
        >
          <Search className="w-4 h-4" />
          <span>Recherche</span>
        </button>
      </div>
    </nav>
  );
};
