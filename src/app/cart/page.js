"use client";
import React from 'react';

// Ye function ka naam CartPage hai aur niche hum isay export kar rahe hain
export default function CartPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#fff',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontWeight: '900', color: '#644747', textTransform: 'uppercase' }}>
        Shopping Cart
      </h1>
      <p style={{ color: '#b3848f', marginTop: '10px' }}>
        Your cart is currently empty.
      </p>
      
      <button 
        onClick={() => window.location.href = '/shop'}
        style={{
          marginTop: '30px',
          padding: '12px 30px',
          backgroundColor: '#644747',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Go Back to Shop
      </button>
    </div>
  );
}