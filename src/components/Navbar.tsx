import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Monitor, Activity, Database, MessageSquare, Shield } from 'lucide-react';
import { FuturisticButton, GlassCard } from './ui/Base';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Diagnose', path: '/diagnose', icon: <Monitor size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Activity size={18} /> },
    { name: 'Library', path: '/library', icon: <Database size={18} /> },
    { name: 'Assistant', path: '/assistant', icon: <MessageSquare size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full ${
      scrolled ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-white/5' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-neon-green/10 flex items-center justify-center text-neon-green border border-neon-green/20 group-hover:bg-neon-green group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(60,255,124,0.2)]">
              <Leaf size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic group-hover:text-neon-green transition-colors hidden sm:block">
              Phyto<span className="text-neon-green not-italic">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 glass-morphism p-1.5 rounded-2xl border-white/5 mx-8 font-inter">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'text-neon-green bg-white/5 border border-neon-green/20 shadow-[0_0_15px_rgba(60,255,124,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-6 mr-2">
              <Link to="/auth" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                Portal
              </Link>
            </div>
            <Link to="/diagnose" className="hidden sm:block">
              <FuturisticButton size="sm" className="rounded-xl px-6 font-black uppercase tracking-widest text-[10px]">
                Deploy System
              </FuturisticButton>
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-3 rounded-xl bg-white/5 text-neon-green hover:bg-white/10 transition-all border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:hidden absolute top-full right-0 left-0 p-6 mt-2"
            >
              <GlassCard className="p-8 space-y-4 border-neon-green/20 shadow-2xl bg-background/95">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl text-lg font-black uppercase tracking-widest transition-all ${
                      isActive(link.path) 
                        ? 'bg-neon-green text-black shadow-[0_0_20px_rgba(60,255,124,0.3)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  <Link 
                    to="/auth" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl text-lg font-black uppercase tracking-widest text-gray-400 bg-white/5 border border-white/5"
                  >
                    <Shield size={20} /> Access Key
                  </Link>
                  <Link to="/diagnose" onClick={() => setIsOpen(false)}>
                    <FuturisticButton className="w-full py-5 text-xl font-black rounded-xl">
                      Deploy System
                    </FuturisticButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
