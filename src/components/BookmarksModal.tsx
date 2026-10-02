import React from 'react';
import { Article } from '../types';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';

interface BookmarksModalProps {
  bookmarkedArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  bookmarkedArticles,
  onClose,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col my-auto max-h-[85vh]">
        
        {/* Top bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-[#F15A24]">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white">
                Articles sauvegardés
              </h3>
              <p className="text-xs text-stone-500">
                {bookmarkedArticles.length} article{bookmarkedArticles.length > 1 ? 's' : ''} disponible{bookmarkedArticles.length > 1 ? 's' : ''} hors-ligne
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bookmarkedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-2.5 py-1.5 text-xs text-stone-500 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1"
                title="Tout effacer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Effacer tout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {bookmarkedArticles.length > 0 ? (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-3 sm:p-4 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-[#3B1E68]/30 dark:hover:border-[#F15A24]/30 bg-stone-50/50 dark:bg-stone-800/40 transition-all flex items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#F15A24] uppercase">
                      {art.categoryLabel}
                    </span>
                    <h4 className="font-editorial text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] truncate">
                      {art.title}
                    </h4>
                    <span className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(art.id)}
                    className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="Retirer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2 text-stone-400 hover:text-[#3B1E68] dark:hover:text-[#F15A24] rounded-lg transition-colors"
                    title="Lire l'article"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                Vous n'avez pas encore d'articles sauvegardés.
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Cliquez sur l'icône de signet à côté de n'importe quel article pour le lire plus tard, même sans connexion.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
