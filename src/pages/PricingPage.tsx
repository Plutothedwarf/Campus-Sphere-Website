import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
const STUDENT_PLANS = [
  {
    chip: 'free' as const,
    name: 'Free',
    price: 'Rs 0',
    period: 'always',
    color: '#2EC4A0',
    features: [
      { label: 'Buy requests', value: '5 per month' },
      { label: 'Categories (Swap)', value: '1 category' },
      { label: 'Active listings (Swap)', value: '3 listings' },
      { label: 'Seller premium markup', value: 'No' },
      { label: 'Verified seller badge', value: 'No' },
      { label: 'Priority placement', value: 'No' },
      { label: 'Convenience fee', value: 'Rs 20 per item' },
      { label: 'Calendar access', value: 'Yes' },
      { label: 'Basic volunteer sign-up', value: 'Yes' },
      { label: 'Profile preferences', value: 'No' },
      { label: 'Digital certificates', value: 'No' },
    ],
  },
  {
    chip: 'freemium' as const,
    name: 'Freemium',
    price: 'Rs 99',
    period: '/month',
    color: '#FFD23F',
    highlight: false,
    features: [
      { label: 'Buy requests', value: '5 per month' },
      { label: 'Categories (Swap)', value: 'All categories' },
      { label: 'Active listings (Swap)', value: 'Unlimited' },
      { label: 'Seller premium markup', value: '+5% added to price' },
      { label: 'Verified seller badge', value: 'No' },
      { label: 'Priority placement', value: 'No' },
      { label: 'Convenience fee', value: 'Rs 20 per item' },
      { label: 'Calendar access', value: 'Yes' },
      { label: 'Basic volunteer sign-up', value: 'Yes' },
      { label: 'Profile preferences', value: 'Yes' },
      { label: 'Digital certificates', value: 'No' },
    ],
  },
  {
    chip: 'premium' as const,
    name: 'Premium',
    price: 'Rs 199',
    period: '/month',
    color: '#FF5FA2',
    highlight: true,
    features: [
      { label: 'Buy requests', value: 'Unlimited' },
      { label: 'Categories (Swap)', value: 'All categories' },
      { label: 'Active listings (Swap)', value: 'Unlimited' },
      { label: 'Seller premium markup', value: 'Enabled' },
      { label: 'Verified seller badge', value: 'Yes' },
      { label: 'Priority placement', value: 'Yes' },
      { label: 'Convenience fee', value: 'Waived' },
      { label: 'Calendar access', value: 'Yes' },
      { label: 'Basic volunteer sign-up', value: 'Yes' },
      { label: 'Profile preferences', value: 'Yes' },
      { label: 'Digital certificates', value: 'Yes' },
    ],
  },
]

const CLUB_PLANS = [
  {
    chip: 'club-free' as const,
    name: 'Club Free',
    price: 'Rs 0',
    period: 'always',
    color: '#2EC4A0',
    features: [
      { label: 'Events per month', value: '3 events' },
      { label: 'Passes per event', value: '50 passes' },
      { label: 'QR pass scanning', value: 'No' },
      { label: 'Volunteer pipeline board', value: 'No' },
      { label: 'Financials and splits', value: 'No' },
      { label: 'Bulk certificates', value: 'No' },
      { label: 'Basic volunteer sign-ups', value: 'Yes' },
    ],
  },
  {
    chip: 'club-pro' as const,
    name: 'Club Pro',
    price: 'Rs 699',
    period: '/month',
    color: '#7C5CFF',
    highlight: true,
    features: [
      { label: 'Events per month', value: 'Unlimited' },
      { label: 'Passes per event', value: 'Unlimited' },
      { label: 'QR pass scanning', value: 'Yes' },
      { label: 'Volunteer pipeline board', value: 'Yes' },
      { label: 'Financials and splits', value: 'Yes' },
      { label: 'Bulk certificates', value: 'Yes' },
      { label: 'Basic volunteer sign-ups', value: 'Yes' },
    ],
  },
]

const MARKER = {
  yes: <span className="text-[#839958] font-black text-lg">+</span>,
  no: <span className="text-[#210100]/30 font-black text-lg">-</span>,
}

function marker(val: string) {
  if (val === 'Yes' || val === 'Unlimited' || val === 'Enabled' || val === 'Waived') return MARKER.yes
  if (val === 'No') return MARKER.no
  return null
}

export default function PricingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-carnival text-[#F7F4D5] overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Hero */}
      <section className="py-24 px-4 text-center relative z-10">
        <h1 className="font-display text-6xl md:text-8xl text-[#F7F4D5] uppercase tracking-tighter drop-shadow-lg leading-none mt-12 mb-4">
          Simple pricing.
        </h1>
        <p className="font-serif italic text-3xl text-[#E6A341] max-w-xl mx-auto">
          One student subscription unlocks both Campus Swap and ClubHub. Club admins have their own separate plan.
        </p>
      </section>

      {/* Student Plans */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-5xl text-[#F7F4D5] uppercase tracking-tighter mb-12 text-center">
            Student Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {STUDENT_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative bg-[#F7F4D5] text-[#210100] p-8 shadow-[var(--shadow-soft)] flex flex-col ${plan.highlight ? 'border-4 border-[#8C0902]' : 'border border-[#210100]/20'}`}
                style={{ rotate: [-2, 0, 2][i] }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280 }}
              >
                <div className="mb-6 border-b-2 border-[#210100]/20 pb-6">
                  <Chip variant={plan.chip} />
                  <p className="font-display text-5xl text-[#8C0902] mt-4 tracking-tighter">{plan.price}</p>
                  <p className="font-serif italic text-[#210100]/70 text-lg">{plan.period}</p>
                </div>
                
                <div className="flex-1 flex flex-col gap-4 mb-8">
                  {plan.features.map(f => (
                    <div key={f.label} className="flex justify-between items-center border-b border-[#210100]/10 pb-2">
                      <span className="font-serif italic text-[#210100]/80">{f.label}</span>
                      <span className="font-mono text-sm uppercase tracking-widest text-[#210100] text-right ml-4">
                        {marker(f.value) === null ? f.value : marker(f.value)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => navigate('/login?role=student')}
                  >
                    {i === 0 ? 'Start free' : `Get ${plan.name}`}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#210100] border-2 border-dashed border-[#E6A341]/40 max-w-3xl mx-auto text-center">
            <p className="font-display text-3xl text-[#E6A341] uppercase tracking-tighter mb-2">Important: Convenience fee</p>
            <p className="font-serif italic text-xl text-[#F7F4D5]/80">
              Free and Freemium buyers pay Rs 20 convenience fee per purchase. Premium buyers get this waived. Freemium sellers have a 5% markup added on top of their listed price.
            </p>
          </div>
        </div>
      </section>

      {/* Club Plans */}
      <section className="bg-[#0A3323] py-24 px-4 relative overflow-hidden mt-12 border-y-2 border-[#839958]/30">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-5xl text-[#F7F4D5] uppercase tracking-tighter mb-4 text-center">
            Club Admin Plans
          </h2>
          <p className="font-serif italic text-2xl text-[#839958] mb-12 text-center">Run events. Manage volunteers. Handle money.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {CLUB_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative bg-[#F7F4D5] text-[#210100] p-8 shadow-[var(--shadow-soft)] flex flex-col ${plan.highlight ? 'border-4 border-[#8C0902]' : 'border border-[#210100]/20'}`}
                style={{ rotate: [-1.5, 1.5][i] }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280 }}
              >
                <div className="mb-6 border-b-2 border-[#210100]/20 pb-6">
                  <Chip variant={plan.chip} />
                  <p className="font-display text-5xl text-[#8C0902] mt-4 tracking-tighter">{plan.price}</p>
                  <p className="font-serif italic text-[#210100]/70 text-lg">{plan.period}</p>
                </div>
                
                <div className="flex-1 flex flex-col gap-4 mb-8">
                  {plan.features.map(f => (
                    <div key={f.label} className="flex justify-between items-center border-b border-[#210100]/10 pb-2">
                      <span className="font-serif italic text-[#210100]/80">{f.label}</span>
                      <span className="font-mono text-sm uppercase tracking-widest text-[#210100] text-right ml-4">
                        {marker(f.value) === null ? f.value : marker(f.value)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => navigate('/login?role=club')}
                  >
                    {i === 0 ? 'Start free' : 'Get Club Pro'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Notes */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h2 className="font-display text-5xl text-[#E6A341] uppercase tracking-tighter text-center mb-4">Quick clarifications</h2>
          {[
            ['Does free tier expire?', 'Never. Free is free forever.'],
            ['Do I pay for Swap and ClubHub separately?', 'One student subscription covers both. No double billing.'],
            ['Can I switch tiers?', 'Yes, upgrade or downgrade whenever. In demo mode, use the ⚡ panel.'],
            ['Are there separate club admin accounts?', 'Club accounts are separate from student accounts. Same email domain, different flow.'],
            ['What happens to my active listings if I downgrade?', 'Existing listings stay active. New ones are blocked by the limit.'],
          ].map(([q, a]) => (
            <div key={q} className="border-2 border-[#E6A341]/20 p-6 bg-[#210100]">
              <p className="font-display text-2xl text-[#F7F4D5] mb-2">{q}</p>
              <p className="font-serif italic text-xl text-[#F7F4D5]/70">{a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 flex flex-col items-center gap-6">
          <Button size="lg" variant="primary" onClick={() => navigate('/login?role=student')}>
            Get started for free
          </Button>
          <button onClick={() => navigate('/')} className="font-mono text-sm uppercase tracking-widest text-[#E6A341] hover:text-[#F7F4D5] transition-colors">
            Back to home
          </button>
        </div>
      </section>
    </div>
  )
}
