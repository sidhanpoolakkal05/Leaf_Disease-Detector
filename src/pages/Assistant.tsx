import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Command, Activity, Leaf, ShieldAlert } from 'lucide-react';
import { GlassCard, FuturisticButton } from '../components/ui/Base';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to PhytoAI Intelligence. I'm your expert agricultural assistant. How can I help you today?", sender: 'bot', timestamp: '09:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('tomato')) return "For tomatoes, ensure consistent watering to prevent blossom end rot. If you see yellowing leaves with brown spots, it might be Early Blight. Would you like a detailed care guide?";
    if (q.includes('water')) return "Most plants prefer deep, infrequent watering. It's best to water early in the morning to reduce evaporation and fungal growth.";
    if (q.includes('yellow')) return "Yellow leaves (chlorosis) can indicate nitrogen deficiency, overwatering, or lack of sunlight. I recommend checking the soil moisture levels first.";
    return "That's an interesting agricultural query. Based on our 1.2M+ dataset points, I'd recommend a tissue analysis for precise diagnosis. Can I help you with anything else?";
  };

  const quickPrompts = [
    { text: "Tomato care tips", icon: <Leaf size={14} /> },
    { text: "Identify leaf spots", icon: <ShieldAlert size={14} /> },
    { text: "Watering schedule", icon: <Activity size={14} /> },
  ];

  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto mesh-gradient min-h-screen relative">
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-250px)]">
        
        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 flex flex-col gap-6"
        >
          <GlassCard className="flex-1 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Bot className="w-32 h-32 text-neon-green" />
            </div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neon-green" /> AI Capabilities
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-400 font-bold bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-neon-green" /> Disease Correlation
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 font-bold bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-neon-green" /> Treatment Optimization
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400 font-bold bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-neon-green" /> Environmental Prediction
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard className="py-6 border-neon-green/30 text-center">
            <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Assistant Status</p>
            <div className="flex items-center justify-center gap-2 font-black text-neon-green">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" /> ONLINE
            </div>
          </GlassCard>
        </motion.div>

        {/* Chat Interface */}
        <GlassCard className="flex-1 flex flex-col p-4 border-white/5 relative glass-morphism overflow-hidden text-left">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neon-green/10 flex items-center justify-center text-neon-green border border-neon-green/20">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black">Phyto Assistant</h2>
                <p className="text-xs text-neon-green font-bold uppercase tracking-tighter">Level 4 Autonomous AI</p>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
                <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-500">v2.4.0</div>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start text-left'}`}
                >
                  <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-white/10 text-white' : 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                    }`}>
                      {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-neon-green text-black font-semibold rounded-tr-none shadow-[4px_4px_20px_rgba(60,255,124,0.1)]' 
                        : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none font-medium text-left'
                    }`}>
                      {msg.text}
                      <p className={`text-[9px] mt-2 opacity-50 font-black tracking-widest uppercase ${msg.sender === 'user' ? 'text-black' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-4 items-center pl-14">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/5 space-y-4">
            <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => setInput(prompt.text)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-500 hover:border-neon-green/40 hover:text-white transition-all whitespace-nowrap flex items-center gap-2 group"
                >
                  <span className="text-neon-green group-hover:scale-110 transition-transform">{prompt.icon}</span>
                  {prompt.text}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600">
                <Command size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Ask Phyto Intelligence anything..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-24 focus:outline-none focus:border-neon-green/40 focus:bg-white/10 transition-all font-medium placeholder:text-gray-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <FuturisticButton 
                  size="sm" 
                  className="rounded-xl px-4 py-3"
                  onClick={handleSend}
                >
                  <Send size={18} />
                </FuturisticButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
