import React, { useState } from 'react';
import { Article } from '../types';
import { Bookmark, Share2, Volume2, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  onBookmark: (article: Article, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  onShare: (article: Article, e: React.MouseEvent) => void;
  onPlayAudio?: (article: Article, e: React.MouseEvent) => void;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onBookmark,
  isBookmarked,
  onShare,
  onPlayAudio,
  variant = 'standard',
}) => {
  const [imgError, setImgError] = useState(false);

  // Variant: Featured (Lead Story in Bloc 1)
  if (variant === 'featured') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group relative cursor-pointer bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col lg:flex-row"
      >
        {/* Visual Zone */}
        <div className="relative lg:w-3/5 aspect-16/9 lg:aspect-auto overflow-hidden bg-stone-100 dark:bg-stone-800">
          {!imgError ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#3B1E68] to-[#1F0C3B] text-white p-6">
              <span className="font-editorial text-2xl text-center italic">{article.title}</span>
            </div>
          )}

          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          {/* Quick audio badge affordance */}
          {article.audioDuration && onPlayAudio && (
            <button
              onClick={(e) => onPlayAudio(article, e)}
              title="Écouter l'article"
              className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/75 hover:bg-[#F15A24] text-white text-xs font-medium rounded-md backdrop-blur-sm transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Écouter ({article.audioDuration})</span>
            </button>
          )}
        </div>

        {/* Content Zone */}
        <div className="p-6 lg:p-8 lg:w-2/5 flex flex-col justify-between">
          <div>
            {/* Unboxed clean metadata (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-[#F15A24] font-semibold tracking-wide uppercase mb-2.5">
              <span>{article.categoryLabel}</span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
              <span className="text-stone-500 dark:text-stone-400 font-normal lowercase">{article.timestamp}</span>
            </div>

            <h2 className="font-editorial text-2xl lg:text-3xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors leading-tight mb-3">
              {article.title}
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>
          </div>

          {/* Card footer with Author and Actions */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium text-stone-800 dark:text-stone-200">{article.author.name}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => onShare(article, e)}
                aria-label="Partager l'article"
                className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => onBookmark(article, e)}
                aria-label="Sauvegarder l'article"
                className={`p-1.5 transition-colors ${
                  isBookmarked
                    ? 'text-[#F15A24]'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F15A24]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Variant: Horizontal (for secondary articles in Bloc 1 or search results)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex gap-4 hover:border-[#3B1E68]/30 dark:hover:border-[#F15A24]/30 transition-all duration-200 shadow-xs hover:shadow-sm"
      >
        <div className="w-28 sm:w-36 aspect-4/3 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
          {!imgError ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#3B1E68]/10 flex items-center justify-center text-xs font-serif text-[#3B1E68]">
              BA TV
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-1">
              <span className="font-semibold text-[#F15A24]">{article.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{article.timestamp}</span>
            </div>

            <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mt-2">
            <span>{article.readTime}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => onBookmark(article, e)}
                className={`p-1 ${isBookmarked ? 'text-[#F15A24]' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#F15A24]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Variant: Standard Card (Default 3-column grid)
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-[#3B1E68]/30 dark:hover:border-[#F15A24]/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
        {!imgError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#3B1E68]/15 flex items-center justify-center p-4 text-center text-sm font-editorial italic text-stone-700">
            {article.title}
          </div>
        )}

        {/* Audio badge if available */}
        {article.audioDuration && onPlayAudio && (
          <button
            onClick={(e) => onPlayAudio(article, e)}
            title="Écouter l'article"
            className="absolute bottom-2.5 left-2.5 p-1.5 bg-black/70 hover:bg-[#F15A24] text-white rounded-md backdrop-blur-sm transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata unboxed */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-semibold text-[#F15A24]">{article.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.timestamp}</span>
          </div>

          <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors leading-snug line-clamp-2 mb-2">
            {article.title}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Par {article.author.name}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => onShare(article, e)}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              title="Partager"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => onBookmark(article, e)}
              className={`p-1 transition-colors ${
                isBookmarked ? 'text-[#F15A24]' : 'text-stone-400 hover:text-stone-700'
              }`}
              title="Sauvegarder"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#F15A24]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
