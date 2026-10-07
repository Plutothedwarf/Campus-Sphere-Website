import { useState } from 'react'
import { Chip } from '../../components/Chip'
import { Tabs } from '../../components/Tabs'
import { useAppStore } from '../../store/useAppStore'
import type { Event } from '../../store/useAppStore'

import { CLUBHUB_STUDENT_LIMITS } from '../../config/plans'
import { EventCard } from '../../components/EventCard'
import { EventModal } from '../../components/EventModal'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { motion } from 'framer-motion'

// ClubHubPage
export default function ClubHubPage() {
  const { user, studentTier, events, toggleRsvp, toggleVolunteer } = useAppStore()
  const limits = CLUBHUB_STUDENT_LIMITS[studentTier]
  const navigate = useNavigate()

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
  const myEmail = user?.email || ''

  // Filter events
  const upcomingEvents = events.filter(e => e.date > Date.now()).sort((a, b) => a.date - b.date)
  const myRsvps = events.filter(e => e.rsvps.includes(myEmail))

  const handleEventAction = (event: Event) => {
    if (!limits.calendar) {
      navigate('/pricing')
      return
    }
    setSelectedEvent(event)
  }

  const handleToggleRsvp = () => {
    if (selectedEvent) {
      toggleRsvp(selectedEvent.id, myEmail)
    }
  }

  const handleToggleVolunteer = () => {
    if (selectedEvent) {
      toggleVolunteer(selectedEvent.id, myEmail)
    }
  }

  return (
    <div className="min-h-screen bg-[#210100] px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Background mood lighting */}
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#8C0902] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="border-b-2 border-[#E6A341]/30 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-2">Events & Volunteer</p>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference drop-shadow-lg leading-none">ClubHub</h1>
            <p className="font-serif italic text-4xl text-[#E6A341] mt-4">Get involved on campus</p>
          </div>
          <div className="self-start md:self-end">
            <Chip variant={studentTier} />
          </div>
        </div>

        {limits.calendar ? (
          <Tabs 
            tabs={[
              { id: 'upcoming', label: 'Upcoming Events' },
              { id: 'my-tickets', label: `My Tickets (${myRsvps.length})` }
            ]}
          >
            {(activeTab) => (
              <div className="mt-12 grid gap-8">
                {activeTab === 'upcoming' ? (
                  upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {upcomingEvents.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          isClubAdmin={false}
                          isRsvpd={event.rsvps.includes(myEmail)}
                          isVolunteering={event.volunteers.includes(myEmail)}
                          onAction={handleEventAction} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-16 border-2 border-dashed border-[#E6A341]/30 bg-[#8C0902]/20 text-center relative -rotate-1">
                      <p className="font-display text-4xl text-[#F7F4D5] mb-4">No events scheduled.</p>
                      <p className="font-serif italic text-2xl text-[#E6A341]">Check back later.</p>
                    </div>
                  )
                ) : (
                  myRsvps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {myRsvps.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          isClubAdmin={false}
                          isRsvpd={true}
                          isVolunteering={event.volunteers.includes(myEmail)}
                          onAction={handleEventAction} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-16 border-2 border-dashed border-[#E6A341]/30 bg-[#8C0902]/20 text-center relative -rotate-1">
                      <p className="font-display text-4xl text-[#F7F4D5] mb-4">No tickets yet.</p>
                      <p className="font-serif italic text-2xl text-[#E6A341]">RSVP to an event to see it here.</p>
                    </div>
                  )
                )}
              </div>
            )}
          </Tabs>
        ) : (
          <motion.div
            className="p-12 md:p-16 border-2 border-dashed border-[#8C0902]/50 bg-[#210100] relative overflow-hidden flex flex-col items-start gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[16rem] text-[#8C0902]/10 leading-none pointer-events-none">LOCKED</div>
            <div className="relative z-10">
              <h2 className="font-display text-5xl text-[#F7F4D5] mb-4 uppercase tracking-tighter">Calendar Locked</h2>
              <p className="font-serif italic text-3xl text-[#F7F4D5]/70 max-w-2xl leading-snug">You need to upgrade your tier to view and RSVP to events.</p>
            </div>
            <Button size="lg" variant="primary" onClick={() => navigate('/pricing')}>View Plans</Button>
          </motion.div>
        )}

        <EventModal 
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
          isRsvpd={selectedEvent ? selectedEvent.rsvps.includes(myEmail) : false}
          isVolunteering={selectedEvent ? selectedEvent.volunteers.includes(myEmail) : false}
          onToggleRsvp={handleToggleRsvp}
          onToggleVolunteer={handleToggleVolunteer}
          canVolunteer={limits.basicVolunteer}
        />
      </div>
    </div>
  )
}
