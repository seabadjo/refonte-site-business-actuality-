import React, { useState } from 'react';
import { VideoItem } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Tv, 
  Clock, 
  Eye, 
  Share2, 
  ListVideo, 
  Check,
  ChevronRight
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoItem;
  allVideos: VideoItem[];
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  allVideos,
  onClose,
  onSelectVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [copied, setCopied] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSeek = (percentage: number) => {
    setProgress(percentage);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-stone-950 text-white sm:rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
        
        {/* Header bar */}
        <div className="px-4 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F15A24] text-white">
              <Tv className="w-3 h-3" />
              <span>Business Actuality TV</span>
            </span>
            <span className="text-xs text-stone-400 font-medium truncate max-w-md hidden sm:inline">
              {video.showName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-16/9 w-full bg-black group select-none">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-85' : 'opacity-65'
            }`}
          />

          {/* TV On-Air Watermark */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <div className="bg-[#3B1E68]/90 text-white px-2 py-1 rounded text-xs font-bold tracking-wider backdrop-blur-xs flex items-center gap-1.5 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-[#F15A24] animate-ping" />
              <span>BA TV BROADCAST 4K</span>
            </div>
          </div>

          {/* Center Play/Pause button when hovered or paused */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 rounded-full bg-[#F15A24]/90 hover:bg-[#DE4E19] text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>

          {/* Interactive Player Scrim Controls */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex flex-col gap-2">
            
            {/* Scrubber track */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                handleSeek(Math.min(100, Math.max(0, clickPos * 100)));
              }}
              className="w-full h-1.5 bg-stone-700/80 hover:h-2.5 rounded-full cursor-pointer transition-all relative overflow-hidden"
            >
              <div
                className="bg-[#F15A24] h-full rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] tabular-nums">
                  07:15 / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[11px] text-[#F15A24] font-medium">
                  {video.showName}
                </span>
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.();
                    } else {
                      document.exitFullscreen?.();
                    }
                  }}
                  className="hover:text-white transition-colors"
                  title="Plein écran"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata & Playlist Grid */}
        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs text-[#F15A24] font-semibold uppercase mb-2">
              <span>{video.showName}</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400 font-normal lowercase">Diffusé le {video.publishedAt}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
              {video.title}
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              {video.description}
            </p>

            {/* Chapters list if available */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-stone-900/90 border border-stone-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                  <ListVideo className="w-4 h-4 text-[#F15A24]" />
                  <span>Chapitres & Découpage de l’émission</span>
                </h4>
                <div className="space-y-1.5">
                  {video.chapters.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setProgress((idx + 1) * 22);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        currentChapterIndex === idx
                          ? 'bg-[#3B1E68] text-white font-semibold'
                          : 'hover:bg-stone-800 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#F15A24]">{chap.time}</span>
                        <span>{chap.title}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-stone-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Lien copié !' : 'Partager la vidéo'}</span>
              </button>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="border-t lg:border-t-0 lg:border-l border-stone-800 pt-6 lg:pt-0 lg:pl-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#F15A24]" />
              <span>Autres émissions TV à la une</span>
            </h3>

            <div className="space-y-3">
              {allVideos
                .filter((v) => v.id !== video.id)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectVideo(item)}
                    className="group cursor-pointer p-2.5 rounded-xl bg-stone-900/60 hover:bg-stone-800/80 border border-stone-800/60 transition-all flex gap-3"
                  >
                    <div className="relative w-24 aspect-16/9 rounded overflow-hidden shrink-0 bg-stone-800">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono px-1 rounded text-stone-300">
                        {item.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#F15A24] font-semibold uppercase">
                        {item.showName}
                      </span>
                      <h4 className="text-xs font-semibold text-stone-200 group-hover:text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
