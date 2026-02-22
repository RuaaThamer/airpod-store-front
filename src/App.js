import React, { useState, useEffect } from 'react';
import './App.css';
import AirPodCard from './components/AirPodCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Phase 1: Local Data (Three Products)
    // This mimics the structure Partner B will use in the SQL database later.
    const initialData = [
      {
        ProductID: 1,
        ModelName: "AirPods Pro (2nd Gen)",
        Description: "Active Noise Cancellation and Adaptive Audio for immersive sound.",
        Price: 249,
        ImageURL: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985"
      },
      {
        ProductID: 2,
        ModelName: "AirPods Max",
        Description: "High-fidelity audio and luxurious over-ear design for total comfort.",
        Price: 549,
        ImageURL: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha&.v=1604021221000"
      },
      {
        ProductID: 3,
        ModelName: "AirPods (3rd Gen)",
        Description: "Personalized Spatial Audio with dynamic head tracking technology.",
        Price: 169,
        ImageURL: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000"
      }
    ];

    setProducts(initialData);
  }, []);

  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AirPods Store</h1>
        <p style={subtitleStyle}>Experience the magic of sound.</p>
      </header>
      
      <main style={gridStyle}>
        {products.map(item => (
          <AirPodCard key={item.ProductID} product={item} />
        ))}
      </main>

      <footer style={footerStyle}>
        <p>© 2026 AirPods Storefront Project - Phase 1 Complete</p>
      </footer>
    </div>
  );
}

// --- CSS-in-JS Styles ---

const pageStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)',
  minHeight: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  color: '#1d1d1f'
};

const headerStyle = {
  textAlign: 'center',
  padding: '80px 20px 40px 20px'
};

const titleStyle = {
  fontSize: '3.5rem',
  fontWeight: '600',
  letterSpacing: '-0.02em',
  marginBottom: '10px'
};

const subtitleStyle = {
  fontSize: '1.5rem',
  color: '#86868b',
  fontWeight: '400'
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
};

const footerStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#86868b',
  fontSize: '0.9rem'
};

export default App;