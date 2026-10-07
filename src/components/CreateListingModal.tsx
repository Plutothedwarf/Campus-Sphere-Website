import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Input } from './Input'
import type { ListingCondition, ListingType } from '../store/useAppStore'
import { SWAP_CATEGORIES } from '../data/mockSwap'


interface CreateListingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    title: string
    description: string
    price: number
    category: string
    condition: ListingCondition
    type: ListingType
  }) => void
  categoriesLeft: number | 'Unlimited'
}

export function CreateListingModal({ isOpen, onClose, onSubmit, categoriesLeft }: CreateListingModalProps) {
  const [type, setType] = useState<ListingType>('sell')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(SWAP_CATEGORIES[0])
  const [condition, setCondition] = useState<ListingCondition>('good')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || !price) return
    
    onSubmit({
      title,
      description,
      price: Number(price),
      category,
      condition,
      type
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setPrice('')
    setCategory(SWAP_CATEGORIES[0])
    setCondition('good')
    setType('sell')
  }

  return (
    <Modal open={isOpen} onClose={onClose} title="New Listing">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Calm zone for form - high contrast cream */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 border border-[#210100]/20 flex flex-col gap-4 shadow-inner">
          <div className="flex gap-2 p-1 bg-white/40 rounded-xl border border-black/10">
            <button
              type="button"
              className={`flex-1 py-2 font-mono uppercase tracking-widest text-xs font-bold rounded-lg transition-colors ${type === 'sell' ? 'bg-[#210100] text-[#FFFAED] shadow-sm' : 'text-[#210100] hover:bg-[#210100]/5'}`}
              onClick={() => setType('sell')}
            >
              To Sell
            </button>
            <button
              type="button"
              className={`flex-1 py-2 font-mono uppercase tracking-widest text-xs font-bold rounded-lg transition-colors ${type === 'rent' ? 'bg-[#210100] text-[#FFFAED] shadow-sm' : 'text-[#210100] hover:bg-[#210100]/5'}`}
              onClick={() => setType('rent')}
            >
              To Rent
            </button>
          </div>

          <Input
            label="What are you listing?"
            placeholder="e.g. Noise Cancelling Headphones"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5 relative">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-[#210100] mb-1">Category</label>
            <select 
              className="w-full bg-white/90 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 font-body text-[#210100] focus:outline-none focus:ring-2 focus:ring-[#8C0902]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {SWAP_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {categoriesLeft !== 'Unlimited' && (
              <p className="text-xs font-mono text-[#210100]/60">Categories left: {categoriesLeft}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={type === 'rent' ? "Price per month (₹)" : "Price (₹)"}
                type="number"
                placeholder="0"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-widest text-[#210100] mb-1">Condition</label>
              <select 
                className="w-full bg-white/90 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 font-body text-[#210100] focus:outline-none focus:ring-2 focus:ring-[#8C0902]"
                value={condition}
                onChange={(e) => setCondition(e.target.value as ListingCondition)}
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-[#210100] mb-1">Description</label>
            <textarea
              className="w-full bg-white/90 backdrop-blur-sm border border-black/20 rounded-lg px-4 py-3 font-body text-[#210100] focus:outline-none focus:ring-2 focus:ring-[#8C0902] resize-none h-24"
              placeholder="Any damage? How old is it?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full justify-center">
          Post Listing
        </Button>
      </form>
    </Modal>
  )
}
