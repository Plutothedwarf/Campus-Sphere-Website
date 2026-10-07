import { Modal } from './Modal'
import { Button } from './Button'
import type { Listing } from '../store/useAppStore'

import { BUYER_CONVENIENCE_FEE } from '../config/plans'


interface RequestBuyModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  listing: Listing | null
  noFee: boolean
}

export function RequestBuyModal({ isOpen, onClose, onConfirm, listing, noFee }: RequestBuyModalProps) {
  if (!listing) return null

  const isRent = listing.type === 'rent'
  const fee = noFee ? 0 : BUYER_CONVENIENCE_FEE
  const total = listing.price + fee

  return (
    <Modal open={isOpen} onClose={onClose} title={`Request to ${isRent ? 'Rent' : 'Buy'}`}>

      <div className="flex flex-col gap-4">
        
        {/* Calm zone for details */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-6 border border-[#210100]/20 flex flex-col gap-3 shadow-inner">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-display font-black text-[#210100] text-2xl uppercase tracking-tighter">{listing.title}</p>
              <p className="text-[#210100]/70 font-serif italic text-lg">Sold by {listing.sellerName}</p>
            </div>
            <p className="font-display font-black text-[#8C0902] text-2xl">₹{listing.price}</p>
          </div>

          <div className="h-px bg-[#210100]/10 w-full my-2"></div>

          <div className="flex justify-between items-center text-sm font-mono uppercase tracking-widest">
            <span className="text-[#210100]/70">Platform Fee</span>
            {noFee ? (
              <span className="text-[#839958] font-bold flex gap-2 items-center">
                <del className="text-[#210100]/40 font-normal">₹{BUYER_CONVENIENCE_FEE}</del>
                ₹0 (Premium)
              </span>
            ) : (
              <span className="text-[#210100] font-bold">₹{fee}</span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-display font-black text-[#210100] text-xl uppercase tracking-tighter">Total {isRent ? 'First Month' : ''}</span>
            <span className="font-display font-black text-[#8C0902] text-3xl">₹{total}</span>
          </div>
        </div>

        {/* Warning / info area */}
        <div className="bg-[#E6A341]/10 rounded-xl p-4 border border-[#E6A341]/30 flex items-start gap-3">
          <div className="mt-1 text-[#E6A341]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#E6A341] mb-1">How this works</p>
            <p className="font-body text-[#210100]/70 text-xs mt-1 leading-relaxed">
              We will notify {listing.sellerName} that you're interested. 
              Once they accept, you'll get their contact details to arrange pickup. 
              The fee is only charged if the swap is successful.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button variant="secondary" className="flex-1 justify-center bg-white/50 backdrop-blur-md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1 justify-center" onClick={onConfirm}>
            Send Request
          </Button>
        </div>
      </div>
    </Modal>
  )
}
