import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FoodShareProvider } from "./context/FoodShareContext";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import AuthModal from "./component/AuthModal";

import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";

function App() {
  return (
    <FoodShareProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Navbar />
          
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
              <Route path="/ngo-dashboard" element={<NgoDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <Footer />

          <AuthModal />

        </div>
      </BrowserRouter>
    </FoodShareProvider>
  );
}

export default App;