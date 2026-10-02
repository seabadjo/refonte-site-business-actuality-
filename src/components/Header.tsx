import React, { useState } from 'react';
import { Logo } from './Logo';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/newsData';
import { 
  Search, 
  Bookmark, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown, 
  Tv, 
  Radio, 
  SendHorizontal, 
  Briefcase 
} from 'lucide-react';

interface HeaderProps {
  currentCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenLiveTv: () => void;
  onOpenPressRelease: () => void;
  onOpenPartnership: () => void;
  onOpenAbout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenLiveTv,
  onOpenPressRelease,
  onOpenPartnership,
  onOpenAbout,
  darkMode,
  onToggleDarkMode,
  bookmarksCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Primary 5 nav links for the strict Top Bar contract
  const primaryNav: { id: CategoryId; label: string }[] = [
    { id: 'tous', label: 'Accueil' },
    { id: 'cote-divoire', label: 'Côte d’Ivoire' },
    { id: 'afrique', label: 'Afrique' },
    { id: 'economie', label: 'Économie' },
    { id: 'videos', label: 'Vidéos TV' },
  ];

  // Secondary nav links in the "Plus" dropdown
  const secondaryNav: { id: CategoryId; label: string }[] = [
    { id: 'investigation', label: 'Investigation' },
    { id: 'eco-tech', label: 'Eco / Tech' },
    { id: 'politique', label: 'Politique' },
    { id: 'societe', label: 'Société' },
    { id: 'sport', label: 'Sport' },
    { id: 'culture', label: 'Culture' },
    { id: 'monde', label: 'Monde' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Strict 1-Row, 3-Zone Contract Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              onSelectCategory('tous');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F15A24] rounded-lg p-0.5 text-left"
            aria-label="Business Actuality TV - Retour à l'accueil"
          >
            <Logo size="md" />
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {primaryNav.map((item) => {
            const isActive = currentCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#F15A24] ${
                  isActive
                    ? 'text-[#3B1E68] dark:text-[#F15A24] font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#3B1E68] dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F15A24] rounded-full" />
                )}
              </button>
            );
          })}

          {/* "Plus" Dropdown for secondary categories */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              className="flex items-center gap-1 py-1 text-stone-700 dark:text-stone-300 hover:text-[#3B1E68] dark:hover:text-white transition-colors whitespace-nowrap focus:outline-none"
            >
              <span>Rubriques</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {moreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {secondaryNav.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectCategory(sub.id);
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors flex items-center justify-between ${
                      currentCategory === sub.id
                        ? 'text-[#F15A24] font-semibold bg-stone-50 dark:bg-stone-800/50'
                        : 'text-stone-700 dark:text-stone-200'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {currentCategory === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-[#F15A24]" />}
                  </button>
                ))}
                <div className="border-t border-stone-100 dark:border-stone-800 my-1" />
                <button
                  onClick={() => {
                    onOpenAbout();
                    setMoreDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/80"
                >
                  À propos du média
                </button>
                <button
                  onClick={() => {
                    onOpenPartnership();
                    setMoreDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/80"
                >
                  Régie Publicitaire & Partenariats
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Stream Direct button */}
          <button
            onClick={onOpenLiveTv}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#F15A24] hover:bg-[#DE4E19] rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Direct TV</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Rechercher sur Business Actuality"
            title="Recherche avancée"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Articles sauvegardés"
            title="Mes favoris"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F15A24] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sub-bar for fast category switching on desktop */}
      <div className="hidden lg:block border-t border-stone-100 dark:border-stone-900 bg-stone-50/70 dark:bg-stone-900/50 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            {CATEGORIES.filter((c) => c.id !== 'tous').map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap transition-colors py-0.5 hover:text-[#3B1E68] dark:hover:text-white ${
                  currentCategory === cat.id
                    ? 'text-[#F15A24] font-semibold border-b border-[#F15A24]'
                    : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0 pl-4 border-l border-stone-200 dark:border-stone-800">
            <button
              onClick={onOpenPressRelease}
              className="flex items-center gap-1.5 hover:text-[#3B1E68] dark:hover:text-stone-200 transition-colors"
            >
              <SendHorizontal className="w-3.5 h-3.5 text-[#F15A24]" />
              <span>Communiqués de presse</span>
            </button>
            <button
              onClick={onOpenPartnership}
              className="flex items-center gap-1.5 hover:text-[#3B1E68] dark:hover:text-stone-200 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-stone-400" />
              <span>Partenariats & Régie</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 py-5 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Quick TV live button on mobile */}
          <button
            onClick={() => {
              onOpenLiveTv();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 mb-4 rounded-lg bg-[#F15A24] text-white font-bold text-sm shadow-md"
          >
            <Tv className="w-4 h-4" />
            <span>Regarder Business Actuality TV en direct</span>
          </button>

          <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 mb-2">
            Rubriques de l'actualité
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  currentCategory === cat.id
                    ? 'bg-[#3B1E68] text-white'
                    : 'bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-2">
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-stone-700 dark:text-stone-300 font-medium"
            >
              À propos de Business Actuality TV
            </button>
            <button
              onClick={() => {
                onOpenPressRelease();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-stone-700 dark:text-stone-300 font-medium flex items-center gap-2"
            >
              <SendHorizontal className="w-4 h-4 text-[#F15A24]" />
              <span>Soumettre un communiqué de presse</span>
            </button>
            <button
              onClick={() => {
                onOpenPartnership();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-sm text-stone-700 dark:text-stone-300 font-medium flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#F15A24]" />
              <span>Annonceurs & Régie publicitaire</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
