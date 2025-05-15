import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform/:name" element={<PlatformPage />} />
      </Routes>
    </BrowserRouter>
  );
}