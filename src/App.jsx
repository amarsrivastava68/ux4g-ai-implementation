// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GovernmentHeader from './components/GovernmentHeader/GovernmentHeader';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import TSRSRegistration from './components/TSRSRegistration/TSRSRegistration';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <GovernmentHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<TSRSRegistration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Simple wrapper component for the home page (carousel + header already in App)
function HomePage() {
  return <HeroCarousel />;
}

export default App;