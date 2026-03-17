import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Shield, Zap, Target, ArrowRight, Activity, Database, MessageSquare, PlayCircle } from 'lucide-react';
import { GlassCard, FuturisticButton } from '../components/ui/Base';
import { Link } from 'react-router-dom';
import heroImg from '../assets/Screenshot 2026-03-17 175755.png';

export const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pb-20 mesh-gradient min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-green/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-deep-green/10 rounded-full blur-[120px] animate-blob delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div
            className="flex-1 text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-neon-green text-sm font-medium mb-8 border border-neon-green/20"
            >
              <Zap className="w-4 h-4" />
              <span>Next-Gen AI Plant Diagnosis</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
            >
              Heal Your Plants <br />
              <span className="text-gradient neon-text">AI Powered</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-xl max-w-xl mb-12 leading-relaxed"
            >
              Instantly detect diseases using our advanced computer vision system.
              Get expert organic solutions and precision agricultural insights in seconds.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link to="/diagnose">
                <FuturisticButton size="lg" className="px-10 py-5 text-xl font-bold rounded-2xl group">
                  Scan Now <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </FuturisticButton>
              </Link>
              <Link to="/diagnose" className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-white/5 px-6 py-4 rounded-xl border border-white/10 hover:border-white/20">
                <PlayCircle className="w-6 h-6 text-neon-green" />
                <span className="font-semibold">Watch Demo</span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="text-sm font-bold tracking-widest uppercase text-gray-500">Trusted By</div>
              <div className="flex gap-8">
                <div className="text-xl font-black">AGRO<span className="text-neon-green">X</span></div>
                <div className="text-xl font-black">LEAF<span className="text-neon-green">Y</span></div>
                <div className="text-xl font-black">SEED<span className="text-neon-green">S</span></div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ y: y1 }}
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-2 border-neon-green/30 shadow-[0_0_50px_rgba(60,255,124,0.2)]">
              <img
                src={heroImg}
                alt="AI Plant Scanner"
                className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating UI Elements over Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 glass-morphism p-4 rounded-2xl border-neon-green/40 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-neon-green uppercase tracking-tighter">AI Detecting...</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-10 left-10 glass-morphism p-4 rounded-2xl border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-neon-green" />
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold">ACCURACY</div>
                    <div className="text-sm font-black">99.8%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-32 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <StatCard
              variants={itemVariants}
              icon={<Target className="text-neon-green" size={40} />}
              title="99.2% Accuracy"
              desc="Our state-of-the-art CNN model is trained on millions of high-res datasets."
            />
            <StatCard
              variants={itemVariants}
              icon={<Shield className="text-neon-green" size={40} />}
              title="Organic Care"
              desc="We prioritize eco-friendly biocontrols and sustainable farming methods."
            />
            <StatCard
              variants={itemVariants}
              icon={<Zap className="text-neon-green" size={40} />}
              title="Instant Scan"
              desc="Don't wait. Get a comprehensive diagnostic report in less than 2.5 seconds."
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-32 bg-black/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Everything You Need <br /> To <span className="text-neon-green">Succeed.</span></h2>
              <p className="text-gray-400 text-lg">A unified platform for precision agriculture, health monitoring, and expert guidance.</p>
            </div>
            <Link to="/library">
              <FuturisticButton variant="outline" className="rounded-2xl px-8 py-4">Explore Library</FuturisticButton>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard variants={itemVariants} icon={<Activity size={24} />} title="Health Dashboard" desc="Real-time analytics for your entire crop cycle." />
            <FeatureCard variants={itemVariants} icon={<Database size={24} />} title="Knowledge Hub" desc="1000+ diseases with verified treatment plans." />
            <FeatureCard variants={itemVariants} icon={<MessageSquare size={24} />} title="AI Assistant" desc="Chat with our expert AI for instant farm advice." />
            <FeatureCard variants={itemVariants} icon={<Shield size={24} />} title="Export Reports" desc="Generate detailed PDF insights for your team." />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, title, desc, variants }: any) => (
  <motion.div variants={variants}>
    <GlassCard className="flex flex-col items-center text-center p-10 hover:border-neon-green/50 transition-all group h-full">
      <div className="bg-neon-green/10 p-6 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-500 border border-neon-green/20">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 group-hover:text-neon-green transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </GlassCard>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc, variants }: any) => (
  <motion.div variants={variants}>
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-neon-green/30 hover:bg-neon-green/5 transition-all duration-500 group h-full">
      <div className="w-12 h-12 rounded-2xl bg-deep-green/20 flex items-center justify-center mb-6 text-neon-green group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 group-hover:text-neon-green transition-colors">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);
