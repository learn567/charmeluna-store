"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase";

export default function FAQS() {
    const [openIndex, setOpenIndex] = useState(null);
    // Footer ki zaroori states
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Email subscribe karne ka function
  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      // Yahan aap apna supabase logic likh sakte hain
      const { error } = await supabase.from('subscribers').insert([{ email: email }]);
      if (error) {
        if (error.code === '23505') setMessage("Already subscribed! ✨");
        else setMessage("Error subscribing.");
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
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

      {/* 5. SIDE CART DRAWER (CLEAN DESIGN) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 bg-black/20 z-[999] backdrop-blur-[2px]"
            />

            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} 
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#fef8fc] z-[1000] flex flex-col shadow-2xl"
              style={{ left: 'auto', right: 0 }}
            >
              <div className="flex-1 flex flex-col p-6 md:p-10">
                
                {/* Header Section - Underline Hatadi hai */}
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 style={{ fontFamily: 'Swiss, sans-serif' }} className="text-[#8f645e] uppercase tracking-[0.3em] font-bold text-[14px]">
                      Your Bag
                    </h3>
                    {/* Yahan se line delete kardi */}
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="p-1 hover:rotate-90 transition-transform duration-300"
                  >
                    <X size={24} className="text-[#8f645e] opacity-40 hover:opacity-100" />
                  </button>
                </div>

                {/* Empty State Section */}
                <div className="flex-1 flex flex-col items-center justify-center border border-[#f1f0ed] rounded-[20px] bg-white/50 px-6 py-10 shadow-sm">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#f1f0ed]">
                    <ShoppingBag size={20} className="text-[#d3beab]" />
                  </div>
                  
                  <p style={{ fontFamily: 'Gowun Batang, serif' }} className="text-[#8f645e] text-xl mb-4 italic text-center">
                    Your bag is currently empty
                  </p>
                  
                  
                  
                  {/* Shop Now / Continue Shopping Button - Hover Color Fixed */}
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
          <img src="/images/faqbg.webp" alt="Main Banner" className="w-full h-full object-cover block shadow-sm" />
          {!isScrolled && <div className="absolute inset-0 bg-black/15 pointer-events-none" />}
        </div>
      </div>

      {/* 7. REFINED MINIMALIST FAQ SECTION - NO BACKGROUND / NO BORDERS */}
<section className="w-full flex justify-center px-4 md:px-12 py-32 bg-white" style={{ fontFamily: 'Swiss, sans-serif' }}>
  <div className="w-full max-w-[750px]">
    
    <div className="text-center mb-24">
      <p className="text-[10px] uppercase tracking-[0.7em] text-[#d3beab] font-bold mb-6">Common Inquiries</p>
      <h2 className="text-[#67645e] text-3xl md:text-4xl font-light uppercase tracking-[0.1em] leading-tight">
        Frequently Asked <span className="text-[#8f645e]">Questions</span>
      </h2>
      <div className="w-12 h-[1px] bg-[#d3beab] mx-auto mt-8 opacity-40"></div>
    </div>

    <div className="flex flex-col mt-20">
      {[
        { q: "How can I track my order status?", a: "Simply enter your unique Tracking ID in the field above to see the real-time status of your Charmeluna glow essentials." },
        { q: "What is the typical shipping duration?", a: "Standard shipping usually takes 3-5 business days. You will receive a confirmation email once your package is dispatched." },
        { q: "Can I modify my delivery address?", a: "To ensure fast delivery, orders are processed quickly. Please contact our support within 2 hours of ordering for any changes." },
        { q: "Do you offer international shipping?", a: "Currently, we are focusing on providing the best experience locally, but stay tuned as we plan to glow globally soon!" }
      ].map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="overflow-hidden border-none bg-transparent"> {/* Border aur BG remove kar diya */}
            <button 
              onClick={() => setOpenIndex(isOpen ? null : index)}
              // bg-transparent aur outline-none se gray box khatam ho jayega
              className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center cursor-pointer py-10 transition-all duration-500 hover:opacity-70 text-center md:text-left bg-transparent border-none outline-none" 
              style={{ paddingTop: '1px', paddingBottom: '1px' }}
            >
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] text-[#67645e] font-semibold leading-relaxed mb-4 md:mb-0 md:pr-8">
                {faq.q}
              </span>
              <div className="relative flex items-center justify-center w-5 h-5 opacity-40">
                <div className="absolute w-4 h-[1px] bg-[#8f645e]"></div>
                <div className={`absolute w-[1px] h-4 bg-[#8f645e] transition-transform duration-500 ${isOpen ? 'rotate-90 opacity-0' : ''}`}></div>
              </div>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out px-4 text-center md:text-left ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
              style={{ paddingBottom: isOpen ? '40px' : '0px' }}
            >
              <p className="text-[12px] md:text-[13px] leading-[1.8] text-[#8f645e]/80 tracking-[0.05em] uppercase font-medium mx-auto max-w-[600px]">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* Contact Support Footer (WhatsApp) */}
    <div className="mt-24 text-center">
      <p className="text-[10px] text-[#d3beab] tracking-[0.4em] uppercase flex flex-col md:flex-row items-center justify-center gap-4">
        Still have questions? 
        <a 
          href="https://wa.me/923001656789?text=Hello%20Charmeluna%20Support!%20I%20have%20a%20question%20about%20my%20order."
          target="_blank" rel="noopener noreferrer"
          className="text-[#8f645e] border-b border-[#8f645e]/40 cursor-pointer hover:border-[#8f645e] transition-all pb-0.5 font-bold"
        >
          Contact Support
        </a>
      </p>
    </div>
  </div>
</section>

{/* FOOTER SECTION */}
      <footer style={{ 
        backgroundColor: '#eaeaea', 
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