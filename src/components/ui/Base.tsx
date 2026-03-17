import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassCard = ({ children, className, animate = true }: GlassCardProps) => {
  const initial = animate ? { opacity: 0, y: 20 } : undefined;
  const whileInView = animate ? { opacity: 1, y: 0 } : undefined;

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "glass-morphism rounded-2xl p-6 glow-hover transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface FuturisticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FuturisticButton = ({ 
  children, 
  className, 
  variant = 'primary', 
  glow = true,
  size = 'md',
  ...props 
}: FuturisticButtonProps) => {
  const variants = {
    primary: "bg-neon-green text-black hover:bg-white",
    outline: "border border-neon-green text-neon-green hover:bg-neon-green/10",
    ghost: "text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        glow && variant === 'primary' && "shadow-[0_0_20px_rgba(60,255,124,0.3)]",
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
