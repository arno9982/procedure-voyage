'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plane, GraduationCap, FileCheck, Home, ShieldCheck, Phone, Mail, ArrowRight, Stamp } from 'lucide-react';
import './page.css';

/* ---------- helper: reveal-on-scroll ---------- */
function useReveal(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        filter: visible ? 'blur(0px)' : 'blur(3px)',
      }}
    >
      {children}
    </div>
  );
}

function StampBadge({ flag, code, rotate }: { flag: string; code: string; rotate: number }) {
  const [ref, visible] = useReveal();
  const [landed, setLanded] = useState(false);
  return (
    <div
      ref={ref}
      onAnimationEnd={() => setLanded(true)}
      className={`mx-auto w-32 h-32 rounded-full border-[3px] flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:rotate-0 rotate-[${rotate}deg] ${visible && !landed ? 'stamp-land' : ''} ${!visible ? 'opacity-0' : ''}`}
      style={{ borderColor: 'var(--stamp)', color: 'var(--stamp)', borderStyle: 'double', '--end-rotate': `${rotate}deg` } as React.CSSProperties}
    >
      <span className="text-3xl">{flag}</span>
      <span className="font-mono text-[10px] font-bold tracking-widest mt-1">{code}</span>
    </div>
  );
}

function PopIcon({ Icon, delay = 0 }: { Icon: React.ElementType; delay?: number }) {
  const [ref, visible] = useReveal();
  const [done, setDone] = useState(false);
  return (
    <div
      ref={ref}
      onAnimationEnd={() => setDone(true)}
      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:bg-white/10 ${visible && !done ? 'icon-pop' : ''} ${!visible ? 'opacity-0' : ''}`}
      style={{ border: '1px solid #3a4a6b', animationDelay: `${delay}ms` }}
    >
      <Icon className="h-5 w-5" style={{ color: 'var(--gold)' }} />
    </div>
  );
}

const destinations = [
  { country: 'France', code: 'PAR', flag: '🇫🇷', desc: "Universités prestigieuses et vie culturelle riche.", rotate: -6 },
  { country: 'Belgique', code: 'BRU', flag: '🇧🇪', desc: "Formations de pointe au cœur de l'Europe.", rotate: 4 },
  { country: 'Russie', code: 'MOW', flag: '🇷🇺', desc: 'Excellence académique et opportunités uniques.', rotate: -3 },
];

const services = [
  { icon: FileCheck, tag: 'DOC. 01', title: 'Assistance Visa Étudiant', desc: "Constitution du dossier, suivi des démarches et accompagnement personnalisé jusqu'à l'obtention." },
  { icon: GraduationCap, tag: 'DOC. 02', title: 'Orientation Académique', desc: "Conseils sur-mesure pour choisir l'université et le programme adaptés à votre profil." },
  { icon: Home, tag: 'DOC. 03', title: "Aide à l'Hébergement", desc: 'Recherche de logements étudiants sécurisés et adaptés à votre budget sur place.' },
  { icon: ShieldCheck, tag: 'DOC. 04', title: 'Accompagnement Logistique', desc: 'Billets d\'avion, transport local, assurance santé et support physique sur place.' },
];

export default function HomePage() {
  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)' }} className="min-h-screen">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b" style={{ background: 'rgba(238,241,240,0.85)', borderColor: 'var(--line)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--ink)' }}>
              <Plane className="h-4 w-4 text-white plane-bob" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--ink)' }}>
              Procédure <span style={{ color: 'var(--stamp)' }}>Voyage</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--slate)' }}>
            <a href="#services" className="hover:opacity-60 transition">Services</a>
            <a href="#destinations" className="hover:opacity-60 transition">Destinations</a>
            <a href="#contact" className="px-4 py-2 rounded-full text-white transition hover:opacity-90" style={{ background: 'var(--stamp)' }}>
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — boarding pass */}
      <header className="relative overflow-hidden py-20 px-6" style={{ background: 'var(--ink)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 480 180" preserveAspectRatio="none">
          <path d="M 10,90 C 150,10 300,170 460,60" fill="none" stroke="#5b6b8c" strokeWidth="1.5" className="flight-path" />
        </svg>
        <div className="plane-marker absolute pointer-events-none" style={{ color: '#8fa3c9' }}>
          <Plane className="h-4 w-4 rotate-90" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="fade-up-1 font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#93a2c2' }}>
            Cameroun — Vers votre avenir académique
          </p>
          <h1 className="fade-up-2 font-display text-4xl md:text-6xl font-semibold mt-5 leading-tight text-white">
            Votre dossier d'études,<br /> traité comme un embarquement.
          </h1>
          <p className="fade-up-3 mt-6 font-body text-base md:text-lg max-w-xl mx-auto" style={{ color: '#c3ccdc' }}>
            De la candidature au visa jusqu'à l'installation : une prise en charge personnalisée, étape par étape, sans stress.
          </p>
        </div>

        {/* Boarding pass card */}
        <div className="fade-up-4 relative z-10 max-w-2xl mx-auto mt-14">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'var(--paper-card)' }}>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 md:p-8">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>
                  <span>Carte d'embarquement</span>
                  <span>Classe · Étudiant</span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>De</p>
                    <p className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>CMR</p>
                  </div>
                  <ArrowRight className="h-5 w-5" style={{ color: 'var(--gold)' }} />
                  <div className="text-right">
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>Vers</p>
                    <p className="font-display text-3xl font-semibold" style={{ color: 'var(--ink)' }}>???</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--line)' }}>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>Passager</p>
                    <p className="font-body text-sm font-medium">Futur diplômé</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>Dossier</p>
                    <p className="font-body text-sm font-medium">À constituer</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--slate)' }}>Statut</p>
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--stamp)' }}>En attente</p>
                  </div>
                </div>
              </div>

              <div className="relative ticket-notch flex md:flex-col items-center justify-center gap-3 px-8 py-6 md:w-44 border-t md:border-t-0 md:border-l" style={{ borderColor: 'var(--line)', borderStyle: 'dashed' }}>
                <div className="stamp-anim">
                  <div className="rounded-full border-2 px-4 py-3 text-center" style={{ borderColor: 'var(--stamp)', color: 'var(--stamp)' }}>
                    <Stamp className="h-5 w-5 mx-auto mb-1" />
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider leading-tight">Prise en<br />charge</p>
                  </div>
                </div>
                <a href="#contact" className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full text-white text-center hover:opacity-90 transition" style={{ background: 'var(--ink)' }}>
                  Réserver
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ANNOUNCEMENT STRIP */}
      <div className="py-3 px-6 text-center border-y" style={{ background: '#fff7e6', borderColor: 'var(--line)' }}>
        <p className="font-mono text-xs md:text-sm tracking-wide" style={{ color: '#7a5a12' }}>
          <span className="sparkle">✦</span> DERNIER APPEL — <span className="font-bold">10% de réduction</span> sur nos services étudiants pour toute inscription avant le <span className="font-bold">30 mars</span> <span className="sparkle" style={{ animationDelay: '0.9s' }}>✦</span>
        </p>
      </div>

      {/* DESTINATIONS — passport stamps */}
      <section id="destinations" className="py-24 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--gold)' }}>Destinations tamponnées</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3" style={{ color: 'var(--ink)' }}>
              Trois routes, un seul accompagnement
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {destinations.map((d, idx) => (
            <Reveal key={d.country} delay={idx * 120}>
              <div className="relative text-center p-8">
                <StampBadge flag={d.flag} code={d.code} rotate={d.rotate} />
                <h3 className="font-display text-xl font-semibold mt-6" style={{ color: 'var(--ink)' }}>{d.country}</h3>
                <p className="font-body text-sm mt-2" style={{ color: 'var(--slate)' }}>{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES — official checklist */}
      <section id="services" className="py-24 px-6" style={{ background: 'var(--ink)' }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--gold)' }}>Manifeste de services</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 text-white">
                Ce que couvre votre dossier
              </h2>
            </div>
          </Reveal>

          <div className="divide-y" style={{ borderColor: '#2a3652' }}>
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={idx * 90}>
                  <div className="group flex items-start md:items-center gap-6 py-7 border-t first:border-t-0" style={{ borderColor: '#2a3652' }}>
                    <span className="font-mono text-xs shrink-0 w-16" style={{ color: '#6f7fa3' }}>{s.tag}</span>
                    <PopIcon Icon={Icon} delay={100} />
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                      <p className="font-body text-sm mt-1" style={{ color: '#a7b0c4' }}>{s.desc}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border shrink-0 transition-all duration-500 bg-emerald-400 border-emerald-400 md:bg-transparent md:border-[#3a4a6b] md:group-hover:bg-emerald-400 md:group-hover:border-emerald-400" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT — gate information */}
      <footer id="contact" className="relative py-20 px-6 perforated" style={{ background: 'var(--paper-card)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--gold)' }}>Porte d'embarquement</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mt-3" style={{ color: 'var(--ink)' }}>
            Prêt à faire tamponner votre dossier ?
          </h2>
          <p className="font-body text-sm mt-3" style={{ color: 'var(--slate)' }}>
            Une première consultation gratuite, pour cadrer votre parcours.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 mt-10">
            <a href="tel:+237657644454" className="group flex items-center gap-3 px-6 py-4 rounded-xl border justify-center transition hover:-translate-y-0.5" style={{ borderColor: 'var(--line)' }}>
              <Phone className="ring-icon h-4 w-4" style={{ color: 'var(--stamp)' }} />
              <span className="font-mono text-sm">+237 657 644 454</span>
            </a>
            <a href="mailto:Dodikovic3@gmail.com" className="group flex items-center gap-3 px-6 py-4 rounded-xl border justify-center transition hover:-translate-y-0.5" style={{ borderColor: 'var(--line)' }}>
              <Mail className="mail-icon h-4 w-4" style={{ color: 'var(--stamp)' }} />
              <span className="font-mono text-sm">Dodikovic3@gmail.com</span>
            </a>
          </div>

          <div className="mt-14 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[11px] tracking-wide" style={{ borderColor: 'var(--line)', color: 'var(--slate)' }}>
            <p>© {new Date().getFullYear()} Procédure Voyage — Tous droits réservés</p>
            <p>@procedurevoyage</p>
          </div>
        </div>
      </footer>
    </div>
  );
}