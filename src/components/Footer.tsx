import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Linkedin, Mail, Zap, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  Platform: [
    { name: 'Diagnose', path: '/diagnose' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Library', path: '/library' },
    { name: 'AI Assistant', path: '/assistant' },
  ],
  Company: [
    { name: 'About Us', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Contact', path: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' },
  ],
};

const socials = [
  { icon: <Github size={18} />, href: '#', label: 'GitHub' },
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
  { icon: <Mail size={18} />, href: '#', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-20">
      {/* Free tier banner */}
      <div className="bg-neon-green/5 border-b border-neon-green/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 text-neon-green">
            <Zap size={16} className="animate-pulse" />
            <span className="text-sm font-black uppercase tracking-widest">100% Free — No Subscriptions, No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
            <Shield size={14} />
            <span>Open & accessible to everyone</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6 w-fit">
              <div className="w-10 h-10 rounded-2xl bg-neon-green/10 flex items-center justify-center text-neon-green border border-neon-green/20 group-hover:bg-neon-green group-hover:text-black transition-all duration-500">
                <Leaf size={22} />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">
                Phyto<span className="text-neon-green not-italic">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Advanced AI-powered plant disease detection. Helping farmers and botanists worldwide — completely free, forever.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-neon-green hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-white transition-colors font-medium flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-neon-green transition-all duration-300 overflow-hidden" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-bold flex items-center gap-2">
            © {new Date().getFullYear()} PhytoAI. Made with <Heart size={12} className="text-neon-green fill-neon-green" /> for a greener planet.
          </p>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
            Free Forever · Open Source · MIT License
          </p>
        </div>
      </div>
    </footer>
  );
};
