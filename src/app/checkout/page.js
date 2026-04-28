"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// 1. Pehle humne content ko alag function mein rakha
function CheckoutForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', address: '', city: '', phone: ''
  });

  const inputStyle = {
    width: '100%', padding: '15px', marginBottom: '20px', border: '1px solid #f1f0ed',
    backgroundColor: '#fbfaf9', fontFamily: 'Swiss, sans-serif', fontSize: '14px',
    outline: 'none', borderRadius: '2px'
  };

  const labelStyle = {
    display: 'block', fontFamily: 'Swiss, sans-serif', fontSize: '11px',
    fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
    color: '#644747', marginBottom: '8px'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed for Product ID: ${productId}\nThank you, ${formData.fullName}!`);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'Swiss, sans-serif', fontSize: '32px', fontWeight: '900', color: '#644747', textTransform: 'uppercase' }}>
          Checkout
        </h1>
        <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: '12px', color: '#b3848f', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '10px' }}>
          Complete your order
        </p>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#fbfaf9', border: '1px solid #f1f0ed', marginBottom: '40px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'Swiss, sans-serif', fontSize: '13px', color: '#644747' }}>
          Ordering Product ID: <strong>{productId || "No ID Selected"}</strong>
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" placeholder="Enter your name" style={inputStyle} required
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        </div>
        <div>
          <label style={labelStyle}>Phone Number</label>
          <input type="tel" placeholder="+92 3xx xxxxxxx" style={inputStyle} required
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div>
          <label style={labelStyle}>Shipping Address</label>
          <textarea placeholder="Street address..." style={{...inputStyle, height: '100px', resize: 'none'}} required
            onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <input type="text" placeholder="City" style={inputStyle} required
            onChange={(e) => setFormData({...formData, city: e.target.value})} />
          <input type="email" placeholder="Email (Optional)" style={inputStyle}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <button type="submit" style={{
          width: '100%', padding: '20px', backgroundColor: '#644747', color: '#fff', border: 'none',
          fontFamily: 'Swiss, sans-serif', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase',
          letterSpacing: '0.2em', cursor: 'pointer', marginTop: '20px'
        }}>
          Confirm Order
        </button>
      </form>
    </div>
  );
}

// 2. Main Page function jo Vercel mang raha hai (With Suspense)
export default function CheckoutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '100px 20px' }}>
      <Suspense fallback={
        <div style={{ textAlign: 'center', fontFamily: 'Swiss, sans-serif', color: '#b3848f' }}>
          Loading Checkout...
        </div>
      }>
        <CheckoutForm />
      </Suspense>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => window.location.href = '/shop'}
          style={{ background: 'none', border: 'none', color: '#d3beab', fontFamily: 'Swiss, sans-serif', fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}>
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}