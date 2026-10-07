import { useAppStore } from '../../store/useAppStore'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { useNavigate } from 'react-router-dom'
import { STUDENT_PRICES } from '../../config/plans'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { user, role, studentTier, clubTier, logout } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="font-display text-5xl uppercase tracking-tighter text-[#E6A341] mb-12">Profile</h1>

        {/* Avatar and name */}
        <motion.div
          className="relative p-8 bg-[#F7F4D5] rounded-sm shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-md border border-black/5 transform -rotate-1 shadow-sm"></div>

          {/* Picture frame */}
          <div className="w-32 h-32 bg-white p-2 pb-6 shadow-md transform -rotate-3">
            <div className="w-full h-full bg-[#8C0902] flex items-center justify-center">
              <span className="font-display text-5xl text-[#F7F4D5]">{user?.name?.charAt(0) || '?'}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="font-display text-4xl text-[#210100] truncate">{user?.name}</h2>
            <p className="font-serif italic text-xl text-[#8C0902] truncate mb-2">{user?.email}</p>
            {role === 'club' && (
              <p className="font-mono text-xs uppercase tracking-widest text-[#210100]/60 mt-2">{user?.clubName} Admin</p>
            )}
            <div className="mt-4">
              <Chip variant={role === 'club' ? (clubTier === 'pro' ? 'club-pro' : 'club-free') : studentTier} />
            </div>
          </div>
        </motion.div>

        {/* Subscription info */}
        {role === 'student' && (
          <motion.div
            className="p-8 border border-[#B14A36]/30 rounded-sm bg-[#8C0902]/10 backdrop-blur-sm mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#E6A341] mb-4">Current Plan</p>
            <div className="flex items-center justify-between mb-6">
              <Chip variant={studentTier} />
              <span className="font-serif italic text-2xl text-[#F7F4D5]">
                {studentTier === 'free' ? 'Free forever' : `Rs ${STUDENT_PRICES[studentTier]}/month`}
              </span>
            </div>
            {studentTier !== 'premium' && (
              <Button className="w-full justify-center" onClick={() => navigate('/pricing')}>
                Upgrade plan
              </Button>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => navigate('/pricing')}
            className="w-full text-left px-6 py-4 rounded-sm border border-[#F7F4D5]/20 bg-[#210100] font-serif italic text-xl text-[#F7F4D5] hover:bg-[#F7F4D5]/10 transition-colors"
          >
            View all plans
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-4 rounded-sm border border-[#EE4B3E]/50 bg-[#210100] font-serif italic text-xl text-[#EE4B3E] hover:bg-[#EE4B3E]/10 transition-colors"
          >
            Log out
          </button>
        </motion.div>

        <p className="text-center font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/30 mt-12">
          Demo mode. Use Ctrl+Shift+D to switch roles and tiers.
        </p>
      </div>
    </div>
  )
}
