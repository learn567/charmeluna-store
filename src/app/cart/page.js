"use client";
import React from 'react';

export default function CartPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#fff',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontFamily: 'Swiss, sans-serif', 
        fontSize: '40px', 
        fontWeight: '900', 
        color: '#644747', 
        textTransform: 'uppercase' 
      }}>
        Your Cart
      </h1>
      <p style={{ 
        fontFamily: 'Swiss, sans-serif', 
        fontSize: '12px', 
        color: '#b3848f', 
        letterSpacing: '0.2em', 
        textTransform: 'uppercase', 
        marginTop: '10px' 
      }}>
        Your cart is currently empty.
      </p>
      
      <button 
        onClick={() => window.location.href = '/shop'}
        style={{
          marginTop: '40px',
          padding: '15px 40px',
          backgroundColor: '#644747',
          color: '#fff',
          border: 'none',
          fontFamily: 'Swiss, sans-serif',
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          cursor: 'pointer'
        }}
      >
        Return to Shop
      </button>
    </div>
  );
}