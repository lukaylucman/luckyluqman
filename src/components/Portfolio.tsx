import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Award, Layers, Download, ArrowUpRight, ExternalLink, X, Maximize } from "lucide-react";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "Website Kalkulus Interaktif",
      description: "Platform pembelajaran interaktif untuk memahami konsep kalkulus dengan mudah. Dilengkapi dengan visualisasi grafis, latihan soal, dan materi yang terstruktur untuk membantu mahasiswa dan pelajar.",
      fullDescription: "Website Kalkulus Interaktif adalah platform pembelajaran yang dirancang khusus untuk membantu mahasiswa dan pelajar memahami konsep-konsep kalkulus secara visual dan interaktif. Aplikasi ini dilengkapi dengan materi yang terstruktur dari dasar hingga lanjutan, latihan soal interaktif, dan visualisasi grafis yang memudahkan pemahaman materi matematika yang kompleks.",
      image: "https://i.ibb.co.com/60x1XD9V/Screenshot-2026-03-19-17-00-10.png",
      tech: ["React", "Next.js", "Tailwind CSS"],
      github: "#",
      live: "https://the-world-of-calculus.netlify.app"
    },
    {
      id: 2,
      title: "Website Manajemen Tugas Harian",
      description: "Aplikasi produktivitas untuk mengelola tugas harian dengan fitur pelacakan progres, prioritas tugas, dan antarmuka yang intuitif untuk meningkatkan efisiensi kerja.",
      fullDescription: "Website Manajemen Tugas Harian adalah aplikasi produktivitas komprehensif yang membantu pengguna dalam mengelola, melacak, dan memprioritaskan tugas-tugas harian mereka. Dengan antarmuka yang intuitif dan mudah digunakan, fitur pelacakan progres real-time, dan manajemen prioritas, aplikasi ini dirancang untuk meningkatkan efisiensi kerja dan manajemen waktu pengguna.",
      image: "https://i.ibb.co.com/Xh0Kq1z/Screenshot-2026-03-19-17-08-23.png",
      tech: ["React", "Next.js", "Tailwind CSS"],
      github: "#",
      live: "https://lukay-task-management.netlify.app/"
    }
  ];

  const certificates = [
    { id: 1, title: "Sertifikat Kelulusan Luminasa", issuer: "BEM KEMAKOM UPI", date: "2025", image: "https://i.ibb.co.com/jsNg9q9/Sertifikat-kelulusan-Luminasa-page-0001.jpg" },
    { id: 2, title: "Sertifikat Inaugurasi Santara", issuer: "BEM KEMAKOM UPI", date: "2025", image: "https://i.ibb.co.com/ZRGHdWqZ/Sertifikat-Inaugurasi-2025-page-0001.jpg" },
    { id: 3, title: "Sertifikat Tahfidzul Qur'an", issuer: "MAN 1 Subang", date: "2025", image: "https://i.ibb.co.com/spgnDy9R/Cam-Scanner-19-03-2026-19-14-1-jpg.jpg" },
    { id: 4, title: "Piagam Penghargaan Pendidikan Pancasila", issuer: "MAN 1 Subang", date: "2025", image: "https://i.ibb.co.com/p9bBf0v/Cam-Scanner-19-03-2026-19-14-2-jpg.jpg" },
    { id: 5, title: "Medali Emas Olimpiade Matematika", issuer: "LSI 3", date: "2024", image: "https://i.ibb.co.com/LDBzJWyJ/Cam-Scanner-19-03-2026-19-14-3-jpg.jpg" },
  ];

  const techStack = [
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "ReactJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
    { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "Node JS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Material UI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
    { name: "SweetAlert2", logo: "https://sweetalert2.github.io/images/SweetAlert2.png" },
  ];

  return (
    <section id="Portofolio" className="pt-10 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full max-w-2xl backdrop-blur-sm"
        >
          {[
            { id: "projects", label: "Projects", icon: Code2 },
            { id: "certificates", label: "Certificates", icon: Award },
            { id: "tech", label: "Tech Stack", icon: Layers }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${
                activeTab === tab.id 
                  ? "text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-80"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#a855f7]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col"
                >
                  <div className="h-40 sm:h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10 opacity-80"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <a href={project.live} className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#a855f7] transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#a855f7] transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        See More
                      </button>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2"
                      >
                        View <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <div className="aspect-[4/3] sm:aspect-[1.414/1] w-full relative flex items-center justify-center p-4">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <Maximize className="text-white" size={24} />
                      </div>
                      <span className="text-white font-medium text-lg tracking-wide">View Certificate</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
            >
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={stack.logo} 
                      alt={stack.name} 
                      className={`w-full h-full object-contain ${stack.invert ? 'invert brightness-0' : ''}`} 
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-white transition-colors text-center">
                    {stack.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="relative h-48 sm:h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-90"></div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t: string, i: number) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>
                <div className="flex gap-4">
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:opacity-90 transition-opacity text-sm sm:text-base font-medium flex items-center justify-center gap-2"
                  >
                    Visit Website <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-transparent z-10 flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-12 right-0 sm:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              <div className="relative w-full flex items-center justify-center">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
