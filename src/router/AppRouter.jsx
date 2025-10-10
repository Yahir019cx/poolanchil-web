import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import Home from '../pages/Home';
// import Nosotros from '../pages/Nosotros';
// import Contacto from '../pages/Contacto';
// import Descargar from '../pages/Descargar';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/nosotros" element={<Nosotros />} /> */}
            {/* <Route path="/contacto" element={<Contacto />} /> */}
            {/* <Route path="/descargar" element={<Descargar />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}