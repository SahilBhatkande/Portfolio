import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import './index.css';

// Initialize EmailJS with your Public Key
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

const HeroBackground = () => (
  <div className="floating-shapes">
    <div className="shape"></div>
    <div className="shape"></div>
    <div className="shape"></div>
  </div>
);

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-[#8F9BB7] hover:text-[#00F0FF] relative group px-4 py-2 text-sm md:text-base"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00F0FF] group-hover:w-full transition-all duration-300"
      initial={{ width: '0%' }}
      whileHover={{ width: '100%' }}
    />
  </motion.a>
);

const Section = ({ id, children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
    >
      <div className="bg-gray-850 rounded-3xl shadow-2xl max-w-7xl w-full p-6 sm:p-8 md:p-12">
        {children}
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ title, description, link, image, tags }) => {
  const [hoverRef, isHovered] = useHover();

  return (
    <motion.div
      ref={hoverRef}
      className="group relative bg-[#1A1C23] rounded-xl overflow-hidden border border-[#2A2D36] transition-all duration-500 hover:border-[#00F0FF]/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#7000FF]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C23] via-[#1A1C23]/50 to-transparent" />
      </div>
      <div className="p-4 sm:p-6 relative">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: `linear-gradient(135deg, ${index % 2 === 0 ? '#00F0FF20' : '#7000FF20'}, transparent)`,
                color: index % 2 === 0 ? '#00F0FF' : '#7000FF',
                border: `1px solid ${index % 2 === 0 ? '#00F0FF50' : '#7000FF50'}`
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">{title}</h3>
        <p className="text-[#8F9BB7] mb-6 text-sm sm:text-base leading-relaxed">{description}</p>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#00F0FF] text-sm font-medium group/link"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          View Project
          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

const ExperienceCard = ({ company, role, duration, description }) => (
  <motion.div
    className="bg-white/80 p-6 sm:p-8 rounded-sm shadow-lg border border-[#8b7355]/10"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -5,
      boxShadow: '0 10px 30px -15px rgba(139, 115, 85, 0.2)'
    }}
    transition={{ duration: 0.4 }}
  >
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{role}</h3>
    <p className="text-[#8b7355] font-medium mb-1">{company}</p>
    <p className="text-gray-500 text-sm mb-3">{duration}</p>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
  </motion.div>
);

const SkillCategory = ({ title, skills }) => (
  <motion.div
    className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-300 text-sm sm:text-base">{skills.join(', ')}</p>
  </motion.div>
);

const EducationCard = ({ degree, institution, duration }) => (
  <motion.div
    className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{degree}</h3>
    <p className="text-teal-300 font-medium mb-1">{institution}</p>
    <p className="text-gray-400 text-sm">{duration}</p>
  </motion.div>
);

const App = () => {
  const controls = useAnimation();
  const [navRef, navInView] = useInView({ threshold: 0.1 });
  const { register, handleSubmit, reset } = useForm();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!navInView) {
      controls.start({ backgroundColor: 'rgba(10, 25, 47, 0.95)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' });
    } else {
      controls.start({ backgroundColor: 'rgba(10, 25, 47, 0)', boxShadow: 'none' });
    }
  }, [controls, navInView]);

  const onSubmit = async (data) => {
    const button = document.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = 'Sending...';
    button.disabled = true;

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_name: 'Sahil',
        reply_to: data.email,
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      alert('Message sent successfully! I will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again or contact me directly at sahilb2604@gmail.com');
    } finally {
      button.innerHTML = originalText;
      button.disabled = false;
    }
  };

  const techStack = [
    'React', 'Node.js', 'Web3', 'Solidity', 'TypeScript', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis', 
    'JWT', 'Hardhat', 'IPFS', 'Next.js', 'Express.js', 'Docker', 'Kubernetes'
  ];

  return (
    <div className="bg-[#0A0B0D] text-white font-sans min-h-screen">
      {/* Navbar */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 py-4 sm:py-6 bg-[#0A0B0D]/80 backdrop-blur-md"
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#7000FF] bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            SB
          </motion.h1>
          <ul className="hidden md:flex space-x-4 md:space-x-8">
            <li><NavLink href="#home">Home</NavLink></li>
            <li><NavLink href="#about">About</NavLink></li>
            <li><NavLink href="#experience">Experience</NavLink></li>
            <li><NavLink href="#projects">Projects</NavLink></li>
            <li><NavLink href="#contact">Contact</NavLink></li>
          </ul>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#00F0FF] mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#00F0FF] mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#00F0FF] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#13141A] border-t border-[#00F0FF]/10 px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#home" className="block text-[#8F9BB7] hover:text-[#00F0FF] text-base" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="block text-[#8F9BB7] hover:text-[#00F0FF] text-base" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#experience" className="block text-[#8F9BB7] hover:text-[#00F0FF] text-base" onClick={() => setMenuOpen(false)}>Experience</a></li>
              <li><a href="#projects" className="block text-[#8F9BB7] hover:text-[#00F0FF] text-base" onClick={() => setMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" className="block text-[#8F9BB7] hover:text-[#00F0FF] text-base" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <Section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#13141A] via-[#20232A] to-[#2C3E50] px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <HeroBackground />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-base sm:text-lg md:text-xl text-[#00F0FF] font-medium mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Hello, I'm Sahil 👋
            </motion.span>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF3DFF] bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Software Engineer
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-[#8F9BB7] mb-12 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Full Stack Developer specializing in scalable backend systems, cloud infrastructure, and modern web applications. Building robust and efficient solutions for the future.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="neon-border inline-flex items-center px-6 sm:px-8 py-3 text-white bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="/your-cv.pdf"
                download="Sahil_Bhatkande_CV.pdf"
                className="inline-flex items-center px-6 sm:px-8 py-3 text-white border border-[#00F0FF] rounded-lg hover:bg-[#00F0FF]/10 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-[#8F9BB7] mb-2">Scroll to explore</span>
            <svg className="w-6 h-6 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="glass-card bg-gradient-to-br from-[#13141A]/95 via-[#20232A]/95 to-[#2C3E50]/95 backdrop-blur-lg px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="text-left">
              <motion.p className="text-base sm:text-lg text-[#8F9BB7] leading-relaxed mb-6">
                Full-stack developer with a passion for building scalable backend systems and cloud-native applications. I specialize in leveraging AWS, modern JavaScript frameworks, and containerization to create robust solutions.
              </motion.p>
              <motion.p className="text-base sm:text-lg text-[#8F9BB7] leading-relaxed mb-6">
                Currently pursuing B.E. in Computer Science, I combine academic knowledge with hands-on experience in developing high-performance web applications and tackling complex scalability challenges.
              </motion.p>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-8">
                {techStack.map((tech) => (
                  <span key={tech} className="px-3 sm:px-4 py-1 sm:py-2 bg-[#00F0FF]/10 text-[#00F0FF] rounded-lg border border-[#00F0FF]/20 text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-[#1A1C23] p-4 sm:p-6 rounded-lg border border-[#2A2D36]">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#00F0FF] font-medium">B.E. in Computer Science</h4>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Dr. D Y Patil Institute of Technology, Pune</p>
                    <p className="text-sm text-[#8F9BB7]/70">2023 - 2026</p>
                  </div>
                  <div>
                    <h4 className="text-[#00F0FF] font-medium">Diploma in Computer Engineering</h4>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Dr. Bapuji Salunkhe Institute of Technology</p>
                    <p className="text-sm text-[#8F9BB7]/70">2020 - 2023</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1A1C23] p-4 sm:p-6 rounded-lg border border-[#2A2D36]">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Current Focus</h3>
                <ul className="space-y-2 text-[#8F9BB7]">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AWS Cloud Infrastructure
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Backend Development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00F0FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Scalable Problem Solving
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="glass-card bg-gradient-to-br from-[#13141A]/95 via-[#20232A]/95 to-[#2C3E50]/95 backdrop-blur-lg px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] bg-clip-text text-transparent inline-block">
            Experience
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#1A1C23] p-6 sm:p-8 rounded-2xl border border-[#2A2D36] hover:border-[#00F0FF]/50 transition-all duration-300 h-full transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00F0FF]/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 ">Software Developer Intern</h3>
                    <h4 className="text-[#00F0FF] font-medium text-left mb-2">DNG Technology</h4>
                  </div>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-[#00F0FF]/10 text-[#00F0FF] rounded-lg text-xs sm:text-sm">
                    June 2024 - Sept 2024
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Developed responsive web applications using React and Node.js for a freelancer platform, implementing modern UI/UX principles.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Implemented JWT-based authentication system and integrated MongoDB for efficient data management.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Optimized application performance resulting in 20% improvement in page load speed and enhanced user experience.</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'JWT', 'AWS'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#00F0FF10' : '#7000FF10'}, transparent)`,
                        color: index % 2 === 0 ? '#00F0FF' : '#7000FF',
                        border: `1px solid ${index % 2 === 0 ? '#00F0FF30' : '#7000FF30'}`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#1A1C23] p-6 sm:p-8 rounded-2xl border border-[#2A2D36] hover:border-[#7000FF]/50 transition-all duration-300 h-full transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7000FF]/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Software Developer Intern</h3>
                    <h4 className="text-[#7000FF] font-medium text-left mb-2">Dehix</h4>
                  </div>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-[#7000FF]/10 text-[#7000FF] rounded-lg text-xs sm:text-sm">
                    Jan 2024 - Apr 2024
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00F0FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Built a full-stack job portal using Next.js and Express.js, featuring real-time updates and advanced search functionality.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00F0FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Enhanced API performance through query optimization and implemented Redis caching strategies.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00F0FF] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[#8F9BB7] text-sm sm:text-base">Deployed application on AWS ECS with Docker, improving scalability and reliability.</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Next.js', 'Express.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#7000FF10' : '#00F0FF10'}, transparent)`,
                        color: index % 2 === 0 ? '#7000FF' : '#00F0FF',
                        border: `1px solid ${index % 2 === 0 ? '#7000FF30' : '#00F0FF30'}`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="glass-card bg-gradient-to-br from-[#13141A]/95 via-[#20232A]/95 to-[#2C3E50]/95 backdrop-blur-lg px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] bg-clip-text text-transparent inline-block">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <ProjectCard
              title="AI Mock Interviewer"
              description="An AI-powered platform for conducting mock interviews, providing real-time feedback and performance analytics. Built with React, Node.js, and integrated with AWS for scalable backend services."
              link="https://ai-mockup-inter.web.app/"
              image="projects/defi-dashboard.png"
              tags={['React', 'Node.js', 'AWS', 'AI', 'TypeScript']}
            />
            <ProjectCard
              title="Expensify"
              description="A full-stack expense tracking application with real-time reporting and budget management. Deployed on AWS with Docker containers for scalability."
              link="https://personal-finance-tracker-13az.vercel.app/"
              image="projects/nft-marketplace.png"
              tags={['Next.js', 'Express.js', 'MongoDB', 'AWS', 'Docker']}
            />
            <ProjectCard
              title="Job Portal"
              description="A scalable job portal with advanced search, real-time notifications, and secure authentication. Built with Next.js and deployed on AWS with Kubernetes."
              link="https://job-portal-sb.vercel.app/"
              image="projects/smart-contracts.png"
              tags={['Next.js', 'PostgreSQL', 'Kubernetes', 'AWS', 'Redis']}
            />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="glass-card bg-gradient-to-br from-[#13141A]/95 via-[#20232A]/95 to-[#2C3E50]/95 backdrop-blur-lg px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] bg-clip-text text-transparent inline-block">
            Let's Connect
          </h2>
          <p className="text-[#8F9BB7] text-base sm:text-lg mb-12">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register('name', { required: true })}
                  className="w-full p-4 bg-[#1A1C23] text-white rounded-lg border border-[#2A2D36] focus:border-[#00F0FF] focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register('email', { required: true })}
                  className="w-full p-4 bg-[#1A1C23] text-white rounded-lg border border-[#2A2D36] focus:border-[#00F0FF] focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="Your Message"
                  {...register('message', { required: true })}
                  className="w-full p-4 bg-[#1A1C23] text-white rounded-lg border border-[#2A2D36] focus:border-[#00F0FF] focus:outline-none transition-colors h-32 resize-none text-sm sm:text-base"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
            <motion.div
              className="text-left space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:sahilb2604@gmail.com" className="flex items-center text-[#8F9BB7] hover:text-[#00F0FF] transition-colors text-sm sm:text-base">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    sahilb2604@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/sahil-bhatkande/" className="flex items-center text-[#8F9BB7] hover:text-[#00F0FF] transition-colors text-sm sm:text-base">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/SahilBhatkande"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1A1C23] text-[#8F9BB7] rounded-lg border border-[#2A2D36] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://x.com/Sahil_Bhatkande?t=ZS93nw0i32QODCh0a8oZ8Q&s=08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1A1C23] text-[#8F9BB7] rounded-lg border border-[#2A2D36] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/sahil-bhatkande/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1A1C23] text-[#8F9BB7] rounded-lg border border-[#2A2D36] hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 mt-16 sm:mt-20 bg-[#13141A]">
        <div className="container mx-auto text-center">
          <p className="text-sm text-[#8F9BB7]">© 2025 Sahil Bhatkande. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const useHover = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
};

export default App;