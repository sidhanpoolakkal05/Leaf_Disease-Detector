import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LeafParticles } from './components/ui/LeafParticles';
import { Home } from './pages/Home';
import { Diagnose } from './pages/Diagnose';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';
import { Assistant } from './pages/Assistant';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg text-white selection:bg-neon-green/30">
        <LeafParticles />
        <Navbar />
        <main className="relative z-10 transition-all duration-500 pt-32 lg:pt-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnose" element={<Diagnose />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
