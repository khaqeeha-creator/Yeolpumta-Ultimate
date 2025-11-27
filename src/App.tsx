import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AnimatedBackground from './components/AnimatedBackground';
import Notifications from './components/Notifications';

// Simplified mock start for browser environment
async function enableMocking() {
  // Cast import.meta to any to handle missing Vite type definitions for env
  if ((import.meta as any).env.MODE !== 'test') {
    const { setupWorker } = await import('msw/browser');
    const { handlers } = await import('./api/msw-handlers');
    const worker = setupWorker(...handlers);
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
}

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    enableMocking().then(() => setIsReady(true));
  }, []);

  if (!isReady) return null;

  return (
    <div className="min-h-screen text-ultimate-text">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10">
        <Dashboard />
      </main>
      <Notifications />
    </div>
  );
};

export default App;