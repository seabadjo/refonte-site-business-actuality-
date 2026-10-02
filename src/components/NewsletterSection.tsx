import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Économie & Corridors',
    'Côte d’Ivoire',
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topics = [
    'Économie & Corridors',
    'Côte d’Ivoire & UEMOA',
    'Tech & Transition Énergétique',
    'Grands Dossiers & Vidéos',
  ];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3B1E68] via-[#2A134E] to-[#17092C] text-white p-8 sm:p-12 border border-purple-900/40 shadow-xl">
      {/* Subtle decorative circles */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#F15A24]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-orange-300 mb-4 border border-white/10">
          <Mail className="w-3.5 h-3.5 text-[#F15A24]" />
          <span>La Lettre Quotidienne de l’Afrique</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Recevez l’essentiel de l’actualité africaine directement dans votre boîte mail.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
          Chaque matin à 7h00 GMT, nos éditorialistes sélectionnent pour vous les analyses stratégiques, les réformes clés et les initiatives qui façonnent une Afrique dynamique et conquérante.
        </p>

        {isSubmitted ? (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 animate-in fade-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="font-editorial text-2xl font-bold mb-1">
              Bienvenue dans la communauté Business Actuality TV !
            </h3>
            <p className="text-xs text-stone-300">
              Un e-mail de confirmation vient d’être expédié à <strong className="text-white">{email}</strong>. Vérifiez votre boîte de réception dès demain matin.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thematic filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              {topics.map((t) => {
                const checked = selectedTopics.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTopic(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      checked
                        ? 'bg-[#F15A24] text-white shadow-xs'
                        : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                  >
                    {checked ? '✓ ' : '+ '}
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Email input and submit button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="Entrez votre adresse email professionnelle..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F15A24] backdrop-blur-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F15A24] hover:bg-[#DE4E19] text-white font-bold text-sm rounded-xl transition-all shadow-lg active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <span>S’abonner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gratuit · Sans publicité intrusive · Désinscription en 1 clic</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
