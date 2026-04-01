import React, { useState, useEffect } from 'react';
import './App.css';
import AirPodCard from './components/AirPodCard';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for the filtered view
  const [categories, setCategories] = useState(["All"]); // State for category buttons
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCloudProducts = async () => {
      try {
        const response = await fetch('https://airpods-api-v2-gadzg9ezeagge4ev.canadacentral-01.azurewebsites.net/api/GetProducts');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log("API Data received:", data); // Check your console to see the property names!
        
        setProducts(data);
        setFilteredProducts(data);

        // Dynamically create category list based on API data
        // Change 'Category' to 'category' if your API uses lowercase!
        const uniqueCategories = ["All", ...new Set(data.map(item => item.Category || "General"))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products from Azure:", error);
        setIsLoading(false);
      }
    };

    getCloudProducts();
  }, []);

  // Filtering function
  const handleFilter = (selectedCategory) => {
    setActiveCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      // Logic: only show products matching the category
      const filtered = products.filter(p => p.Category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AirPods Store</h1>
        <p style={subtitleStyle}>Experience the magic of sound.</p>
        
        {/* --- Category Navigation Bar --- */}
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
        ) : (
          filteredProducts.map(item => (
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

// --- Styles ---

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  marginTop: '30px',
  flexWrap: 'wrap'
};

const categoryButtonStyle = {
  padding: '8px 22px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  outline: 'none'
};

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