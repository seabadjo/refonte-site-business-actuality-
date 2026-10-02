import React from 'react';
import { JOURNALISTS } from '../data/newsData';
import { Journalist } from '../types';
import { Target, Compass, Award, Shield, CheckCircle2, Tv, Users } from 'lucide-react';

interface AboutViewProps {
  onOpenJournalist: (journalist: Journalist) => void;
  onOpenPressRelease: () => void;
  onOpenPartnership: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenJournalist,
  onOpenPressRelease,
  onOpenPartnership,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F15A24] mb-2 block">
          Notre Mission Éditoriale
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight mb-6">
          Informer, inspirer et valoriser les énergies nouvelles d’une Afrique qui gagne.
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Business Actuality TV est un média d’information numérique panafricain de référence, dédié à l’analyse rigoureuse, au décryptage économique et à la mise en lumière de ceux qui transforment le continent.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-[#3B1E68] dark:text-[#E0D7F5] flex items-center justify-center mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white mb-2">
            1. Informer avec exigence
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            De l'actualité immédiate aux grandes réformes institutionnelles de la CEDEAO, de l’UEMOA et de la ZLECAf, nous traitons l'information avec rigueur, équilibre et vérification méticuleuse des faits.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-[#F15A24] flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white mb-2">
            2. Analyser les mutations de fond
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Corridors logistiques, ports en eau profonde, souveraineté agricole, transition énergétique au Sahel et financements de la BRVM : nous décryptons les structures qui bâtissent l'avenir.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-white mb-2">
            3. Valoriser les réussites
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Loin des stéréotypes réducteurs, nous donnons la parole aux entrepreneurs, ingénieurs, industriels et créateurs qui innovent chaque jour et hissent l’Afrique aux plus hauts standards mondiaux.
          </p>
        </div>
      </div>

      {/* Focus: Pourquoi 'TV' ? */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-[#1E1133] to-stone-900 text-white border border-stone-800 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 text-center md:text-left">
          <div className="inline-flex p-3 rounded-2xl bg-[#F15A24] text-white mb-3">
            <Tv className="w-8 h-8" />
          </div>
          <h3 className="font-editorial text-2xl font-bold">L'Image au cœur du média</h3>
          <p className="text-xs text-stone-400 mt-1">
            Production 4K · Débats en plateau · Immersion terrain
          </p>
        </div>

        <div className="md:w-2/3 text-sm text-stone-300 leading-relaxed space-y-3">
          <p>
            Parce que notre marque porte le sceau <strong>« TV »</strong>, la vidéo n'est pas un simple accessoire : c'est notre vecteur principal pour incarner la vitalité africaine.
          </p>
          <p>
            À travers nos formats phares comme <em>Le Grand Débat Éco</em>, <em>Femmes d’Impact</em> et <em>En Immersion</em>, nous proposons un regard direct, immersif et accessible sur smartphone comme sur grand écran.
          </p>
        </div>
      </div>

      {/* Editorial Team */}
      <div>
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F15A24]">
            Notre Équipe
          </span>
          <h2 className="font-editorial text-3xl font-bold text-stone-900 dark:text-white mt-1">
            Les journalistes et chroniqueurs de la rédaction
          </h2>
          <p className="text-xs text-stone-500 max-w-lg mx-auto mt-2">
            Une équipe de professionnels chevronnés basés à Abidjan et connectés aux principales capitales économiques africaines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNALISTS.map((j) => (
            <div
              key={j.id}
              onClick={() => onOpenJournalist(j)}
              className="group cursor-pointer p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#3B1E68]/40 dark:hover:border-[#F15A24]/40 transition-all text-center"
            >
              <img
                src={j.avatar}
                alt={j.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-stone-100 dark:border-stone-800 group-hover:scale-105 transition-transform"
              />
              <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#F15A24] transition-colors">
                {j.name}
              </h4>
              <p className="text-xs text-stone-500 line-clamp-1 mb-2">
                {j.role}
              </p>
              <span className="text-[11px] font-semibold text-[#3B1E68] dark:text-[#E0D7F5]">
                {j.articleCount} publications →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ethical Commitments */}
      <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
        <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#F15A24]" />
          <span>Charte Déontologique et Indépendance</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Séparation stricte et étanche entre contenus journalistiques et partenariats sponsorisés clairement identifiés.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Vérification systématique des sources et recoupement des données statistiques économiques.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Respect du contradictoire et droit de réponse garanti pour toute personnalité ou institution mentionnée.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Promotion d’un journalisme de solutions constructif, axé sur les résultats tangibles pour les populations.</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={onOpenPressRelease}
          className="px-6 py-3 rounded-xl bg-[#3B1E68] hover:bg-[#2C1550] text-white text-xs font-semibold shadow-md transition-colors"
        >
          Soumettre un communiqué de presse
        </button>
        <button
          onClick={onOpenPartnership}
          className="px-6 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-[#F15A24] text-stone-800 dark:text-white text-xs font-semibold shadow-xs transition-colors"
        >
          Découvrir les opportunités régie & partenariats
        </button>
      </div>
    </div>
  );
};
