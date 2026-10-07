import { useState } from 'react'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Tabs } from '../../components/Tabs'
import { useAppStore } from '../../store/useAppStore'
import type { Listing } from '../../store/useAppStore'

import { SWAP_LIMITS } from '../../config/plans'
import { ListingCard } from '../../components/ListingCard'
import { CreateListingModal } from '../../components/CreateListingModal'
import { RequestBuyModal } from '../../components/RequestBuyModal'
import { useToast, ToastContainer } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

// SwapPage
export default function SwapPage() {
  const { user, studentTier, requestCount, activeListingCount, incrementRequest, addListing, deleteListing, listings } = useAppStore()
  const limits = SWAP_LIMITS[studentTier]
  const navigate = useNavigate()
  const { toasts, showToast, removeToast } = useToast()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  
  // Handlers
  const handleCreateListing = (data: any) => {
    addListing({
      ...data,
      sellerId: user?.email || '',
      sellerName: user?.name || 'Anonymous',
      images: []
    })
    setIsCreateModalOpen(false)
  }

  const handleRequestAction = (listing: Listing) => {
    if (limits.requestsPerMonth !== Infinity && requestCount >= limits.requestsPerMonth) {
      showToast('Monthly request limit reached. Upgrade your plan.', 'error')
      navigate('/pricing')
      return
    }
    setSelectedListing(listing)
  }

  const handleConfirmRequest = () => {
    const sellerName = selectedListing?.sellerName ?? 'Seller'
    incrementRequest()
    setSelectedListing(null)
    showToast(`Request sent! ${sellerName} will be notified.`, 'success')
  }

  const handleDeleteListing = (id: string) => {
    deleteListing(id)
  }

  // Filter listings
  const myEmail = user?.email || ''
  const myListings = listings.filter(l => l.sellerId === myEmail)
  const feedListings = listings.filter(l => l.sellerId !== myEmail)

  const canCreateListing = limits.activeListings === Infinity || activeListingCount < limits.activeListings

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Background mood lighting */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#0A3323] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="border-b-2 border-[#839958]/30 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-[#839958]/80 mb-2">Marketplace</p>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-[#F7F4D5] mix-blend-difference drop-shadow-lg leading-none">Campus Swap</h1>
            <p className="font-serif italic text-4xl text-[#839958] mt-4">Buy, sell and rent</p>
          </div>
          <div className="self-start md:self-end">
            <Chip variant={studentTier} />
          </div>
        </div>

        {/* Action bar - Designed as a torn paper strip */}
        <div className="mb-16 relative">
           {/* Tape strip */}
           <div className="absolute -top-4 right-10 w-24 h-8 bg-white/20 backdrop-blur-md rotate-[4deg] z-20 mix-blend-screen shadow-sm hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-10 paper-panel relative z-10 transform -rotate-1">
            <div>
              <span className="font-mono text-sm uppercase tracking-widest text-[#210100]/60 border-b border-[#210100]/20 pb-2 mb-2 inline-block">Requests Left</span>
              <div className="font-display text-5xl text-[#0A3323] mt-2">
                {limits.requestsPerMonth === Infinity ? 'Unlimited' : `${Math.max(0, limits.requestsPerMonth - requestCount)}`}
              </div>
            </div>
            <Button 
              size="lg"
              variant="primary" 
              onClick={() => canCreateListing ? setIsCreateModalOpen(true) : navigate('/pricing')}
              className="w-full md:w-auto"
            >
              {canCreateListing ? 'Post New Item' : 'Upgrade to list more'}
            </Button>
          </div>
        </div>

        <Tabs 
          tabs={[
            { id: 'browse', label: 'Browse Feed' },
            { id: 'my-listings', label: `My Listings (${myListings.length})` }
          ]}
        >
          {(activeTab) => (
            <div className="mt-12 grid gap-8">
              {activeTab === 'browse' ? (
                feedListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedListings.map(listing => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        isOwner={false} 
                        onAction={handleRequestAction} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-16 border-2 border-dashed border-[#839958]/30 bg-[#0A3323]/20 text-center relative rotate-1">
                    <p className="font-display text-4xl text-[#F7F4D5] mb-4">It's quiet in here.</p>
                    <p className="font-serif italic text-2xl text-[#839958]">No items in the feed right now.</p>
                  </div>
                )
              ) : (
                myListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myListings.map(listing => (
                      <ListingCard 
                        key={listing.id} 
                        listing={listing} 
                        isOwner={true} 
                        onAction={() => {}} 
                        onDelete={handleDeleteListing}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-16 border-2 border-dashed border-[#839958]/30 bg-[#0A3323]/20 text-center relative rotate-1">
                    <p className="font-display text-4xl text-[#F7F4D5] mb-4">Nothing listed yet.</p>
                    <p className="font-serif italic text-2xl text-[#839958]">Post your first item above.</p>
                  </div>
                )
              )}
            </div>
          )}
        </Tabs>

        <CreateListingModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onSubmit={handleCreateListing}
          categoriesLeft={limits.categories === Infinity ? 'Unlimited' : limits.categories}
        />

        <RequestBuyModal 
          isOpen={!!selectedListing}
          onClose={() => setSelectedListing(null)}
          onConfirm={handleConfirmRequest}
          listing={selectedListing}
          noFee={'noConvenienceFee' in limits ? (limits as any).noConvenienceFee : false}
        />

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  )
}
