"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Droplets, Leaf, ShieldCheck, Rabbit, Scale, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase";
export default function About() {
  
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('subscribers').insert([{ email: email }]);
      if (error) {
        if (error.code === '23505') setMessage("You're already part of the community! ✨");
        else setMessage("Something went wrong. Try again.");
      } else {
        setMessage("Welcome to the community! ✨");
        setEmail("");
      }
    } catch (err) {
      setMessage("Network error.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
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
      
      
      {/* MOBILE SIDEBAR */}
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

      {/*  TOP ANNOUNCEMENT BAR */}
      <div className="relative w-full flex justify-center z-[100] py-[10px] px-4 md:px-12 bg-transparent">
        <div className="flex justify-center items-center rounded-[5px] shadow-sm bg-[#f1f0ed]" style={{ height: isMobile ? "30px" : "35px", width: isMobile ? "96%" : "100%", maxWidth: "1280px" }}>
          <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? "9px" : "13px", fontWeight: "600", color: "#67645e", textTransform: "uppercase", letterSpacing: "0.1em" }}>Free Shipping on orders over 5000</p>
        </div>
      </div>

      {/*  MAIN HEADER */}
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

      <div className="w-full flex justify-center px-4 md:px-12 mt-1 md:mt-2">
        <div className="relative overflow-hidden rounded-[8px] md:rounded-[10px] mx-auto" style={{ height: isMobile ? "200px" : "570px", width: isMobile ? "95%" : "100%", maxWidth: "1280px" }}>
          <img src="/images/about-banner.webp" alt="Main Banner" className="w-full h-full object-cover block shadow-sm" />
          {!isScrolled && <div className="absolute inset-0 bg-black/15 pointer-events-none" />}
        </div>
      </div>

<section className="w-full flex justify-center items-center py-[60px] md:py-[100px] px-6 md:px-12">
  <div 
    className="w-full max-w-[1280px] flex flex-col items-center text-center px-4 md:px-20 py-[50px] md:py-[80px] rounded-[10px]" 
    style={{ backgroundColor: "#efefef" }}
  >
    <h2 
      style={{ 
        fontFamily: 'Swiss, sans-serif', 
        fontSize: isMobile ? "12px" : "14px", 
        fontWeight: "700", 
        color: "#67645e", 
        textTransform: "uppercase", 
        letterSpacing: "0.2em",
        marginBottom: isMobile ? "20px" : "30px" 
      }}
    >
      A NOTE FROM OUR FOUNDER
    </h2>

    
    <div 
      className="max-w-[850px]" 
      style={{ 
        fontFamily: '"Gowun Batang", serif', 
        fontSize: isMobile ? "15px" : "20px", 
        fontWeight: "501",
        lineHeight: isMobile ? "1.2" : "1.1", 
        color: "rgba(103, 100, 94, 1)", 
        opacity: 0.9 
      }}
    >
      
      <p style={{ margin: "0 0 5px 0 !important", padding: "0 !important" }}>
        Charme Luna was created with refinement and intention.
      </p>
      <p style={{ margin: "0 0 5px 0 !important", padding: "0 !important" }}>
        Lightweight formulas, reliable quality. Designed to become part of your everyday.
      </p>
      <p style={{ margin: "0 0 5px 0 !important", padding: "0 !important" }}>
        True beauty is never forced. It is simply revealed.
      </p>
      <p style={{ margin: "0 0 5px 0 !important", padding: "0 !important" }}>
        Unveil Your Beauty.
      </p>
      <p style={{ margin: "15px 0 0 0 !important", padding: "0 !important" }}>
        — Muhammad Sattar
      </p>
    </div>
  </div>
</section>


{/*  THE CHARME PROMISE SECTION  */}
<section className="w-full py-[60px] md:py-[100px] overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
  <div className="max-w-[1280px] mx-auto text-center px-[15px] md:px-12">
    
    <div className="mb-10 md:mb-20 px-4">
      <h2 
        style={{ 
          fontFamily: 'Swiss, sans-serif', 
          fontSize: isMobile ? "20px" : "32px", 
          fontWeight: "500", 
          color: "#67645e", 
          textTransform: "uppercase", 
          letterSpacing: "0.25em" 
        }}
      >
        The Charme Promise
      </h2>
      <p 
        style={{ 
          fontFamily: '"Gowun Batang", serif', 
          fontSize: isMobile ? "13px" : "18px", 
          fontStyle: "italic",
          color: "#67645e", 
          opacity: 0.8,
          marginTop: "10px"
        }}
      >
        Beauty built on trust, care, and purity.
      </p>
    </div>

    <div 
      style={{ 
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '10px' : '40px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {[
        { title: "Skin First Approach", desc: "Every formula is designed with skin safety as our top priority.", icon: <Droplets size={isMobile ? 22 : 32} strokeWidth={1} /> },
        { title: "Clean Ingredients", desc: "We choose ingredients that are gentle, effective, and responsibly sourced.", icon: <Leaf size={isMobile ? 22 : 32} strokeWidth={1} /> },
        { title: "Tested & Trusted", desc: "Each product goes through careful quality checks before reaching you.", icon: <ShieldCheck size={isMobile ? 22 : 32} strokeWidth={1} /> },
        { title: "Cruelty Free Commitment", desc: "We believe beauty should never come at the cost of animals.", icon: <Rabbit size={isMobile ? 22 : 32} strokeWidth={1} /> },
        { title: "Honest Beauty", desc: "What we claim is exactly what we deliver—no hidden promises.", icon: <Scale size={isMobile ? 22 : 32} strokeWidth={1} /> },
        { title: "Customer Care", desc: "Your satisfaction and skin health guide every decision we make.", icon: <Heart size={isMobile ? 22 : 32} strokeWidth={1} /> }
      ].map((item, idx) => (
        <div 
          key={idx}
          className="transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-default"
          style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #f1f0ed',
            padding: isMobile ? '20px 10px' : '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isMobile ? '170px' : '280px',
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
            width: '100%',
            boxSizing: 'border-box'
          }}
          
          onMouseEnter={(e) => {
             e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.12)";
             e.currentTarget.style.borderColor = "#d3beab";
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.05)";
             e.currentTarget.style.borderColor = "#f1f0ed";
          }}
        >
          
          <div className="transition-transform duration-500 hover:rotate-6" style={{ marginBottom: isMobile ? '12px' : '25px', color: '#d3beab' }}>
            {item.icon}
          </div>

          <h3 
            style={{ 
              fontFamily: '"Gowun Batang", serif', 
              fontSize: isMobile ? "12px" : "20px", 
              fontWeight: "600", 
              color: "#67645e", 
              fontStyle: "italic",
              marginBottom: "10px",
              paddingBottom: "8px",
              borderBottom: '1px solid #f1f0ed',
              width: '80%',
              textAlign: 'center'
            }}
          >
            {item.title}
          </h3>

          <p 
            style={{ 
              fontFamily: 'Swiss, sans-serif', 
              fontSize: isMobile ? "9.5px" : "14px", 
              lineHeight: "1.4", 
              color: "#67645e", 
              opacity: 0.7,
              maxWidth: "100%",
              margin: '0 auto',
              padding: '0 5px'
            }}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      <footer style={{ 
        backgroundColor: '#f1f0ed', 
        color: '#644747', 
        
        padding: isMobile ? '30px 20px 20px 20px' : '50px 80px 40px 80px', 
        fontFamily: "'Swiss', sans-serif",
        marginTop: '02px', 
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
          
          <div style={{ flex: isMobile ? '1 1 100%' : '1 1 350px', marginBottom: isMobile ? '20px' : '0' }}>
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
  <h3 style={{ 
    fontSize: '13px', 
    fontWeight: '800', 
    marginBottom: '25px', 
    textTransform: 'uppercase', 
    letterSpacing: '0.2em' 
  }}>
    Support
  </h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    
    <Link href="/" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      Home
    </Link>
    
    <Link href="/about" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      About Us
    </Link>
    
    <Link href="/contact" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      Contact Us
    </Link>
    
    <Link href="/faqs" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      FAQs
    </Link>
    
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
  style={{ 
    background: 'transparent', 
    border: 'none', 
    color: '#644747', 
    outline: 'none', 
    flex: 1,
    fontSize: '11px', 
    letterSpacing: '0.15em',
    padding: '5px 0'
  }} 
/>
              <button 
  onClick={handleSubscribe}
  disabled={loading}
  style={{ 
    background: 'none', 
    border: 'none', 
    color: '#644747', 
    fontWeight: '900', 
    cursor: loading ? 'not-allowed' : 'pointer', 
    fontSize: '12px', 
    padding: '0 0 0 15px',
    opacity: loading ? 0.5 : 1
  }} 
>
  {loading ? "..." : "→"}
</button>
            </div>

            {message && (
              <p style={{ fontSize: '12px', color: '#8f645e', marginTop: '10px', fontWeight: '600', transition: '0.3s' }}>
                {message}
              </p>
            )}
          </div>

        </div>

        <div style={{ 
          maxWidth: '1300px',
          margin: '80px auto 0 auto',
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',     
          gap: '10px',
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