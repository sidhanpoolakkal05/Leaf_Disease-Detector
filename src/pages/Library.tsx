import { useState } from 'react';
import { Search, Leaf, ChevronRight, Info, Grid, List, Sparkles } from 'lucide-react';
import { GlassCard } from '../components/ui/Base';
import { motion, AnimatePresence } from 'framer-motion';

const diseases = [
  { id: 1, name: 'Tomato Early Blight', crop: 'Tomato', type: 'Fungal', severity: 'Moderate', img: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop', tags: ['High Humidity', 'Yellow Spots'] },
  { id: 2, name: 'Apple Scab', crop: 'Apple', type: 'Fungal', severity: 'High', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop', tags: ['Cool Temps', 'Dark Scabs'] },
  { id: 3, name: 'Corn Rust', crop: 'Corn', type: 'Fungal', severity: 'Low', img: 'https://images.unsplash.com/photo-1551729048-03487d603e67?w=400&h=300&fit=crop', tags: ['Orange Spots', 'Wind Borne'] },
  { id: 4, name: 'Potato Late Blight', crop: 'Potato', type: 'Fungal', severity: 'Critical', img: 'https://images.unsplash.com/photo-1518977676601-b53f02bad177?w=400&h=300&fit=crop', tags: ['Water Soaked', 'Fast Spreading'] },
  { id: 5, name: 'Grape Black Rot', crop: 'Grape', type: 'Bacterial', severity: 'Moderate', img: 'https://images.unsplash.com/photo-1533497197926-d62153255146?w=400&h=300&fit=crop', tags: ['Circular Spots', 'Fruit Mummies'] },
  { id: 6, name: 'Soybean Sudden Death', crop: 'Soybean', type: 'Fungal', severity: 'High', img: 'https://images.unsplash.com/photo-1599421141151-24647321528c?w=400&h=300&fit=crop', tags: ['Sudden Wilting', 'Root Rot'] },
];

export const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDiseases = diseases.filter(d => 
    (searchTerm === '' || d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.crop.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCrop === 'All' || d.crop === selectedCrop)
  );

  const crops = ['All', ...new Set(diseases.map(d => d.crop))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto mesh-gradient min-h-screen relative">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl text-left w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-neon-green font-bold text-sm tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-4 h-4" /> Global Agricultural Database
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Plant <span className="text-gradient">Knowledge</span></h1>
          <p className="text-gray-400 text-lg">Detailed decomposition of plant diseases, symptoms, and cures.</p>
        </div>
        
        <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-neon-green text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-neon-green text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <div className="relative flex-[2]">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by specimen, disease, or symptom signatures..."
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 focus:outline-none focus:border-neon-green/40 focus:bg-white/10 transition-all font-medium text-lg placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1 flex gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {crops.map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-8 py-5 rounded-[2rem] font-black tracking-widest text-xs uppercase transition-all border ${
                selectedCrop === crop 
                ? 'bg-neon-green text-black border-neon-green' 
                : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredDiseases.map((disease) => (
            <motion.div
              layout
              key={disease.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              className={viewMode === 'grid' ? "" : "w-full text-left"}
            >
              <GlassCard className={`p-0 overflow-hidden group border-white/5 hover:border-neon-green/30 transition-all duration-500 ${viewMode === 'list' ? 'flex items-center gap-8' : 'text-left'}`}>
                <div className={`${viewMode === 'grid' ? 'h-64' : 'w-48 h-48'} relative shrink-0 overflow-hidden`}>
                  <img src={disease.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={disease.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest bg-neon-green text-black mb-3 inline-block">
                      {disease.type}
                    </span>
                  </div>
                </div>

                <div className={`p-8 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {viewMode === 'grid' && (
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black group-hover:text-neon-green transition-colors leading-tight">{disease.name}</h3>
                    </div>
                  )}
                  
                  {viewMode === 'list' && (
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-3xl font-black group-hover:text-neon-green transition-colors">{disease.name}</h3>
                      <span className={`text-xs font-black uppercase tracking-widest ${
                        disease.severity === 'Critical' ? 'text-red-500' : 
                        disease.severity === 'High' ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {disease.severity} Severity
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-8">
                    {disease.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-bold text-gray-500 border border-white/5 group-hover:border-neon-green/20 group-hover:text-gray-300 transition-all">
                        #{tag.replace(' ', '')}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-sm font-black text-gray-500 uppercase tracking-tighter">
                      <Leaf className="w-4 h-4 text-neon-green" />
                      {disease.crop}
                    </div>
                    {viewMode === 'grid' && (
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        disease.severity === 'Critical' ? 'text-red-500' : 
                        disease.severity === 'High' ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {disease.severity}
                      </span>
                    )}
                    <button className="text-neon-green font-bold text-sm flex items-center gap-1 group/btn overflow-hidden">
                      <span className="group-hover:translate-x-0 translate-x-4 transition-transform duration-300">DETAILS</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[3rem]">
          <Info className="w-20 h-20 text-gray-800 mx-auto mb-6" />
          <h3 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">No Specimen Found</h3>
          <p className="text-gray-700 font-bold">Refine your search parameters to find matching data points.</p>
        </div>
      )}
    </div>
  );
};
