import { useState } from 'react'
import { Chip } from '../../components/Chip'
import { Tabs } from '../../components/Tabs'
import { useAppStore } from '../../store/useAppStore'
import type { Event } from '../../store/useAppStore'
import { CLUBHUB_STUDENT_LIMITS } from '../../config/plans'
import { EventCard } from '../../components/EventCard'
import { EventModal } from '../../components/EventModal'
import { Modal } from '../../components/Modal'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

const CATEGORIES = ['All', 'Tech', 'Cultural', 'Sports', 'Workshop', 'Social']

interface Certificate {
  id: string
  eventTitle: string
  clubName: string
  date: string
  role: 'Volunteer' | 'Participant'
  hours?: number
  credentialId: string
}

export default function ClubHubPage() {
  const { user, studentTier, events, toggleRsvp, toggleVolunteer } = useAppStore()
  const limits = CLUBHUB_STUDENT_LIMITS[studentTier]
  const navigate = useNavigate()

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null)

  const myEmail = user?.email || ''

  // Filter events
  const upcomingEvents = events
    .filter(e => e.date > Date.now())
    .sort((a, b) => a.date - b.date)

  const filteredUpcoming = upcomingEvents.filter(e => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCat = selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCat
  })

  const myRsvps = events.filter(e => e.rsvps.includes(myEmail))
  const myVolunteering = events.filter(e => e.volunteers.includes(myEmail))

  // Demo certificates generated from student's activity
  const studentCertificates: Certificate[] = [
    {
      id: 'c1',
      eventTitle: 'National Youth Parliament 2026',
      clubName: 'Debate Society',
      date: 'Sep 24, 2026',
      role: 'Participant',
      credentialId: 'SOMAIYA-CERT-2026-NYP-9021',
    },
    ...(myVolunteering.length > 0 ? [
      {
        id: 'c2',
        eventTitle: myVolunteering[0].title,
        clubName: myVolunteering[0].clubName,
        date: 'Oct 2026',
        role: 'Volunteer' as const,
        hours: 12,
        credentialId: `SOMAIYA-VOL-2026-${myVolunteering[0].id.toUpperCase()}-4821`,
      }
    ] : [])
  ]

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
        <div className="border-b-2 border-[#E6A341]/30 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-2">Campus Events & Leadership</p>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference drop-shadow-lg leading-none">ClubHub</h1>
            <p className="font-serif italic text-3xl sm:text-4xl text-[#E6A341] mt-3">Discover gatherings, RSVP passes, and volunteer crews</p>
          </div>
          <div className="self-start md:self-end">
            <Chip variant={studentTier} />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#1A0503] border border-[#E6A341]/20 p-4 sm:p-6 rounded-2xl mb-10 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F7F4D5]/40 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search events, clubs, venues, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#210100] text-[#F7F4D5] placeholder-[#F7F4D5]/40 border border-[#E6A341]/20 rounded-xl pl-12 pr-4 py-3 font-mono text-sm focus:outline-none focus:border-[#E6A341]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#F7F4D5]/40 hover:text-[#E6A341]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E6A341] text-[#210100] shadow-sm'
                    : 'bg-[#210100] text-[#F7F4D5]/70 border border-[#E6A341]/20 hover:border-[#E6A341]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {limits.calendar ? (
          <Tabs 
            tabs={[
              { id: 'upcoming', label: `Upcoming Events (${filteredUpcoming.length})` },
              { id: 'my-tickets', label: `My Tickets (${myRsvps.length})` },
              { id: 'volunteering', label: `Volunteering (${myVolunteering.length})` },
              { id: 'certificates', label: `Certificates (${studentCertificates.length})` },
            ]}
          >
            {(activeTab) => (
              <div className="mt-8 grid gap-8">
                {/* 1. UPCOMING TAB */}
                {activeTab === 'upcoming' && (
                  filteredUpcoming.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredUpcoming.map(event => (
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
                    <div className="p-16 border-2 border-dashed border-[#E6A341]/30 bg-[#8C0902]/20 text-center relative -rotate-1 rounded-2xl">
                      <p className="font-display text-4xl text-[#F7F4D5] mb-2">No matching events found.</p>
                      <p className="font-serif italic text-2xl text-[#E6A341]">Try adjusting your search query or category filter.</p>
                    </div>
                  )
                )}

                {/* 2. MY TICKETS TAB */}
                {activeTab === 'my-tickets' && (
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
                    <div className="p-16 border-2 border-dashed border-[#E6A341]/30 bg-[#8C0902]/20 text-center relative -rotate-1 rounded-2xl">
                      <p className="font-display text-4xl text-[#F7F4D5] mb-4">No confirmed passes yet.</p>
                      <p className="font-serif italic text-2xl text-[#E6A341]">
                        Browse upcoming events and tap 'RSVP' to generate your digital entry QR code.
                      </p>
                    </div>
                  )
                )}

                {/* 3. VOLUNTEERING TAB */}
                {activeTab === 'volunteering' && (
                  myVolunteering.length > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-[#1A0503] border border-[#E6A341]/20 p-6 rounded-xl">
                        <h3 className="font-display text-3xl text-[#E6A341] uppercase tracking-tight">Active Volunteer Crew</h3>
                        <p className="font-serif italic text-lg text-[#F7F4D5]/70 mt-1">
                          Show up 30 minutes prior to doors opening. Volunteer roles grant free event admission and accredited completion certificates.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {myVolunteering.map(event => (
                          <div key={event.id} className="paper-panel p-6 border-2 border-[#839958]/50 shadow-xl relative flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-[#839958] text-[#F7F4D5] font-mono text-xs font-bold uppercase rounded-md tracking-wider">
                                  ✓ Registered Crew
                                </span>
                                <span className="font-mono text-xs text-[#210100]/60">
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                              </div>
                              <h4 className="font-display text-3xl text-[#210100] uppercase tracking-tight mb-1">{event.title}</h4>
                              <p className="font-serif italic text-lg text-[#8C0902] mb-3">Organized by {event.clubName}</p>
                              <p className="font-body text-sm text-[#210100]/80 mb-4">{event.description}</p>
                              
                              <div className="bg-[#210100]/5 border border-[#210100]/10 p-3 rounded-lg font-mono text-xs text-[#210100] space-y-1">
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Crew Size:</strong> {event.volunteers.length} / {event.volunteersNeeded} volunteers</p>
                                <p><strong>Perks:</strong> VIP Backstage Pass · Verified Certificate</p>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#210100]/10 flex gap-3">
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="flex-1 justify-center bg-white/70"
                                onClick={() => handleEventAction(event)}
                              >
                                View Details & QR
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-[#8C0902] hover:bg-[#8C0902]/10"
                                onClick={() => toggleVolunteer(event.id, myEmail)}
                              >
                                Leave Crew
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-16 border-2 border-dashed border-[#E6A341]/30 bg-[#8C0902]/20 text-center relative -rotate-1 rounded-2xl">
                      <p className="font-display text-4xl text-[#F7F4D5] mb-4">No active volunteer positions.</p>
                      <p className="font-serif italic text-2xl text-[#E6A341] max-w-xl mx-auto">
                        Join club organizing teams! Browse upcoming events and tap 'Sign up to Volunteer' to earn recognized leadership hours.
                      </p>
                    </div>
                  )
                )}

                {/* 4. CERTIFICATES TAB */}
                {activeTab === 'certificates' && (
                  <div className="space-y-8">
                    {!limits.digitalCertificates && (
                      <div className="p-6 bg-[#E6A341]/10 border border-[#E6A341]/30 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <p className="font-display text-2xl text-[#E6A341] uppercase">Premium Certification Feature</p>
                          <p className="font-serif italic text-lg text-[#F7F4D5]/80">
                            Upgrade to Premium to download verifiable PDF certificates with secure Somaiya QR verification codes for LinkedIn and resumes.
                          </p>
                        </div>
                        <Button variant="primary" onClick={() => navigate('/pricing')}>
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {studentCertificates.map(cert => (
                        <div key={cert.id} className="relative paper-panel p-8 border-4 border-[#210100]/20 shadow-2xl flex flex-col justify-between">
                          <div className="border-b-2 border-[#210100]/20 pb-4 mb-4">
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-xs uppercase tracking-widest text-[#8C0902] font-bold">
                                Somaiya Extracurricular Board
                              </span>
                              <span className="text-xl">🎖️</span>
                            </div>
                            <h3 className="font-display text-2xl text-[#210100] mt-2 uppercase tracking-tight">
                              Certificate of {cert.role === 'Volunteer' ? 'Leadership & Volunteering' : 'Participation'}
                            </h3>
                          </div>

                          <div className="space-y-3 font-serif italic text-[#210100]/80">
                            <p className="text-sm">This certifies that</p>
                            <p className="font-display text-3xl text-[#210100] tracking-tight not-italic">{user?.name}</p>
                            <p className="text-sm">
                              actively contributed to <strong>{cert.eventTitle}</strong> hosted by {cert.clubName} on {cert.date}.
                            </p>
                            {cert.hours && (
                              <p className="font-mono text-xs text-[#8C0902] font-bold not-italic">
                                Certified Service Hours: {cert.hours} Hours Logged
                              </p>
                            )}
                          </div>

                          <div className="mt-6 pt-4 border-t border-[#210100]/10 flex justify-between items-center">
                            <div>
                              <p className="font-mono text-[9px] text-[#210100]/50 uppercase tracking-widest">Verification ID</p>
                              <p className="font-mono text-xs text-[#210100] font-bold">{cert.credentialId}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              className="bg-white/70"
                              onClick={() => setViewingCertificate(cert)}
                            >
                              View Certificate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Tabs>
        ) : (
          <motion.div
            className="p-12 md:p-16 border-2 border-dashed border-[#8C0902]/50 bg-[#210100] relative overflow-hidden flex flex-col items-start gap-8 mt-12 rounded-2xl"
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

        {/* Event Detail Modal */}
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

        {/* Certificate Viewer Modal */}
        <Modal 
          open={!!viewingCertificate} 
          onClose={() => setViewingCertificate(null)}
          title="Verified Digital Credential"
        >
          {viewingCertificate && (
            <div className="space-y-6 text-center">
              <div className="p-8 bg-[#FFFDF5] border-8 border-double border-[#8C0902] rounded-lg shadow-inner text-[#210100] relative overflow-hidden">
                <div className="font-mono text-xs uppercase tracking-widest text-[#8C0902] font-bold mb-2">
                  K.J. Somaiya College of Engineering
                </div>
                <div className="font-display text-3xl uppercase tracking-tighter mb-4 text-[#210100]">
                  Official Certificate
                </div>
                <p className="font-serif italic text-sm text-[#210100]/70 mb-2">Presented to</p>
                <p className="font-display text-4xl text-[#8C0902] uppercase tracking-tight mb-3">
                  {user?.name}
                </p>
                <p className="font-serif italic text-base max-w-md mx-auto text-[#210100]/80 mb-6">
                  In recognition of dedicated service as <strong>{viewingCertificate.role}</strong> for the event{' '}
                  <span className="text-[#8C0902] font-bold">{viewingCertificate.eventTitle}</span>, organized by{' '}
                  {viewingCertificate.clubName}.
                </p>

                <div className="flex justify-between items-end pt-6 border-t border-[#210100]/20">
                  <div className="text-left font-mono text-[10px] text-[#210100]/60">
                    <p>Issue Date: {viewingCertificate.date}</p>
                    <p>ID: {viewingCertificate.credentialId}</p>
                    <p className="text-green-700 font-bold mt-1">Status: Digitally Verified ✓</p>
                  </div>
                  <div className="p-1 bg-white border border-[#210100]/20 rounded shadow-sm">
                    <QRCodeSVG value={`https://somaiya.edu/verify?id=${viewingCertificate.credentialId}`} size={64} />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    alert('Certificate download started: PDF formatted with digital seal.')
                    setViewingCertificate(null)
                  }}
                >
                  Download PDF Certificate
                </Button>
                <Button variant="secondary" onClick={() => setViewingCertificate(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}
