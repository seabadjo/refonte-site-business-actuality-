import React from 'react';
import { Logo } from './Logo';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/newsData';
import { MapPin, Mail, Phone, ArrowUp, SendHorizontal, Briefcase, Shield, Tv } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenPressRelease: () => void;
  onOpenPartnership: () => void;
  onOpenAbout: () => void;
  onOpenLiveTv: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPressRelease,
  onOpenPartnership,
  onOpenAbout,
  onOpenLiveTv,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand Lockup */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-light mt-3">
              Média d’information numérique panafricain de référence. Informer, inspirer et valoriser les énergies nouvelles d’une Afrique qui gagne.
            </p>
            <div className="flex flex-col gap-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F15A24] shrink-0" />
                <span>Plateau, Immeuble Postel 2001, Abidjan - Côte d’Ivoire</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F15A24] shrink-0" />
                <span>contact@businessactuality.tv</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F15A24] shrink-0" />
                <span>+225 27 20 00 00 / +225 07 00 00 00</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenLiveTv}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F15A24] hover:bg-[#DE4E19] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Tv className="w-3.5 h-3.5 animate-pulse" />
                <span>Regarder la TV en direct</span>
              </button>
            </div>
          </div>

          {/* Col 3: Rubriques */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Rubriques
            </h4>
            <ul className="space-y-2 text-xs">
              {['cote-divoire', 'afrique', 'economie', 'eco-tech', 'investigation'].map((catId) => {
                const cat = CATEGORIES.find((c) => c.id === catId);
                if (!cat) return null;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        scrollToTop();
                      }}
                      className="hover:text-[#F15A24] transition-colors"
                    >
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Thématiques & Formats */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Formats & Émissions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('videos');
                    scrollToTop();
                  }}
                  className="hover:text-[#F15A24] transition-colors"
                >
                  Le Grand Débat Éco
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('videos');
                    scrollToTop();
                  }}
                  className="hover:text-[#F15A24] transition-colors"
                >
                  Reportages En Immersion
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('investigation');
                    scrollToTop();
                  }}
                  className="hover:text-[#F15A24] transition-colors"
                >
                  Dossiers Corridors & ZLECAf
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('eco-tech');
                    scrollToTop();
                  }}
                  className="hover:text-[#F15A24] transition-colors"
                >
                  Transitions Énergétiques Sahel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Institutionnel & Annonceurs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Média & Régie
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#F15A24] transition-colors"
                >
                  À propos du média
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPressRelease}
                  className="hover:text-[#F15A24] transition-colors flex items-center gap-1.5"
                >
                  <SendHorizontal className="w-3 h-3 text-[#F15A24]" />
                  <span>Communiqués de presse</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPartnership}
                  className="hover:text-[#F15A24] transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3 h-3 text-[#F15A24]" />
                  <span>Régie & Annonceurs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#F15A24] transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Charte éthique</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Business Actuality TV. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-400 hover:text-white transition-colors cursor-pointer">
              Mentions Légales
            </span>
            <span className="text-stone-400 hover:text-white transition-colors cursor-pointer">
              Politique de Confidentialité
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors p-1"
              aria-label="Haut de page"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
