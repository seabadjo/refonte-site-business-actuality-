export type CategoryId = 
  | 'tous'
  | 'cote-divoire'
  | 'afrique'
  | 'monde'
  | 'economie'
  | 'politique'
  | 'societe'
  | 'sport'
  | 'culture'
  | 'eco-tech'
  | 'videos'
  | 'investigation';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface Journalist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  email: string;
  articleCount: number;
}

export interface Comment {
  id: string;
  author: string;
  city: string;
  date: string;
  text: string;
  likes: number;
  isVerified?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string[];
  pullQuote?: string;
  category: CategoryId;
  categoryLabel: string;
  imageUrl: string;
  imageCaption?: string;
  publishedAt: string;
  timestamp: string;
  readTime: string;
  author: Journalist;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isInvestigation?: boolean;
  isDossier?: boolean;
  dossierName?: string;
  views: number;
  comments: Comment[];
  audioDuration?: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  duration: string;
  publishedAt: string;
  thumbnailUrl: string;
  views: number;
  presenter: string;
  showName: string;
  chapters?: { time: string; title: string }[];
  isLive?: boolean;
}

export interface PodcastItem {
  id: string;
  title: string;
  show: string;
  duration: string;
  publishedAt: string;
  host: string;
  description: string;
  audioUrl?: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}
