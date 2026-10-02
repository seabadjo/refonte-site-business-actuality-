import React from 'react';
import { Journalist, Article } from '../types';
import { X, Mail, Twitter, Linkedin, BookOpen, Clock } from 'lucide-react';

interface JournalistModalProps {
  journalist: Journalist;
  authoredArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const JournalistModal: React.FC<JournalistModalProps> = ({
  journalist,
  authoredArticles,
  onClose,
  onSelectArticle,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
        
        {/* Banner with brand purple */}
        <div className="h-28 bg-gradient-to-r from-[#3B1E68] to-[#602D96] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar overlap */}
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <img
              src={journalist.avatar}
              alt={journalist.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-stone-900 shadow-md"
            />
            <div className="flex items-center gap-2">
              {journalist.twitter && (
                <a
                  href={`https://twitter.com/${journalist.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#F15A24] transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {journalist.linkedin && (
                <a
                  href={`https://linkedin.com/in/${journalist.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#F15A24] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${journalist.email}`}
                className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#F15A24] transition-colors"
                title="Contacter par email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-white">
            {journalist.name}
          </h3>
          <p className="text-xs font-semibold text-[#F15A24] uppercase tracking-wider mb-3">
            {journalist.role}
          </p>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
            {journalist.bio}
          </p>

          {/* Authored Articles */}
          <div className="border-t border-stone-200 dark:border-stone-800 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#F15A24]" />
              <span>Articles & Enquêtes signés ({authoredArticles.length})</span>
            </h4>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {authoredArticles.length > 0 ? (
                authoredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onClose();
                      onSelectArticle(art);
                    }}
                    className="group cursor-pointer p-3 rounded-xl border border-stone-100 dark:border-stone-800 hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 bg-stone-50/60 dark:bg-stone-800/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-[#F15A24] uppercase">
                        {art.categoryLabel}
                      </span>
                      <h5 className="text-xs font-semibold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] truncate">
                        {art.title}
                      </h5>
                    </div>
                    <span className="text-[11px] text-stone-400 shrink-0 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic py-2">
                  Aucun article archivé pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
