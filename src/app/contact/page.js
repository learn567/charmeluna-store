"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/20 z-[999] backdrop-blur-[2px]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#fef8fc] z-[1000] flex flex-col shadow-2xl">
              <div className="flex-1 flex flex-col p-6 md:p-10">
                <div className="flex justify-between items-start mb-12">
                  <div><h3 style={{ fontFamily: 'Swiss, sans-serif' }} className="text-[#8f645e] uppercase tracking-[0.3em] font-bold text-[14px]">Your Bag</h3></div>
                  <button onClick={() => setIsCartOpen(false)} className="p-1 hover:rotate-90 transition-transform duration-300"><X size={24} className="text-[#8f645e] opacity-40 hover:opacity-100" /></button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border border-[#f1f0ed] rounded-[20px] bg-white/50 px-6 py-10 shadow-sm">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#f1f0ed]"><ShoppingBag size={20} className="text-[#d3beab]" /></div>
                  <p style={{ fontFamily: 'Gowun Batang, serif' }} className="text-[#8f645e] text-xl mb-4 italic text-center">Your bag is currently empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="w-full max-w-[240px] py-4 border border-[#67645e] text-[#8f645e] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#67645e] hover:text-[#ffffff] transition-colors duration-300 rounded-full">Shop Now</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MAIN BANNER */}
      <div className="w-full flex justify-center px-4 md:px-12 mt-1 md:mt-2">
        <div className="relative overflow-hidden rounded-[8px] md:rounded-[10px] mx-auto" style={{ height: isMobile ? "200px" : "570px", width: isMobile ? "95%" : "100%", maxWidth: "1280px" }}>
          <img src="/images/contactpage.webp" alt="Main Banner" className="w-full h-full object-cover block shadow-sm" />
          {!isScrolled && <div className="absolute inset-0 bg-black/15 pointer-events-none" />}
        </div>
      </div>

      {/*  CONTACT SECTION */}
      <section style={{ paddingTop: isMobile ? "120px" : "160px", paddingBottom: "100px", background: "radial-gradient(circle at top right, #fef8fc, #ffffff)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1.8fr", gap: "40px", backgroundColor: "#fff", borderRadius: "30px", boxShadow: "0 25px 50px -12px rgba(103, 94, 94, 0.08)", overflow: "hidden", border: "1px solid #f1f0ed" }}>
            
            <div style={{ backgroundColor: "#67645e", padding: isMobile ? "40px 30px" : "60px", color: "#f1f0ed", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontFamily: '"Gowun Batang", serif', fontSize: "36px", marginBottom: "20px" }}>Let’s Connect</h2>
                <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: "14px", opacity: 0.8, lineHeight: "1.8", marginBottom: "40px" }}>Have questions about our skincare or makeup collection? Our beauty experts are here to help you shine.</p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px" }}><Mail size={20} /></div>
                    <div>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.1em" }}>Mail to us</p>
                      <a href="mailto:charmeluna.ceo@gmail.com" style={{ fontSize: "16px", fontWeight: "600", color: "#f1f0ed", textDecoration: "none" }} className="hover:underline">charmeluna.ceo@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px" }}><MessageCircle size={20} /></div>
                    <div>
                      <p style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.1em" }}>Talk to us</p>
                      <a href={`https://wa.me/923001656789?text=${encodeURIComponent("Hello Charme Luna Team, I have an inquiry about your products.")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "16px", fontWeight: "600", color: "#f1f0ed", textDecoration: "none" }} className="hover:underline">+92 300 1656789</a>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.1)" }}><p style={{ fontSize: "12px", opacity: 0.6 }}>Follow our journey on Instagram @charmeluna</p></div>
            </div>

           
            <div style={{ padding: isMobile ? "40px 25px" : "60px", backgroundColor: "#ffffff" }}>
              <h3 style={{ fontFamily: '"Gowun Batang", serif', fontSize: "24px", color: "#67645e", marginBottom: "30px" }}>Send a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#67645e", textTransform: "uppercase" }}>Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="Jane Doe" style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "1px solid #f1f0ed", backgroundColor: "#f1f0ed", outline: "none", fontSize: "14px" }} />
                  </div>
                  <div className="space-y-2">
                    <label style={{ fontSize: "11px", fontWeight: "700", color: "#67645e", textTransform: "uppercase" }}>Email</label>
                    <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="jane@example.com" style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "1px solid #f1f0ed", backgroundColor: "#f1f0ed", outline: "none", fontSize: "14px" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label style={{ fontSize: "11px", fontWeight: "700", color: "#67645e", textTransform: "uppercase" }}>Message</label>
                  <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="4" placeholder="How can we help you today?" style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "1px solid #f1f0ed", backgroundColor: "#f1f0ed", outline: "none", fontSize: "14px", resize: "none" }}></textarea>
                </div>

                {status === "success" && <p className="text-green-600 text-sm font-semibold">Message sent successfully!</p>}
                {status === "error" && <p className="text-red-600 text-sm font-semibold">Something went wrong. Try again.</p>}

                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} style={{ width: "100%", padding: "18px", backgroundColor: "#67645e", color: "#ffffff", borderRadius: "12px", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "10px", boxShadow: "0 10px 20px rgba(103, 100, 94, 0.2)", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Sending..." : "Send Inquiry"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}