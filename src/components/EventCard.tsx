import { motion } from 'framer-motion'
import type { Event } from '../store/useAppStore'

import { Chip } from './Chip'
import { Button } from './Button'


interface EventCardProps {
  event: Event
  isClubAdmin: boolean
  isRsvpd: boolean
  isVolunteering: boolean
  onAction: (event: Event) => void
}

export function EventCard({ event, isClubAdmin, isRsvpd, isVolunteering, onAction }: EventCardProps) {
  const isFull = event.rsvps.length >= event.capacity
  
  // Format date
  const dateObj = new Date(event.date)
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })


  return (
    <motion.div
      className="relative paper-panel p-6 flex flex-col gap-4"
      whileHover={{ y: -2 }}
    >


      <div className="flex justify-between items-start gap-4 pr-10">
        <div>
          <Chip variant="custom" label={event.category} color="#14110F" textColor="#FFFAED" />
          <h3 className="font-display font-black text-[#210100] text-2xl uppercase tracking-tighter mt-2 leading-tight">
            {event.title}
          </h3>
          <p className="text-[#210100]/60 font-serif italic text-sm mt-1">
            By {event.clubName}
          </p>
        </div>
        <div className="text-right whitespace-nowrap bg-[#F2EDE4] border border-[#210100]/10 rounded-sm p-3 flex flex-col items-center justify-center min-w-[60px] shadow-sm transform rotate-2">
          <p className="font-display font-black text-[#210100] text-lg leading-none">
            {dateObj.getDate()}
          </p>
          <p className="text-[#210100]/70 font-mono text-xs font-bold uppercase tracking-widest mt-1">
            {dateObj.toLocaleDateString('en-US', { month: 'short' })}
          </p>
        </div>
      </div>

      <p className="font-body text-[#210100]/80 text-sm flex-1">
        {event.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-2">
        {isVolunteering && (
          <span className="text-xs font-mono uppercase tracking-widest font-bold px-2 py-1 bg-[#839958] text-white rounded-lg border border-[#839958]/20 flex items-center gap-1 shadow-sm">
            <span>🤝</span> Volunteering
          </span>
        )}
        <span className="text-xs font-mono uppercase tracking-widest font-bold px-2 py-1 bg-white/50 backdrop-blur-md rounded-lg border border-[#210100]/20 flex items-center gap-1">
          <span>📍</span> {event.location}
        </span>
        <span className="text-xs font-mono uppercase tracking-widest font-bold px-2 py-1 bg-white/50 backdrop-blur-md rounded-lg border border-[#210100]/20 flex items-center gap-1">
          <span>⏰</span> {timeStr}
        </span>
      </div>

      <div className="mt-2 flex gap-2">
        {isClubAdmin ? (
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full justify-center bg-white/50 backdrop-blur-md hover:bg-white/80"
            onClick={() => onAction(event)}
          >
            Manage ({event.rsvps.length}/{event.capacity} RSVPs)
          </Button>
        ) : (
          <Button 
            variant={isRsvpd ? 'secondary' : 'primary'} 
            size="sm" 
            className={`w-full justify-center ${isRsvpd ? 'bg-white/50 backdrop-blur-md text-[#839958] border-[#839958]/30 hover:bg-[#839958]/10' : ''}`}
            onClick={() => onAction(event)}
            disabled={!isRsvpd && isFull}
          >
            {isRsvpd ? 'RSVP Confirmed ✓' : (isFull ? 'Event Full' : 'RSVP / View Details')}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
