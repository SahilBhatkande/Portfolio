import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import './index.css';

// Initialize EmailJS with your Public Key
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key (e.g., 'user_123456789')

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-200 hover:text-teal-300 transition duration-300 px-4 py-2 rounded-lg"
    whileHover={{ scale: 1.1, backgroundColor: 'rgba(45, 212, 191, 0.15)' }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
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
      className={`flex items-center justify-center py-20 px-4 ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
    >
      <div className="bg-gray-850 rounded-3xl shadow-2xl max-w-6xl w-full p-8 md:p-12">
        {children}
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ title, description, link, image }) => (
  <motion.div
    className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden project-card"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="h-64 bg-cover bg-center">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4 text-base">{description}</p>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-teal-500 text-white px-6 py-2 rounded-full font-semibold text-base hover:bg-teal-600"
        whileHover={{ scale: 1.05, x: 5 }}
        transition={{ duration: 0.3 }}
      >
        View Project
      </motion.a>
    </div>
  </motion.div>
);

const ExperienceCard = ({ company, role, duration, description }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-2xl shadow-lg"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-xl font-semibold text-white mb-2">{role}</h3>
    <p className="text-teal-300 font-medium mb-1">{company}</p>
    <p className="text-gray-400 text-sm mb-3">{duration}</p>
    <p className="text-gray-300 text-base">{description}</p>
  </motion.div>
);

const SkillCategory = ({ title, skills }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-2xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-300 text-base">{skills.join(', ')}</p>
  </motion.div>
);

const EducationCard = ({ degree, institution, duration }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-2xl shadow-lg"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-xl font-semibold text-white mb-2">{degree}</h3>
    <p className="text-teal-300 font-medium mb-1">{institution}</p>
    <p className="text-gray-400 text-sm">{duration}</p>
  </motion.div>
);

const App = () => {
  const controls = useAnimation();
  const [navRef, navInView] = useInView({ threshold: 0.1 });
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!navInView) {
      controls.start({ backgroundColor: 'rgba(10, 25, 47, 0.95)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' });
    } else {
      controls.start({ backgroundColor: 'rgba(10, 25, 47, 0)', boxShadow: 'none' });
    }
  }, [controls, navInView]);

  const onSubmit = (data) => {
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID (e.g., 'service_abc123')
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID (e.g., 'template_xyz789')
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      }
    )
      .then(() => {
        alert('Message sent successfully!');
        reset();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 py-6"
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <motion.h1
            className="text-4xl font-extrabold text-teal-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            SAHIL BHATKANDE
          </motion.h1>
          <ul className="flex space-x-6">
            <li><NavLink href="#home">Home</NavLink></li>
            <li><NavLink href="#about">About</NavLink></li>
            <li><NavLink href="#experience">Experience</NavLink></li>
            <li><NavLink href="#projects">Projects</NavLink></li>
            <li><NavLink href="#contact">Contact</NavLink></li>
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <Section id="home" className="bg-gradient-to-br from-gray-900 to-blue-950">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
              Full Stack Developer
            </h1>
            <p className="text-lg md:text-2xl max-w-lg mb-8 text-gray-300">
              Turning coffee into code and ideas into reality — building the next big thing. ☕🚀💡
            </p>
            <motion.a
              href="/your-cv.pdf"
              download="Sahil_Bhatkande_CV.pdf"
              className="bg-teal-500 text-white px-10 py-4 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              See My CV
            </motion.a>
          </motion.div>
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <img
              src="/sahil_image.jpg"
              alt="Your Photo"
              className="rounded-full w-64 h-64 md:w-96 md:h-96 object-cover mx-auto border-4 border-teal-300 shadow-lg"
            />
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-gray-900">
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-4xl mx-auto mb-12 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            I’m a full-stack developer and designer pursuing a B.E. in Computer Science from Dr. D Y Patil Institute of Technology (graduating 2026). With expertise in React, Node.js, and UI/UX, I create visually stunning and technically robust web experiences.
          </motion.p>
          <h3 className="text-2xl font-semibold mb-6 text-white">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <SkillCategory
              title="Frontend"
              skills={['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML/CSS']}
            />
            <SkillCategory
              title="Backend"
              skills={['Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs']}
            />
            <SkillCategory
              title="Other Tools/Tech"
              skills={['AWS', 'Git', 'UI/UX Design', 'Docker', 'Figma']}
            />
          </div>
          <h3 className="text-2xl font-semibold mb-6 text-white">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EducationCard
              degree="B.E. in Computer Science"
              institution="Dr. D Y Patil Institute of Technology, Pune"
              duration="2023 - 2026"
            />
            <EducationCard
              degree="Diploma in Computer Engineering"
              institution="Dr. Bapuji Salunkhe Institute of Technology, Kolhapur"
              duration="2020 - 2023"
            />
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-gray-850">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExperienceCard
              company="DNG Technology"
              role="Software Developer Intern"
              duration="June 2024 - September 2024"
              description="Developed responsive web applications using React and Node.js for a freelancer platform. Implemented JWT-based authentication, optimized page load speed by 20%, and integrated MongoDB for efficient data management."
            />
            <ExperienceCard
              company="Dehix"
              role="Software Developer Intern"
              duration="January 2024 - April 2024"
              description="Contributed to full-stack development of a job portal using React, Node.js, and MongoDB. Enhanced API performance through optimized queries and collaborated with teams to ensure seamless UI/UX."
            />
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-gray-850">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Selected Projects</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <ProjectCard
              title="E-Commerce Platform"
              description="A responsive online store with real-time cart updates, built with React, Node.js, and MongoDB."
              link="https://github.com/SahilBhatkande/Bookstore"
              image="/ecommerce.png"
            />
            <ProjectCard
              title="Job Portal"
              description="A full-stack job platform with advanced search and application features, using React and Node.js."
              link="https://job-portal-sb.vercel.app/"
              image="/JobPortal.png"
            />
            <ProjectCard
              title="AI Mock Interviewer"
              description="An AI-powered mock interviewer that helps you practice technical interviews with real-time feedback."
              link="https://ai-interview-mocker.vercel.app/"
              image="/AI.png"
            />
          </motion.div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Let’s Connect</h2>
          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto mb-12 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Drop me a message to collaborate or discuss tech and design. I’m excited to connect!
          </motion.p>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: true })}
              className="w-full p-4 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:border-teal-300 focus:outline-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              {...register('email', { required: true })}
              className="w-full p-4 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:border-teal-300 focus:outline-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.textarea
              placeholder="Your Message"
              {...register('message', { required: true })}
              className="w-full p-4 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:border-teal-300 focus:outline-none h-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
            <motion.button
              type="submit"
              className="bg-teal-500 text-white px-10 py-4 rounded-full font-semibold text-base"
              whileHover={{ scale: 1.1, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Send Message
            </motion.button>
          </form>
          <div className="flex justify-center space-x-6 mt-8">
            <motion.a
              href="https://x.com/Sahil_Bhatkande?t=ZS93nw0i32QODCh0a8oZ8Q&s=08"
              className="text-gray-300 hover:text-teal-300 text-lg"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Twitter
            </motion.a>
            <motion.a
              href="https://github.com/SahilBhatkande"
              className="text-gray-300 hover:text-teal-300 text-lg"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sahil-bhatkande/"
              className="text-gray-300 hover:text-teal-300 text-lg"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-850 text-gray-300 py-10">
        <div className="container mx-auto text-center">
          <p>© 2025 Sahil Bhatkande. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;