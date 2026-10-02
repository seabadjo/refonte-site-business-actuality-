import React, { useState } from 'react';
import { X, SendHorizontal, UploadCloud, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PressReleaseModalProps {
  onClose: () => void;
}

export const PressReleaseModal: React.FC<PressReleaseModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    title: '',
    country: "Côte d'Ivoire",
    category: 'economie',
    message: '',
    attachmentName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSimulateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachmentName: e.target.files[0].name });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden border border-stone-200 dark:border-stone-800 flex flex-col my-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#3B1E68] to-[#4F258C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs">
              <SendHorizontal className="w-5 h-5 text-[#F15A24]" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold">
                Espace Communiqués & Relations Presse
              </h3>
              <p className="text-xs text-purple-200">
                Transmettez vos annonces officielles directement à la rédaction de Business Actuality TV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-stone-900 dark:text-white mb-2">
                Communiqué reçu par notre desk !
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mb-6">
                Merci {formData.contactName}. Notre cellule éditoriale examinera votre communiqué sous 2 heures ouvrées pour traitement et éventuelle diffusion sur nos antennes et notre fil dépêches.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#3B1E68] hover:bg-[#2C1550] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Entreprise / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ministère du Commerce, Banque Africaine..."
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Nom du responsable presse *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Prénom et Nom"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="presse@entreprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+225 07 ... / +33 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Titre du communiqué de presse *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lancement des travaux de la nouvelle plateforme logistique..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Texte intégral ou synthèse de l'annonce *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Collez ici le contenu de votre communiqué, les chiffres clés, les citations officielles et les liens médias..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#F15A24]"
                />
              </div>

              {/* File upload simulated */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Dossier de presse ou PDF (Optionnel)
                </label>
                <div className="border border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-4 text-center hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleSimulateFile}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    {formData.attachmentName || 'Glissez-déposez votre document (PDF, Word, images HD) ou parcourez vos fichiers'}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Taille max : 25 Mo</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Confidentialité et embargo respectés</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F15A24] hover:bg-[#DE4E19] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <SendHorizontal className="w-4 h-4" />
                  <span>Envoyer à la rédaction</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
