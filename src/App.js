import React, { useState, useEffect } from 'react';
import './App.css';
import AirPodCard from './components/AirPodCard';

function App() {
  // 1. Logic & State
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCloudProducts = async () => {
      try {
        const response = await fetch('https://store-api-hhgjhudjf3d9f6f6.canadacentral-01.azurewebsites.net/api/GetProducts');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Create category buttons based on data
        const uniqueCategories = ["All", ...new Set(data.map(item => item.Category || "Other"))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      }
    };

    getCloudProducts();
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.Category === cat));
    }
  };

  // 2. The UI (HTML)
  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AirPods Store</h1>
        <p style={subtitleStyle}>Experience the magic of sound.</p>
        
        {!isLoading && (
          <div style={navContainerStyle}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilter(cat)}
                style={{
                  ...categoryButtonStyle,
                  backgroundColor: activeCategory === cat ? '#0071e3' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : '#1d1d1f',
                  border: activeCategory === cat ? '1px solid #0071e3' : '1px solid #d2d2d7'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>
      
      <main style={gridStyle}>
        {isLoading ? (
          <p style={{ fontSize: '1.2rem', color: '#86868b' }}>Connecting to cloud database...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <AirPodCard key={item.ProductID} product={item} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </main>

      <footer style={footerStyle}>
        <p>© 2026 AirPods Storefront Project - Phase 2 Integration Complete</p>
      </footer>
    </div>
  );
}

// 3. Styles (The constants you just showed me)
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
  marginBottom: 10
};

const subtitleStyle = {
  fontSize: '1.5rem',
  color: '#86868b',
  fontWeight: '400'
};

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '25px',
  flexWrap: 'wrap'
};

const categoryButtonStyle = {
  padding: '10px 20px',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: '0.3s',
  fontSize: '1rem'
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

// 4. Export (The Signature)
export default App;