import React, { useState } from 'react';
import { X, Briefcase, Users, Tv, Award, Download, Check, Sparkles } from 'lucide-react';

interface PartnershipModalProps {
  onClose: () => void;
}

export const PartnershipModal: React.FC<PartnershipModalProps> = ({ onClose }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDownloadMediaKit = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col my-auto max-h-[90vh]">
        
        {/* Banner */}
        <div className="p-6 bg-gradient-to-r from-[#3B1E68] via-[#48237A] to-[#F15A24] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
                Régie Média & Sponsoring
              </span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
              Associez votre marque à l’Afrique qui gagne
            </h3>
            <p className="text-xs text-stone-200 mt-1 max-w-lg">
              Business Actuality TV touche chaque mois plus de 1,2 million de décideurs, chefs d’entreprise, investisseurs et acteurs publics à travers le continent et la diaspora.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Audience Metrics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Chiffres clés de notre audience
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-center">
                <span className="font-editorial text-2xl font-bold text-[#3B1E68] dark:text-[#E0D7F5] block">
                  1,2M+
                </span>
                <span className="text-[11px] text-stone-500">Lecteurs uniques / mois</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-center">
                <span className="font-editorial text-2xl font-bold text-[#F15A24] block">
                  68%
                </span>
                <span className="text-[11px] text-stone-500">Cadres, dirigeants & C-level</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-center">
                <span className="font-editorial text-2xl font-bold text-[#3B1E68] dark:text-[#E0D7F5] block">
                  3,5M+
                </span>
                <span className="text-[11px] text-stone-500">Vues vidéo / mois</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-center">
                <span className="font-editorial text-2xl font-bold text-[#F15A24] block">
                  18
                </span>
                <span className="text-[11px] text-stone-500">Pays africains & Diaspora</span>
              </div>
            </div>
          </div>

          {/* Solutions publicitaires */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
              Nos formats de partenariats
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between">
                <div>
                  <Tv className="w-5 h-5 text-[#F15A24] mb-2" />
                  <h5 className="font-editorial text-base font-bold text-stone-900 dark:text-white mb-1">
                    Sponsoring d’émissions TV
                  </h5>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Parrainez nos formats phares : Le Grand Débat Éco, Femmes d’Impact, ou La Bourse Hebdo avec billboards et citations.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between">
                <div>
                  <Sparkles className="w-5 h-5 text-[#3B1E68] dark:text-purple-400 mb-2" />
                  <h5 className="font-editorial text-base font-bold text-stone-900 dark:text-white mb-1">
                    Brand Content & Dossiers
                  </h5>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Articles longs formats, infographies de données et vidéos d’immersion conçus en synergie avec notre cellule éditoriale.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between">
                <div>
                  <Award className="w-5 h-5 text-amber-500 mb-2" />
                  <h5 className="font-editorial text-base font-bold text-stone-900 dark:text-white mb-1">
                    Événements & Tables rondes
                  </h5>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Organisation de webinaires économiques, modération de panels sectoriels et captation 4K pour vos forums annuels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Media Kit CTA & Quick contact */}
          <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-editorial text-lg font-bold text-stone-900 dark:text-white">
                Télécharger le Kit Média 2026-2027
              </h5>
              <p className="text-xs text-stone-500">
                Tarifs régie, calendrier éditorial, formats d’écrans et spécifications techniques (PDF 12 pages).
              </p>
            </div>
            <button
              onClick={handleDownloadMediaKit}
              className="px-4 py-2.5 bg-[#3B1E68] hover:bg-[#2C1550] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shrink-0 shadow-sm"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'Téléchargé (PDF)' : 'Télécharger le Kit Média'}</span>
            </button>
          </div>

          {/* Quick Inquiry Form */}
          <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
            <h4 className="font-editorial text-lg font-bold text-stone-900 dark:text-white mb-2">
              Contacter notre équipe commerciale
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Recevez une proposition sur-mesure pour votre campagne sous 24 heures.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                ✓ Votre demande a bien été envoyée à notre régie (regie@businessactuality.tv). Un conseiller vous contactera d’ici peu.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Société / Annonceur"
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
                <input
                  type="email"
                  required
                  placeholder="Email de contact"
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F15A24] hover:bg-[#DE4E19] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Demander un devis régie
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
