import { Modal } from './Modal'
import { Event } from '../store/useAppStore'
import { Button } from './Button'

interface ManageEventModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
}

export function ManageEventModal({ isOpen, onClose, event }: ManageEventModalProps) {
  if (!event) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Manage: ${event.title}`}>
      <div className="space-y-6">
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-3 border-b border-[#E6A341]/20 pb-2">
            RSVPs ({event.rsvps.length} / {event.capacity})
          </h3>
          {event.rsvps.length > 0 ? (
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {event.rsvps.map((email, idx) => (
                <li key={idx} className="font-serif italic text-xl text-[#F7F4D5] bg-[#210100] px-3 py-2 rounded-md border border-[#F7F4D5]/10 flex justify-between items-center">
                  <span>{email}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-serif italic text-[#F7F4D5]/50">No RSVPs yet.</p>
          )}
        </div>

        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-3 border-b border-[#E6A341]/20 pb-2">
            Volunteers ({event.volunteers.length} / {event.volunteersNeeded})
          </h3>
          {event.volunteers.length > 0 ? (
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {event.volunteers.map((email, idx) => (
                <li key={idx} className="font-serif italic text-xl text-[#F7F4D5] bg-[#210100] px-3 py-2 rounded-md border border-[#F7F4D5]/10 flex justify-between items-center">
                  <span>{email}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-serif italic text-[#F7F4D5]/50">No volunteers yet.</p>
          )}
        </div>

        <div className="pt-4 border-t border-[#F7F4D5]/10 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => {
            alert('Exporting CSV...')
            onClose()
          }}>Export CSV</Button>
        </div>
      </div>
    </Modal>
  )
}
