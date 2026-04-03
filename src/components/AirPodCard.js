import React from 'react';

const AirPodCard = ({ product, isLoggedIn }) => {
  return (
    <div style={cardStyle}>
      <div style={categoryTagStyle}>{product.Category}</div>

      {/* FIXED: The image container now has a set height and crops/fits perfectly */}
      <div style={imageContainer}>
        <img 
          src={product.ImageURL} 
          alt={product.Name} 
          style={imageStyle} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=AirPods+Image'; }}
        />
      </div>

      {/* FIXED: Content wrapper ensures text is aligned even if one description is longer */}
      <div style={contentWrapper}>
        <h2 style={nameStyle}>{product.Name}</h2>
        <p style={descriptionStyle}>{product.Description}</p>
        <div style={priceContainer}>
          <span style={priceStyle}>${product.Price}</span>
        </div>
      </div>

      {/* FIXED: Button stays at the absolute bottom of the card */}
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

// --- Updated Component Styles ---

const cardStyle = {
  backgroundColor: '#ffffff', // Clean white background
  borderRadius: '24px',
  padding: '30px',
  textAlign: 'center',
  width: '320px', // Standard width
  height: '550px', // FIXED: Forcing every card to be the same height
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease',
  margin: '10px'
};

const imageContainer = {
  height: '220px', // FIXED: All image areas are now identical
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  overflow: 'hidden'
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain' // FIXED: Ensures images aren't stretched or squished
};

const contentWrapper = {
  flexGrow: 1, // Pushes the button to the bottom
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
};

const categoryTagStyle = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  color: '#86868b',
  fontWeight: '600',
  marginBottom: '10px'
};

const nameStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  margin: '10px 0',
  color: '#1d1d1f'
};

const descriptionStyle = {
  fontSize: '0.9rem',
  color: '#424245',
  lineHeight: '1.4',
  height: '60px', // FIXED: Forces 3 lines of text so cards don't jump
  overflow: 'hidden',
  marginBottom: '15px'
};

const priceContainer = {
  marginBottom: '20px'
};

const priceStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#1d1d1f'
};

const buttonStyle = {
  backgroundColor: '#0071e3', 
  color: '#ffffff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '24px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  width: '100%',
  textAlign: 'center'
};

export default AirPodCard;