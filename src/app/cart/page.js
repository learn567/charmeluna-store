export default function Cart() {
  return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#644747' }}>SHOPPING CART</h1>
      <p>Your cart is empty.</p>
      <a href="/shop" style={{ color: '#b3848f', textDecoration: 'underline' }}>Back to Shop</a>
    </div>
  );
}