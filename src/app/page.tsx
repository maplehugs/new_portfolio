'use client';

import React, { useEffect, useState } from "react";

// Tipos para los repos de GitHub
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  created_at: string;
  updated_at: string;
}

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
          background: transparent;
          color: #666;
          border: 1px solid #333;
          padding: 4px 16px;
          transition: all 0.3s;
          font-family: 'Gaegu', cursive;
        }
        
        .album-nav-btn:hover:not(:disabled) {
          color: #fff;
          border-color: #fff;
        }
        
        .album-nav-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
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

        .stats-card {
          background: rgba(30, 30, 30, 0.8);
          border: 2px solid #444;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #333;
        }

        .stat-item:last-child {
          border-bottom: none;
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

        .loading-skeleton {
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s ease-in-out infinite;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

        <div className="bg-white text-black overflow-x-hidden relative">
          {/* Imagen de fondo solo en la parte superior con fade */}
          <div
              className="absolute top-0 left-0 right-0 h-screen pointer-events-none"
              style={{
                backgroundImage: "url('/top_page.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
              }}
          />

          {/* White Space Section */}
          <section className="min-h-screen flex flex-row items-center justify-center p-8 relative z-10" id="white-space">
            <div className="text-center">
              {/* Greeting */}
              <h1 className="handwritten-bold text-5xl md:text-7xl mb-4">Welcome to my space.</h1>
              <p className="handwritten text-2xl  italic mb-2">I'm Juan (maple)</p>
              <p className="text-omori ">Software Engineer · 7th Semester</p>
              <p className="handwritten text-lg mt-4">I have been living here for as long as i can remember.</p>

              {/* Navigation */}
              <div className="mt-12 animate-bounce">
                <a className="text-2xl hover:underline handwritten" href="#black-space">↓ Maybe check what's in my mind</a>
              </div>
            </div>
          </section>

          {/* Transition Gradient */}
          <div className="h-64 bg-gradient-to-b from-white to-black relative z-10"></div>

          {/* Black Space Section */}
          <main className="min-h-screen bg-black text-white p-6 md:p-12 black-space" id="black-space">
            <div className="max-w-6xl mx-auto space-y-24">

              {/* Projects Section - GitHub Dynamic */}
              <GitHubProjects />

              {/* Experience Section */}
              <section id="experience">
                <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">Experience</h2>
                <div className="space-y-12">

                  {/* Outlier AI */}
                  <div className="relative pl-8 border-l border-white/30 space-y-2">
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-white sketch-border"></div>
                    <h3 className="text-2xl handwritten-bold">AI Training & Evaluation</h3>
                    <p className="text-xl text-gray-300 handwritten">Outlier AI / June 2025 - November 2025</p>
                    <ul className="list-disc list-inside text-lg text-gray-400 mt-2 space-y-1 handwritten">
                      <li>Built complete solutions in Python, TypeScript, and Java following strict project guidelines</li>
                      <li>Reviewed and corrected AI-generated code, identifying runtime errors and logical flaws</li>
                      <li>Designed and tested prompts to evaluate AI behavior, correctness, and robustness</li>
                      <li>Ensured all deliverables met quality, correctness, and performance requirements</li>
                    </ul>
                  </div>

                  {/* Australlens Internship */}
                  <div className="relative pl-8 border-l border-white/30 space-y-2">
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-white sketch-border"></div>
                    <h3 className="text-2xl handwritten-bold">Web & App Developer Intern</h3>
                    <p className="text-xl text-gray-300 handwritten">Australlens / September 2024 - February 2025</p>
                    <ul className="list-disc list-inside text-lg text-gray-400 mt-2 space-y-1 handwritten">
                      <li>Designed, developed, and deployed a centralized ticket management system end-to-end</li>
                      <li>Built backend with Java 21 and Spring Boot 3.4.X, frontend with JavaScript and Tailwind CSS</li>
                      <li>Implemented authentication, role-based permissions, and file upload support</li>
                      <li>Physically set up and configured on-premise server (Ubuntu Server 24.04 → Windows Server 2019)</li>
                      <li>Managed database administration, deployment, and production maintenance</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Tech Stack Section */}
              <section id="tech-stack">
                <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">tech stack</h2>

                <div className="space-y-12">
                  {/* Languages - Izquierda texto, Derecha badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="handwritten-bold text-2xl text-cyan-400">languages</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">the ones i mass produce bugs in</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['C#', 'Java', 'JavaScript', 'Python', 'Bash'].map(lang => (
                          <span key={lang} className="tech-badge bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition-colors cursor-default">
            {lang}
          </span>
                      ))}
                    </div>
                  </div>

                  {/* Frameworks - Derecha texto, Izquierda badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-wrap gap-2 order-2 md:order-1">
                      {['Spring', 'Next.js', 'Apache Tomcat', 'Apache'].map(fw => (
                          <span key={fw} className="tech-badge bg-green-500/20 text-green-300 hover:bg-green-500/40 transition-colors cursor-default">
            {fw}
          </span>
                      ))}
                    </div>
                    <div className="order-1 md:order-2 md:text-right">
                      <h3 className="handwritten-bold text-2xl text-green-400">frameworks & tools</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">i swear i'll add more later</p>
                    </div>
                  </div>

                  {/* Cloud - Izquierda texto, Derecha badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="handwritten-bold text-2xl text-purple-400">cloud & hosting</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">may or may not have debts with some of these</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Google Cloud', 'Oracle', 'Heroku', 'Cloudflare'].map(cloud => (
                          <span key={cloud} className="tech-badge bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 transition-colors cursor-default">
            {cloud}
          </span>
                      ))}
                    </div>
                  </div>

                  {/* Databases - Derecha texto, Izquierda badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-wrap gap-2 order-2 md:order-1">
                      {['MariaDB', 'MySQL', 'SQLite'].map(db => (
                          <span key={db} className="tech-badge bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 transition-colors cursor-default">
            {db}
          </span>
                      ))}
                    </div>
                    <div className="order-1 md:order-2 md:text-right">
                      <h3 className="handwritten-bold text-2xl text-cyan-400">databases</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">i used to store info here, keyword "used to"</p>
                    </div>
                  </div>

                  {/* ML/AI - Izquierda texto, Derecha badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="handwritten-bold text-2xl text-red-400">ml / ai</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">they will control us one day</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['TensorFlow', 'PyTorch', 'Keras'].map(ml => (
                          <span key={ml} className="tech-badge bg-red-500/20 text-red-300 hover:bg-red-500/40 transition-colors cursor-default">
            {ml}
          </span>
                      ))}
                    </div>
                  </div>

                  {/* Creative - Derecha texto, Izquierda badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-wrap gap-2 order-2 md:order-1">
                      {['Krita', 'Clip Studio Paint', 'Figma', 'Photoshop'].map(creative => (
                          <span key={creative} className="tech-badge bg-pink-500/20 text-pink-300 hover:bg-pink-500/40 transition-colors cursor-default">
            {creative}
          </span>
                      ))}
                    </div>
                    <div className="order-1 md:order-2 md:text-right">
                      <h3 className="handwritten-bold text-2xl text-pink-400">creative</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">i have made awful drawings here</p>
                    </div>
                  </div>

                  {/* Version Control - Izquierda texto, Derecha badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="handwritten-bold text-2xl text-orange-400">version control</h3>
                      <p className="handwritten text-lg text-gray-400 mt-2">hey you seem familiar, do i know you?</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'GitHub'].map(vc => (
                          <span key={vc} className="tech-badge bg-orange-500/20 text-orange-300 hover:bg-orange-500/40 transition-colors cursor-default">
            {vc}
          </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Memories Album Section */}
              <MemoriesAlbum />

              {/* Footer */}
              <footer className="mt-32 text-center pb-12 border-t border-gray-800 pt-8">
                <p className="text-xl mb-4 handwritten">Waiting for something to happen?</p>
                <div className="flex justify-center gap-8 text-2xl handwritten">
                  <a className="hover:text-gray-400 transition-colors" href="https://github.com/maplehugs" target="_blank">Github</a>
                  <a className="hover:text-gray-400 transition-colors" href="https://linkedin.com/in/juan-guerrero-5maple" target="_blank">LinkedIn</a>
                  <a className="hover:text-gray-400 transition-colors" href="mailto:me@5maple.com">Mail</a>
                  <a className="hover:text-gray-400 transition-colors" href="https://credly.com" target="_blank">Credly</a>
                </div>
                <p className="mt-8 text-xs text-gray-600 uppercase tracking-widest handwritten">Everything is going to be okay.</p>
                <p className="mt-2 text-xs text-gray-700 handwritten">Bogotá D.C., Colombia · +57 311 8331482</p>
              </footer>
            </div>
          </main>
        </div>
      </>
  );
}

// Componente para cargar proyectos dinámicamente de GitHub
function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/maplehugs/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        // Filtrar repos archivados y forks si quieres
        const filteredRepos = data.filter((repo: GitHubRepo) => !repo.name.includes('maplehugs'));

        setRepos(filteredRepos.slice(0, 6)); // Mostrar máximo 6 repos
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return (
        <section id="projects">
          <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">Memories (Projects)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="sketch-border p-6 space-y-4 loading-skeleton h-64"></div>
            ))}
          </div>
        </section>
    );
  }

  if (error || repos.length === 0) {
    return (
        <section id="projects">
          <h2 className="marker text-4xl mb-12 border-b border-white pb-2 inline-block">Memories (Projects)</h2>
          <div className="text-center text-gray-400 handwritten text-xl py-12">
            <p>Unable to load projects from GitHub...</p>
            <p className="mt-4">But you can check them out at <a href="https://github.com/maplehugs" target="_blank" className="underline">github.com/maplehugs</a></p>
          </div>
        </section>
    );
  }

  return (
      <section id="projects">
        <div className="flex items-center justify-between mb-12 border-b border-white pb-2">
          <h2 className="marker text-4xl inline-block">Memories (Projects)</h2>
          <a
              href="https://github.com/maplehugs"
              target="_blank"
              className="handwritten text-lg text-gray-400 hover:text-white transition-colors"
          >
            View all on GitHub →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {repos.map((repo) => (
              <article
                  key={repo.id}
                  className="sketch-border p-6 space-y-4 project-card transition-all"
                  onClick={() => window.open(repo.html_url, '_blank')}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl handwritten-bold flex-1">{repo.name.replace(/-/g, '_')}</h3>
                  {repo.stargazers_count > 0 && (
                      <span className="text-yellow-400 text-sm ml-2">⭐ {repo.stargazers_count}</span>
                  )}
                </div>

                <p className="text-lg text-gray-400 handwritten min-h-[60px]">
                  {repo.description || 'A mysterious project from the depths of GitHub...'}
                </p>

                <div className="flex flex-wrap gap-2 text-sm">
                  {repo.language && (
                      <span className="border border-white px-2 py-1">{repo.language}</span>
                  )}
                  {repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="border border-gray-500 text-gray-400 px-2 py-1">{topic}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
              <span className="handwritten text-sm text-gray-500">
                Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </span>
                  <span className="text-xs uppercase tracking-tighter opacity-50">Click to Open</span>
                </div>
              </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
              href="https://github.com/maplehugs?tab=repositories"
              target="_blank"
              className="inline-block sketch-border px-8 py-3 handwritten-bold text-xl hover:bg-white hover:text-black transition-colors"
          >
            See More Projects on GitHub
          </a>
        </div>
      </section>
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
        <div className="flex items-center justify-between mb-12 border-b border-white pb-2">
          <h2 className="marker text-4xl">Memories (Album)</h2>
          <div className="flex gap-4">
            <button
                className="album-nav-btn text-xl"
                disabled={currentPage === 1}
                onClick={() => changePage(-1)}
            >
              ← PREV
            </button>
            <button
                className="album-nav-btn text-xl"
                disabled={currentPage === totalPages}
                onClick={() => changePage(1)}
            >
              NEXT →
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
                  <div className="photo-vignette">
                    <img src="/server.png" alt="First Server" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of First Server</span> - You remember setting up your first VM on Oracle Cloud. The terminal was scary at first, but you couldn't stop. You had to learn Linux "the real way." No going back now.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark rotate-2">
                <div className="photo-vignette">
                  <img src="/3am.png" alt="First Server" className="w-full h-full object-cover" />
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
                  <img src="/ticket.png" alt="First Server" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of First Day at Australlens</span> - Your first real internship. They trusted you with the entire ticket system. End-to-end. Solo. The pressure was real, but so was the excitement. Time to prove yourself.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 relative z-10 px-4">
              <div className="polaroid-dark -rotate-2">
                <div className="photo-vignette">
                  <img src="/ice.png" alt="First Server" className="w-full h-full object-cover" />
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
                  <img src="/oña.png" alt="First Server" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="album-text">
                <p><span className="album-title">Photo of What's Next</span> - The journey isn't over. 7th semester completed, one more to go. More projects to build, more bugs to fix, more servers to deploy. The grind continues. And you wouldn't have it any other way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}