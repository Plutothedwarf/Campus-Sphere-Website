import { motion } from 'framer-motion'
import type { Listing } from '../store/useAppStore'

import { Chip } from './Chip'
import { Button } from './Button'


interface ListingCardProps {
  listing: Listing
  isOwner: boolean
  onAction: (listing: Listing) => void
  onDelete?: (id: string) => void
}

export function ListingCard({ listing, isOwner, onAction, onDelete }: ListingCardProps) {
  const isRent = listing.type === 'rent'

  return (
    <motion.div
      className="relative paper-panel p-6 flex flex-col gap-4"
      whileHover={{ y: -2 }}
    >


      <div className="flex justify-between items-start gap-4">
        <div>
          <Chip variant="custom" label={listing.category} color="#14110F" textColor="#FFFAED" />
          <h3 className="font-display font-black text-[#210100] text-2xl uppercase tracking-tighter mt-2 leading-tight">
            {listing.title}
          </h3>
          <p className="text-[#210100]/60 font-serif italic text-sm mt-1">
            Sold by {listing.sellerName}
          </p>
        </div>
        <div className="text-right whitespace-nowrap">
          <p className="font-mono font-black text-[#210100] text-2xl">
            ₹{listing.price}
          </p>
          {isRent && <p className="text-[#210100]/70 font-mono text-xs font-bold uppercase">/ month</p>}
        </div>
      </div>

      <p className="font-body text-[#210100]/80 text-sm flex-1">
        {listing.description}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs font-mono uppercase tracking-widest font-bold px-2 py-1 bg-white/50 backdrop-blur-md rounded-lg border border-[#210100]/20">
          Condition: {listing.condition.replace('-', ' ')}
        </span>
      </div>

      <div className="mt-2 flex gap-2">
        {isOwner ? (
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full justify-center bg-white/50 backdrop-blur-md hover:bg-[#8C0902] hover:text-white"
            onClick={() => onDelete?.(listing.id)}
          >
            Remove Listing
          </Button>
        ) : (
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full justify-center"
            onClick={() => onAction(listing)}
          >
            {isRent ? 'Request to Rent' : 'Request to Buy'}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
