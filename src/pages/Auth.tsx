import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, Fingerprint, LucideShieldCheck } from 'lucide-react';
import { GlassCard, FuturisticButton } from '../components/ui/Base';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pb-20 px-6 flex items-center justify-center mesh-gradient relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px] -z-10 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-deep-green/10 rounded-full blur-[150px] -z-10 animate-blob delay-2000" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-10 border-white/5 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-neon-green/10 border border-neon-green/20 text-neon-green mb-8 group overflow-hidden">
                <Fingerprint size={40} className="group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">
              {isLogin ? (
                <>Welcome <br /><span className="text-gradient">Back Agent</span></>
              ) : (
                <>Initialize <br /><span className="text-gradient">Access Key</span></>
              )}
            </h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-[0.2em]">Secure Authentication Gateway</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Identification Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-neon-green transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="name@nexus.com"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-neon-green/40 focus:bg-white/10 transition-all font-medium placeholder:text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Secret Protocol</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-neon-green transition-colors" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-16 focus:outline-none focus:border-neon-green/40 focus:bg-white/10 transition-all font-medium placeholder:text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-[10px] font-black text-neon-green hover:text-white uppercase tracking-widest transition-colors mb-2">Recover Protocol?</button>
                </div>
              )}

              <FuturisticButton className="w-full py-5 text-lg font-black rounded-2xl group">
                {isLogin ? 'Validate Protocol' : 'Deploy Protocol'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </FuturisticButton>
            </motion.form>
          </AnimatePresence>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Third Party Integration</p>
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl transition-all font-bold text-sm">
                <Chrome size={18} /> Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl transition-all font-bold text-sm">
                <Github size={18} /> GitHub
              </button>
            </div>
            
            <p className="mt-12 text-sm font-bold text-gray-500">
              {isLogin ? "New explorer?" : "Existing operative?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-neon-green hover:underline cursor-pointer"
              >
                {isLogin ? 'Switch to Signup' : 'Return to Login'}
              </button>
            </p>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-neon-green/40 uppercase tracking-widest">
            <LucideShieldCheck size={12} /> SECURED BY PHYTO-NEXUS
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
