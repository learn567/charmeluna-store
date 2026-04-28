"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// 1. Supabase client import karein
import { supabase } from "../../../libsupabase";


export default function Shop() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [openIndex, setOpenIndex] = useState(null);

  const [email, setEmail] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 2. Products ke liye states
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const handleSubscribe = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Thank you for joining!");
      setEmail("");
    }, 1000);
  };

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    // 3. Data fetch karne ka function
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();

    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMounted) return null;
  const isMobile = windowWidth < 768;

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#ffffff" }}>
      
      {/* 1. MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/10 z-[300]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ position: "fixed", top: "55px", left: "7px", height: "400px", width: "220px", backgroundColor: "#fef8fc", zIndex: 310, padding: "25px", borderRadius: "15px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}><X size={22} style={{ color: "#67645e", cursor: "pointer", opacity: 0.7 }} onClick={() => setIsOpen(false)} /></div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "25px", paddingLeft: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setShopOpen(!shopOpen)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>
                    <span style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>Shop</span>
                    <ChevronDown size={14} style={{ color: "#67645e", transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
                  </div>
                  {shopOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "10px", paddingTop: "15px", overflow: "hidden" }}>
                      {["Eye", "Skin Foundation", "Lip Glow", "Lipstick", "Skin Toner"].map((cat, i) => (
                        <Link key={i} href={`/shop/${cat.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsOpen(false)} style={{ color: "rgba(103, 100, 94, 0.7)", fontSize: "11px", textTransform: "uppercase", textDecoration: "none" }}>{cat}</Link>
                      ))}
                    </motion.div>
                  )}
                </div>
                <Link href="/about" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>About</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>Contact</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. TOP ANNOUNCEMENT BAR */}
      <div className="relative w-full flex justify-center z-[100] py-[10px] px-4 md:px-12 bg-transparent">
        <div className="flex justify-center items-center rounded-[5px] shadow-sm bg-[#f1f0ed]" style={{ height: isMobile ? "30px" : "35px", width: isMobile ? "96%" : "100%", maxWidth: "1280px" }}>
          <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? "9px" : "13px", fontWeight: "600", color: "#67645e", textTransform: "uppercase", letterSpacing: "0.1em" }}>Free Shipping on orders over 5000</p>
        </div>
      </div>

      {/* 3. MAIN HEADER */}
      <header className={`${isScrolled ? "fixed bg-[#f1f0ed] shadow-md" : "absolute bg-transparent"} left-0 w-full flex justify-center z-[120] transition-colors duration-300`} style={{ top: isScrolled ? "0" : (isMobile ? "45px" : "60px"), height: "62px" }}>
        <div className="w-full max-w-[1260px] h-full flex justify-between items-center relative" style={{ paddingLeft: isMobile ? "15px" : "80px", paddingRight: isMobile ? "15px" : "80px" }}> 
          
          <div className="flex items-center z-[130]">
            {isMobile ? (
              <button onClick={() => setIsOpen(!isOpen)} className="bg-transparent p-0 border-none outline-none relative w-8 h-8 flex items-center justify-center pointer-events-auto">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X size={26} color={isScrolled ? "#67645e" : "#ffffff"} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu size={26} color={isScrolled ? "#67645e" : "#ffffff"} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ) : (
              <div className="flex items-center pointer-events-auto" style={{ fontFamily: 'Swiss, sans-serif', fontSize: "13px", fontWeight: "700", color: isScrolled ? "#67645e" : "#ffffff" }}>
                <div className="relative group mr-[45px]">
                  <Link href="/shop" className="uppercase tracking-[0.15em] no-underline text-inherit">Shop</Link>
                  <div className="absolute hidden group-hover:block top-full left-[-20px] pt-4 pointer-events-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#fef8fc] shadow-2xl rounded-[8px] border border-[#f1f0ed] flex flex-col items-center justify-center min-w-[190px] h-[260px] overflow-hidden p-2">
                      {["Eye", "Skin Foundation", "Lip Glow", "Lipstick", "Skin Toner"].map((item, idx) => (
                        <Link key={idx} href={`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`} className="w-full flex-1 flex items-center justify-center text-[#67645e] no-underline uppercase text-[11px] font-[600] tracking-[0.2em] transition-all duration-500 ease-out hover:tracking-[0.05em] hover:text-black hover:bg-[#ffffff]/50">{item}</Link>
                      ))}
                    </motion.div>
                  </div>
                </div>
                <Link href="/about" className="uppercase tracking-[0.15em] no-underline text-inherit mr-[45px]">About</Link>
                <Link href="/contact" className="uppercase tracking-[0.15em] no-underline text-inherit">Contact</Link>
              </div>
            )}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-[125]">
            <Link href="/" className="no-underline text-inherit flex items-center justify-center relative" style={{ fontFamily: '"Gowun Batang", serif', fontSize: isMobile ? "26px" : "40px", fontWeight: "400", color: isScrolled ? "#67645e" : "#ffffff", letterSpacing: "0.1em" }}>
              <span style={{ position: 'relative', zIndex: 1 }}>C</span>
              <span style={{ position: 'absolute', zIndex: 2, fontSize: isMobile ? "26px" : "40px", left: '70%', top: '65%', transform: 'translate(-50%, -50%)' }}>L</span>
            </Link>
          </div>

          <div className="flex items-center z-[130] pointer-events-auto">
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.95, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 20 }} className="absolute right-[35px] md:right-[50px] z-[150]">
                    <div className="relative flex items-center">
                      <input autoFocus type="text" placeholder="Search products..." className="w-[180px] md:w-[300px] h-[40px] bg-white/90 backdrop-blur-md border border-[#d3beab] rounded-full px-5 text-[13px] text-[#67645e] outline-none shadow-lg placeholder:text-[#67645e]/40" style={{ fontFamily: 'Swiss, sans-serif' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <Search size={isMobile ? 18 : 20} className="mr-[12px] md:mr-[35px] cursor-pointer hover:scale-110 transition-transform duration-300" color={isScrolled ? "#67645e" : "#ffffff"} onClick={() => setIsSearchOpen(!isSearchOpen)} />
            </div>
            <Link href="/account">
              <User size={isMobile ? 18 : 20} className="mr-[12px] md:mr-[35px] cursor-pointer transition-colors duration-300" color={isScrolled ? "#67645e" : "#ffffff"} />
            </Link>
            <div className="relative">
              <ShoppingBag size={isMobile ? 18 : 20} className="cursor-pointer transition-colors duration-300 hover:opacity-70" color={isScrolled ? "#67645e" : "#ffffff"} onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 bg-black/20 z-[999] backdrop-blur-[2px]"
            />

            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} 
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#fef8fc] z-[1000] flex flex-col shadow-2xl"
              style={{ left: 'auto', right: 0 }}
            >
              <div className="flex-1 flex flex-col p-6 md:p-10">
                
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 style={{ fontFamily: 'Swiss, sans-serif' }} className="text-[#8f645e] uppercase tracking-[0.3em] font-bold text-[14px]">
                      Your Bag
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="p-1 hover:rotate-90 transition-transform duration-300"
                  >
                    <X size={24} className="text-[#8f645e] opacity-40 hover:opacity-100" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center border border-[#f1f0ed] rounded-[20px] bg-white/50 px-6 py-10 shadow-sm">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#f1f0ed]">
                    <ShoppingBag size={20} className="text-[#d3beab]" />
                  </div>
                  
                  <p style={{ fontFamily: 'Gowun Batang, serif' }} className="text-[#8f645e] text-xl mb-4 italic text-center">
                    Your bag is currently empty
                  </p>
                  
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="w-full max-w-[240px] py-4 border border-[#67645e] text-[#8f645e] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#67645e] hover:text-[#8f645e] transition-colors duration-300 rounded-full"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MAIN BANNER */}
      <div className="w-full flex justify-center px-4 md:px-12 mt-1 md:mt-2">
        <div className="relative overflow-hidden rounded-[8px] md:rounded-[10px] mx-auto" style={{ height: isMobile ? "300px" : "600px", width: isMobile ? "95%" : "100%", maxWidth: "1280px" }}>
          <img src="/images/shopbg.webp" alt="Main Banner" className="w-full h-full object-cover block shadow-sm" />
          {!isScrolled && <div className="absolute inset-0 bg-black/15 pointer-events-none" />}
        </div>
      </div>

      {/* 5. HIGH-STREET FUNCTIONAL GRID */}
      <section style={{ padding: isMobile ? '40px 20px' : '100px 100px', maxWidth: '1600px', margin: '0 auto', backgroundColor: '#fff' }}>
        
        {/* Header - Simple & Clean */}
        <div style={{ marginBottom: '60px', borderLeft: '3px solid #b3848f', paddingLeft: '20px' }}>
          <h2 style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? '28px' : '40px', fontWeight: '900', color: '#644747', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            The Muse Collection
          </h2>
        </div>

        {isProductsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
            <div style={{ width: '25px', height: '25px', border: '2px solid #f1f0ed', borderTopColor: '#b3848f', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
            columnGap: isMobile ? '12px' : '30px', 
            rowGap: '60px'
          }}>
            {products.map((product) => (
              <div key={product.id} className="group" style={{ position: 'relative' }}>
                
                {/* Image Area - No Shadow, Pure Cleanliness */}
                <div 
                  onClick={() => window.location.href = `/checkout?id=${product.id}`}
                  style={{ 
                    position: 'relative', 
                    width: '100%',
                    aspectRatio: '1/1.2',
                    overflow: 'hidden',
                    backgroundColor: '#fbfaf9',
                    cursor: 'pointer',
                    borderRadius: '2px' // Sharp Figma look
                  }}
                >
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    className="group-hover:scale-105"
                  />
                </div>

                {/* Info & Action Area */}
                <div style={{ marginTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontFamily: 'Swiss, sans-serif', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#644747' }}>
                      {product.name}
                    </h3>
                    <span style={{ fontFamily: 'Swiss, sans-serif', fontSize: '14px', color: '#b3848f', fontWeight: '400' }}>
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* BUY NOW BUTTON - ALWAYS VISIBLE OR SLIDE UP */}
                  <button 
                    onClick={() => window.location.href = `/checkout?id=${product.id}`}
                    style={{
                      width: '100%',
                      marginTop: '15px',
                      padding: '12px',
                      backgroundColor: '#f6f6f6', // Deep Cocoa color
                      color: '#836767',
                      fontFamily: 'Swiss, sans-serif',
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f6f6f6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f6f6f6'}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER SECTION */}
      <footer style={{ 
        backgroundColor: '#f1f0ed', 
        color: '#644747', 
        padding: isMobile ? '30px 20px 20px 20px' : '50px 80px 40px 80px', 
        fontFamily: "'Swiss', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '10px',
            fontSize: '170px',
            fontWeight: '900',
            color: '#644747',
            opacity: '0.06',
            pointerEvents: 'none',
            letterSpacing: '-0.02em'
          }}>
            CHARMELUNA
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          maxWidth: '1300px', 
          margin: '0 auto', 
          gap: isMobile ? '40px 0px' : '40px',
          position: 'relative',
          zIndex: 1
        }}>
          
          <div style={{ flex: isMobile ? '1 1 100%' : '1 1 350px' }}>
            <div style={{ 
              fontSize: '42px', 
              fontWeight: '900', 
              fontFamily: '"Gowun Batang", serif', 
              color: '#644747', 
              marginBottom: '15px',
              lineHeight: '1'
            }}>
              CL<span style={{ color: '#b3848f', fontSize: '50px' }}>.</span>
            </div>
            <p style={{ fontSize: '14px', opacity: '0.7', color: '#644747' }}>
              Elevating the standard of beauty through mindful ingredients and iconic design.
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flex: isMobile ? '1 1 100%' : '1 1 400px', 
            gap: isMobile ? '0' : '80px',
            justifyContent: 'space-between'
          }}>
            <div style={{ flex: '1' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Shop</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link href="/shop/lipstick" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Lipstick</Link>
                <Link href="/shop/skin-foundation" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Foundation</Link>
                <Link href="/shop/eye" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Eyes</Link>
                <Link href="/shop/lip-glow" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Lip Glow</Link>
                <Link href="/shop/skin-toner" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Skin Toner</Link>
              </div>
            </div>

            <div style={{ flex: '1' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Support</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link href="/" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Home</Link>
                <Link href="/about" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">About Us</Link>
                <Link href="/contact" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Contact Us</Link>
                <Link href="/faqs" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">FAQs</Link>
              </div>
            </div>
          </div>

          <div style={{ flex: isMobile ? '1 1 100%' : '1 1 320px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#644747' }}>
              Join our community
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1.5px solid #644747', paddingBottom: '8px', marginTop: '10px' }}>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER EMAIL ADDRESS" 
                style={{ background: 'transparent', border: 'none', color: '#644747', outline: 'none', flex: 1, fontSize: '11px', letterSpacing: '0.15em', padding: '5px 0' }} 
              />
              <button 
                onClick={handleSubscribe}
                disabled={loading}
                style={{ background: 'none', border: 'none', color: '#644747', fontWeight: '900', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '12px', padding: '0 0 0 15px', opacity: loading ? 0.5 : 1 }} 
              >
                {loading ? "..." : "→"}
              </button>
            </div>
            {message && (
              <p style={{ fontSize: '12px', color: '#8f645e', marginTop: '10px', fontWeight: '600' }}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div style={{ 
          maxWidth: '1300px',
          margin: '80px auto 0 auto',
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',     
          paddingTop: '30px', 
          borderTop: '1px solid rgba(100, 71, 71, 0.1)', 
          fontSize: '10px', 
          opacity: '0.6',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textAlign: 'center' 
        }}>
          <div>© 2026 CHARMELUNA STORE. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}