import React, { useState } from 'react';
import { Article, Comment, Journalist } from '../types';
import { 
  X, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Clock, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Check, 
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onOpenJournalist: (journalist: Journalist) => void;
  onSelectRelatedArticle: (article: Article) => void;
  relatedArticles: Article[];
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenJournalist,
  onSelectRelatedArticle,
  relatedArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<Comment[]>(article.comments || []);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentCity, setNewCommentCity] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  const handleShare = (network: string) => {
    const url = window.location.href;
    const text = encodeURIComponent(`${article.title} - Business Actuality TV`);
    let shareUrl = '';

    switch (network) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(url)}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: newCommentName.trim(),
      city: newCommentCity.trim() || 'Afrique',
      date: 'À l’instant',
      text: newCommentText.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentCity('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto min-h-screen sm:min-h-0 border border-stone-200 dark:border-stone-800">
        
        {/* Sticky top modal control bar */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-[#F15A24]">{article.categoryLabel}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hidden sm:inline">Article</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size picker */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-white dark:bg-stone-700 shadow-xs text-stone-900 dark:text-white font-bold' : 'text-stone-500'}`}
                title="Taille normale"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded ${fontSize === 'large' ? 'bg-white dark:bg-stone-700 shadow-xs text-stone-900 dark:text-white font-bold' : 'text-stone-500'}`}
                title="Grande taille"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded ${fontSize === 'xlarge' ? 'bg-white dark:bg-stone-700 shadow-xs text-stone-900 dark:text-white font-bold' : 'text-stone-500'}`}
                title="Très grande taille"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-[#F15A24] bg-orange-50 dark:bg-orange-950/40'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F15A24]' : ''}`} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Fermer la lecture"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-8 lg:p-12 overflow-y-auto">
          {/* Header metadata (Zero-Pill) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
            <span className="text-[#F15A24] font-bold uppercase tracking-wider">{article.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Publié le {article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono tabular-nums">
              <Eye className="w-3.5 h-3.5" />
              {article.views.toLocaleString()} lectures
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-light leading-relaxed mb-6 border-l-2 border-[#F15A24] pl-4 italic">
              {article.subtitle}
            </p>
          )}

          {/* Journalist Byline & Actions bar */}
          <div className="py-4 border-y border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              onClick={() => onOpenJournalist(article.author)}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-stone-200 dark:border-stone-700 group-hover:ring-2 group-hover:ring-[#F15A24] transition-all"
              />
              <div>
                <p className="font-semibold text-sm text-stone-900 dark:text-white group-hover:text-[#F15A24] transition-colors">
                  {article.author.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {article.author.role}
                </p>
              </div>
            </button>

            {/* Audio narration simulator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isPlayingAudio
                    ? 'bg-[#F15A24] text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Pause ({article.audioDuration || '5:00'})</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#F15A24]" />
                    <span>Écouter cet article</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audio Player simulation banner if active */}
          {isPlayingAudio && (
            <div className="mb-8 p-4 rounded-xl bg-[#3B1E68]/10 dark:bg-[#3B1E68]/30 border border-[#3B1E68]/20 flex items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#F15A24] animate-ping" />
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  Lecture audio en cours · Narration studio Business Actuality TV
                </span>
              </div>
              <div className="w-32 bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#F15A24] h-full w-2/5 animate-pulse" />
              </div>
            </div>
          )}

          {/* Main Visual Image */}
          <div className="mb-8 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[480px] object-cover"
            />
            {article.imageCaption && (
              <p className="p-3 text-xs italic text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 border-t border-stone-100 dark:border-stone-800">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Editorial Prose Content */}
          <div className={`prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 font-sans space-y-6 ${fontClasses}`}>
            {article.content.map((paragraph, index) => {
              if (index === 0) {
                return (
                  <p key={index} className="drop-cap font-normal">
                    {paragraph}
                  </p>
                );
              }

              // Intersperse pull quote if present
              if (index === 2 && article.pullQuote) {
                return (
                  <React.Fragment key={index}>
                    <blockquote className="my-8 py-4 px-6 border-l-4 border-[#F15A24] bg-stone-50 dark:bg-stone-800/40 rounded-r-xl">
                      <p className="font-editorial text-xl sm:text-2xl italic font-semibold text-[#3B1E68] dark:text-[#E0D7F5] leading-snug">
                        {article.pullQuote}
                      </p>
                    </blockquote>
                    <p>{paragraph}</p>
                  </React.Fragment>
                );
              }

              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mr-1">Mots-clés :</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="my-8 p-5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              Partager cet article sur vos réseaux :
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('x')}
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>X (Twitter)</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>LinkedIn</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#F15A24]" />
                <span>Espace Débat & Réactions ({comments.length})</span>
              </h3>
              <span className="text-xs text-stone-500 dark:text-stone-400 italic">
                Commentaires modérés selon notre charte éthique
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleAddComment} className="mb-8 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-3">
                Prenez part à la discussion :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Votre nom complet *"
                  required
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                />
                <input
                  type="text"
                  placeholder="Votre ville / pays (ex: Abidjan, CI)"
                  value={newCommentCity}
                  onChange={(e) => setNewCommentCity(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                />
              </div>
              <textarea
                placeholder="Exprimez votre point de vue avec respect et esprit constructif..."
                required
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none focus:ring-1 focus:ring-[#F15A24] mb-3"
              />
              <div className="flex items-center justify-between">
                {commentSuccess && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Votre commentaire a été publié avec succès.
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3B1E68] hover:bg-[#2C1550] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publier mon commentaire</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <div className="flex items-center gap-1.5 font-medium text-stone-900 dark:text-white">
                      <span>{comment.author}</span>
                      <span className="text-stone-400 font-normal">({comment.city})</span>
                      {comment.isVerified && (
                        <span className="text-[10px] text-[#F15A24] font-semibold bg-orange-50 dark:bg-orange-950/40 px-1 rounded">
                          Vérifié
                        </span>
                      )}
                    </div>
                    <span>{comment.date}</span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 hover:text-[#F15A24] transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                      Répondre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800">
              <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-white mb-6">
                Sur le même thème
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectRelatedArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 transition-all"
                  >
                    <span className="text-[11px] font-bold text-[#F15A24] uppercase">
                      {rel.categoryLabel}
                    </span>
                    <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors line-clamp-2 mt-1 mb-2">
                      {rel.title}
                    </h4>
                    <span className="text-xs text-stone-500">{rel.readTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
