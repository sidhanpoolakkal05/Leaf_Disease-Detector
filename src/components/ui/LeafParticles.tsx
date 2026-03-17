import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LeafParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: '110%', rotate: 0, opacity: 0 }}
          animate={{ 
            y: '-10%', 
            rotate: 360,
            opacity: [0, 0.2, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute text-neon-green/20"
          style={{ fontSize: p.size }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
};
