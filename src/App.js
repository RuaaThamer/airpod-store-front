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
  const [user, setUser] = useState(null); // Auth State

  // --- 2. Check Authentication (Entra ID) ---
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
        console.error("Authentication check failed:", error);
      }
    }
    getUserInfo();
  }, []);

  // --- 3. Fetch Products (Only if Logged In) ---
  useEffect(() => {
    if (user) {
      const getCloudProducts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('https://store-api-hhgjhudjf3d9f6f6.canadacentral-01.azurewebsites.net/api/GetProducts');
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);

          const uniqueCategories = ["All", ...new Set(data.map(item => item.Category || "Other"))];
          setCategories(uniqueCategories);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          setIsLoading(false);
        }
      };
      getCloudProducts();
    }
  }, [user]); // Re-run when user logs in

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.Category === cat));
    }
  };

  // --- 4. The UI Logic ---
  return (
    <div className="App" style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AirPods Store</h1>
        
        {!user ? (
          // LOGIN VIEW
          <div style={{ padding: '40px' }}>
            <p style={subtitleStyle}>Secure Access Required</p>
            <p>Please sign in with your Microsoft account to view the catalog.</p>
            <a href="/.auth/login/aad" style={loginButtonStyle}>
              Login with Entra ID
            </a>
          </div>
        ) : (
          // AUTHENTICATED VIEW
          <>
            <div style={userBannerStyle}>
              <span>Logged in as: <strong>{user.userDetails}</strong></span>
              <a href="/.auth/logout" style={logoutLinkStyle}>Logout</a>
            </div>
            
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
          </>
        )}
      </header>
      
      <main style={gridStyle}>
        {user && (
          isLoading ? (
            <p style={{ fontSize: '1.2rem', color: '#86868b' }}>Connecting to secure database...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <AirPodCard key={item.ProductID} product={item} />
            ))
          ) : (
            <p>No products available in this category.</p>
          )
        )}
      </main>

      <footer style={footerStyle}>
        <p>© 2026 AirPods Storefront Project - Secure Cloud Integration</p>
      </footer>
    </div>
  );
}

// --- 5. Styles ---
const pageStyle = { background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)', minHeight: '100vh', fontFamily: '-apple-system, sans-serif', color: '#1d1d1f' };
const headerStyle = { textAlign: 'center', padding: '60px 20px' };
const titleStyle = { fontSize: '3rem', fontWeight: '600', marginBottom: 10 };
const subtitleStyle = { fontSize: '1.4rem', color: '#86868b', fontWeight: '400', marginBottom: '20px' };
const navContainerStyle = { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px', flexWrap: 'wrap' };
const categoryButtonStyle = { padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: '500', transition: '0.3s' };
const gridStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '20px' };
const footerStyle = { textAlign: 'center', padding: '40px', color: '#86868b', fontSize: '0.9rem' };

const loginButtonStyle = {
  display: 'inline-block',
  backgroundColor: '#0071e3',
  color: 'white',
  padding: '15px 30px',
  borderRadius: '30px',
  textDecoration: 'none',
  fontWeight: '600',
  marginTop: '20px'
};

const userBannerStyle = {
  backgroundColor: '#f5f5f7',
  padding: '10px 20px',
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '20px',
  fontSize: '0.9rem'
};

const logoutLinkStyle = { color: '#0071e3', textDecoration: 'none' };

export default App;