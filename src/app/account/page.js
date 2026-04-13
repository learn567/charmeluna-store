"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#fef8fc] flex flex-col items-center justify-center px-4">
      {/* Logo Link (Back to Home) */}
      <Link href="/" className="mb-10 no-underline">
         <h1 style={{ fontFamily: '"Gowun Batang", serif', fontSize: '40px', color: '#67645e', letterSpacing: '0.2em' }}>
           CL
         </h1>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-white p-10 rounded-[20px] shadow-sm border border-[#f1f0ed]"
      >
        <h2 style={{ fontFamily: 'Swiss, sans-serif', fontSize: '18px', fontWeight: '700' }} className="text-[#67645e] uppercase tracking-widest text-center mb-8">
          Login to Charmeluna
        </h2>

        <form className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full border-b border-[#f1f0ed] py-3 text-[14px] outline-none focus:border-[#d3beab] transition-all bg-transparent"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full border-b border-[#f1f0ed] py-3 text-[14px] outline-none focus:border-[#d3beab] transition-all bg-transparent"
          />
          
          <button 
            type="submit"
            className="mt-6 w-full py-4 bg-[#67645e] text-white rounded-full uppercase text-[12px] font-bold tracking-widest hover:bg-black transition-all shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[12px] text-[#67645e]/60 uppercase tracking-tighter">
            Don't have an account?
          </p>
          <Link href="/register" className="text-[12px] text-[#67645e] font-bold uppercase tracking-widest hover:underline">
            Create Account
          </Link>
        </div>
      </motion.div>

      {/* Back to Shop link */}
      <Link href="/shop" className="mt-10 text-[11px] text-[#67645e]/50 uppercase tracking-[0.3em] hover:text-[#67645e]">
        ← Back to Shop
      </Link>
    </main>
  );
}