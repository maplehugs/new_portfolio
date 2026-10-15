'use client';

import React, { useState } from "react";

const PROJECTS = [
  { name: 'UmamusumeX', tags: ['Python', 'Reverse engineering', 'Linux/Proton'],
    text: 'Private server for Umamusume: Pretty Derby (Global/Steam), rebuilt by reverse engineering the client: 357 endpoints, native race engine, gacha, events. Lead contributor: 170+ commits, ~30 server bugs fixed, Linux/Proton setup automated.' },
  { name: 'Umamusume for Archipelago', url: 'https://github.com/maplehugs/umamusume_apworld', tags: ['Python', 'Community'],
    text: 'Plugs the game into Archipelago, a multiworld randomizer: every race you win sends items to other players in other games. 12+ releases, with guides written for players who never touched code.' },
  { name: 'SkinShare (Garry\'s Mod)', url: 'https://github.com/maplehugs/SkinShare_Gmod', tags: ['Lua', 'Community'],
    text: 'Pick a skin from your Workshop addons and everyone on the server downloads and mounts it mid-game, no restart. Only the host installs it. Works in any gamemode.' },
  { name: 'IMEVI Intranet', tags: ['Spring Boot', 'PostgreSQL', 'CI/CD'],
    text: 'Company intranet in production: absences, sick leave, safety KPIs, benefits, IT assets, 2FA. Every push is tested and deployed by itself, and rolls back if the new version won\'t start.' },
  { name: 'SCENE-BOT', tags: ['Rust', 'Discord', 'Community'],
    text: 'All-in-one Discord bot you can drive by talking to it. Ported the whole thing from Node.js to Rust and added fully local voice: Piper TTS, RVC and whisper.cpp.' },
  { name: 'Home lab', tags: ['Linux', 'Docker', 'Networking'],
    text: 'Mini PC running Docker, PostgreSQL, a music server, game servers for friends and a local LLM. Tailscale, FRP reverse proxy on a cloud VPS, own DNS with AdGuard, Wake-on-LAN across NAT.' },
  { name: 'Stockout forecasting', url: 'https://github.com/maplehugs/neural-network-austral', tags: ['Python', 'TensorFlow'],
    text: 'Excel inventory to MySQL, GRU models benchmarked against Croston/SBA, Monte Carlo simulation. Tells you what runs out before it does.' },
  { name: 'AI transcription', url: 'https://github.com/maplehugs/ai_transcription', tags: ['Python', 'Flask', 'Whisper'],
    text: 'Small web app that transcribes audio and video and tells speakers apart (Whisper + NeMo), with a job queue and real progress tracking.' },
];

const EXPERIENCE = [
  { role: 'Software Engineering Apprentice', where: 'IMEVI / Aug 2026 - present', items: [
    'Deployed and run the company intranet in production (Spring Boot, PostgreSQL)',
    'Built CI/CD with GitHub Actions: tested, auto-deployed, auto-rollback if it fails to start',
    'First production on a Docker mini PC, then led the migration to the company server',
    'Migrated the warranty system from Strapi to Express + PostgreSQL, 8,000+ attachments included',
  ] },
  { role: 'Development & IT Intern', where: 'Australlens / Sep 2024 - Feb 2025 · Feb - Mar 2026', items: [
    'Designed and deployed the centralized IT ticket system for every branch, end to end',
    'Physically set up the on-premise server (Ubuntu Server), later migrated to Windows Server 2019',
    'Came back in 2026 to migrate it to Spring Boot: Spring Security, email verification, WebSocket, HTTPS',
  ] },
  { role: 'AI Training & Evaluation', where: 'Outlier AI / Jun 2024 - Nov 2024', items: [
    'Reviewed, fixed and validated AI-generated code in Python, TypeScript and Java',
    'Designed and tested prompts to evaluate model behavior and correctness',
  ] },
];

const STACK = [
  { title: 'systems', note: 'where i actually live', color: 'blue', items: ['Linux', 'Windows Server', 'Docker', 'nginx', 'cPanel', 'systemd'] },
  { title: 'networking', note: "it's always DNS", color: 'green', items: ['DNS', 'Reverse proxy', 'Tailscale', 'OpenVPN', 'TLS', 'Wake-on-LAN'] },
  { title: 'cloud & hosting', note: 'may or may not have debts with some of these', color: 'purple', items: ['Google Cloud', 'Oracle Cloud', 'Cloudflare'] },
  { title: 'databases', note: 'i used to store info here, keyword "used to"', color: 'cyan', items: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite'] },
  { title: 'languages', note: 'the ones i mass produce bugs in', color: 'red', items: ['Java', 'Python', 'JavaScript', 'Bash', 'Rust', 'Lua'] },
  { title: 'automation', note: 'hey you seem familiar, do i know you?', color: 'orange', items: ['GitHub Actions', 'Git', 'Spring Boot'] },
  { title: 'reverse engineering', note: 'reading code nobody wanted me to read', color: 'pink', items: ['Ghidra', 'Proton/Wine'] },
];
// full class names so Tailwind picks them up
const BADGE: Record<string, string> = {
  blue: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/40', green: 'bg-green-500/20 text-green-300 hover:bg-green-500/40',
  purple: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/40', cyan: 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40',
  red: 'bg-red-500/20 text-red-300 hover:bg-red-500/40', orange: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/40',
  pink: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/40',
};
const TITLE: Record<string, string> = {
  blue: 'text-blue-400', green: 'text-green-400', purple: 'text-purple-400', cyan: 'text-cyan-400',
  red: 'text-red-400', orange: 'text-orange-400', pink: 'text-pink-400',
};

export default function Home() {
  return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=VT323&family=Permanent+Marker&family=Gaegu:wght@400;700&display=swap');

          body {
            font-family: 'VT323', monospace;
            scroll-behavior: smooth;
            margin: 0;
            padding: 0;
          }

          .handwritten {
            font-family: 'Gaegu', cursive;
            font-weight: 400;
          }

          .handwritten-bold {
            font-family: 'Gaegu', cursive;
            font-weight: 700;
          }

          .marker {
            font-family: 'Permanent Marker', cursive;
          }

          h1, h2, h3 {
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .text-omori {
            font-size: 1.5rem;
            line-height: 1.2;
          }

          .sketch-border {
            border: 2px solid currentColor;
            border-radius: 2px;
            box-shadow: 2px 2px 0 0 currentColor;
          }

          .project-card {
            transition: all 0.2s ease;
          }

          .project-card:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 0 currentColor;
            cursor: pointer;
          }

          .album-container-dark {
            background-color: #0c0c0c;
            border: 4px solid #1a1a1a;
            position: relative;
            padding: 3rem 1.5rem;
            box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.9);
            min-height: 800px;
          }

          .polaroid-dark {
            background: #1e1e1e;
            padding: 10px 10px 35px 10px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.8);
            border: 1px solid #333;
            display: inline-block;
            width: 100%;
            max-width: 280px;
          }

          .photo-vignette {
            position: relative;
            overflow: hidden;
            aspect-ratio: 1/1;
            background: #2a2a2a;
          }

          .photo-vignette::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.9);
            pointer-events: none;
          }

          .photo-vignette img {
            filter:  contrast(1.2) brightness(0.7);
          }

          .album-page {
            display: none;
          }

          .album-page.active {
            display: flex;
            flex-direction: column;
            gap: 4rem;
          }

          .album-nav-btn {
            background: white;
            color: black;
            border: 2px solid white;
            padding: 8px 20px;
            transition: all 0.3s;
            font-family: 'VT323', monospace;
            font-weight: bold;
            font-size: 1.25rem;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            animation: pulse-glow 2s ease-in-out infinite;
          }

          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
              opacity: 1;
            }
            50% {
              box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
              opacity: 0.9;
            }
          }

          .album-nav-btn:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.9);
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(255, 255, 255, 1);
          }

          .album-nav-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            animation: none;
          }

          .album-nav-btn-mobile {
            background: white;
            color: black;
            border: 2px solid white;
            padding: 8px 16px;
            font-family: 'VT323', monospace;
            font-weight: bold;
            font-size: 1.5rem;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
            animation: pulse-glow 2s ease-in-out infinite;
            border-radius: 4px;
            min-width: 50px;
          }

          .album-nav-btn-mobile:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            animation: none;
          }

          .album-nav-btn-mobile:active:not(:disabled) {
            transform: scale(0.95);
          }

          .album-text {
            font-family: 'Gaegu', cursive;
            color: #e5e5e5;
            line-height: 1.4;
            font-size: 1.1rem;
            max-width: 400px;
          }

          .album-title {
            font-weight: bold;
            display: inline;
          }

          .album-spine {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            transform: translateX(-50%);
            z-index: 1;
          }

          .tech-badge {
            display: inline-block;
            padding: 4px 12px;
            margin: 4px;
            border: 2px solid currentColor;
            border-radius: 4px;
            font-family: 'VT323', monospace;
            font-size: 1.1rem;
          }

          @media (max-width: 768px) {
            .album-container-dark {
              padding: 2rem 1rem;
              min-height: auto;
            }

            .polaroid-dark {
              max-width: 240px;
            }

            .album-text {
              font-size: 1rem;
              max-width: 100%;
              padding: 0 1rem;
            }

            .album-page.active {
              gap: 2rem;
            }

            .album-nav-btn {
              padding: 6px 16px;
              font-size: 1rem;
            }
          }

          @media (max-width: 480px) {
            .polaroid-dark {
              max-width: 200px;
            }

            .album-text {
              font-size: 0.95rem;
            }
          }
        `}</style>

        <div className="bg-white text-black overflow-x-hidden relative">
          {/* Imagen de fondo solo en la parte superior con fade */}
          <div
              className="absolute top-0 left-0 right-0 h-screen pointer-events-none"
              style={{
                backgroundImage: "url('/top_page.webp')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
              }}
          />

          <section className="min-h-screen flex flex-row items-center justify-center p-8 relative z-10" id="white-space">
            <div className="text-center">
              <h1 className="marker text-6xl md:text-8xl mb-4 font-extrabold">Welcome to my space.</h1>
              <p className="handwritten text-2xl italic mb-2">I'm Juan (maple)</p>
              <p className="text-omori">Software Engineering · Final semester · Linux & infrastructure</p>
              <p className="handwritten text-lg mt-4">I have been living here for as long as i can remember.</p>

              <div className="mt-8 flex justify-center gap-4">
                <a className="sketch-border px-6 py-2 handwritten-bold text-xl bg-white hover:bg-black hover:text-white transition-colors" href="/cv/CV_Juan_Guerrero_EN.pdf" target="_blank">CV (EN)</a>
                <a className="sketch-border px-6 py-2 handwritten-bold text-xl bg-white hover:bg-black hover:text-white transition-colors" href="/cv/CV_Juan_Guerrero_ES.pdf" target="_blank">CV (ES)</a>
              </div>

              <div className="mt-12 animate-bounce">
                <a className="text-2xl hover:underline handwritten" href="#black-space">↓ Maybe check what's in my mind</a>
              </div>
            </div>
          </section>

          <div className="h-64 bg-gradient-to-b from-white to-black relative z-10"></div>

          <main className="min-h-screen bg-black text-white p-6 md:p-12 black-space" id="black-space">
            <div className="max-w-6xl mx-auto space-y-24">

              <section id="projects">
                <div className="flex items-center justify-between mb-12 border-b border-white pb-2">
                  <h2 className="marker text-4xl inline-block">Memories (Projects)</h2>
                  <a href="https://github.com/maplehugs" target="_blank" className="handwritten text-lg text-gray-400 hover:text-white transition-colors">View all on GitHub →</a>
                </div>
                <p className="handwritten text-xl text-gray-400 mb-8 -mt-6">Most of these i made for friends and communities, not because someone asked.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PROJECTS.map(p => {
                    const inner = (
                        <>
                          <h3 className="text-2xl handwritten-bold">{p.name}</h3>
                          <p className="text-lg text-gray-400 handwritten">{p.text}</p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            {p.tags.map(t => <span key={t} className="border border-gray-500 text-gray-300 px-2 py-1">{t}</span>)}
                          </div>
                          <span className="block text-xs uppercase tracking-tighter opacity-50">{p.url ? 'Click to open' : 'Private repo'}</span>
                        </>
                    );
                    return p.url
                        ? <a key={p.name} href={p.url} target="_blank" className="sketch-border p-6 space-y-4 project-card block">{inner}</a>
                        : <article key={p.name} className="sketch-border p-6 space-y-4">{inner}</article>;
                  })}
                </div>
              </section>

              <section id="experience">
                <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">Experience</h2>
                <div className="space-y-12">
                  {EXPERIENCE.map(e => (
                      <div key={e.role} className="relative pl-8 border-l border-white/30 space-y-2">
                        <div className="absolute -left-1.5 top-2 w-3 h-3 bg-white sketch-border"></div>
                        <h3 className="text-2xl handwritten-bold">{e.role}</h3>
                        <p className="text-xl text-gray-300 handwritten">{e.where}</p>
                        <ul className="list-disc list-inside text-lg text-gray-400 mt-2 space-y-1 handwritten">
                          {e.items.map(i => <li key={i}>{i}</li>)}
                        </ul>
                      </div>
                  ))}
                </div>
              </section>

              <section id="tech-stack">
                <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">tech stack</h2>
                <div className="space-y-12">
                  {STACK.map((g, i) => (
                      <div key={g.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className={i % 2 ? 'md:order-2 md:text-right' : ''}>
                          <h3 className={`handwritten-bold text-2xl ${TITLE[g.color]}`}>{g.title}</h3>
                          <p className="handwritten text-lg text-gray-400 mt-2">{g.note}</p>
                        </div>
                        <div className={`flex flex-wrap gap-2 ${i % 2 ? 'md:order-1' : ''}`}>
                          {g.items.map(t => <span key={t} className={`tech-badge transition-colors cursor-default ${BADGE[g.color]}`}>{t}</span>)}
                        </div>
                      </div>
                  ))}
                </div>
              </section>

              <MemoriesAlbum />

              <footer className="mt-32 text-center pb-12 border-t border-gray-800 pt-8">
                <p className="text-xl mb-4 handwritten">Waiting for something to happen?</p>
                <div className="flex justify-center gap-8 text-2xl handwritten">
                  <a className="hover:text-gray-400 transition-colors" href="https://github.com/maplehugs" target="_blank">Github</a>
                  <a className="hover:text-gray-400 transition-colors" href="https://www.linkedin.com/in/juan-jos%C3%A9-guerrero-ramirez-bba259254/" target="_blank">LinkedIn</a>
                  <a className="hover:text-gray-400 transition-colors" href="mailto:me@5maple.com">Mail</a>
                  <a className="hover:text-gray-400 transition-colors" href="https://www.credly.com/users/juan-jose-guerrero-ramirez" target="_blank">Credly</a>
                </div>
                <p className="mt-8 text-xs text-gray-600 uppercase tracking-widest handwritten">Everything is going to be okay.</p>
                <p className="mt-2 text-xs text-gray-700 handwritten">Bogotá D.C., Colombia</p>
              </footer>
            </div>
          </main>
        </div>
      </>
  );
}

// Componente separado para el álbum con interactividad
function MemoriesAlbum() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 3;

  const changePage = (delta: number) => {
    const newPage = currentPage + delta;
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);

    document.getElementById('sketchbook')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
      <section id="sketchbook">
        <div className="mb-12 border-b border-white pb-2">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <h2 className="marker text-4xl">Memories (Album)</h2>
            <div className="hidden md:flex gap-4">
              <button
                  className="album-nav-btn"
                  id="prevPage"
                  disabled={currentPage === 1}
                  onClick={() => changePage(-1)}
              >
                ← PREV
              </button>
              <button
                  className="album-nav-btn"
                  id="nextPage"
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(1)}
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* Botones móviles - debajo del título */}
          <div className="flex md:hidden gap-3 justify-center mt-4">
            <button
                className="album-nav-btn-mobile"
                disabled={currentPage === 1}
                onClick={() => changePage(-1)}
            >
              ←
            </button>
            <span className="text-white handwritten text-lg flex items-center">
              {currentPage} / {totalPages}
            </span>
            <button
                className="album-nav-btn-mobile"
                disabled={currentPage === totalPages}
                onClick={() => changePage(1)}
            >
              →
            </button>
          </div>
        </div>

        <div className="album-container-dark">
          <div className="album-spine hidden md:block"></div>

          {/* Page 1: Early Days */}
          <div className={`album-page ${currentPage === 1 ? 'active' : ''}`}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark -rotate-1">
                <div className="photo-vignette">
                  <img src="/server.webp" alt="First server" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of First Server</span> - You remember setting up your first VM on Oracle Cloud. The terminal was scary at first, but you couldn't stop. You had to learn Linux "the real way." No going back now.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark rotate-2">
                <div className="photo-vignette">
                  <img src="/3am.webp" alt="Late night debugging" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text md:text-right">
                <p><span className="album-title">Photo of Late Night Debugging</span> - 3 AM. The bug still won't go away. You've been at this for hours. Your friends are asleep, but the code must work. Just one more try...</p>
              </div>
            </div>
          </div>

          {/* Page 2: Professional Growth */}
          <div className={`album-page ${currentPage === 2 ? 'active' : ''}`}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark rotate-1">
                <div className="photo-vignette">
                  <img src="/ticket.webp" alt="First day at Australlens" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of First Day at Australlens</span> - Your first real internship. They trusted you with the entire ticket system. End-to-end. Solo. The pressure was real, but so was the excitement. Time to prove yourself.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark -rotate-2">
                <div className="photo-vignette">
                  <img src="/ice.webp" alt="Server migration" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text md:text-right">
                <p><span className="album-title">Photo of Server Migration</span> - Ubuntu to Windows Server. Everything had to be moved. Everything had to work. You stayed late, double-checked every config. When it finally came online, you smiled. It worked.</p>
              </div>
            </div>
          </div>

          {/* Page 3: Present & Future */}
          <div className={`album-page ${currentPage === 3 ? 'active' : ''}`}>
            <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
              <div className="polaroid-dark rotate-0 mb-8">
                <div className="photo-vignette bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                  <img src="/oña.webp" alt="What's next" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of What's Next</span> - The journey isn't over. Last semester, and the servers you deploy now are real ones at IMEVI. Others play on servers you rebuilt from scratch. More bugs to fix, more servers to deploy. The grind continues. And you wouldn't have it any other way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}