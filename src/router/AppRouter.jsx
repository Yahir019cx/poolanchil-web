import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
// Invitation carga eager: es la landing page a la que llegan los usuarios
import Invitation from '../pages/invitation';

// Todas las demás páginas se cargan bajo demanda (lazy) para reducir el bundle inicial
const Home = lazy(() => import('../pages/Home'));
const Nosotros = lazy(() => import('../pages/About'));
const Contacto = lazy(() => import('../pages/Contact'));
const Registro = lazy(() => import('../pages/Register'));
const Descargar = lazy(() => import('../pages/Download'));
const VerificacionExitosa = lazy(() => import('../pages/VerificacionExitosa'));
const VerificacionDidit = lazy(() => import('../pages/VerificacionDidit'));
const Detalle = lazy(() => import('../pages/Detalle'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Login = lazy(() => import('../pages/Login'));


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
      <Suspense fallback={null}>
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
          <Route path="/login" element={<Login />} />
          <Route path="/invitacion" element={<Invitation />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/verificacion-exitosa" element={<VerificacionExitosa />} />
          <Route path="/verificacion-didit" element={<VerificacionDidit />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}