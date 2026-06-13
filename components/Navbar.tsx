"use client";

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // 1. Show floating navbar only when reaching "About Me" section and after
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutOffset = aboutSection.offsetTop - 150;
        setIsVisible(scrollPosition >= aboutOffset);
      } else {
        setIsVisible(scrollPosition > 350);
      }

      // 2. Detect active section
      const sections = ['home', 'about', 'tech', 'projects', 'experience', 'contact'];
      let currentSection = 'home';

      // Check if user is at the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isBottom) {
        currentSection = 'contact';
      } else {
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop - 200;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentSection = sectionId;
              break;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 'tech', label: 'Tech Stack', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-10 5L12 13l10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg> },
    { id: 'projects', label: 'Projects', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> },
    { id: 'experience', label: 'Experiences', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
    { id: 'contact', label: 'Contact', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> }
  ];

  return (
    <div 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <nav className="bg-[#0e0e0e]/80 border border-gray-800/80 rounded-full px-3 py-1.5 flex items-center gap-1 backdrop-blur-md shadow-2xl">
        {/* Home Item */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, 'home')}
          className={`p-2 transition-all duration-300 rounded-full flex items-center justify-center ${
            activeSection === 'home' 
              ? 'bg-gray-800/60 text-neon-cyan shadow-inner' 
              : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
          }`}
          title="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-gray-800/80 mx-1"></div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              className={`px-3 py-1.5 transition-all duration-300 rounded-full flex items-center gap-2 text-sm font-semibold cursor-pointer ${
                isActive 
                  ? 'bg-gray-800/60 text-neon-cyan shadow-inner' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
