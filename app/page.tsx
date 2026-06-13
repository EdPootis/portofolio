"use client";

import React, { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('edmond.chr@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');
    setStatusMessage('');

    const formData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'your_web3forms_key_here') {
      setFormStatus('error');
      setStatusMessage('Please configure your NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in the .env.local file.');
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", `New Portfolio Message from ${formData.get("name")}`);
    formData.append("from_name", "Edmond Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        e.currentTarget.reset();
      } else {
        setFormStatus('error');
        setStatusMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-6">

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center w-full px-6 text-center">
        <p className="text-neon-cyan mb-4 tracking-widest uppercase text-sm">HI THERE, I AM</p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Edmond Christian
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-400 mb-8">
          Software Engineer <br /> <span className="text-gray-500 text-xl md:text-2xl">Focusing on full-stack web and mobile application development</span>
        </h2>

        {/* Social Links Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {/* Email */}
          <a
            href="mailto:edmond.chr@gmail.com"
            className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
            title="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/EdPootis"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/edmondchristian"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/_edmondchristian"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
            title="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
          </a>

          {/* Resume */}
          <a
            href="https://docs.google.com/document/d/1i20hICPO5dg-G7rBCD5WRs4yYzFk-UJvwbbpethGtn8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
            title="Resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
          </a>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="min-h-[70vh] flex flex-col items-center justify-center w-full max-w-5xl px-6 py-20">
        <h3 className="text-3xl font-bold mb-12 text-neon-cyan border-b-2 border-gray-800 pb-4 w-full text-center">
          About Me
        </h3>

        <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">
          {/* Left Column: Portrait Photo */}
          <div className="w-full md:w-2/5 flex flex-col">
            <div className="flex-1 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative group/img min-h-[400px]">
              <img
                src="/portrait.jpg"
                alt="Edmond Christian"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              />
            </div>
          </div>

          {/* Right Column: About Cards */}
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            {/* Card 1: Description */}
            <div className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card flex-1 flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-bold text-white">Who's Edmond?</h4>
                  <span className="text-neon-cyan">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed text-base font-medium text-justify">
                  A highly motivated Computer Science student at Universitas Indonesia (GPA 3.97) with a passion for building reliable, high-performance, and data-driven solutions. I specialize in developing scalable applications, designing RESTful APIs, and optimizing database models. I also actively participate in academic mentoring and troubleshooting complex system workflows.
                </p>
              </div>
            </div>

            {/* Card 2: Education */}
            <div className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">Currently educated in</h4>
                <span className="text-neon-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
                </span>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                  <img
                    src="/ui_logo.png"
                    alt="Universitas Indonesia Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-white text-base">University of Indonesia</h5>
                  <p className="text-gray-400 text-sm font-medium">Faculty of Computer Science</p>
                </div>
              </div>
            </div>

            {/* Card 3: Projects and Experiences Quick Link */}
            <a
              href="#projects"
              className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card flex justify-between items-center cursor-pointer group-hover/card:text-neon-cyan"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <span className="font-bold text-white group-hover/card:text-neon-cyan transition-colors">Projects and Experiences</span>
              <span className="text-gray-400 group-hover/card:text-neon-cyan transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. INTERESTS & TECH STACK SECTION */}
      <section id="tech" className="min-h-screen flex flex-col items-center justify-center w-full max-w-5xl px-6 py-20 gap-10">
        <h3 className="text-3xl font-bold mb-4 text-neon-cyan border-b-2 border-gray-800 pb-4 w-full text-center">
          Interests & Tech Stack
        </h3>

        {/* 3a. INTERESTS CARD */}
        <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl w-full hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

          <div className="flex justify-between items-center mb-8">
            <h4 className="text-2xl font-bold text-white flex items-center gap-2">
              Interests
            </h4>
            <span className="text-neon-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.065 12.493-6.18 5.397a1 1 0 0 0-.104 1.397l2.33 2.68a1 1 0 0 0 1.398.103l6.18-5.398a6 6 0 0 1-3.624-4.18Z" /><path d="M19 3a3 3 0 0 0-3 3c0 .88.38 1.67 1 2.22l-6.33 5.53a4 4 0 0 0 2.66 2.66l6.33-5.53A3.01 3.01 0 0 0 22 6a3 3 0 0 0-3-3Z" /><path d="M14 19a2 2 0 0 0-2-2c-.55 0-1.05.22-1.41.59L8 15" /><path d="m18 22-3-3" /></svg>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backend System */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 15h3" /><path d="M1 9h3" /><path d="M1 15h3" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Backend System</h5>
                <p className="text-gray-400 text-sm font-medium">Django, Spring Boot, Python, Java, Flask</p>
              </div>
            </div>

            {/* Web Development */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Web Development</h5>
                <p className="text-gray-400 text-sm font-medium">React, JavaScript, Tailwind CSS, HTML5, CSS3</p>
              </div>
            </div>

            {/* Mobile Development */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><line x1="12" x2="12.01" y1="18" y2="18" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Mobile Development</h5>
                <p className="text-gray-400 text-sm font-medium">Flutter, Dart, Android Studio</p>
              </div>
            </div>

            {/* Database Management */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Database Management</h5>
                <p className="text-gray-400 text-sm font-medium">PostgreSQL, Supabase, SQL</p>
              </div>
            </div>

            {/* Monitoring & Logging */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Monitoring & Logging</h5>
                <p className="text-gray-400 text-sm font-medium">Grafana, Loki, Prometheus</p>
              </div>
            </div>

            {/* Developer Tools & Collaboration */}
            <div className="flex items-start gap-4">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Tools & Collaboration</h5>
                <p className="text-gray-400 text-sm font-medium">Git, GitHub, GitLab, Jira, Figma</p>
              </div>
            </div>

            {/* Gaming */}
            <div className="flex items-start gap-4 md:col-span-2">
              <div className="text-neon-cyan p-3 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="3" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-white text-lg mb-1">Gaming</h5>
                <p className="text-gray-400 text-sm font-medium">Counter Strike 2, Genshin Impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3b. TECH STACK CARD */}
        <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl w-full hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

          <div className="flex justify-between items-center mb-8">
            <h4 className="text-2xl font-bold text-white flex items-center gap-2">
              Tech Stack
            </h4>
            <span className="text-neon-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-10 5L12 13l10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 justify-items-center py-4">
            {[
              { name: 'Python', slug: 'python', color: '3776AB' },
              { name: 'Java', slug: 'java', color: 'E76F00', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
              { name: 'Django', slug: 'django', color: '092E20' },
              { name: 'Spring Boot', slug: 'springboot', color: '6DB33F' },
              { name: 'React', slug: 'react', color: '61DAFB' },
              { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
              { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
              { name: 'Flutter', slug: 'flutter', color: '02569B' },
              { name: 'Dart', slug: 'dart', color: '0175C2' },
              { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
              { name: 'Supabase', slug: 'supabase', color: '3ECF8E' },
              { name: 'Prometheus', slug: 'prometheus', color: 'E6522C' },
              { name: 'Grafana', slug: 'grafana', color: 'F46800' },
              { name: 'Git', slug: 'git', color: 'F05032' },
              { name: 'GitHub', slug: 'github', color: 'ffffff' },
              { name: 'Figma', slug: 'figma', color: 'F24E1E' }
            ].map((tech) => (
              <div key={tech.name} className="group relative flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center p-3 group-hover:border-neon-cyan group-hover:shadow-neon-glow transition-all duration-300 cursor-default">
                  <img
                    src={tech.src || `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                    alt={tech.name}
                    className="w-10 h-10 object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-950 text-white text-xs px-2 py-1 rounded border border-gray-800 pointer-events-none whitespace-nowrap shadow-xl z-20">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8 italic">
            ... and many more!
          </p>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="min-h-screen flex flex-col items-center justify-center w-full max-w-6xl px-6 py-20">
        <h3 className="text-3xl font-bold mb-12 text-neon-cyan border-b-2 border-gray-800 pb-4 w-full text-center">
          Featured Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Project 1 */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl hover:border-neon-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="h-48 w-full overflow-hidden relative border-b border-gray-800">
              <img
                src="/preview_sisidang.png"
                alt="SiSidang"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">SiSidang</h4>
                <p className="text-gray-400 mb-6 text-sm">Thesis & Defense Management System</p>
                <p className="text-gray-300 mb-6">
                  Maintained and enhanced the backend using Django. Engineered new features and refined database models for complex academic grading workflows, significantly improving system reliability.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neon-cyan-dark">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Django</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Python</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl hover:border-neon-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="h-48 w-full overflow-hidden relative border-b border-gray-800">
              <img
                src="/preview_store.png"
                alt="Store POS Microservice"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="text-2xl font-bold text-white">Store POS Microservice</h4>
                  <a
                    href="https://github.com/orgs/AdvProg25-B01/repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors mt-1 shrink-0 cursor-pointer"
                    title="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                  </a>
                </div>
                <p className="text-gray-400 mb-6 text-sm">Building Material Point of Sales</p>
                <p className="text-gray-300 mb-6">
                  Developed the Supplier Management microservice using Java Spring Boot. Implemented RESTful APIs and configured system monitoring using Prometheus and Grafana.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neon-cyan-dark">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Spring Boot</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Java</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Prometheus</span>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl hover:border-neon-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="h-48 w-full overflow-hidden relative border-b border-gray-800">
              <img
                src="/preview_bali.png"
                alt="Bali Delights"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="text-2xl font-bold text-white">Bali Delights</h4>
                  <a
                    href="https://github.com/orgs/PBP-D3/repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors mt-1 shrink-0 cursor-pointer"
                    title="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                  </a>
                </div>
                <p className="text-gray-400 mb-6 text-sm">Fullstack E-Commerce Platform</p>
                <p className="text-gray-300 mb-6">
                  Co-developed an e-commerce platform dedicated to authentic Balinese souvenirs. Engineered the backend using Django and the mobile client using Flutter, ensuring a seamless user experience across devices.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neon-cyan-dark">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Django</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Flutter</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl hover:border-neon-cyan hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="h-48 w-full overflow-hidden relative border-b border-gray-800">
              <img
                src="/preview_portofolio.png"
                alt="Personal Portfolio"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="text-2xl font-bold text-white">Personal Portfolio</h4>
                  <a
                    href="https://edpootis.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors mt-1 shrink-0 cursor-pointer"
                    title="Live Website"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                  </a>
                </div>
                <p className="text-gray-400 mb-6 text-sm">Responsive Personal Website</p>
                <p className="text-gray-300 mb-6">
                  Designed and built this responsive portfolio website to showcase my technical skills, experiences, and academic achievements. Powered by Next.js and styled with modern Tailwind CSS animations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neon-cyan-dark">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Next.js</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">React</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Tailwind CSS</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">TypeScript</span>
              </div>
            </div>
          </div>

          {/* Project 5 */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl hover:border-neon-cyan transition-all duration-300 group relative overflow-hidden md:col-span-2 flex flex-col lg:flex-row">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <div className="w-full lg:w-1/2 h-56 lg:h-auto min-h-[220px] overflow-hidden relative border-b lg:border-b-0 lg:border-r border-gray-800">
              <img
                src="/preview_search.png"
                alt="Custom Search Engine"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
              />
            </div>
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="text-2xl font-bold text-white">Custom Search Engine</h4>
                  <a
                    href="https://github.com/EdPootis/search-engine-from-scratch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors mt-1 shrink-0 cursor-pointer"
                    title="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                  </a>
                </div>
                <p className="text-gray-400 mb-6 text-sm">Full-text indexing pipeline</p>
                <p className="text-gray-300 mb-6">
                  Engineered a full-text search engine from scratch featuring efficient BSBI and SPIMI indexing pipelines, optimized with bit-level compression and TF-IDF/BM25 scoring. Deployed via a real-time Flask web interface.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-neon-cyan-dark">
                <span className="bg-gray-800 px-3 py-1 rounded-full">Python</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">Flask</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">NLTK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. MY EXPERIENCES SECTION */}
      <section id="experience" className="min-h-[70vh] flex flex-col items-center justify-center w-full max-w-4xl px-6 py-20">
        <h3 className="text-3xl font-bold mb-12 text-neon-cyan border-b-2 border-gray-800 pb-4 w-full text-center">
          My Experiences
        </h3>

        <div className="flex flex-col gap-6 w-full">
          {/* Teaching Assistant Card */}
          <div className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card flex gap-5 items-start">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

            <div className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0 overflow-hidden p-1">
              <img
                src="/Fasilkom.png"
                alt="Fasilkom UI"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-neon-cyan hover:text-white transition-colors duration-300">
                Teaching Assistant
              </h4>
              <p className="text-gray-300 font-semibold text-sm mt-1">
                Faculty of Computer Science, University of Indonesia
              </p>

              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Facilitated comprehensive learning by mentoring students, evaluating assignments, and conducting regular academic assistance sessions. Appointed as a Teaching Assistant for the following core computer science courses:
              </p>
              <ul className="text-gray-400 text-sm mt-2 space-y-1 list-disc list-inside pl-1 font-medium">
                <li>Theory of Languages & Automata (CSCM602241)</li>
                <li>Discrete Mathematics 2 (CSGE601011)</li>
              </ul>
            </div>
          </div>

          {/* DDP0 Mentor Card */}
          <div className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card flex gap-5 items-start">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

            <div className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center shrink-0 overflow-hidden p-1">
              <img
                src="/DDP0.png"
                alt="DDP0 Mentor"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-neon-cyan hover:text-white transition-colors duration-300">
                Dasar-Dasar Pemrograman 0 (DDP-0) Mentor
              </h4>
              <p className="text-gray-300 font-semibold text-sm mt-1">
                Faculty of Computer Science, University of Indonesia
              </p>

              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Mentored a group of incoming Computer Science freshmen through hands-on programming workshops. Introduced core programming concepts, coding practices, and a software engineering mindset prior to their first academic semester to ensure a smooth transition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT ME SECTION */}
      <section id="contact" className="min-h-[70vh] flex flex-col items-center justify-center w-full max-w-5xl px-6 py-20">
        <h3 className="text-3xl font-bold mb-12 text-neon-cyan border-b-2 border-gray-800 pb-4 w-full text-center">
          Contact Me
        </h3>

        <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl w-full hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group/card flex flex-col md:flex-row gap-10 items-stretch">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

          {/* Left Side: Contact Form */}
          <div className="w-full md:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-2xl font-bold text-white">Contact Me!</h4>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm font-semibold mb-2 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-semibold mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm font-semibold mb-2 block">Message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="Write your message here..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-neon-cyan transition-colors resize-none text-sm font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-neon-cyan text-black hover:bg-neon-cyan-dark hover:shadow-neon-glow transition-all duration-300 font-bold mt-4 cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus !== 'idle' && (
                  <div className={`p-4 rounded-xl text-sm font-semibold border ${formStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                    {statusMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Side: Info and Socials */}
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center text-center p-4 border-t border-gray-800 md:border-t-0 md:border-l md:pl-10">
            <h5 className="text-lg font-bold text-white mb-2">Get in touch!</h5>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Feel free to reach through Gmail, LinkedIn, GitHub, and Instagram!
            </p>

            {/* Social Icons Row */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* Email */}
              <a
                href="mailto:edmond.chr@gmail.com"
                className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/EdPootis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/edmondchristian"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/_edmondchristian"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 hover:border-neon-cyan hover:text-neon-cyan hover:shadow-neon-glow transition-all duration-300 flex items-center justify-center text-gray-400 cursor-pointer"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
            </div>

            {/* Email Copy Clipboard Container */}
            <div className="flex flex-col items-center w-full">
              <span className="text-gray-500 text-xs mb-3 font-medium">... or copy my email below!</span>
              <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 w-full max-w-sm justify-between shadow-inner">
                <span className="text-gray-300 text-xs font-semibold select-all">edmond.chr@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-gray-500 hover:text-neon-cyan p-1 transition-colors relative cursor-pointer"
                  title="Copy email"
                >
                  {copied ? (
                    <span className="text-xs text-neon-cyan font-bold animate-pulse">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-8 text-center text-gray-600 text-sm border-t border-gray-900 mt-10">
        © 2026 Edmond Christian. Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}