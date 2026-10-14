// HomePage
import { useAppStore } from '../../store/useAppStore'
import { Chip } from '../../components/Chip'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { CLUBHUB_STUDENT_LIMITS } from '../../config/plans'

export default function HomePage() {
  const { user, role, studentTier, clubTier, events } = useAppStore()
  const navigate = useNavigate()

  const tier = role === 'club' ? clubTier : studentTier
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'

  const myRsvps = events.filter(e => e.rsvps.includes(user?.email || '')).length
  const myVolunteering = events.filter(e => e.volunteers.includes(user?.email || '')).length
  const totalUpcomingEvents = events.filter(e => e.date > Date.now()).length

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

        {/* Welcome message */}
        <motion.div
          className="relative max-w-3xl mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-[#F7F4D5] uppercase tracking-tighter mb-4 leading-none">
            {role === 'club' ? 'Club Management Dashboard' : 'Your Campus Hub'}
          </h2>
          <p className="font-serif italic text-xl md:text-2xl text-[#E6A341] leading-snug">
            {role === 'club'
              ? 'Organize events, review volunteer rosters, and track passes.'
              : 'Discover campus fests, workshops, RSVPs, and volunteer crews.'}
          </p>
        </motion.div>

        {/* Stats Row */}
        {role === 'student' && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-md border border-[#F7F4D5]/10 p-6 rounded-xl hover:border-[#E6A341]/40 transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/50 mb-2">Upcoming RSVPs</p>
              <p className="font-display text-4xl text-[#F7F4D5]">{myRsvps}</p>
              <p className="font-serif italic text-sm text-[#E6A341] mt-1">Confirmed passes</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-[#F7F4D5]/10 p-6 rounded-xl hover:border-[#E6A341]/40 transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/50 mb-2">Volunteer Roles</p>
              <p className="font-display text-4xl text-[#F7F4D5]">{myVolunteering}</p>
              <p className="font-serif italic text-sm text-[#E6A341] mt-1">Active crew slots</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-[#F7F4D5]/10 p-6 rounded-xl hover:border-[#E6A341]/40 transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/50 mb-2">Campus Events Live</p>
              <p className="font-display text-4xl text-[#F7F4D5]">{totalUpcomingEvents}</p>
              <p className="font-serif italic text-sm text-[#E6A341] mt-1">Open for registration</p>
            </div>
          </motion.div>
        )}

        {/* Quick actions for student & club */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 relative">
          
          <motion.button
            className="group relative h-[300px] w-full text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate(role === 'club' ? '/app/events' : '/app/clubhub')}
          >
            {/* Base card */}
            <div className="absolute inset-0 bg-[#8C0902] border border-[#E6A341]/30 rounded-2xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-soft-hover)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6A341]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-8 flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#E6A341] mb-2 font-bold">
                    {role === 'club' ? 'Club Management' : 'Explore Events'}
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl text-[#F7F4D5] uppercase tracking-tighter">
                    {role === 'club' ? 'Manage Events' : 'ClubHub Events'}
                  </h3>
                  <p className="font-serif italic text-xl sm:text-2xl text-[#E6A341] mt-2">
                    {role === 'club' ? 'Create, update & monitor tickets' : 'Hackathons, debates, fests & workshops'}
                  </p>
                </div>
                <div className="font-mono text-sm uppercase tracking-widest text-[#F7F4D5]/70 border-t border-[#E6A341]/30 pt-4 flex items-center justify-between">
                  <span>{role === 'club' ? 'View all events' : 'Browse & RSVP'}</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>
          </motion.button>

          <motion.button
            className="group relative h-[300px] w-full text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate(role === 'club' ? '/app/volunteers' : '/app/clubhub')}
          >
            {/* Base card */}
            <div className="absolute inset-0 bg-[#1A0503] border border-[#E6A341]/30 rounded-2xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-soft-hover)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8C0902]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-8 flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#E6A341] mb-2 font-bold">
                    {role === 'club' ? 'Volunteer Roster' : 'Campus Leadership'}
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl text-[#F7F4D5] uppercase tracking-tighter">
                    {role === 'club' ? 'Volunteer Board' : 'Volunteer Crew'}
                  </h3>
                  <p className="font-serif italic text-xl sm:text-2xl text-[#E6A341] mt-2">
                    {role === 'club' ? 'Approve applicants & coordinate teams' : 'Join organizing crews & earn certificates'}
                  </p>
                </div>
                <div className="font-mono text-sm uppercase tracking-widest text-[#F7F4D5]/70 border-t border-[#E6A341]/30 pt-4 flex items-center justify-between">
                  <span>{role === 'club' ? 'Review roster' : 'Find opportunities'}</span>
                  <span className="text-xl">→</span>
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
              <p className="font-serif italic text-2xl text-[#F7F4D5]/70">
                Upgrade to unlock verified digital certificates, priority RSVPs, and volunteer tracking.
              </p>
            </div>
            <Button size="lg" onClick={() => navigate('/pricing')}>Upgrade</Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
