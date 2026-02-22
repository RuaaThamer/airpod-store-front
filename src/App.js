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
        ImageURL: "https://stairpodsphotos.blob.core.windows.net/airpod-images/airpodpro (2nd gen).jpg"
      },
      {
        ProductID: 2,
        ModelName: "AirPods Max",
        Description: "High-fidelity audio and luxurious over-ear design for total comfort.",
        Price: 549,
        ImageURL: "https://stairpodsphotos.blob.core.windows.net/airpod-images/airpods-max-select-silver-202011.png"
      },
      {
        ProductID: 3,
        ModelName: "AirPods (3rd Gen)",
        Description: "Personalized Spatial Audio with dynamic head tracking technology.",
        Price: 169,
        ImageURL: "https://stairpodsphotos.blob.core.windows.net/airpod-images/airpod 3gen.jpg"
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