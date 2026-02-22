import React, { useState, useEffect } from 'react';
import './App.css';
import AirPodCard from './components/AirPodCard';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added to manage loading state

  useEffect(() => {
    // Phase 2: Live Data Integration
    // Swapping local mock data with a fetch() call to Partner B's Azure Function
    const getCloudProducts = async () => {
      try {
        const response = await fetch('https://airpods-api-v2-gadzg9ezeagge4ev.canadacentral-01.azurewebsites.net/api/GetProducts');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products from Azure:", error);
        setIsLoading(false);
      }
    };

    getCloudProducts();
  }, []);

  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AirPods Store</h1>
        <p style={subtitleStyle}>Experience the magic of sound.</p>
      </header>
      
      <main style={gridStyle}>
        {/* If loading, show a message. If done, map through live cloud data */}
        {isLoading ? (
          <p style={{ fontSize: '1.2rem', color: '#86868b' }}>Connecting to cloud database...</p>
        ) : (
          products.map(item => (
            <AirPodCard key={item.ProductID} product={item} />
          ))
        )}
      </main>

      <footer style={footerStyle}>
        <p>© 2026 AirPods Storefront Project - Phase 2 Integration Complete</p>
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