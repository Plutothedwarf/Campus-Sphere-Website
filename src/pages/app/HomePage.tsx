// HomePage
import { useAppStore } from '../../store/useAppStore'
import { Chip } from '../../components/Chip'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { user, role, studentTier, clubTier } = useAppStore()
  const navigate = useNavigate()

  const tier = role === 'club' ? clubTier : studentTier
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>



      <div className="max-w-6xl mx-auto relative z-10">
        {/* Greeting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b-2 border-[#E6A341]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 relative"
        >
          <div className="flex-1 relative z-10 w-full overflow-hidden">
            <p className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-2">{greeting},</p>
            <h1 className="font-display text-5xl sm:text-7xl md:text-9xl text-[#F7F4D5] uppercase tracking-tighter mix-blend-difference drop-shadow-lg leading-none break-words w-full">
              {user?.name}
            </h1>
            {role === 'club' && <p className="font-serif italic text-3xl sm:text-4xl text-[#E6A341] mt-4">{user?.clubName} Admin</p>}
          </div>
          <div className="relative z-10 self-start md:self-end">
            <Chip variant={role === 'club' ? (tier === 'pro' ? 'club-pro' : 'club-free') : tier as any} />
          </div>
        </motion.div>

        {/* Mascot / Welcome message replaced by physical paper note */}
        <motion.div
          className="relative max-w-2xl mb-20"
          initial={{ y: 30, opacity: 0, rotate: -2 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          {/* Tape strip */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/20 backdrop-blur-md rotate-[-4deg] z-20 shadow-sm mix-blend-screen"></div>
          
          <div className="p-10 md:p-14 paper-panel relative">
            <h2 className="font-display text-5xl md:text-6xl text-[#8C0902] uppercase tracking-tighter mb-4 leading-none">
              {role === 'club' ? 'Run your club from here.' : 'Your campus, connected.'}
            </h2>
            <p className="font-serif italic text-2xl md:text-3xl text-[#210100]/80 leading-snug">
              {role === 'club'
                ? 'Create events, manage volunteers and track everything across your organization.'
                : 'List stuff, browse listings, RSVP to events and volunteer.'}
            </p>
          </div>
        </motion.div>

        {/* Quick actions (Scrapbook style cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-16 relative">
          
          <motion.button
            className="group relative h-[400px] w-full text-left"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/app/swap')}
          >
            {/* Base card */}
            <div className="absolute inset-0 bg-[#0A3323] border border-[#839958]/30 rounded-2xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-soft-hover)] transition-all duration-300">
              <div className="p-6 sm:p-10 flex flex-col h-full justify-between relative z-10">
                <div>
                  <h3 className="font-display text-4xl sm:text-6xl text-[#839958] uppercase tracking-tighter drop-shadow-md">Campus Swap</h3>
                  <p className="font-serif italic text-2xl sm:text-3xl text-[#D3968C] mt-2">Buy, sell and rent</p>
                </div>
                <div className="font-mono text-sm uppercase tracking-widest text-[#F7F4D5]/50 border-t border-[#839958]/30 pt-4">
                  Enter marketplace →
                </div>
              </div>
            </div>

          </motion.button>

          <motion.button
            className="group relative h-[400px] w-full text-left"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/app/clubhub')}
          >
            {/* Base card */}
            <div className="absolute inset-0 bg-[#8C0902] border border-[#E6A341]/30 rounded-2xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-soft-hover)] transition-all duration-300">
              <div className="p-6 sm:p-10 flex flex-col h-full justify-between relative z-10">
                <div>
                  <h3 className="font-display text-5xl sm:text-6xl text-[#F7F4D5] uppercase tracking-tighter drop-shadow-md">ClubHub</h3>
                  <p className="font-serif italic text-2xl sm:text-3xl text-[#E6A341] mt-2">Events and volunteer</p>
                </div>
                <div className="font-mono text-sm uppercase tracking-widest text-[#F7F4D5]/50 border-t border-[#E6A341]/30 pt-4">
                  Explore events →
                </div>
              </div>
            </div>

          </motion.button>

        </div>

        {/* Upgrade prompt for free tier */}
        {(tier === 'free') && (
          <motion.div
            className="paper-panel bg-white/5 backdrop-blur-sm p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <p className="font-display text-4xl text-[#E6A341] mb-2 uppercase tracking-tighter">You are on the free tier</p>
              <p className="font-serif italic text-2xl text-[#F7F4D5]/70">Upgrade to get more requests, categories and certificates.</p>
            </div>
            <Button size="lg" onClick={() => navigate('/pricing')}>Upgrade</Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
