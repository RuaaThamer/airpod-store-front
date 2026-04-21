import React, { useState } from 'react';

const AirPodCard = ({ product }) => {
  // State to handle the "Buy Now" loading process
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleBuyNow = async () => {
    setIsPurchasing(true);

    // EXACT MATCH for Backend req.body:
    // The database guy's code expects: productId, customerName, price
    const orderData = {
      productId: product.ProductID, 
      customerName: "Guest Customer", 
      price: product.Price
    };

    try {
      const response = await fetch('/api/CreateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        // result.orderId comes directly from the backend's SQL OUTPUT INSERTED.OrderID
        alert(`Order placed successfully!\nOrder ID: ${result.orderId}\nStatus: Pending Background Processing`);
      } else {
        alert(`Order failed: ${result.message || 'Server Error'}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot reach the server. Please check your connection.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={categoryTagStyle}>{product.Category}</div>

      <div style={imageContainer}>
        <img 
          src={product.ImageURL} 
          alt={product.Name} 
          style={imageStyle} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=AirPods'; }}
        />
      </div>

      <div style={contentWrapper}>
        <h2 style={nameStyle}>{product.Name}</h2>
        <p style={descriptionStyle}>{product.Description}</p>
        <div style={priceContainer}>
          <span style={priceStyle}>${product.Price}</span>
        </div>
      </div>

      <button 
        style={{
          ...buttonStyle,
          backgroundColor: isPurchasing ? '#86868b' : '#0071e3',
          cursor: isPurchasing ? 'not-allowed' : 'pointer'
        }}
        disabled={isPurchasing}
        onMouseOver={(e) => !isPurchasing && (e.target.style.backgroundColor = '#005bb5')}
        onMouseOut={(e) => !isPurchasing && (e.target.style.backgroundColor = '#0071e3')}
        onClick={handleBuyNow}
      >
        {isPurchasing ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  );
};

// --- Styles (Apple-inspired clean look) ---

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  padding: '30px',
  textAlign: 'center',
  width: '320px',
  height: '550px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  margin: '10px'
};

const imageContainer = {
  height: '220px',
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
  objectFit: 'contain'
};

const contentWrapper = {
  flexGrow: 1,
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
  height: '60px',
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
  color: '#ffffff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  width: 'fit-content',
  margin: '0 auto',
  minWidth: '160px'
};

export default AirPodCard;