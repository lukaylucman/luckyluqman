import React, { useState, useEffect, useCallback, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const StatusBadge = memo(() => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="inline-block animate-float lg:mx-0"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </motion.div>
));

const MainTitle = memo(() => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="space-y-2"
  >
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent pb-2">
          Frontend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent pb-2">
          Developer
        </span>
      </span>
    </h1>
  </motion.div>
));

const TechStack = memo(({ tech }: { tech: string }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }: { href: string, text: string, icon: any }) => (
  <a href={href} className="flex-1 sm:flex-none">
    <button className="group relative w-full sm:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }: { icon: any, link: string, label: string }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3"
      aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Computer Science Edu Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const TiktokIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/lukaylucman", label: "GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/lucky-luqmanul-hakim-16319437b", label: "LinkedIn Profile" },
  { icon: Instagram, link: "https://www.instagram.com/luckyluqmn/", label: "Instagram Profile" },
  { icon: TiktokIcon, link: "https://www.tiktok.com/@luckyluqman?is_from_webapp=1&sender_device=pc", label: "TikTok Profile" }
];

const Hero = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <section id="Home" className="min-h-[85vh] flex items-center pt-24 pb-10">
      <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-0 sm:gap-12 lg:gap-20 w-full">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0">
          <div className="space-y-4 sm:space-y-6">
            <StatusBadge />
            <MainTitle />

            {/* Typing Effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="h-8 flex items-center"
            >
              <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                {text}
              </span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-pulse"></span>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
            >
              Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
            </motion.p>

            {/* Tech Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-wrap gap-3 justify-start"
            >
              {TECH_STACK.map((tech, index) => (
                <TechStack key={index} tech={tech} />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-row gap-3 w-full justify-start"
            >
              <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
              <CTAButton href="#Contact" text="Contact" icon={Mail} />
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="hidden sm:flex gap-4 justify-start"
            >
              {SOCIAL_LINKS.map((social, index) => (
                <SocialLink key={index} {...social} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Column - WebM Video */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full py-0 md:py-[5%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[500px] xl:h-[600px] relative flex items-center justify-center order-2 lg:order-2 mt-5 sm:mt-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full opacity-90">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
              isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
            }`}>
            </div>

            <div className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
              isHovering ? "scale-105" : "scale-100"
            }`}>
              <img
                src="https://ekizr.com/Animation1.gif"
                alt="Developer Animation"
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isHovering 
                    ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2" 
                    : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                }`}
              />
            </div>

            <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
              isHovering ? "opacity-50" : "opacity-20"
            }`}>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                isHovering ? "scale-110" : "scale-100"
              }`}>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
