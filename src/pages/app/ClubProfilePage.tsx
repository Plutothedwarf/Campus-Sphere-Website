import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { findClubById, CATEGORY_COLORS, TYPE_BADGE_COLORS } from '../../data/mockCampus'
import { useAppStore } from '../../store/useAppStore'
import { EventCard } from '../../components/EventCard'
import { EventModal } from '../../components/EventModal'
import { useState } from 'react'
import type { Event } from '../../store/useAppStore'

export default function ClubProfilePage() {
  const { clubId } = useParams<{ clubId: string }>()
  const navigate = useNavigate()
  const { events, user, toggleRsvp, toggleVolunteer } = useAppStore()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const club = findClubById(clubId || '')
  const myEmail = user?.email || ''

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#F7F4D5]">
        <div className="text-center">
          <p className="font-display text-5xl uppercase tracking-tighter text-[#8C0902]">Club Not Found</p>
          <button onClick={() => navigate('/app/campus')} className="mt-4 font-mono text-sm uppercase tracking-widest text-[#E6A341] underline">
            Back to Campus
          </button>
        </div>
      </div>
    )
  }

  const catColors = CATEGORY_COLORS[club.category]
  const typeColors = TYPE_BADGE_COLORS[club.type]

  // Match events to this club by clubId or clubName
  const clubEvents = events.filter(e =>
    e.clubId === club.id ||
    e.clubId === club.collegeId ||
    e.clubName.toLowerCase() === club.name.toLowerCase()
  )

  const upcomingEvents = clubEvents.filter(e => e.date > Date.now()).sort((a, b) => a.date - b.date)
  const pastEvents = clubEvents.filter(e => e.date <= Date.now()).sort((a, b) => b.date - a.date)

  // For demo: generate mock past events
  const demoPastEvents: Event[] = [
    {
      id: `${club.id}-past1`,
      title: `${club.name} Annual Showcase`,
      description: `The flagship annual event by ${club.name}. A celebration of the year's achievements, performances, and community milestones.`,
      date: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
      location: 'Main Auditorium',
      clubId: club.id,
      clubName: club.name,
      capacity: 200,
      rsvps: new Array(Math.floor(Math.random() * 180 + 10)).fill('past@somaiya.edu'),
      volunteers: [],
      volunteersNeeded: 0,
      category: club.category,
    },
    {
      id: `${club.id}-past2`,
      title: `${club.category} Workshop — ${club.name}`,
      description: `An intensive hands-on workshop session organized by ${club.name}, designed to upskill students with practical knowledge and industry exposure.`,
      date: Date.now() - 1000 * 60 * 60 * 24 * 75, // 75 days ago
      location: 'Seminar Hall B',
      clubId: club.id,
      clubName: club.name,
      capacity: 80,
      rsvps: new Array(Math.floor(Math.random() * 70 + 10)).fill('past@somaiya.edu'),
      volunteers: [],
      volunteersNeeded: 0,
      category: club.category,
    },
  ]

  const allPastEvents = [...pastEvents, ...demoPastEvents]

  const handleEventAction = (event: Event) => {
    setSelectedEvent(event)
  }

  const isRsvpdFor = (event: Event) => event.rsvps.includes(myEmail)
  const isVolunteeringFor = (event: Event) => event.volunteers.includes(myEmail)

  const STAT_COLS = [
    { label: 'Members', value: club.members.toLocaleString() },
    { label: 'Events Hosted', value: club.eventsDone.toString() },
    { label: 'Est.', value: club.founded },
    { label: 'Type', value: club.type },
  ]

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none" />

      {/* Mood lighting from club color */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[140px] opacity-30 pointer-events-none"
        style={{ background: club.color }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Back breadcrumb */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/app/campus')}
          className="flex items-center gap-2 mb-10 font-mono text-xs uppercase tracking-widest text-[#E6A341] hover:text-[#F7F4D5] transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Campus Directory
        </motion.button>

        {/* Club Profile Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="paper-panel p-8 md:p-12 mb-10 relative overflow-hidden"
          style={{ borderLeft: `6px solid ${club.color}` }}
        >
          {/* Large decorative initial letter */}
          <div
            className="absolute -right-4 -top-6 font-display font-black text-[12rem] leading-none pointer-events-none select-none opacity-[0.06]"
            style={{ color: club.color }}
          >
            {club.name[0]}
          </div>

          <div className="relative z-10">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold"
                style={{ background: typeColors.bg, color: typeColors.text }}
              >
                {club.type}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold"
                style={{ background: catColors.bg, color: catColors.text }}
              >
                {club.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#210100]/40 px-2 py-1 bg-[#210100]/5">
                {club.collegeName}
              </span>
            </div>

            {/* Club Name */}
            <h1 className="font-display font-black text-[#210100] text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-3">
              {club.name}
            </h1>
            <p className="font-serif italic text-2xl md:text-3xl text-[#8C0902] mb-6">
              {club.tagline}
            </p>
            <p className="font-body text-[#210100]/70 text-base md:text-lg leading-relaxed max-w-3xl">
              {club.description}
            </p>

            {/* Stat Chits */}
            <div className="flex flex-wrap gap-3 mt-8">
              {STAT_COLS.map(stat => (
                <div
                  key={stat.label}
                  className="bg-[#F2EDE4] border border-[#210100]/10 rounded-sm px-4 py-3 flex flex-col items-center min-w-[80px] shadow-sm transform odd:-rotate-1 even:rotate-1 hover:rotate-0 transition-transform"
                >
                  <p className="font-display font-black text-[#210100] text-2xl leading-none">{stat.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#210100]/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Events Sections — Two Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Upcoming Events */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-6" style={{ background: club.color }} />
              <h2 className="font-display font-black text-[#F7F4D5] text-2xl uppercase tracking-tighter">
                Upcoming
              </h2>
              {upcomingEvents.length > 0 && (
                <span className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 bg-[#839958] text-white font-bold rounded-sm">
                  {upcomingEvents.length} Live
                </span>
              )}
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="paper-panel p-8 text-center">
                <p className="font-display text-2xl text-[#210100] uppercase tracking-tighter">No upcoming events</p>
                <p className="font-serif italic text-[#210100]/50 mt-1 text-sm">
                  Check back soon — events will appear here once posted.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isClubAdmin={false}
                    isRsvpd={isRsvpdFor(event)}
                    isVolunteering={isVolunteeringFor(event)}
                    onAction={handleEventAction}
                  />
                ))}
              </div>
            )}
          </motion.section>

          {/* Past Events */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-6 bg-[#210100]/30" />
              <h2 className="font-display font-black text-[#F7F4D5] text-2xl uppercase tracking-tighter">
                Past Events
              </h2>
              <span className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 bg-[#210100]/30 text-[#F7F4D5]/60 font-bold rounded-sm">
                Archive
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {allPastEvents.map(event => (
                <div key={event.id} className="opacity-70 hover:opacity-100 transition-opacity">
                  {/* Compact past event row */}
                  <div className="paper-panel p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold rounded-sm"
                          style={{ background: catColors.bg, color: catColors.text }}
                        >
                          {event.category}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#210100]/40">
                          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="font-display font-black text-[#210100] text-base uppercase tracking-tight leading-tight">
                        {event.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#210100]/50 uppercase tracking-widest mt-1">
                        {event.rsvps.length} attended · {event.location}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div
                        className="w-10 h-10 flex items-center justify-center font-display font-black text-sm"
                        style={{ background: club.color + '20', color: club.color }}
                      >
                        ✓
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {allPastEvents.length === 0 && (
                <div className="paper-panel p-8 text-center">
                  <p className="font-display text-2xl text-[#210100] uppercase tracking-tighter">No archived events</p>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        isRsvpd={selectedEvent ? isRsvpdFor(selectedEvent) : false}
        isVolunteering={selectedEvent ? isVolunteeringFor(selectedEvent) : false}
        onToggleRsvp={() => {
          if (selectedEvent) toggleRsvp(selectedEvent.id, myEmail)
        }}
        onToggleVolunteer={() => {
          if (selectedEvent) toggleVolunteer(selectedEvent.id, myEmail)
        }}
        canVolunteer={true}
      />
    </div>
  )
}
