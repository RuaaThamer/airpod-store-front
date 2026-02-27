import React from 'react';

const AirPodCard = ({ product }) => {
  return (
    <div style={cardStyle}>
      {/* Product Image Container */}
      <div style={imageContainer}>
        <img 
          src={product.ImageURL} 
          alt={product.Name} 
          style={imageStyle} 
        />
      </div>

      {/* Product Details */}
      <h2 style={nameStyle}>{product.Name}</h2>
      <p style={descriptionStyle}>{product.Description}</p>
      
      <div style={priceContainer}>
        <span style={priceStyle}>${product.Price}</span>
      </div>

      {/* Action Button */}
      <button 
  style={buttonStyle}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#005bb5';
    e.target.style.color = '#ffffff';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#e9ecef';
    e.target.style.color = '#1d1d1f';
  }}
  // Add this line to handle the click
  onClick={() => console.log(`Request sent: Buying ${product.Name}`)}
>
  Buy Now
</button>
    </div>
  );
};

// --- Component Styles ---

const cardStyle = {
  backgroundColor: '#e9ecef', // 
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: '24px',
  padding: '30px',
  textAlign: 'center',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease'
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

export default AirPodCard;