import React, { useState, useEffect } from 'react';
import './App.css';
import AirPodCard from './components/AirPodCard';

function App() {
  // --- 1. State Management ---
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // Tracks if a customer is logged in

  // --- 2. Authentication Check (Runs on Page Load) ---
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        if (clientPrincipal) {
          setUser(clientPrincipal);
        }
      } catch (error) {
        // If not logged in, user remains null (Public "Window Shopping" mode)
        console.log("Public View: No user logged in.");
      }
    }
    getUserInfo();
  }, []);

  // --- 3. Public Data Fetch (Always Runs) ---
  useEffect(() => {
    const getCloudProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://store-api-hhgjhudjf3d9f6f6.canadacentral-01.azurewebsites.net/api/GetProducts');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Auto-generate category buttons from data
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

  // --- 4. Filtering Logic ---
  const handleFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.Category === cat));
    }
  };

  // --- 5. The User Interface ---
  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        {/* Top Navigation / Auth Bar */}
        <div style={topNavStyle}>
          {user ? (
            <div style={userBadgeStyle}>
              <span>Welcome, <strong>{user.userDetails}</strong></span>
              <a href="/.auth/logout" style={authLinkStyle}>Logout</a>
            </div>
          ) : (
            <a href="/.auth/login/aad" style={authLinkStyle}>Sign In to Buy</a>
          )}
        </div>

        <h1 style={titleStyle}>AirPods Store</h1>
        <p style={subtitleStyle}>Experience the magic of sound.</p>
        
        {/* CATEGORIES (Visible to everyone) */}
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
        {/* PRODUCT GRID (Visible to everyone) */}
        {isLoading ? (
          <p style={{ fontSize: '1.2rem', color: '#86868b' }}>Connecting to cloud database...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            // Passing login status as a prop to the child component
            <AirPodCard 
              key={item.ProductID} 
              product={item} 
              isLoggedIn={!!user} 
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
             <p>No products available right now.</p>
             <small style={{ color: '#86868b' }}>Waiting for database sync...</small>
          </div>
        )}
      </main>

      <footer style={footerStyle}>
        <p>© 2026 AirPods Storefront Project - Public Catalog & Secure Checkout</p>
      </footer>
    </div>
  );
}

// --- 6. Styles ---
const pageStyle = { 
  background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)', 
  minHeight: '100vh', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
  color: '#1d1d1f' 
};

const headerStyle = { textAlign: 'center', padding: '40px 20px' };

const topNavStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '10px 40px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const userBadgeStyle = {
  display: 'flex',
  gap: '15px',
  fontSize: '0.9rem',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '8px 15px',
  borderRadius: '20px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
};

const authLinkStyle = { 
  color: '#0071e3', 
  textDecoration: 'none', 
  fontWeight: '500',
  fontSize: '0.95rem'
};

const titleStyle = { fontSize: '3.5rem', fontWeight: '600', letterSpacing: '-0.02em', marginBottom: 10 };
const subtitleStyle = { fontSize: '1.5rem', color: '#86868b', fontWeight: '400', marginBottom: '30px' };
const navContainerStyle = { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' };
const categoryButtonStyle = { padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: '500', transition: '0.3s' };
const gridStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '20px' };
const footerStyle = { textAlign: 'center', padding: '60px 20px', color: '#86868b', fontSize: '0.9rem' };

export default App;