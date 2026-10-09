import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { CLUB_LIMITS } from '../../config/plans'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { EventCard } from '../../components/EventCard'
import { CreateEventModal } from '../../components/CreateEventModal'

import { ManageEventModal } from '../../components/ManageEventModal'
import type { Event } from '../../store/useAppStore'

// Dashboard
export function DashboardPage() {
  const { user, clubTier, events } = useAppStore()
  const limits = CLUB_LIMITS[clubTier]

  const myEvents = events.filter(e => e.clubId === user?.clubId)
  const totalRsvps = myEvents.reduce((acc, curr) => acc + curr.rsvps.length, 0)
  const totalVolunteers = myEvents.reduce((acc, curr) => acc + curr.volunteers.length, 0)

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>
      
      {/* Background mood lighting */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#8C0902] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-b-2 border-[#E6A341]/20 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-2">Club Admin</p>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference drop-shadow-lg leading-none">Dashboard</h1>
            <p className="font-serif italic text-4xl text-[#E6A341] mt-4">{user?.clubName}</p>
          </div>
          <div className="self-start md:self-end">
            <Chip variant={clubTier === 'pro' ? 'club-pro' : 'club-free'} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          
          {/* Paper tape decoration */}
          <div className="absolute -top-6 left-10 w-24 h-6 bg-white/20 backdrop-blur-md rotate-[-3deg] z-20 mix-blend-screen shadow-sm hidden md:block"></div>

          {[
            { label: 'Events this month', value: `${myEvents.length} / ${limits.eventsPerMonth === Infinity ? '∞' : limits.eventsPerMonth}`, color: 'bg-white/10 backdrop-blur-md', border: 'border-white/20', text: 'text-[#F7F4D5]', titleColor: 'text-[#E6A341]', rotate: 'rotate-1' },
            { label: 'Total RSVPs', value: totalRsvps.toString(), color: 'paper-panel', border: 'border-[#210100]/10', text: 'text-[#210100]', titleColor: 'text-[#8C0902]', rotate: '-rotate-2' },
            { label: 'Active volunteers', value: totalVolunteers.toString(), color: 'bg-[#210100]/80 backdrop-blur-md', border: 'border-[#E6A341]/30', text: 'text-[#E6A341]', titleColor: 'text-[#F7F4D5]/70', rotate: 'rotate-2' },
            { label: 'QR scanning', value: limits.qrScanning ? 'Active' : 'Locked', color: 'bg-[#105666]', border: 'border-[#D3968C]/30', text: 'text-[#F7F4D5]', titleColor: 'text-[#D3968C]', rotate: '-rotate-1' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className={`p-8 border ${stat.border} ${stat.color} shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-hover)] rounded-xl flex flex-col justify-between h-48 transform ${stat.rotate} hover:rotate-0 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              <p className={`font-mono text-xs uppercase tracking-widest ${stat.titleColor || stat.text} opacity-90 mb-2 leading-tight relative z-10`}>{stat.label}</p>
              <p className={`font-display text-6xl ${stat.text} tracking-tighter drop-shadow-sm relative z-10`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {!limits.qrScanning && (
          <motion.div
            className="p-12 md:p-16 paper-panel bg-white/5 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[16rem] text-[#8C0902]/10 leading-none pointer-events-none">PRO</div>
            <div className="relative z-10">
              <h2 className="font-display text-5xl mb-4 text-[#210100] tracking-tighter uppercase">QR Scanning is locked</h2>
              <p className="font-serif italic text-3xl text-[#210100]/70 max-w-2xl leading-snug">Upgrade to Club Pro to scan student tickets at the door and manage real-time attendance.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Events
export function EventsPage() {
  const { user, clubTier, events, addEvent } = useAppStore()
  const limits = CLUB_LIMITS[clubTier]
  const navigate = useNavigate()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [managingEvent, setManagingEvent] = useState<Event | null>(null)
  
  const myEvents = events.filter(e => e.clubId === user?.clubId).sort((a, b) => a.date - b.date)

  const handleCreateEvent = (data: any) => {
    addEvent({
      ...data,
      clubId: user?.clubId || 'unknown',
      clubName: user?.clubName || 'Unknown Club'
    })
    setIsCreateModalOpen(false)
  }

  const canCreateEvent = limits.eventsPerMonth === Infinity || myEvents.length < limits.eventsPerMonth

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-b-2 border-[#E6A341]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference">Events</h1>
            <p className="font-serif italic text-3xl text-[#E6A341] mt-2">Create and manage events</p>
          </div>
          <Chip variant={clubTier === 'pro' ? 'club-pro' : 'club-free'} />
        </div>

        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6 p-8 paper-panel bg-white/5 backdrop-blur-sm">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8C0902]/60">Monthly Quota</span>
            <div className="font-display text-4xl text-[#210100] mt-2">
              {limits.eventsPerMonth === Infinity ? 'Unlimited' : `${Math.max(0, limits.eventsPerMonth - myEvents.length)} left`}
            </div>
          </div>
          <Button 
            variant="primary"
            onClick={() => canCreateEvent ? setIsCreateModalOpen(true) : navigate('/pricing')}
          >
            {canCreateEvent ? '+ New Event' : 'Upgrade to create more'}
          </Button>
        </div>

        <div className="grid gap-6">
          {myEvents.length > 0 ? (
            myEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                isClubAdmin={true}
                isRsvpd={false}
                isVolunteering={false}
                onAction={() => setManagingEvent(event)}
              />
            ))
          ) : (
            <div className="p-12 border-2 border-dashed border-[#E6A341]/20 text-center font-serif italic text-2xl text-[#F7F4D5]/40">No events created yet.</div>
          )}
        </div>

        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateEvent}
          capacityLimit={limits.passesPerEvent === Infinity ? 'Unlimited' : limits.passesPerEvent}
        />
        
        <ManageEventModal
          isOpen={!!managingEvent}
          onClose={() => setManagingEvent(null)}
          event={managingEvent}
        />
      </div>
    </div>
  )
}

// Volunteers
export function VolunteersPage() {
  const { user, clubTier, events } = useAppStore()
  const limits = CLUB_LIMITS[clubTier]
  const navigate = useNavigate()

  const myEvents = events.filter(e => e.clubId === user?.clubId)
  const totalVolunteers = myEvents.reduce((acc, curr) => acc + curr.volunteers.length, 0)

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-b-2 border-[#E6A341]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference">Volunteers</h1>
            <p className="font-serif italic text-3xl text-[#E6A341] mt-2">Manage your volunteer pipeline</p>
          </div>
          <Chip variant={clubTier === 'pro' ? 'club-pro' : 'club-free'} />
        </div>

        {!limits.volunteerPipeline ? (
          <motion.div
            className="p-12 paper-panel bg-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col items-start gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[12rem] text-[#8C0902]/10 leading-none pointer-events-none">PRO</div>
            <h2 className="font-display text-4xl text-[#210100]">Pipeline is locked</h2>
            <p className="font-serif italic text-2xl text-[#210100]/70 max-w-xl">
              Free tier only tracks basic sign-ups ({totalVolunteers} current sign-ups). Upgrade to Pro for the full Kanban pipeline, application reviews, and bulk certificate generation.
            </p>
            <Button onClick={() => navigate('/pricing')}>Upgrade to unlock</Button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {myEvents.map((event, i) => (
              <motion.div 
                key={event.id} 
                className="paper-panel p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-8 border-b border-[#E6A341]/10 pb-6">
                  <h3 className="font-display text-4xl text-[#F7F4D5]">{event.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#E6A341] mt-2">
                    Volunteers: {event.volunteers.length} / {event.volunteersNeeded}
                  </p>
                </div>
                
                {event.volunteers.length > 0 ? (
                  <div className="space-y-3">
                    {event.volunteers.map(vEmail => (
                      <div key={vEmail} className="flex flex-col md:flex-row md:items-center justify-between bg-[#110100] p-4 border border-[#E6A341]/10 gap-4">
                        <span className="font-serif italic text-xl text-[#F7F4D5]">{vEmail}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Message</Button>
                          <Button variant="primary" size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-serif italic text-xl text-[#F7F4D5]/50">No volunteers yet.</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Finance
export function FinancePage() {
  const { clubTier } = useAppStore()
  const limits = CLUB_LIMITS[clubTier]
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-b-2 border-[#E6A341]/20 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference">Finance</h1>
            <p className="font-serif italic text-3xl text-[#E6A341] mt-2">Track money and split with your team</p>
          </div>
          <Chip variant={clubTier === 'pro' ? 'club-pro' : 'club-free'} />
        </div>

        <motion.div
          className="p-12 paper-panel bg-white/5 backdrop-blur-sm relative overflow-hidden flex flex-col items-start gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[12rem] text-[#8C0902]/10 leading-none pointer-events-none">PRO</div>
          <div className="font-display text-4xl text-[#210100]">
            {limits.financials ? 'Finance tools in Stage 3' : 'Finance is a Pro feature'}
          </div>
          <p className="font-serif italic text-2xl text-[#210100]/70 max-w-xl">
            {limits.financials
              ? 'Budget tracking, income from events, and split payments among core team members.'
              : 'Upgrade to Club Pro to access budget tracking, event income and split payments.'}
          </p>
          {!limits.financials && (
            <Button onClick={() => navigate('/pricing')}>Upgrade to Club Pro</Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}
