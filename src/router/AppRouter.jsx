import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import Home from '../pages/Home';
import Nosotros from '../pages/About';
import Contacto from '../pages/Contact';
import Registro from '../pages/Register';
import Descargar from '../pages/Download';
import Invitation from '../pages/invitation';

// Layout con Navbar y Footer
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Layout standalone (sin Navbar ni Footer)
function StandaloneLayout() {
  return <Outlet />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Navbar y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/descargar" element={<Descargar />} />
        </Route>

        {/* Rutas standalone (fullscreen, sin nav/footer) */}
        <Route element={<StandaloneLayout />}>
          <Route path="/invitacion" element={<Invitation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}