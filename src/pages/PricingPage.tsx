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
      { label: 'Event discovery & RSVPs', value: 'Unlimited' },
      { label: 'Instant digital QR pass', value: 'Yes' },
      { label: 'Campus calendar & reminders', value: 'Yes' },
      { label: 'Basic volunteer sign-ups', value: 'Yes' },
      { label: 'Profile club preferences', value: 'No' },
      { label: 'Priority early-bird RSVPs', value: 'No' },
      { label: 'Volunteer hours log', value: 'No' },
      { label: 'Verified digital certificates', value: 'No' },
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
      { label: 'Event discovery & RSVPs', value: 'Unlimited' },
      { label: 'Instant digital QR pass', value: 'Yes' },
      { label: 'Campus calendar & reminders', value: 'Yes' },
      { label: 'Basic volunteer sign-ups', value: 'Yes' },
      { label: 'Profile club preferences', value: 'Yes' },
      { label: 'Priority early-bird RSVPs', value: 'Yes' },
      { label: 'Volunteer hours log', value: 'Yes' },
      { label: 'Verified digital certificates', value: 'No' },
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
      { label: 'Event discovery & RSVPs', value: 'Unlimited' },
      { label: 'Instant digital QR pass', value: 'Yes' },
      { label: 'Campus calendar & reminders', value: 'Yes' },
      { label: 'Basic volunteer sign-ups', value: 'Yes' },
      { label: 'Profile club preferences', value: 'Yes' },
      { label: 'Priority early-bird RSVPs', value: 'Yes' },
      { label: 'Volunteer hours log', value: 'Yes' },
      { label: 'Verified digital certificates', value: 'Yes' },
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
          Dedicated student access to every club, event, and volunteer credential across campus. Club organizers have their own pro toolset.
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
            <p className="font-display text-3xl text-[#E6A341] uppercase tracking-tighter mb-2">Verified Event Certificates</p>
            <p className="font-serif italic text-xl text-[#F7F4D5]/80">
              Digital certificates earned on ClubHub feature secure verification stamps and QR codes for extracurricular accreditation, resumes, and portfolio reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Club Plans */}
      <section className="bg-[#1A0503] py-24 px-4 relative overflow-hidden mt-12 border-y-2 border-[#E6A341]/30">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-5xl text-[#F7F4D5] uppercase tracking-tighter mb-4 text-center">
            Club Admin Plans
          </h2>
          <p className="font-serif italic text-2xl text-[#E6A341] mb-12 text-center">Run events. Manage volunteers. Handle finances.</p>

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
            ['Does the student free tier expire?', 'Never. Free is free forever for attending events and volunteering.'],
            ['How do digital QR passes work?', 'Once you RSVP to an event, an entry QR pass is instantly generated in your tickets tab. Club admins scan it at the door.'],
            ['Can I volunteer for any club event?', 'Yes! Any registered student can sign up for open volunteer slots across tech, cultural, and sports fests.'],
            ['Are there separate club admin accounts?', 'Yes, club organizer accounts have distinct tools for ticketing, attendee scanning, volunteer pipelines, and team financials.'],
            ['How are digital certificates issued?', 'Certificates are automatically generated and stamped upon verified attendance or completion of volunteer duties.'],
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
