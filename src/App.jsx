import AppRouter from './router/AppRouter';
import Maintenance from './pages/Maintenance';

const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

function App() {
  if (isMaintenance) return <Maintenance />;
  return <AppRouter />;
}

export default App;
