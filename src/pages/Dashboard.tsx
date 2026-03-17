import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import { Activity, ShieldCheck, AlertCircle, History, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { GlassCard, cn } from '../components/ui/Base';
import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', healthy: 40, diseased: 10 },
  { name: 'Feb', healthy: 35, diseased: 15 },
  { name: 'Mar', healthy: 45, diseased: 5 },
  { name: 'Apr', healthy: 50, diseased: 8 },
  { name: 'May', healthy: 55, diseased: 12 },
];

const distributionData = [
  { name: 'Healthy', value: 75, color: '#3cff7c' },
  { name: 'Early Blight', value: 15, color: '#fbbf24' },
  { name: 'Leaf Mold', value: 10, color: '#ef4444' },
];

const scanHistory = [
  { id: 1, plant: 'Tomato', disease: 'Early Blight', date: '2024-03-15', status: 'Infected', image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=100&h=100&fit=crop' },
  { id: 2, plant: 'Pepper', disease: 'None (Healthy)', date: '2024-03-12', status: 'Healthy', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=100&h=100&fit=crop' },
  { id: 3, plant: 'Potato', disease: 'Late Blight', date: '2024-03-10', status: 'Infected', image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad177?w=100&h=100&fit=crop' },
];

export const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto mesh-gradient min-h-screen relative">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
      >
        <div className="text-left w-full">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-4">
            Health <span className="text-gradient">Analytics</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 text-lg">
            Real-time telemetry and diagnostic history for your farm.
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex gap-4">
          <GlassCard className="py-4 px-6 flex flex-col items-center border-neon-green/30 whitespace-nowrap">
            <span className="text-[10px] font-black uppercase text-gray-500 mb-1">CROP SCORE</span>
            <span className="text-3xl font-black text-neon-green">88.4%</span>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left"
      >
        <StatItem icon={<Activity />} label="Total Scans" value="128" delta="+12%" />
        <StatItem icon={<ShieldCheck />} label="Healthy" value="94" delta="+5%" />
        <StatItem icon={<AlertCircle />} label="Diseased" value="34" delta="-2%" color="text-red-500" />
        <StatItem icon={<TrendingUp />} label="Accuracy" value="99.1%" delta="+0.4%" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Chart */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2">
          <GlassCard className="h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp className="w-32 h-32 text-neon-green" />
            </div>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-neon-green" /> Health Trends <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">(Last 5 Months)</span>
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <defs>
                    <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3cff7c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3cff7c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f3d2e', border: '1px solid #3cff7c20', borderRadius: '16px', color: '#fff' }} 
                    itemStyle={{ color: '#3cff7c', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="healthy" 
                    stroke="#3cff7c" 
                    strokeWidth={4} 
                    dot={{ fill: '#3cff7c', r: 6, strokeWidth: 2, stroke: '#0b0f0d' }} 
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diseased" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    strokeDasharray="8 4" 
                    dot={false} 
                    opacity={0.5} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Disease Distribution */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <GlassCard className="h-full">
            <h3 className="text-xl font-black mb-8">Etiology Spread</h3>
            <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f3d2e', border: 'none', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {distributionData.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-neon-green/20 transition-all">
                  <span className="flex items-center gap-3 text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="font-black text-neon-green">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* History Table */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <GlassCard className="p-0 overflow-hidden border-white/5">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <History className="w-6 h-6 text-neon-green" /> Scan Log
            </h3>
            <button className="flex items-center gap-2 text-neon-green font-bold text-sm hover:translate-x-1 transition-transform">
              Full History <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 bg-white/5 uppercase text-[10px] tracking-widest font-black">
                  <th className="px-8 py-5 text-left">Specimen</th>
                  <th className="px-8 py-5 text-left">Detection Result</th>
                  <th className="px-8 py-5 text-left">Timestamp</th>
                  <th className="px-8 py-5 text-left">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scanHistory.map((scan) => (
                  <tr key={scan.id} className="group hover:bg-neon-green/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-neon-green/50 transition-colors">
                          <img src={scan.image} className="w-full h-full object-cover" alt={scan.plant} />
                        </div>
                        <span className="font-black text-lg">{scan.plant}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-400 font-medium">{scan.disease}</td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-bold">{scan.date}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest border",
                        scan.status === 'Healthy' ? "bg-neon-green/10 text-neon-green border-neon-green/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                      )}>
                        {scan.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="bg-white/5 hover:bg-neon-green hover:text-black p-3 rounded-xl transition-all duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

const StatItem = ({ icon, label, value, delta, color = "text-neon-green" }: any) => (
  <GlassCard className="flex items-start gap-4 group hover:border-neon-green/50 transition-all border-white/5">
    <div className="p-4 bg-neon-green/10 rounded-2xl text-neon-green group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="text-left">
      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className={cn("text-3xl font-black", color)}>{value}</h4>
        <span className="text-[10px] text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded font-black">{delta}</span>
      </div>
    </div>
  </GlassCard>
);
