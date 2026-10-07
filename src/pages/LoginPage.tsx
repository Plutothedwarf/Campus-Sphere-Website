// LoginPage
import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useAppStore } from '../store/useAppStore'
import { CAMPUS_DOMAIN, CLUBS } from '../config/plans'

type Step = 'email' | 'otp' | 'club-picker' | 'verifying' | 'done'

const DEMO_EMAIL_STUDENT = 'demo.student' + CAMPUS_DOMAIN
const DEMO_EMAIL_CLUB = 'demo.club' + CAMPUS_DOMAIN

function extractName(email: string) {
  return email
    .split('@')[0]
    .split('.')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function LoginPage() {
  const [params] = useSearchParams()
  const role = (params.get('role') || 'student') as 'student' | 'club'
  const navigate = useNavigate()
  const login = useAppStore(s => s.login)
  const setRole = useAppStore(s => s.setRole)

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [selectedClub, setSelectedClub] = useState(CLUBS[0])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const isClub = role === 'club'

  const validateEmail = (val: string) => {
    if (!val) return 'Enter your college email.'
    if (!val.endsWith(CAMPUS_DOMAIN)) return `Email must end with ${CAMPUS_DOMAIN}`
    return ''
  }

  const handleEmailSubmit = () => {
    const err = validateEmail(email)
    if (err) { setEmailError(err); return }
    setEmailError('')
    setStep('otp')
  }

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus()
    }
  }

  const handleOtpSubmit = () => {
    const code = otp.join('')
    if (code.length < 6) { setOtpError('Enter all 6 digits.'); return }
    setOtpError('')
    setStep(isClub ? 'club-picker' : 'verifying')
    if (!isClub) {
      setTimeout(() => {
        finishLogin()
      }, 1200)
    }
  }

  const handleClubSubmit = () => {
    setStep('verifying')
    setTimeout(() => {
      finishLogin()
    }, 1200)
  }

  const finishLogin = () => {
    setRole(role)
    login(
      {
        name: extractName(email),
        email,
        avatarSeed: email,
        clubId: isClub ? selectedClub.id : undefined,
        clubName: isClub ? selectedClub.name : undefined,
      },
      role
    )
    navigate(role === 'club' ? '/app/dashboard' : '/app/home')
  }

  const useDemoAccount = () => {
    const demoEmail = isClub ? DEMO_EMAIL_CLUB : DEMO_EMAIL_STUDENT
    setEmail(demoEmail)
    setOtp(['1', '2', '3', '4', '5', '6'])
    setStep('verifying')
    setTimeout(() => {
      setRole(role)
      login(
        {
          name: isClub ? 'Demo Club' : 'Demo Student',
          email: demoEmail,
          avatarSeed: demoEmail,
          clubId: isClub ? CLUBS[0].id : undefined,
          clubName: isClub ? CLUBS[0].name : undefined,
        },
        role
      )
      navigate(role === 'club' ? '/app/dashboard' : '/app/home')
    }, 1200)
  }

  return (
    <div className={`min-h-screen bg-carnival flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-1000`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Brand header */}
      <button onClick={() => navigate('/')} className="mb-12 flex flex-col items-center gap-0 hover:opacity-80 transition-opacity z-10">
        <span className="font-display text-[#F7F4D5] text-5xl uppercase tracking-tighter mix-blend-difference">Campusphere</span>
      </button>

      <div className="w-full max-w-md paper-panel p-8 md:p-12 relative z-10 transform -rotate-1">
        <AnimatePresence mode="wait">
          {/* Email step */}
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="font-display uppercase tracking-widest text-[#8C0902] text-3xl mb-1">
                  {isClub ? 'Club Admin' : 'Student'}
                </h1>
                <p className="font-serif italic text-[#210100]/80 text-lg">
                  Sign in with {CAMPUS_DOMAIN}
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  label="College email"
                  type="email"
                  placeholder={`you${CAMPUS_DOMAIN}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  error={emailError}
                  onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                  autoFocus
                />

                <Button variant="primary" className="w-full justify-center mt-2" onClick={handleEmailSubmit}>
                  Send Verification
                </Button>
              </div>

              <div className="flex flex-col items-center gap-3 mt-4">
                <button
                  onClick={useDemoAccount}
                  className="font-mono text-xs uppercase tracking-widest text-[#210100]/60 hover:text-[#210100] transition-colors border-b border-transparent hover:border-[#210100]/50"
                >
                  Skip with Demo Account
                </button>
              </div>
            </motion.div>
          )}

          {/* OTP step */}
          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center relative">
                <button onClick={() => setStep('email')} className="absolute -left-2 top-0 font-mono text-xs text-[#210100]/60 hover:text-[#8C0902] p-1">
                  ←
                </button>
                <h1 className="font-display uppercase tracking-widest text-[#8C0902] text-3xl mb-1">Enter Code</h1>
                <p className="font-serif italic text-[#210100]/80 text-lg">
                  Sent to <span className="text-[#8C0902]">{email}</span>
                </p>
              </div>

              {/* OTP boxes */}
              <div className="flex gap-2 justify-center py-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="w-12 h-14 text-center text-2xl font-mono text-[#210100] bg-transparent border-b-2 border-[#210100]/20 focus:border-[#8C0902] focus:outline-none focus:bg-[#210100]/5 transition-all rounded-t-sm"
                  />
                ))}
              </div>

              {otpError && <p className="text-[#8C0902] text-xs font-mono uppercase text-center">{otpError}</p>}

              <Button variant="primary" className="w-full justify-center" onClick={handleOtpSubmit}>
                Verify
              </Button>
            </motion.div>
          )}

          {/* Club picker step */}
          {step === 'club-picker' && (
            <motion.div
              key="club-picker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="font-display uppercase tracking-widest text-[#8C0902] text-3xl mb-1">Select Club</h1>
                <p className="font-serif italic text-[#210100]/80 text-lg">Which organization are you managing?</p>
              </div>

              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                {CLUBS.map(club => (
                  <button
                    key={club.id}
                    onClick={() => setSelectedClub(club)}
                    className={[
                      'flex items-center gap-4 p-4 text-left font-mono text-sm transition-all border border-[#210100]/10 rounded-xl',
                      selectedClub.id === club.id
                        ? 'bg-[#210100]/10 border-[#210100]/30 text-[#210100]'
                        : 'hover:bg-[#210100]/5 text-[#210100]/80',
                    ].join(' ')}
                  >
                    <span className="text-2xl">{club.emoji}</span>
                    <span className="flex-1 font-display text-xl uppercase tracking-widest">{club.name}</span>
                    {selectedClub.id === club.id && <span>✔</span>}
                  </button>
                ))}
              </div>

              <Button variant="primary" className="w-full justify-center mt-2" onClick={handleClubSubmit}>
                Continue as {selectedClub.name}
              </Button>
            </motion.div>
          )}

          {/* Verifying animation */}
          {step === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-12"
            >
              <div className="w-16 h-16 border-4 border-[#210100]/10 border-t-[#8C0902] rounded-full animate-spin"></div>
              <div className="text-center">
                <p className="font-display uppercase tracking-widest text-[#8C0902] text-3xl">Loading...</p>
                <p className="font-serif italic text-[#210100]/80 text-lg mt-1">Preparing your workspace</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Switch role link */}
      <div className="mt-8 z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/40 mb-2">
          {isClub ? 'Not an admin?' : 'Running a club?'}
        </p>
        <button
          onClick={() => navigate(`/login?role=${isClub ? 'student' : 'club'}`)}
          className={`font-serif italic text-[#E6A341] text-2xl underline hover:opacity-80 transition-opacity`}
        >
          {isClub ? 'Student Access' : 'Club Login'}
        </button>
      </div>
    </div>
  )
}
