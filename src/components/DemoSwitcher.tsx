import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import type { StudentTier, Role } from '../store/useAppStore'
import { Chip } from '../components/Chip'

const ROUTES = [
  { label: 'Landing', path: '/' },
  { label: 'Login (Student)', path: '/login?role=student' },
  { label: 'Login (Club)', path: '/login?role=club' },
  { label: 'Home', path: '/app/home' },
  { label: 'Swap', path: '/app/swap' },
  { label: 'ClubHub', path: '/app/clubhub' },
  { label: 'Profile', path: '/app/profile' },
  { label: 'Dashboard', path: '/app/dashboard' },
  { label: 'Events', path: '/app/events' },
  { label: 'Volunteers', path: '/app/volunteers' },
  { label: 'Finance', path: '/app/finance' },
  { label: 'Pricing', path: '/pricing' },
]

export default function DemoSwitcher() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {
    role, studentTier, clubTier, user,
    setStudentTier, setClubTier, setRole,
    resetDemoData, login, logout,
  } = useAppStore()

  // Keyboard shortcut: Ctrl+Shift+D
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault()
      setOpen(o => !o)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const switchRole = (newRole: Role) => {
    setRole(newRole)
    if (!user) {
      login(
        { name: 'Demo User', email: `demo@somaiya.edu`, avatarSeed: 'demo', clubId: 'debate', clubName: 'Debate Society' },
        newRole
      )
    }
    navigate(newRole === 'club' ? '/app/dashboard' : '/app/home')
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-4 lg:bottom-6 z-[90] w-12 h-12 rounded-full bg-[#E6A341] border border-[#210100] text-[#210100] font-bold text-lg flex items-center justify-center magnetic-btn shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        title="Demo Settings (Ctrl+Shift+D)"
      >
        ⚙️
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[88]"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed bottom-40 right-4 lg:bottom-20 z-[89] w-72 paper-panel overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            >
              {/* Header */}
              <div className="bg-[#210100] px-4 py-3 flex items-center justify-between border-b border-[#E6A341]/20">
                <span className="font-mono font-bold text-[#F7F4D5] text-sm uppercase tracking-widest">Demo Switcher</span>
                <kbd className="text-[10px] bg-[#E6A341] text-[#210100] px-2 py-0.5 rounded font-mono font-bold">Ctrl+Shift+D</kbd>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* Role switcher */}
                <div>
                  <p className="text-[#210100]/60 text-[10px] uppercase tracking-widest mb-2 font-mono font-bold">Role</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => switchRole('student')}
                      className={`flex-1 py-2 rounded-sm text-xs font-mono font-bold border transition-all uppercase tracking-wider ${role === 'student' ? 'bg-[#210100] text-[#F7F4D5] border-[#210100]' : 'bg-transparent text-[#210100] border-[#210100]/20 hover:bg-[#210100]/5'}`}
                    >
                      Student
                    </button>
                    <button
                      onClick={() => switchRole('club')}
                      className={`flex-1 py-2 rounded-sm text-xs font-mono font-bold border transition-all uppercase tracking-wider ${role === 'club' ? 'bg-[#8C0902] text-[#F7F4D5] border-[#8C0902]' : 'bg-transparent text-[#210100] border-[#210100]/20 hover:bg-[#210100]/5'}`}
                    >
                      Club
                    </button>
                  </div>
                </div>

                {/* Student tier */}
                {role === 'student' && (
                  <div>
                    <p className="text-[#210100]/60 text-[10px] uppercase tracking-widest mb-2 font-mono font-bold">Student Tier</p>
                    <div className="flex gap-2">
                      {(['free', 'freemium', 'premium'] as StudentTier[]).map(t => (
                        <button
                          key={t}
                          onClick={() => setStudentTier(t)}
                          className={`flex-1 py-1.5 rounded-sm text-[10px] font-mono font-bold border transition-all uppercase tracking-wider ${studentTier === t ? 'bg-[#210100] text-[#F7F4D5] border-[#210100]' : 'bg-transparent text-[#210100] border-[#210100]/20 hover:bg-[#210100]/5'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Club tier */}
                {role === 'club' && (
                  <div>
                    <p className="text-[#210100]/60 text-[10px] uppercase tracking-widest mb-2 font-mono font-bold">Club Tier</p>
                    <div className="flex gap-2">
                      {(['free', 'pro']).map(t => (
                        <button
                          key={t}
                          onClick={() => setClubTier(t as 'free' | 'pro')}
                          className={`flex-1 py-1.5 rounded-sm text-[10px] font-mono font-bold border transition-all uppercase tracking-wider ${clubTier === t ? 'bg-[#8C0902] text-[#F7F4D5] border-[#8C0902]' : 'bg-transparent text-[#210100] border-[#210100]/20 hover:bg-[#210100]/5'}`}
                        >
                          {t === 'pro' ? 'Pro' : 'Free'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current state */}
                <div className="bg-[#210100]/5 rounded-sm p-3 border border-[#210100]/10 flex items-center gap-2">
                  <Chip variant={role === 'club' ? (clubTier === 'pro' ? 'club-pro' : 'club-free') : studentTier} />
                  <span className="text-[#210100]/70 text-xs font-mono font-bold flex-1 truncate">{user?.email || 'Not logged in'}</span>
                </div>

                {/* Jump to route */}
                <div>
                  <p className="text-[#210100]/60 text-[10px] uppercase tracking-widest mb-2 font-mono font-bold">Jump to</p>
                  <div className="max-h-32 overflow-y-auto flex flex-col gap-1 pr-2">
                    {ROUTES.map(r => (
                      <button
                        key={r.path}
                        onClick={() => { navigate(r.path); setOpen(false) }}
                        className="text-left text-xs text-[#210100] font-bold font-mono px-2 py-1.5 rounded-sm hover:bg-[#210100]/10 transition-all uppercase tracking-wider"
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 mt-1 border-t border-[#210100]/10">
                  <button
                    onClick={() => { resetDemoData(); }}
                    className="flex-1 text-[10px] font-bold font-mono uppercase tracking-widest text-[#210100]/60 hover:text-[#210100] transition-colors py-2 border border-[#210100]/20 rounded-sm hover:bg-[#210100]/5"
                  >
                    Reset data
                  </button>
                  <button
                    onClick={() => { logout(); navigate('/'); setOpen(false) }}
                    className="flex-1 text-[10px] font-bold font-mono uppercase tracking-widest text-[#8C0902] hover:text-[#210100] transition-colors py-2 border border-[#8C0902]/30 rounded-sm hover:bg-[#8C0902]/10"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

