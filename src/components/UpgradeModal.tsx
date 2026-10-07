import { Modal } from './Modal'
import { Button } from './Button'
import { Chip } from './Chip'
import type { ReactNode } from 'react'

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
  feature: string
  requiredTier: 'freemium' | 'premium' | 'club-pro'
}

const TIER_INFO = {
  freemium: {
    label: 'Freemium',
    price: 'Rs 99/mo',
    chip: 'freemium' as const,
    color: '#FFD23F',
    perks: ['Unlimited categories in Swap', 'Profile preferences in ClubHub', '5 buy requests per month'],
  },
  premium: {
    label: 'Premium',
    price: 'Rs 199/mo',
    chip: 'premium' as const,
    color: '#FF5FA2',
    perks: ['Everything in Freemium', 'Unlimited buy requests', 'Verified seller badge', 'Digital certificates', 'No convenience fee'],
  },
  'club-pro': {
    label: 'Club Pro',
    price: 'Rs 699/mo',
    chip: 'club-pro' as const,
    color: '#7C5CFF',
    perks: ['Unlimited events and passes', 'QR pass scanning', 'Volunteer pipeline board', 'Financials and split money', 'Bulk certificates'],
  },
}

export const UpgradeModal = ({ open, onClose, feature, requiredTier }: UpgradeModalProps) => {
  const info = TIER_INFO[requiredTier]

  return (
    <Modal open={open} onClose={onClose} clean>
      <div className="text-center flex flex-col items-center gap-4">
        <div className="text-5xl">🔒</div>
        <div>
          <p className="text-sm font-body text-[#210100]/70 mb-1">This feature needs</p>
          <Chip variant={info.chip} className="text-base px-4 py-1.5" />
        </div>
        <div
          className="w-full rounded-xl border border-[#210100]/20 p-4 text-left shadow-sm"
          style={{ backgroundColor: info.color + '33' }}
        >
          <p className="font-mono font-bold text-[#210100] mb-2 text-sm uppercase tracking-wide">{feature} needs {info.label}</p>
          <ul className="flex flex-col gap-1.5">
            {info.perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-body text-[#210100]">
                <span className="text-[#839958] font-black">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <Button variant="primary" className="w-full justify-center">
            Upgrade to {info.label} at {info.price}
          </Button>
          <button onClick={onClose} className="text-sm text-[#210100]/60 hover:text-[#210100] font-body underline">
            Not now
          </button>
        </div>
        <p className="text-xs text-[#210100]/50 font-body">Demo mode: switch tier in the demo panel (Ctrl+Shift+D)</p>
      </div>
    </Modal>
  )
}

// LockedFeature: blurs content and shows upgrade prompt
interface LockedFeatureProps {
  children: ReactNode
  locked: boolean
  feature: string
  requiredTier: 'freemium' | 'premium' | 'club-pro'
}

import { useState } from 'react'

export const LockedFeature = ({ children, locked, feature, requiredTier }: LockedFeatureProps) => {
  const [showUpgrade, setShowUpgrade] = useState(false)

  if (!locked) return <>{children}</>

  const info = TIER_INFO[requiredTier]

  return (
    <>
      <div className="relative" onClick={() => setShowUpgrade(true)}>
        <div className="blur-sm pointer-events-none select-none">{children}</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#210100]/80 backdrop-blur-sm rounded-none cursor-pointer gap-2 border border-[#F7F4D5]/20">
          <span className="text-3xl drop-shadow-md">🔒</span>
          <Chip variant={info.chip} />
          <p className="text-xs font-display tracking-widest uppercase text-[#F7F4D5]/70">Tap to upgrade</p>
        </div>
      </div>
      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        feature={feature}
        requiredTier={requiredTier}
      />
    </>
  )
}
