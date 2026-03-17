import { Check, Zap, Shield, Crown, ArrowRight, Star } from 'lucide-react';
import { GlassCard, FuturisticButton } from '../components/ui/Base';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Essence',
    price: '0',
    desc: 'Perfect for home gardeners and hobbyists.',
    features: ['5 Daily Scans', 'Basic Disease ID', 'Organic Solutions', 'Community Access'],
    icon: <Zap className="text-gray-400" />,
    popular: false
  },
  {
    name: 'Precision',
    price: '19',
    desc: 'Advanced tools for boutique farms.',
    features: ['Unlimited Scans', 'Chemical Protocols', 'AI Assistant (24/7)', 'PDF Reports', 'Early Warning Alerts'],
    icon: <Shield className="text-neon-green" />,
    popular: true
  },
  {
    name: 'Regency',
    price: '99',
    desc: 'Enterprise grade agricultural intelligence.',
    features: ['Multi-farm Support', 'API Access', 'Satellite Imagery', 'Expert Consultation', 'Custom AI Models'],
    icon: <Crown className="text-yellow-500" />,
    popular: false
  }
];

export const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto mesh-gradient min-h-screen relative">
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-neon-green text-sm font-black mb-8 border border-neon-green/20"
        >
          <Star className="w-4 h-4 fill-neon-green" />
          <span>Flexible Intelligence Plans</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Scale Your <br /><span className="text-gradient">Agricultural IQ</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">Choose the precision level required for your crop cycles. <br />No hidden fees, cancel anytime.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={itemVariants} className="relative group">
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] z-20 shadow-[0_0_20px_rgba(60,255,124,0.4)]">
                Most Deployed
              </div>
            )}
            
            <GlassCard className={`h-full flex flex-col p-10 relative overflow-hidden transition-all duration-500 ${
              plan.popular ? 'border-neon-green/50 bg-neon-green/5' : 'border-white/5'
            } group-hover:translate-y-[-10px]`}>
              
              {/* Decorative Pulse for Popular Plan */}
              {plan.popular && (
                <div className="absolute inset-0 bg-neon-green/5 animate-pulse opacity-50" />
              )}

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-8 font-bold">{plan.desc}</p>
                
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">/ Month</span>
                </div>

                <div className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-gray-400 font-medium group-hover:text-white transition-colors">
                      <div className="w-5 h-5 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/30 shrink-0">
                        <Check className="w-3 h-3 text-neon-green" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <FuturisticButton 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className={`w-full py-5 text-lg font-black group/btn overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Activate Plan <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </FuturisticButton>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-24 text-center">
        <p className="text-gray-500 font-bold text-sm mb-6">ALL PLANS INCLUDE</p>
        <div className="flex flex-wrap justify-center gap-8 grayscale opacity-50">
          <div className="text-xl font-black">256-BIT ENCRYPTION</div>
          <div className="text-xl font-black">24/7 SUPPORT</div>
          <div className="text-xl font-black">MULTI-DEVICE SYNC</div>
        </div>
      </div>
    </div>
  );
};
