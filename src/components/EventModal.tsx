import { Modal } from './Modal'
import { Button } from './Button'
import type { Event } from '../store/useAppStore'

import { QRCodeSVG } from 'qrcode.react'


interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
  isRsvpd: boolean
  isVolunteering: boolean
  onToggleRsvp: () => void
  onToggleVolunteer: () => void
  canVolunteer: boolean
}

export function EventModal({ 
  isOpen, 
  onClose, 
  event, 
  isRsvpd, 
  isVolunteering, 
  onToggleRsvp, 
  onToggleVolunteer,
  canVolunteer 
}: EventModalProps) {
  if (!event) return null

  const isFull = event.rsvps.length >= event.capacity
  const volunteerSpotsLeft = event.volunteersNeeded - event.volunteers.length

  return (
    <Modal open={isOpen} onClose={onClose} title="Event Details">

      <div className="flex flex-col gap-4">
        
        {event.images && event.images.length > 0 && (
          <div className="w-full h-64 overflow-x-auto snap-x snap-mandatory flex gap-2 scrollbar-hide rounded-xl">
            {event.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`${event.title} view ${i + 1}`} 
                className="w-full h-full object-cover flex-shrink-0 snap-center rounded-xl border border-[#210100]/10 bg-[#210100]/5"
              />
            ))}
          </div>
        )}

        {/* Calm zone for details */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 border border-[#210100]/20 flex flex-col gap-3 shadow-inner">
          <div>
            <p className="font-display font-black text-[#210100] text-2xl uppercase tracking-tighter">{event.title}</p>
            <p className="text-[#210100]/70 font-serif italic text-lg">Hosted by {event.clubName}</p>
          </div>

          <div className="h-px bg-[#210100]/10 w-full my-2"></div>

          {isRsvpd ? (
            <div className="flex flex-col items-center justify-center p-4 bg-[#839958]/10 rounded-xl border-2 border-[#839958] border-dashed">
              <p className="font-mono font-bold uppercase tracking-widest text-[#839958] mb-3">Your QR Pass</p>
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <QRCodeSVG value={`event:${event.id}:user:demo`} size={120} />
              </div>
              <p className="text-[#210100]/60 text-xs font-body mt-3 text-center">
                Show this at the entrance. Valid for 1 entry.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-sm font-body">
              <div className="flex justify-between items-center">
                <span className="text-[#210100]/70 font-mono uppercase tracking-widest text-xs">Date</span>
                <span className="text-[#210100] font-bold">{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#210100]/70 font-mono uppercase tracking-widest text-xs">Location</span>
                <span className="text-[#210100] font-bold">{event.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#210100]/70 font-mono uppercase tracking-widest text-xs">Availability</span>
                <span className={isFull ? 'text-[#8C0902] font-bold' : 'text-[#839958] font-bold'}>
                  {isFull ? 'Sold Out' : `${event.capacity - event.rsvps.length} spots left`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Volunteer area */}
        <div className="bg-[#E6A341]/10 rounded-xl p-4 border border-[#E6A341]/30 flex items-start gap-3">
          <div className="mt-1 text-[#E6A341]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          <div className="flex-1">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#E6A341] mb-1">
              {isVolunteering ? 'You are volunteering!' : 'Want to volunteer?'}
            </p>
            <p className="font-body text-[#210100]/70 text-xs mt-1 mb-2 leading-relaxed">
              {isVolunteering 
                ? 'Thanks for helping out! The club will contact you soon.' 
                : `${volunteerSpotsLeft > 0 ? `${volunteerSpotsLeft} spots left.` : 'No more spots.'} Volunteers get free entry and a certificate.`}
            </p>
            <Button 
              variant={isVolunteering ? 'secondary' : 'primary'} 

              size="sm" 
              className="w-full justify-center bg-white/50 backdrop-blur-md"
              onClick={onToggleVolunteer}
              disabled={(!isVolunteering && volunteerSpotsLeft <= 0) || (!isVolunteering && !canVolunteer)}
            >
              {isVolunteering ? 'Cancel Volunteering' : (canVolunteer ? 'Sign up to Volunteer' : 'Upgrade to Volunteer')}
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          {isRsvpd ? (
            <Button variant="secondary" className="flex-1 justify-center bg-white/50 backdrop-blur-md hover:bg-[#8C0902] hover:text-white" onClick={onToggleRsvp}>
              Cancel RSVP
            </Button>
          ) : (
            <Button 
              variant="primary" 
              className="flex-1 justify-center" 
              onClick={onToggleRsvp}
              disabled={isFull}
            >
              {isFull ? 'Event Full' : 'Confirm RSVP'}
            </Button>
          )}
          <Button variant="secondary" className="flex-1 justify-center bg-white/30 backdrop-blur-md hover:bg-[#210100] hover:text-[#F7F4D5]" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
