import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, CheckCircle, AlertTriangle, ShieldCheck, Thermometer, Droplets, Sun, RefreshCw, Cpu, Scan, Info, Wifi, WifiOff } from 'lucide-react';
import { GlassCard, FuturisticButton } from '../components/ui/Base';

export const Diagnose = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'connecting' | 'online' | 'offline'>('connecting');

  const BACKEND_URL = 'https://phytoai-backend.onrender.com';

  // Warm up the backend as soon as the page loads
  useEffect(() => {
    const warmUp = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/health`, { signal: AbortSignal.timeout(30000) });
        if (res.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch {
        setBackendStatus('offline');
      }
    };
    warmUp();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Prediction failed');
      }

      const data = await response.json();

      setResult({
        disease: data.prediction.disease,
        confidence: (data.prediction.confidence * 100).toFixed(1),
        severity: data.prediction.severity,
        score: Math.round(data.prediction.confidence * 100),
        why: data.details.symptoms.join(' '),
        organic: data.details.treatment.slice(0, 3),
        chemical: data.details.prevention.slice(0, 3),
        prevention: data.details.prevention,
      });
    } catch (err: any) {
      setError(err.message || 'Could not connect to the AI backend. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsScanning(false);
  };

  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto mesh-gradient min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-neon-green font-bold text-sm tracking-widest uppercase mb-4"
          >
            <Cpu className="w-4 h-4" /> Computer Vision Engine v2.0
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Plant Disease <br /><span className="text-gradient">Diagnostic AI</span></h1>
          <p className="text-gray-400 text-lg">Holographic analysis for instant agricultural health assessment.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
            <div className="text-gray-500 text-[10px] font-black uppercase mb-1">DATASET</div>
            <div className="text-2xl font-black text-neon-green">1.2M+</div>
          </div>
          {/* Live Backend Status */}
          <motion.div
            animate={{ opacity: 1 }}
            className={`p-4 rounded-3xl border text-center min-w-[110px] ${
              backendStatus === 'online'
                ? 'bg-neon-green/10 border-neon-green/30'
                : backendStatus === 'offline'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="text-gray-500 text-[10px] font-black uppercase mb-2">AI ENGINE</div>
            {backendStatus === 'connecting' && (
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-xs font-black">WARMING</span>
              </div>
            )}
            {backendStatus === 'online' && (
              <div className="flex items-center justify-center gap-2 text-neon-green">
                <Wifi className="w-4 h-4" />
                <span className="text-xs font-black">ONLINE</span>
              </div>
            )}
            {backendStatus === 'offline' && (
              <div className="flex items-center justify-center gap-2 text-red-400">
                <WifiOff className="w-4 h-4" />
                <span className="text-xs font-black">OFFLINE</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Scanner Area */}
        <div className="space-y-8">
          <GlassCard className="relative overflow-hidden min-h-[450px] p-2 flex flex-col items-center justify-center border-neon-green/20 group">
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-6 cursor-pointer hover:text-neon-green transition-all duration-500 p-12 text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-neon-green/20 blur-[30px] rounded-full scale-150 animate-pulse" />
                  <div className="relative p-10 rounded-[2rem] bg-white/5 group-hover:bg-neon-green/10 transition-colors border border-white/10 group-hover:border-neon-green/30">
                    <Upload className="w-16 h-16" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-black mb-2 tracking-tight">Drop Image Here</p>
                  <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Upload a clear photo of the infected area.</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-video md:min-h-[450px] overflow-hidden rounded-2xl">
                <img src={selectedImage} alt="Plant" className="w-full h-full object-cover" />
                
                {/* Holographic Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {isScanning && (
                    <div className="absolute inset-0">
                      {/* Scan Line */}
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-neon-green shadow-[0_0_20px_#3cff7c] z-20"
                      />
                      {/* Pulse Overlay */}
                      <motion.div 
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-neon-green/5"
                      />
                      {/* Floating Data Bits */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                        <div className="flex gap-2">
                          {[1,2,3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ scaleY: [1, 2, 1] }}
                              transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                              className="w-1 h-8 bg-neon-green/50 rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-neon-green text-[10px] font-black uppercase tracking-[0.2em]">Processing Stream...</span>
                      </div>
                    </div>
                  )}

                  {result && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-neon-green/5"
                    >
                      {/* Bounding Box Mockup */}
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-neon-green/50 rounded-lg">
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-neon-green" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-neon-green" />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-neon-green" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-neon-green" />
                        <div className="absolute top-2 left-2 bg-neon-green text-black text-[10px] font-black px-2 py-0.5 rounded">
                          DETECTED: {result.disease}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {!isScanning && !result && (
                  <button 
                    onClick={reset}
                    className="absolute top-6 right-6 p-3 bg-black/60 rounded-2xl hover:bg-red-500 transition-all border border-white/10"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </GlassCard>

          <div className="flex gap-4">
            <FuturisticButton 
              className="flex-[2] py-5 rounded-2xl text-lg font-bold"
              disabled={!selectedImage || isScanning || !!result || backendStatus === 'connecting'}
              onClick={startScan}
            >
              {isScanning ? <RefreshCw className="w-6 h-6 animate-spin mr-2" /> : <Scan className="w-6 h-6 mr-2" />}
              {backendStatus === 'connecting' ? 'Warming Up Engine...' : isScanning ? 'Analyzing Tissue...' : 'Execute Scan'}
            </FuturisticButton>
            <FuturisticButton 
              variant="outline" 
              className="px-6 rounded-2xl"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-6 h-6" />
            </FuturisticButton>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium"
            >
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Scan Failed</p>
                <p>{error}</p>
                {error.includes('connect') && (
                  <p className="text-xs mt-2 text-red-400/70">The backend may be waking up (free tier). Wait 30 seconds and try again.</p>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest pl-2">
            <Info className="w-4 h-4 text-neon-green" /> Scan result covers 32 parameters
          </div>
        </div>

        {/* Right: Results Panel */}
        <div className="lg:sticky lg:top-32">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard className="flex flex-col items-center justify-center text-center py-24 border-white/5 opacity-50">
                  <div className="relative mb-8">
                    <Scan className="w-20 h-20 text-gray-700" />
                    <div className="absolute inset-0 animate-ping block border-2 border-gray-700 rounded-full" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-700 mb-2 uppercase tracking-tighter">Engine Ready</h3>
                  <p className="text-gray-700 max-w-[250px] mx-auto text-sm font-bold">Waiting for image input to begin holographic decomposition.</p>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <GlassCard className="border-neon-green/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Scan className="w-32 h-32 text-neon-green" />
                  </div>

                  <div className="flex justify-between items-start mb-10 relative z-10 text-left">
                    <div>
                      <h2 className="text-4xl font-black mb-3 leading-none">{result.disease}</h2>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-neon-green text-black rounded-lg text-[10px] font-black uppercase tracking-widest">
                          <ShieldCheck className="w-3 h-3" /> {result.confidence}% Match
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          <AlertTriangle className="w-3 h-3" /> {result.severity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="text-gray-500 text-[10px] font-black uppercase mb-1">Health index</p>
                      <p className="text-5xl font-black text-neon-green leading-none">{result.score}<span className="text-xs text-gray-500">/100</span></p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-left">
                      <h4 className="font-bold mb-3 flex items-center gap-2 text-white">
                        <CheckCircle className="w-4 h-4 text-neon-green" /> Etiology Report
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{result.why}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TreatmentList title="Organic Protocol" items={result.organic} icon={<Droplets size={14} />} />
                      <TreatmentList title="Pharma Protocol" items={result.chemical} icon={<ShieldCheck size={14} />} />
                    </div>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-3 gap-4">
                  <StatCard icon={<Thermometer />} label="Ambient" value="24.2°" />
                  <StatCard icon={<Droplets />} label="Humidity" value="68%" />
                  <StatCard icon={<Sun />} label="Luminous" value="High" />
                </div>

                <GlassCard className="p-8 text-left">
                  <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-green" /> Preventive Safeguards
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.prevention.map((tip: string, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neon-green/20 hover:bg-neon-green/5 transition-all group">
                        <div className="w-6 h-6 rounded-full bg-deep-green/20 flex items-center justify-center text-neon-green font-bold text-xs shrink-0">
                          {i+1}
                        </div>
                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{tip}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TreatmentList = ({ title, items, icon }: any) => (
  <div className="p-6 rounded-2xl border border-white/5 bg-white/px hover:bg-white/5 transition-all text-left">
    <h4 className="font-bold mb-4 flex items-center gap-2 text-neon-green text-sm uppercase tracking-widest">
      {icon} {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
          <span className="w-1 h-1 rounded-full bg-neon-green mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ icon, label, value }: any) => (
  <GlassCard className="p-4 text-center hover:border-neon-green/50 transition-all border border-white/5">
    <div className="flex justify-center mb-2 text-neon-green group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[10px] uppercase text-gray-500 tracking-tighter font-black mb-1">{label}</p>
    <p className="text-xl font-black">{value}</p>
  </GlassCard>
);
