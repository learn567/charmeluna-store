"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Country, State, City } from 'country-state-city';

function CheckoutForm() {
  const [cartItems, setCartItems] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', address: '', country: '', state: '', city: '', phone: '', countryCode: '', stateCode: ''
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  // --- Cart Functions ---
  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // --- Location Handlers ---
  const handleCountryChange = (e) => {
    const country = Country.getAllCountries().find(c => c.name === e.target.value);
    setFormData({ 
      ...formData, 
      country: e.target.value, 
      countryCode: country?.isoCode || '',
      state: '', 
      city: '' 
    });
  };

  const handleStateChange = (e) => {
    const state = State.getStatesOfCountry(formData.countryCode).find(s => s.name === e.target.value);
    setFormData({ 
      ...formData, 
      state: e.target.value, 
      stateCode: state?.isoCode || '',
      city: '' 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");
    const newId = "CL-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTrackingId(newId);
    setIsOrdered(true);
    localStorage.removeItem("cart");
  };

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

  if (isOrdered) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fbfaf9', border: '1px solid #f1f0ed' }}>
        <h2 style={{ fontFamily: 'Swiss, sans-serif', color: '#644747', fontSize: '24px', fontWeight: '900' }}>ORDER PLACED!</h2>
        <p style={{ color: '#b3848f', fontSize: '14px', margin: '20px 0' }}>Thank you {formData.fullName}, your order is being processed.</p>
        <div style={{ padding: '15px', border: '2px dashed #d3beab', display: 'inline-block', marginTop: '10px' }}>
          <span style={{ fontSize: '12px', display: 'block', color: '#644747' }}>TRACKING NUMBER:</span>
          <strong style={{ fontSize: '18px', color: '#644747' }}>{trackingId}</strong>
        </div>
        <button onClick={() => window.location.href = '/shop'} style={{ display: 'block', margin: '30px auto 0', backgroundColor: '#644747', color: '#fff', padding: '15px 30px', border: 'none', cursor: 'pointer', fontWeight: '900', textTransform: 'uppercase' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'Swiss, sans-serif', fontSize: '32px', fontWeight: '900', color: '#644747', textTransform: 'uppercase' }}>Checkout</h1>
      </div>

      {/* Cart Summary Section */}
      <div style={{ padding: '25px', backgroundColor: '#fbfaf9', border: '1px solid #f1f0ed', marginBottom: '40px' }}>
        <h3 style={{ ...labelStyle, borderBottom: '1px solid #f1f0ed', paddingBottom: '10px', marginBottom: '20px' }}>Your Order</h3>
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #f1f0ed' }}>
            <img src={item.image_url} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #f1f0ed' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#644747', textTransform: 'uppercase' }}>{item.name}</span>
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#b3848f', cursor: 'pointer', fontSize: '11px' }}>REMOVE</button>
              </div>
              <p style={{ color: '#b3848f', fontSize: '12px' }}>Rs. {item.price.toLocaleString()}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => updateQuantity(item.id, -1)} style={{ width: '25px', border: '1px solid #644747', background: 'none' }}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, 1)} style={{ width: '25px', border: '1px solid #644747', background: 'none' }}>+</button>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', color: '#644747', paddingTop: '10px' }}>
          <span>TOTAL</span>
          <span>Rs.{subtotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Full Name</label>
        <input type="text" placeholder="Enter your full name" style={inputStyle} required
          onChange={(e) => setFormData({...formData, fullName: e.target.value})} />

        <label style={labelStyle}>Phone Number</label>
        <input type="tel" placeholder="e.g. +92 300 1234567" style={inputStyle} required
          onChange={(e) => setFormData({...formData, phone: e.target.value})} />

        <label style={labelStyle}>Country</label>
        <select style={inputStyle} required value={formData.country} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {Country.getAllCountries().map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
        </select>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>State / Province</label>
            <select style={inputStyle} required disabled={!formData.country} value={formData.state} onChange={handleStateChange}>
              <option value="">Select State</option>
              {State.getStatesOfCountry(formData.countryCode).map(s => <option key={s.isoCode} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>City</label>
            <select style={inputStyle} required disabled={!formData.state} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}>
              <option value="">Select City</option>
              {City.getCitiesOfState(formData.countryCode, formData.stateCode).map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <label style={labelStyle}>Shipping Address</label>
        <textarea placeholder="House number, Street name, Area..." style={{...inputStyle, height: '80px', resize: 'none'}} required
          onChange={(e) => setFormData({...formData, address: e.target.value})} />

        <label style={labelStyle}>Email Address (Optional)</label>
        <input type="email" placeholder="email@example.com" style={inputStyle}
          onChange={(e) => setFormData({...formData, email: e.target.value})} />

        <button type="submit" style={{ width: '100%', padding: '20px', backgroundColor: '#644747', color: '#fff', border: 'none', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer' }}>
          Confirm Order
        </button>
      </form>
    </div>
  );
}

// CheckoutPage wala function same rahega
export default function CheckoutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '100px 20px' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', fontFamily: 'Swiss, sans-serif', color: '#b3848f' }}>Loading Checkout...</div>}>
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