import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Members from './pages/Members';
import ReservationPage from './pages/Reservation';
import CompletionPage from './pages/Completion';

function App() {
  const location = useLocation();
  
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/reserve" element={<ReservationPage />} />
        <Route path="/reserve/complete" element={<CompletionPage />} />
      </Routes>
    </Layout>
  );
}

export default App;