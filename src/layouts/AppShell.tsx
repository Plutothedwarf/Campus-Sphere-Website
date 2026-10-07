import { NavLink, useNavigate, useLocation, useOutlet } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import type { StudentTier } from '../store/useAppStore'

// Nav items per role
const STUDENT_NAV = [
  { path: '/app/home', label: 'Home' },
  { path: '/app/swap', label: 'Swap' },
  { path: '/app/clubhub', label: 'ClubHub' },
  { path: '/app/profile', label: 'Profile' },
]

const CLUB_NAV = [
  { path: '/app/dashboard', label: 'Dashboard' },
  { path: '/app/events', label: 'Events' },
  { path: '/app/volunteers', label: 'Volunteers' },
  { path: '/app/finance', label: 'Finance' },
  { path: '/app/profile', label: 'Profile' },
]

function TierStamp({ role, studentTier, clubTier }: { role: string; studentTier: StudentTier; clubTier: string }) {
  const label = role === 'club' ? (clubTier === 'pro' ? 'CLUB PRO' : 'CLUB FREE') : studentTier.toUpperCase();
  const isPremium = label.includes('PRO') || label.includes('PREMIUM');
  
  return (
    <div className={`relative font-display text-xs font-black uppercase tracking-widest px-3 py-1 shadow-md transform rotate-[-3deg] ${isPremium ? 'bg-[#8C0902] text-[#F7F4D5]' : 'bg-[#F7F4D5] text-[#210100]'} hover:rotate-0 transition-transform`}>
      {label}
      <div className="absolute inset-0 border border-current opacity-30 m-[2px] pointer-events-none"></div>
    </div>
  )
}

function AvatarBubble({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="w-10 h-10 bg-[#E6A341] border-[3px] border-[#F7F4D5] rounded-full shadow-lg flex items-center justify-center text-[#210100] text-sm font-black font-display transform rotate-6">
      {initials}
    </div>
  )
}

export default function AppShell() {
  const { user, role, studentTier, clubTier, isLoggedIn } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()
  const element = useOutlet()
  const nav = role === 'club' ? CLUB_NAV : STUDENT_NAV

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

  if (!isLoggedIn || !user) return null

  // Determine if current module is Lotus (Swap) or Carnival (ClubHub/Home)
  const isLotus = location.pathname.includes('/swap')
  const bgClass = isLotus ? 'bg-lotus' : 'bg-carnival'
  const textClass = isLotus ? 'text-[#839958]' : 'text-[#E6A341]'
  const borderClass = isLotus ? 'border-[#839958]/30' : 'border-[#E6A341]/30'
  
  // Header uses charcoal-panel for textured aesthetic
  const headerBg = 'charcoal-panel'

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col transition-colors duration-1000`}>
      
      {/* Top bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${headerBg} rounded-none border-b flex items-center px-4 sm:px-6 h-16 gap-3 sm:gap-4 transition-all duration-1000`}>
        {/* Logo sticker */}
        <button onClick={() => navigate('/')} className="flex items-center hover:scale-105 transition-transform mr-1 sm:mr-2 p-1.5 bg-[#F7F4D5] shadow-sm transform -rotate-1 relative group flex-shrink-0">
          <div className="absolute inset-0 border border-[#210100]/20 border-dashed m-1 pointer-events-none"></div>
          <span className="font-display font-black text-[#210100] text-xl sm:text-2xl tracking-tight z-10">Campus</span>
          <span className="font-script text-[#8C0902] text-2xl sm:text-3xl -ml-1 group-hover:rotate-6 transition-transform z-10">sphere</span>
        </button>

        {/* Module context */}
        <div className="hidden md:flex items-center gap-2 text-[#F7F4D5]/30">
          <span className="text-[#F7F4D5]/20">·</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#F7F4D5]/40">
            {location.pathname.includes('/swap') ? 'Campus Swap' :
             location.pathname.includes('/clubhub') ? 'ClubHub' :
             location.pathname.includes('/events') ? 'Events' :
             location.pathname.includes('/volunteers') ? 'Volunteers' :
             location.pathname.includes('/finance') ? 'Finance' :
             location.pathname.includes('/dashboard') ? 'Dashboard' : 'Home'}
          </span>
        </div>

        <div className="flex-1" />

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tier stamp */}
          <div className="hidden sm:block">
            <TierStamp role={role} studentTier={studentTier} clubTier={clubTier} />
          </div>

          {/* User info */}
          <div className="hidden md:flex flex-col items-end">
            <span className="font-display text-sm text-[#F7F4D5] leading-tight truncate max-w-[120px]">{user.name}</span>
            <span className="font-mono text-[10px] text-[#F7F4D5]/40 uppercase tracking-widest leading-tight">{role === 'club' ? user.clubName || 'Club' : 'Student'}</span>
          </div>

          {/* Avatar */}
          <AvatarBubble name={user.name} />
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar - laptop */}
        <aside className={`hidden lg:flex flex-col w-64 fixed left-0 top-16 bottom-0 ${headerBg} rounded-none border-r z-30 py-8 px-6 gap-6 transition-all duration-1000`}>
          
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => [
                'relative font-display text-2xl uppercase tracking-wider py-4 px-6 transition-all',
                isActive
                  ? `bg-[#F7F4D5] text-[#210100] font-bold transform rotate-1 shadow-[var(--shadow-soft)]`
                  : `${textClass} hover:text-[#F7F4D5] hover:bg-black/20 font-bold rounded-sm`,
              ].join(' ')}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <div className="absolute -top-1 -left-2 w-8 h-3 bg-[#F7F4D5]/80 backdrop-blur-sm transform -rotate-3 mix-blend-overlay"></div>
                  )}
                  {isActive && (
                    <div className="absolute -bottom-1 -right-2 w-8 h-3 bg-[#F7F4D5]/80 backdrop-blur-sm transform rotate-2 mix-blend-overlay"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 pb-20 lg:pb-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-8 max-w-7xl mx-auto"
            >
              {element}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom tab bar - mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-transparent flex lg:hidden items-end px-2 gap-1 pb-2 pointer-events-none">
        {nav.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => [
              'flex-1 flex flex-col items-center justify-center py-3 text-xs font-mono font-bold uppercase tracking-widest rounded-t-xl transition-all pointer-events-auto border-t border-x border-white/10',
              isActive 
                ? 'bg-[#F7F4D5] text-[#210100] h-16 shadow-[var(--shadow-soft)]' 
                : `bg-[#210100]/40 backdrop-blur-xl ${textClass} h-12 hover:bg-black/60`,
            ].join(' ')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
