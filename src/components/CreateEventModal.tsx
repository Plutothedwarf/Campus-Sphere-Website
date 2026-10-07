import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Input } from './Input'
import { EVENT_CATEGORIES } from '../data/mockEvents'


interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    title: string
    description: string
    date: number
    location: string
    capacity: number
    volunteersNeeded: number
    category: string
  }) => void
  capacityLimit: number | 'Unlimited'
}

export function CreateEventModal({ isOpen, onClose, onSubmit, capacityLimit }: CreateEventModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [volunteersNeeded, setVolunteersNeeded] = useState('')
  const [category, setCategory] = useState(EVENT_CATEGORIES[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !dateStr || !timeStr || !location || !capacity) return
    
    const dateTime = new Date(`${dateStr}T${timeStr}`).getTime()

    onSubmit({
      title,
      description,
      date: dateTime,
      location,
      capacity: Number(capacity),
      volunteersNeeded: Number(volunteersNeeded) || 0,
      category,
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setDateStr('')
    setTimeStr('')
    setLocation('')
    setCapacity('')
    setVolunteersNeeded('')
    setCategory(EVENT_CATEGORIES[0])
  }

  return (
    <Modal open={isOpen} onClose={onClose} title="Create New Event">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Calm zone for form */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 border border-[#210100]/20 flex flex-col gap-4 shadow-inner">
          <Input
            label="Event Name"
            placeholder="e.g. Hackathon 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Date"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Time"
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Location"
                placeholder="e.g. Main Auditorium"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-[#210100] mb-1">Category</label>
              <select 
                className="w-full bg-white/90 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 font-body text-[#210100] focus:outline-none focus:ring-2 focus:ring-[#8C0902]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={`Capacity (Max: ${capacityLimit})`}
                type="number"
                placeholder="0"
                min="1"
                max={capacityLimit === 'Unlimited' ? undefined : capacityLimit as number}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Volunteers Needed"
                type="number"
                placeholder="0"
                min="0"
                value={volunteersNeeded}
                onChange={(e) => setVolunteersNeeded(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-[#210100] mb-1">Description</label>
            <textarea
              className="w-full bg-white/90 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 font-body text-[#210100] focus:outline-none focus:ring-2 focus:ring-[#8C0902] resize-none h-24"
              placeholder="What's happening at the event?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full justify-center">
          Publish Event
        </Button>
      </form>
    </Modal>
  )
}
