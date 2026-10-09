import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../components/Button'
const PRICING_PREVIEW = [
  { label: 'Student Free', price: 'Rs 0', chip: 'free' as const, features: ['5 buy requests/month', '1 category in Swap', '3 active listings', 'Calendar + basic volunteer'] },
  { label: 'Student Freemium', price: 'Rs 99/mo', chip: 'freemium' as const, features: ['5 buy requests/month', 'All categories in Swap', 'Unlimited listings', 'Profile preferences'] },
  { label: 'Student Premium', price: 'Rs 199/mo', chip: 'premium' as const, features: ['Unlimited requests', 'Verified seller badge', 'Digital certificates', 'No convenience fee'] },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div ref={scrollRef} className="min-h-screen bg-carnival overflow-x-hidden text-[#F7F4D5]">

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#210100] via-[#3A0A05] to-[#210100]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
        
        {/* Soft glowing ambient lights behind text */}
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#8C0902]/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#E6A341]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Floating decorative accents */}
        <motion.div className="absolute top-[15%] left-[5%] pointer-events-none hidden sm:block"
          animate={{ y: [0, -10, 0], rotate: [-14, -12, -14] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-14 h-14 bg-[#F7F4D5]/10 border border-[#F7F4D5]/20 backdrop-blur-sm flex items-center justify-center">
            <span className="font-mono text-[8px] uppercase text-[#E6A341] tracking-widest text-center leading-tight">01</span>
          </div>
        </motion.div>

        <motion.div className="absolute top-[18%] right-[7%] pointer-events-none hidden sm:block"
          animate={{ y: [0, 12, 0], rotate: [10, 13, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="font-display text-6xl text-[#E6A341]/15 uppercase leading-none select-none">K.J.</div>
        </motion.div>

        <motion.div className="absolute bottom-[28%] right-[6%] pointer-events-none hidden sm:block"
          animate={{ y: [0, -8, 0], rotate: [-8, -5, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="w-10 h-10 border-2 border-[#E6A341]/20 rotate-45" />
        </motion.div>

        <motion.div className="absolute bottom-[25%] left-[7%] pointer-events-none hidden md:block"
          animate={{ y: [0, 8, 0], rotate: [6, 9, 6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <div className="font-serif italic text-[#F7F4D5]/10 text-3xl select-none">2026</div>
        </motion.div>

        {/* Brand */}
        <motion.div
          className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <h1 className="font-display text-[15vw] sm:text-[12vw] leading-[0.8] tracking-[-0.04em] uppercase text-[#F7F4D5] mix-blend-difference drop-shadow-2xl">
              Campus
            </h1>
            <span className="font-script text-[18vw] sm:text-[14vw] leading-none absolute -bottom-4 sm:-bottom-12 -right-1 sm:-right-12 text-[#E6A341] -rotate-6 drop-shadow-2xl block">
              sphere
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-serif italic text-base sm:text-2xl text-[#F7F4D5]/50 mt-20 sm:mt-32 tracking-wide"
          >
            Everything on campus, in one place.
          </motion.p>
        </motion.div>

        {/* Ticket cards - properly spaced, never overlap on mobile */}
        <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 z-30 px-4">
          <div className="flex flex-row items-end justify-center gap-4 sm:gap-16">
            <motion.button
              initial={{ y: 120, rotate: -15, opacity: 0 }}
              animate={{ y: 0, rotate: -5, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 18 }}
              whileHover={{ scale: 1.06, rotate: -2 }}
              onClick={() => navigate('/login?role=student')}
              className="pointer-events-auto bg-[#F7F4D5] text-[#210100] cursor-pointer shadow-2xl rounded-lg border-2 border-dashed border-[#210100]/30 flex flex-col justify-between"
              style={{ padding: '14px 16px', width: 'clamp(130px, 38vw, 220px)', height: 'clamp(180px, 50vw, 300px)' }}
            >
              <div className="font-mono uppercase tracking-widest text-center border-b border-[#210100]/20 pb-2" style={{ fontSize: 'clamp(7px, 2.2vw, 11px)' }}>
                Admit One
              </div>
              <div className="text-center py-2">
                <div className="font-display uppercase leading-none" style={{ fontSize: 'clamp(22px, 7vw, 44px)' }}>Student</div>
                <div className="font-serif italic text-[#8C0902] mt-1" style={{ fontSize: 'clamp(13px, 4vw, 22px)' }}>Access</div>
              </div>
              <div className="font-mono text-center border-t border-[#210100]/20 pt-2" style={{ fontSize: 'clamp(7px, 2.2vw, 10px)' }}>
                No. 000001
              </div>
            </motion.button>

            <motion.button
              initial={{ y: 120, rotate: 15, opacity: 0 }}
              animate={{ y: 0, rotate: 7, opacity: 1 }}
              transition={{ delay: 0.65, type: 'spring', stiffness: 100, damping: 18 }}
              whileHover={{ scale: 1.06, rotate: 3 }}
              onClick={() => navigate('/login?role=club')}
              className="pointer-events-auto bg-[#F7F4D5] text-[#210100] cursor-pointer shadow-2xl rounded-lg border-2 border-dashed border-[#210100]/30 flex flex-col justify-between"
              style={{ padding: '14px 16px', width: 'clamp(130px, 38vw, 220px)', height: 'clamp(180px, 50vw, 300px)' }}
            >
              <div className="font-mono uppercase tracking-widest text-center border-b border-[#210100]/20 pb-2" style={{ fontSize: 'clamp(7px, 2.2vw, 11px)' }}>
                Admit One
              </div>
              <div className="text-center py-2">
                <div className="font-display uppercase leading-none" style={{ fontSize: 'clamp(22px, 7vw, 44px)' }}>Club</div>
                <div className="font-serif italic text-[#8C0902] mt-1" style={{ fontSize: 'clamp(13px, 4vw, 22px)' }}>Admin</div>
              </div>
              <div className="font-mono text-center border-t border-[#210100]/20 pt-2" style={{ fontSize: 'clamp(7px, 2.2vw, 10px)' }}>
                No. 000002
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-[#210100] border-y border-[#E6A341]/20 overflow-hidden py-2.5">
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {['Campus Swap', 'ClubHub', 'Events', 'Volunteer', 'Marketplace', 'Connect', 'RSVP', 'Certificates',
            'Campus Swap', 'ClubHub', 'Events', 'Volunteer', 'Marketplace', 'Connect', 'RSVP', 'Certificates'].map((item, i) => (
            <span key={i} className="font-display uppercase text-lg tracking-widest text-[#F7F4D5]/25 flex-shrink-0">
              {item} <span className="text-[#E6A341]/40 mx-2">*</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* SWAP SECTION */}
      <section className="bg-[#0A3323] py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
        <motion.div style={{ y: y1 }} className="absolute -top-24 -right-24 w-96 h-96 bg-[#839958]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-8 right-8 font-display text-[10rem] leading-none text-[#F7F4D5]/[0.03] pointer-events-none select-none hidden lg:block">01</div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center"
        >
          <div className="space-y-5 z-10 order-2 md:order-1">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#839958]/60">Module 01</div>
            <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-tighter text-[#839958] leading-none">Campus<br/>Swap</h2>
            <p className="font-serif text-xl sm:text-2xl italic text-[#D3968C] leading-tight max-w-sm">
              Buy, sell and rent stuff with people who actually live 5 minutes away.
            </p>
            <p className="font-body text-base text-[#F7F4D5]/70 max-w-sm">
              Textbooks, calculators, lab coats, bicycles. Keep it on campus.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login?role=student')}
              className="font-display uppercase tracking-widest text-sm bg-[#839958] text-[#0A3323] px-8 py-3 mt-2 inline-block cursor-pointer"
            >
              Browse Swap
            </motion.button>
          </div>

          <div className="relative h-80 sm:h-[500px] order-1 md:order-2 w-full">
            {/* Hand-drawn scribble accent */}
            <motion.svg className="absolute -top-10 right-10 w-24 h-24 text-[#E6A341]/40 hidden sm:block pointer-events-none" viewBox="0 0 100 100" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}>
              <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M70,30 L90,50 L70,70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>

            {/* Note tag */}
            <motion.div 
              initial={{ opacity: 0, rotate: 15 }} whileInView={{ opacity: 1, rotate: -5 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-0 right-[10%] sm:right-1/4 bg-[#D3968C] px-3 py-1 font-mono text-[10px] text-[#210100] uppercase tracking-widest shadow-lg z-30 transform-origin-top-right rotate-12"
            >
              $15 only
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -12, x: -30, y: 30 }}
              whileInView={{ opacity: 1, rotate: -8, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: -3, zIndex: 30 }}
              className="absolute top-10 left-4 sm:top-12 sm:left-4 bg-[#F7F4D5] p-3 sm:p-4 pb-8 sm:pb-12 shadow-2xl group"
              style={{ width: 'clamp(140px, 35vw, 220px)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm rotate-2 mix-blend-overlay shadow-sm" />
              <div className="aspect-square bg-[#0A3323] overflow-hidden mb-2 sm:mb-4">
                <img src="/images/swap/img1.jpg" alt="Math Book" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply group-hover:mix-blend-normal" />
              </div>
              <div className="font-handwriting text-[#210100] text-lg sm:text-2xl text-center">Math 101 Book</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 12, x: 30, y: 40 }}
              whileInView={{ opacity: 1, rotate: 14, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileHover={{ scale: 1.05, rotate: 6, zIndex: 30 }}
              className="absolute top-24 right-4 sm:top-20 sm:right-8 bg-[#F7F4D5] p-3 sm:p-4 pb-8 sm:pb-12 shadow-2xl group"
              style={{ width: 'clamp(140px, 35vw, 220px)' }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-white/40 backdrop-blur-sm -rotate-4 mix-blend-overlay shadow-sm" />
              <div className="aspect-square bg-[#E6A341]/20 overflow-hidden mb-2 sm:mb-4">
                <img src="/images/swap/img3.jpg" alt="Lab Coat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply group-hover:mix-blend-normal" />
              </div>
              <div className="font-handwriting text-[#210100] text-lg sm:text-2xl text-center">Lab Coat (M)</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -2, y: 60 }}
              whileInView={{ opacity: 1, rotate: 2, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-12 sm:left-[45%] sm:-translate-x-1/2 bg-[#F7F4D5] p-3 sm:p-4 pb-8 sm:pb-12 shadow-2xl group"
              style={{ width: 'clamp(140px, 35vw, 220px)' }}
            >
              <div className="absolute -top-3 left-[20%] w-20 h-5 bg-white/50 backdrop-blur-md rotate-1 mix-blend-overlay shadow-sm" />
              <div className="aspect-square bg-[#D3968C]/30 overflow-hidden mb-2 sm:mb-4">
                <img src="/images/swap/img2.jpg" alt="Calculator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply group-hover:mix-blend-normal" />
              </div>
              <div className="font-handwriting text-[#210100] text-lg sm:text-2xl text-center">Casio Calc</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#E6A341]/20 to-transparent" />

      {/* CLUBHUB SECTION */}
      <section className="bg-[#210100] py-24 sm:py-32 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
        <motion.div style={{ y: y2 }} className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8C0902]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-8 left-8 font-display text-[10rem] leading-none text-[#F7F4D5]/[0.02] pointer-events-none select-none hidden lg:block">02</div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center"
        >
          <div className="order-2 md:order-1 relative h-80 sm:h-[450px] w-full flex items-center justify-center">
            
            {/* Background poster (dark red) */}
            <motion.div
              initial={{ opacity: 0, rotate: 12, x: 20 }}
              whileInView={{ opacity: 1, rotate: 8, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, rotate: 10, zIndex: 10 }}
              className="absolute right-[5%] top-[10%] sm:right-[15%] sm:top-[5%] bg-[#8C0902] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.5)] z-0"
              style={{ width: 'clamp(160px, 45vw, 240px)', height: 'clamp(200px, 55vw, 280px)' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-black/20 rounded-full blur-md" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E6A341] shadow-inner" />
              <div className="font-display uppercase text-3xl text-[#F7F4D5] leading-none mt-4 mix-blend-overlay">Debate<br/>Club</div>
              <div className="font-serif italic text-[#F7F4D5]/60 mt-2">Tryouts 2026</div>
            </motion.div>

            {/* Small ticket/flyer */}
            <motion.div
              initial={{ opacity: 0, rotate: -25, x: -40 }}
              whileInView={{ opacity: 1, rotate: -18, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: -15, zIndex: 20 }}
              className="absolute left-[5%] bottom-[15%] sm:left-[10%] sm:bottom-[20%] bg-[#E6A341] p-3 sm:p-4 shadow-xl z-10"
              style={{ width: 'clamp(120px, 30vw, 160px)' }}
            >
              <div className="font-mono text-[8px] uppercase tracking-widest text-[#210100]/60 border-b border-[#210100]/20 pb-1 mb-2">Volunteer</div>
              <div className="font-handwriting text-[#210100] text-xl leading-none mb-1">Beach Cleanup</div>
              <div className="font-mono text-[9px] text-[#8C0902]">Need 20 hrs</div>
            </motion.div>

            {/* Main Poster */}
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 30 }}
              whileInView={{ opacity: 1, rotate: -3, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.04, rotate: -1, zIndex: 30 }}
              className="relative bg-[#F7F4D5] p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-20 mx-auto"
              style={{ width: 'clamp(200px, 60vw, 320px)' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E6A341]/40 backdrop-blur-sm rotate-2 mix-blend-multiply" />
              <div className="absolute -top-3 left-[40%] -translate-x-1/2 w-20 h-5 bg-white/40 backdrop-blur-sm -rotate-3 mix-blend-screen" />
              <div className="w-full h-24 sm:h-36 border-2 border-dashed border-[#B14A36]/30 flex flex-col items-center justify-center mb-4 sm:mb-6 bg-[#B14A36]/5">
                <span className="font-mono text-[10px] text-[#B14A36]/60 uppercase tracking-widest mb-2">Main Event</span>
                <span className="font-serif italic text-2xl text-[#8C0902]/40">Poster Space</span>
              </div>
              <div className="font-display uppercase text-2xl sm:text-4xl text-[#210100] leading-none mb-1 tracking-tighter">Tech Symposium</div>
              <div className="font-mono text-[11px] text-[#8C0902] mb-3">Oct 24 · CS Department</div>
              <div className="mt-4 flex items-center gap-2 border-t border-[#210100]/10 pt-4">
                <div className="w-2 h-2 rounded-full bg-[#839958] animate-pulse" />
                <span className="font-mono text-[10px] text-[#839958] uppercase tracking-widest font-bold">142 attending</span>
              </div>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 space-y-5 z-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#E6A341]/60">Module 02</div>
            <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-tighter text-[#E6A341] leading-none">Club<br/>Hub</h2>
            <p className="font-serif text-xl sm:text-2xl italic text-[#B14A36] leading-tight max-w-sm">
              Every event, every club, every volunteer slot in one place.
            </p>
            <p className="font-body text-base text-[#F7F4D5]/70 max-w-sm">
              RSVP in two taps. Get your digital certificate on the way out.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login?role=student')}
              className="font-display uppercase tracking-widest text-sm bg-[#E6A341] text-[#210100] px-8 py-3 mt-2 inline-block cursor-pointer"
            >
              Explore Events
            </motion.button>
          </div>
        </motion.div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#839958]/20 to-transparent" />

      {/* PRICING SECTION */}
      <section className="bg-[#F7F4D5] py-24 sm:py-32 px-4 sm:px-8 text-[#210100] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#8C0902]/60 mb-3">Plans</div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tighter">Pricing that makes sense</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            {PRICING_PREVIEW.map((plan, i) => (
              <motion.div
                key={plan.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-6 sm:p-8 border border-[#210100]/10 shadow-[0_16px_40px_rgba(33,1,0,0.08)] relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 border-2 border-[#8C0902] text-[#8C0902] font-mono font-bold text-[10px] px-2 py-0.5 rotate-12 opacity-80">
                  {plan.chip.toUpperCase()}
                </div>
                <div className="font-mono text-[11px] text-[#8C0902]/60 mb-3 uppercase tracking-widest">Plan 0{i + 1}</div>
                <div className="font-display text-3xl sm:text-4xl mb-5">{plan.price}</div>
                <ul className="space-y-2.5 mb-6 sm:mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="font-body text-sm border-b border-dashed border-[#210100]/15 pb-2 flex items-start gap-2">
                      <span className="text-[#839958] font-black flex-shrink-0 mt-0.5">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => navigate(i === 0 ? '/login?role=student' : '/pricing')}
                >
                  {i === 0 ? 'Start Free' : 'Choose Plan'}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#210100] py-12 sm:py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-script text-5xl sm:text-6xl text-[#E6A341] mb-4 relative z-10"
        >
          Campusphere
        </motion.h2>
        <p className="font-mono text-xs text-[#F7F4D5]/30 uppercase tracking-widest relative z-10">
          A college presentation demo · K.J. Somaiya
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 relative z-10">
          <button onClick={() => navigate('/login?role=student')} className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/40 hover:text-[#E6A341] transition-colors">Student Login</button>
          <span className="text-[#F7F4D5]/20 hidden sm:inline">·</span>
          <button onClick={() => navigate('/login?role=club')} className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/40 hover:text-[#E6A341] transition-colors">Club Login</button>
          <span className="text-[#F7F4D5]/20 hidden sm:inline">·</span>
          <button onClick={() => navigate('/pricing')} className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/40 hover:text-[#E6A341] transition-colors">Pricing</button>
        </div>
      </footer>
    </div>
  )
}
