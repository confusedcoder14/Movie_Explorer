import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/Header';
import Home from '@/pages/Home';
import MovieDetails from '@/pages/MovieDetails';
import Favorites from '@/pages/Favorites';

function App() {
  return (
    <div className="font-body antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App; 