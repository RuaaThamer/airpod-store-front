import React from 'react';

const AirPodCard = ({ product, isLoggedIn }) => { // <--- Added isLoggedIn here
  return (
    <div style={cardStyle}>
      <div style={categoryTagStyle}>{product.Category}</div>

      <div style={imageContainer}>
        <img 
          src={product.ImageURL} 
          alt={product.Name} 
          style={imageStyle} 
        />
      </div>

      <h2 style={nameStyle}>{product.Name}</h2>
      <p style={descriptionStyle}>{product.Description}</p>
      
      <div style={priceContainer}>
        <span style={priceStyle}>${product.Price}</span>
      </div>

      {/* --- Updated Button Logic --- */}
      {isLoggedIn ? (
        <button 
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#005bb5')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#0071e3')}
          onClick={() => console.log(`Request sent: Buying ${product.Name}`)}
        >
          Buy Now
        </button>
      ) : (
        <a 
          href="/.auth/login/aad" 
          style={{...buttonStyle, textDecoration: 'none', display: 'block'}}
        >
          Sign In to Buy
        </a>
      )}
    </div>
  );
};

// ... keep all your existing styles below ...
const cardStyle = { /* ... */ };
const categoryTagStyle = { /* ... */ };
const imageContainer = { /* ... */ };
const imageStyle = { /* ... */ };
const nameStyle = { /* ... */ };
const descriptionStyle = { /* ... */ };
const priceContainer = { /* ... */ };
const priceStyle = { /* ... */ };
const buttonStyle = {
  backgroundColor: '#0071e3', 
  color: '#ffffff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '20px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  marginTop: '10px',
  textAlign: 'center' // Added for the link version
};

export default AirPodCard;