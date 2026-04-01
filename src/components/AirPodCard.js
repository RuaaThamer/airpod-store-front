import React from 'react';

const AirPodCard = ({ product }) => {
  return (
    <div style={cardStyle}>
      {/* 1. Added a Category Tag at the top */}
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

      <button 
        style={buttonStyle}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#005bb5';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#0071e3'; // Kept original blue
          e.target.style.color = '#ffffff';
        }}
        onClick={() => console.log(`Request sent: Buying ${product.Name}`)}
      >
        Buy Now
      </button>
    </div>
  );
};

// --- Component Styles ---

const cardStyle = {
  backgroundColor: '#e9ecef', 
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: '24px',
  padding: '30px',
  textAlign: 'center',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  position: 'relative' // Added for better tag placement
};

const categoryTagStyle = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#86868b',
  fontWeight: '700',
  marginBottom: '10px'
};

const imageContainer = {
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px'
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain'
};

const nameStyle = {
  fontSize: '1.6rem',
  fontWeight: '600',
  margin: '10px 0',
  color: '#1d1d1f'
};

const descriptionStyle = {
  fontSize: '0.95rem',
  color: '#424245',
  lineHeight: '1.4',
  minHeight: '60px',
  marginBottom: '15px'
};

const priceContainer = {
  margin: '15px 0'
};

const priceStyle = {
  fontSize: '1.3rem',
  fontWeight: '600',
  color: '#1d1d1f'
};

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
  marginTop: '10px'
};