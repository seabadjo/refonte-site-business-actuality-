import React, { useState, useEffect } from 'react';
import { 
  Article, 
  CategoryId, 
  Journalist, 
  VideoItem, 
  PodcastItem 
} from './types';
import { 
  ARTICLES, 
  CATEGORIES, 
  VIDEOS, 
  PODCASTS, 
  JOURNALISTS 
} from './data/newsData';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { BreakingTicker } from './components/BreakingTicker';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { JournalistModal } from './components/JournalistModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { PressReleaseModal } from './components/PressReleaseModal';
import { PartnershipModal } from './components/PartnershipModal';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { MobileBottomNav } from './components/MobileBottomNav';
import { NewsletterSection } from './components/NewsletterSection';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { 
  Play, 
  Tv, 
  Headphones, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Radio, 
  Clock, 
  Share2, 
  Bookmark, 
  MapPin, 
  Volume2,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function App() {
  // Navigation & Category state
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('tous');
  
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ba_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ba_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ba_theme', 'light');
    }
  }, [darkMode]);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ba_bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const toggleBookmark = (article: Article, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(article.id);
      const next = exists ? prev.filter((id) => id !== article.id) : [...prev, article.id];
      localStorage.setItem('ba_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const removeBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.filter((id) => id !== articleId);
      localStorage.setItem('ba_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
    localStorage.removeItem('ba_bookmarks');
  };

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedJournalist, setSelectedJournalist] = useState<Journalist | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [pressReleaseOpen, setPressReleaseOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [aboutViewOpen, setAboutViewOpen] = useState(false);
  const [liveTvModalOpen, setLiveTvModalOpen] = useState(false);

  // Persistent Audio Dock state
  const [activeAudio, setActiveAudio] = useState<{
    title: string;
    subtitle: string;
    duration: string;
  } | null>(null);

  const handlePlayArticleAudio = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAudio({
      title: article.title,
      subtitle: `Narration : ${article.author.name}`,
      duration: article.audioDuration || '05:00',
    });
  };

  const handlePlayPodcast = (podcast: PodcastItem) => {
    setActiveAudio({
      title: podcast.title,
      subtitle: `${podcast.show} · ${podcast.host}`,
      duration: podcast.duration,
    });
  };

  // Share handler for cards
  const handleQuickShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert('Lien de l’article copié dans le presse-papier !');
    }
  };

  // Filtered articles when a specific category is selected
  const isCategoryFiltered = currentCategory !== 'tous';
  const categoryArticles = ARTICLES.filter((a) => a.category === currentCategory);

  // Home page articles partitioning based on prompt's 8 blocks
  // Bloc 1: Actualité principale (Lead story + 2-3 secondary)
  const leadArticle = ARTICLES[0];
  const secondaryLeadArticles = [ARTICLES[1], ARTICLES[2]];

  // Bloc 2: Chronological feed
  const timelineArticles = [...ARTICLES].slice(0, 5);

  // Bloc 3: Afrique
  const afriqueArticles = ARTICLES.filter(
    (a) => a.category === 'afrique' || a.category === 'monde' || a.tags.includes('ZLECAf')
  );

  // Bloc 4: Business et Économie
  const businessArticles = ARTICLES.filter(
    (a) => a.category === 'economie' || a.tags.includes('Finance') || a.tags.includes('Cacao')
  );

  // Bloc 6: Côte d'Ivoire
  const coteDIvoireArticles = ARTICLES.filter(
    (a) => a.category === 'cote-divoire' || a.tags.includes('Côte d’Ivoire') || a.tags.includes('Abidjan')
  );

  // Bloc 7: Dossiers et Analyses
  const dossierArticles = ARTICLES.filter((a) => a.isDossier);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col transition-colors selection:bg-[#F15A24]/20 selection:text-[#3B1E68]">
      
      {/* 1. Live Market Ticker & GMT strip */}
      <MarketTicker onOpenLiveTv={() => setSelectedVideo(VIDEOS[0])} />

      {/* 2. Breaking News Ticker (Flash Info) */}
      <BreakingTicker onSelectHeadline={() => setSelectedArticle(ARTICLES[0])} />

      {/* 3. Main Navigation Header (Strict 1-row 3-zone contract) */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setAboutViewOpen(false);
          setCurrentCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenLiveTv={() => setSelectedVideo(VIDEOS[0])}
        onOpenPressRelease={() => setPressReleaseOpen(true)}
        onOpenPartnership={() => setPartnershipOpen(true)}
        onOpenAbout={() => {
          setAboutViewOpen(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        bookmarksCount={bookmarkedIds.length}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* VIEW A: About Page View */}
        {aboutViewOpen ? (
          <AboutView
            onOpenJournalist={(j) => setSelectedJournalist(j)}
            onOpenPressRelease={() => setPressReleaseOpen(true)}
            onOpenPartnership={() => setPartnershipOpen(true)}
          />
        ) : isCategoryFiltered ? (
          /* VIEW B: Dedicated Category Page View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
            {/* Breadcrumb & Category Title */}
            <div className="mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                <button
                  onClick={() => setCurrentCategory('tous')}
                  className="hover:text-[#3B1E68] dark:hover:text-white"
                >
                  Accueil
                </button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#F15A24] font-semibold">
                  {CATEGORIES.find((c) => c.id === currentCategory)?.label}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white">
                    {CATEGORIES.find((c) => c.id === currentCategory)?.label}
                  </h1>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
                    {CATEGORIES.find((c) => c.id === currentCategory)?.description}
                  </p>
                </div>
                <span className="text-xs text-stone-500 font-mono">
                  {categoryArticles.length} article{categoryArticles.length > 1 ? 's' : ''} disponible{categoryArticles.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Articles Grid for the category */}
            {categoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={(a) => setSelectedArticle(a)}
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onShare={handleQuickShare}
                    onPlayAudio={handlePlayArticleAudio}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
                <Compass className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
                <h3 className="font-editorial text-xl font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Rubrique en cours d’actualisation
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
                  Nos correspondants et envoyés spéciaux préparent de nouveaux reportages pour cette section.
                </p>
                <button
                  onClick={() => setCurrentCategory('tous')}
                  className="px-4 py-2 bg-[#3B1E68] text-white text-xs font-semibold rounded-lg hover:bg-[#2A134E] transition-colors"
                >
                  Retourner à l’accueil
                </button>
              </div>
            )}
          </div>
        ) : (
          /* VIEW C: Full Homepage Architecture (8 Blocs) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
            
            {/* ========================================================
                BLOC 1 : ACTUALITÉ PRINCIPALE
                Une grande image avec le sujet principal du jour + 2-3 secondaires
               ======================================================== */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F15A24]" />
                  <h2 className="font-editorial text-2xl font-bold tracking-tight text-stone-900 dark:text-white uppercase text-sm">
                    À la Une
                  </h2>
                </div>
                <span className="text-xs text-stone-500">Édition du jour</span>
              </div>

              {/* Grid: 1 Big Featured Story (Left/Top) + 2 Secondary Stories (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Primary lead story (Takes 7 cols on desktop) */}
                <div className="lg:col-span-7">
                  <ArticleCard
                    article={leadArticle}
                    onSelect={(a) => setSelectedArticle(a)}
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.includes(leadArticle.id)}
                    onShare={handleQuickShare}
                    onPlayAudio={handlePlayArticleAudio}
                    variant="featured"
                  />
                </div>

                {/* Secondary 2 articles (Takes 5 cols on desktop) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {secondaryLeadArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={(a) => setSelectedArticle(a)}
                      onBookmark={toggleBookmark}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      onShare={handleQuickShare}
                      onPlayAudio={handlePlayArticleAudio}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================
                BLOC 2 : DERNIÈRES NOUVELLES (Fil Chronologique Direct)
               ======================================================== */}
            <section className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="font-editorial text-xl font-bold text-stone-900 dark:text-white">
                      Le Fil d’Actualité Direct
                    </h2>
                    <p className="text-xs text-stone-500">
                      Flux chronologique des dépêches et annonces en temps réel
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>En direct d'Abidjan & des capitales</span>
                </div>
              </div>

              {/* Timeline list */}
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {timelineArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="group cursor-pointer py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 dark:hover:bg-stone-800/40 rounded-lg px-2 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="text-[11px] font-mono text-[#F15A24] font-semibold shrink-0 pt-0.5 sm:pt-0">
                        {art.timestamp}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0 hidden md:inline">
                        [{art.categoryLabel}]
                      </span>
                      <h4 className="text-sm font-semibold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors line-clamp-1">
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-stone-400 shrink-0 sm:self-center">
                      <span className="hidden lg:inline">{art.author.name}</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                BLOC 3 : AFRIQUE (Visuel, Panafricain, Géopolitique)
               ======================================================== */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F15A24]">
                    Intégration & Géopolitique
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    Afrique : Les Nouvelles Frontières du Continent
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentCategory('afrique')}
                  className="text-xs font-semibold text-[#3B1E68] dark:text-[#E0D7F5] hover:text-[#F15A24] flex items-center gap-1 transition-colors"
                >
                  <span>Tous les articles Afrique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {afriqueArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={(a) => setSelectedArticle(a)}
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onShare={handleQuickShare}
                    onPlayAudio={handlePlayArticleAudio}
                  />
                ))}
              </div>
            </section>

            {/* ========================================================
                BLOC 4 : BUSINESS & ÉCONOMIE
                Analyses, entreprises, finance, entrepreneuriat, innovation
               ======================================================== */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F15A24]">
                    Marchés, Banques & Corridors
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    Business & Économie Africaine
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentCategory('economie')}
                  className="text-xs font-semibold text-[#3B1E68] dark:text-[#E0D7F5] hover:text-[#F15A24] flex items-center gap-1 transition-colors"
                >
                  <span>Espace Économie</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={(a) => setSelectedArticle(a)}
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onShare={handleQuickShare}
                    onPlayAudio={handlePlayArticleAudio}
                  />
                ))}
              </div>
            </section>

            {/* ========================================================
                BLOC 5 : VIDÉOS & TV BROADCAST
                Interviews, reportages, débats, chroniques et émissions
               ======================================================== */}
            <section className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F15A24] text-white">
                        <Tv className="w-3.5 h-3.5" />
                        <span>Business Actuality TV</span>
                      </span>
                      <span className="text-xs text-stone-400">Le pôle audiovisuel</span>
                    </div>
                    <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
                      Les Émissions & Grands Entretiens TV
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Reportages exclusifs de terrain, débats macro-économiques et profils d’entrepreneurs
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedVideo(VIDEOS[0])}
                    className="px-4 py-2 bg-[#F15A24] hover:bg-[#DE4E19] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Lancer la TV en continu</span>
                  </button>
                </div>

                {/* Main Video Highlight + Secondary Video Queue */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Big Video Card */}
                  <div
                    onClick={() => setSelectedVideo(VIDEOS[0])}
                    className="lg:col-span-7 group cursor-pointer relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800/80 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="relative aspect-16/9 overflow-hidden">
                      <img
                        src={VIDEOS[0].thumbnailUrl}
                        alt={VIDEOS[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      {/* Big Center Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#F15A24]/90 group-hover:bg-[#F15A24] group-hover:scale-110 text-white flex items-center justify-center shadow-2xl transition-all">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </div>
                      </div>

                      <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                        {VIDEOS[0].duration}
                      </span>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-bold text-[#F15A24] uppercase tracking-wider block mb-1">
                        {VIDEOS[0].showName} · {VIDEOS[0].presenter}
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-orange-300 transition-colors leading-snug mb-2">
                        {VIDEOS[0].title}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {VIDEOS[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Secondary Video Grid (3 videos) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {VIDEOS.slice(1, 4).map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => setSelectedVideo(vid)}
                        className="group cursor-pointer p-3 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-purple-500/30 transition-all flex gap-4"
                      >
                        <div className="relative w-36 aspect-16/9 rounded-xl overflow-hidden shrink-0 bg-stone-800">
                          <img
                            src={vid.thumbnailUrl}
                            alt={vid.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                            <Play className="w-5 h-5 text-white fill-current opacity-90 group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-mono px-1 rounded text-stone-300">
                            {vid.duration}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className="text-[10px] font-semibold text-[#F15A24] uppercase tracking-wider">
                            {vid.showName}
                          </span>
                          <h4 className="font-editorial text-sm font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2 leading-snug mt-0.5">
                            {vid.title}
                          </h4>
                          <span className="text-[11px] text-stone-500 mt-1">
                            Par {vid.presenter}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                BLOC 6 : CÔTE D'IVOIRE
                Actualité nationale, grands projets, cacao, collectivités
               ======================================================== */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 via-white to-emerald-600 border border-stone-300" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F15A24]">
                      Actualité Nationale & Collectivités
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                      Côte d’Ivoire : Le Hub Économique Régional
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentCategory('cote-divoire')}
                  className="text-xs font-semibold text-[#3B1E68] dark:text-[#E0D7F5] hover:text-[#F15A24] flex items-center gap-1 transition-colors"
                >
                  <span>Toute l’actu ivoirienne</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coteDIvoireArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={(a) => setSelectedArticle(a)}
                    onBookmark={toggleBookmark}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onShare={handleQuickShare}
                    onPlayAudio={handlePlayArticleAudio}
                  />
                ))}
              </div>
            </section>

            {/* ========================================================
                BLOC 7 : DOSSIERS ET ANALYSES & PODCASTS
                Contenus longs formats et enquêtes approfondies
               ======================================================== */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F15A24]">
                    Grands Formats & Enquêtes
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    Dossiers Stratégiques & Podcasts
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentCategory('investigation')}
                  className="text-xs font-semibold text-[#3B1E68] dark:text-[#E0D7F5] hover:text-[#F15A24] flex items-center gap-1 transition-colors"
                >
                  <span>Tous les dossiers d'enquête</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Dossiers Articles (Takes 8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  {dossierArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 transition-all flex flex-col sm:flex-row gap-5 shadow-xs hover:shadow-sm"
                    >
                      <div className="sm:w-52 aspect-16/10 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#F15A24] font-bold uppercase tracking-wider mb-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>Dossier : {article.dossierName || article.categoryLabel}</span>
                          </div>

                          <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] transition-colors leading-snug mb-2">
                            {article.title}
                          </h3>

                          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                          <span>Par {article.author.name}</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audio Podcasts Rail (Takes 4 cols) */}
                <div className="lg:col-span-4 bg-stone-100 dark:bg-stone-900/80 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Headphones className="w-5 h-5 text-[#F15A24]" />
                    <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white">
                      Les Podcasts Éco
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mb-6">
                    Écoutez les chroniques de la rédaction en mobilité, dans les transports ou au bureau.
                  </p>

                  <div className="space-y-4">
                    {PODCASTS.map((pod) => (
                      <div
                        key={pod.id}
                        onClick={() => handlePlayPodcast(pod)}
                        className="group cursor-pointer p-3.5 rounded-xl bg-white dark:bg-stone-800/80 hover:bg-orange-50/50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700/60 transition-all flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#F15A24] uppercase tracking-wider block">
                            {pod.show}
                          </span>
                          <h4 className="font-editorial text-sm font-bold text-stone-900 dark:text-white group-hover:text-[#3B1E68] dark:group-hover:text-[#F15A24] truncate">
                            {pod.title}
                          </h4>
                          <span className="text-[11px] text-stone-400">
                            {pod.host} · {pod.duration}
                          </span>
                        </div>

                        <button
                          className="p-2.5 rounded-full bg-[#3B1E68] group-hover:bg-[#F15A24] text-white shrink-0 shadow-sm transition-colors"
                          title="Écouter le podcast"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                BLOC 8 : NEWSLETTER
                Recevez l'essentiel de l'actualité africaine
               ======================================================== */}
            <NewsletterSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setAboutViewOpen(false);
          setCurrentCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPressRelease={() => setPressReleaseOpen(true)}
        onOpenPartnership={() => setPartnershipOpen(true)}
        onOpenAbout={() => {
          setAboutViewOpen(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLiveTv={() => setSelectedVideo(VIDEOS[0])}
      />

      {/* Persistent Audio Mini-Player Dock if active */}
      {activeAudio && (
        <AudioPlayerDock
          title={activeAudio.title}
          subtitle={activeAudio.subtitle}
          duration={activeAudio.duration}
          onClose={() => setActiveAudio(null)}
        />
      )}

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setAboutViewOpen(false);
          setCurrentCategory(cat);
        }}
        onOpenLiveTv={() => setSelectedVideo(VIDEOS[0])}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        bookmarksCount={bookmarkedIds.length}
      />

      {/* MODALS */}
      {/* 1. Article Detail Reader Modal */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={(art) => toggleBookmark(art)}
          onOpenJournalist={(j) => setSelectedJournalist(j)}
          onSelectRelatedArticle={(art) => setSelectedArticle(art)}
          relatedArticles={ARTICLES.filter(
            (a) => a.id !== selectedArticle.id && a.category === selectedArticle.category
          ).slice(0, 3)}
        />
      )}

      {/* 2. Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          allVideos={VIDEOS}
          onClose={() => setSelectedVideo(null)}
          onSelectVideo={(v) => setSelectedVideo(v)}
        />
      )}

      {/* 3. Journalist Profile Modal */}
      {selectedJournalist && (
        <JournalistModal
          journalist={selectedJournalist}
          authoredArticles={ARTICLES.filter((a) => a.author.id === selectedJournalist.id)}
          onClose={() => setSelectedJournalist(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* 4. Advanced Search Modal */}
      {searchOpen && (
        <SearchModal
          articles={ARTICLES}
          onClose={() => setSearchOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* 5. Bookmarks Modal */}
      {bookmarksOpen && (
        <BookmarksModal
          bookmarkedArticles={ARTICLES.filter((a) => bookmarkedIds.includes(a.id))}
          onClose={() => setBookmarksOpen(false)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onRemoveBookmark={removeBookmark}
          onClearAll={clearAllBookmarks}
        />
      )}

      {/* 6. Press Release Modal */}
      {pressReleaseOpen && (
        <PressReleaseModal onClose={() => setPressReleaseOpen(false)} />
      )}

      {/* 7. Partnership & Advertising Modal */}
      {partnershipOpen && (
        <PartnershipModal onClose={() => setPartnershipOpen(false)} />
      )}
    </div>
  );
}
