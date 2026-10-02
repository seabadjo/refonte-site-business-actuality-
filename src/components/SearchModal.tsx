import React, { useState, useMemo } from 'react';
import { Article, CategoryId } from '../types';
import { CATEGORIES } from '../data/newsData';
import { Search, X, Clock, Eye, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  articles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  articles,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('tous');
  const [filterType, setFilterType] = useState<'all' | 'investigation' | 'dossier'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'views'>('recent');

  const filteredResults = useMemo(() => {
    return articles
      .filter((art) => {
        // Text match
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchExcerpt = art.excerpt.toLowerCase().includes(q);
          const matchTag = art.tags.some((t) => t.toLowerCase().includes(q));
          const matchAuthor = art.author.name.toLowerCase().includes(q);
          if (!matchTitle && !matchExcerpt && !matchTag && !matchAuthor) return false;
        }

        // Category match
        if (selectedCategory !== 'tous' && art.category !== selectedCategory) {
          return false;
        }

        // Type match
        if (filterType === 'investigation' && !art.isInvestigation) return false;
        if (filterType === 'dossier' && !art.isDossier) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'views') return b.views - a.views;
        return 0; // Default recent
      });
  }, [articles, query, selectedCategory, filterType, sortBy]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col my-auto max-h-[85vh]">
        
        {/* Top search input box */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-4" />
            <input
              type="text"
              autoFocus
              placeholder="Rechercher un sujet, un corridor, un pays, un ministre ou un mot-clé..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F15A24]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Advanced filter controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Category Select */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Rubrique :</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryId)}
                className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type buttons */}
            <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-stone-800 p-0.5 rounded-lg">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilterType('investigation')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterType === 'investigation'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Enquêtes
              </button>
              <button
                onClick={() => setFilterType('dossier')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterType === 'dossier'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Dossiers
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'views')}
                className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none"
              >
                <option value="recent">Plus récents</option>
                <option value="views">Plus consultés</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>
              {filteredResults.length} résultat{filteredResults.length > 1 ? 's' : ''} trouvé{filteredResults.length > 1 ? 's' : ''}
            </span>
            <button onClick={onClose} className="hover:text-stone-800 dark:hover:text-stone-200">
              Fermer (ESC)
            </button>
          </div>

          {filteredResults.length > 0 ? (
            filteredResults.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="group cursor-pointer p-3 sm:p-4 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 bg-stone-50/40 dark:bg-stone-800/40 transition-all flex items-start gap-4"
              >
                <div className="w-20 sm:w-28 aspect-4/3 rounded-lg overflow-hidden shrink-0 bg-stone-200 dark:bg-stone-800">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                    <span className="font-semibold text-[#F15A24] uppercase">{art.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.timestamp}</span>
                  </div>

                  <h4 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors line-clamp-2 leading-snug mb-1">
                    {art.title}
                  </h4>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 hidden sm:block">
                    {art.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-stone-400 mt-2">
                    <span>Par {art.author.name}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Eye className="w-3 h-3" />
                      {art.views.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 pt-2 text-stone-400 group-hover:text-[#F15A24] group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                Aucun article ne correspond à vos critères.
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Essayez d'élargir votre recherche ou de sélectionner « Toutes les rubriques ».
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
