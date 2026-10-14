import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SOMAIYA_INSTITUTIONS, CATEGORY_COLORS, TYPE_BADGE_COLORS } from '../../data/mockCampus'
import type { Institution, ClubProfile } from '../../data/mockCampus'

const INST_TYPE_LABEL: Record<string, string> = {
  Engineering: 'Engineering',
  Management: 'Management',
  Arts: 'Arts & Commerce',
  Science: 'Science',
  School: 'School',
  Vocational: 'Vocational',
  Sports: 'Sports',
  Performing: 'Performing Arts',
  Design: 'Design & Innovation',
  Humanities: 'Humanities',
  Commerce: 'Commerce',
  JuniorCollege: 'Junior College',
  Primary: 'Primary & Pre-School',
}

const INST_TYPE_COLOR: Record<string, string> = {
  Engineering: '#105666',
  Management: '#E6A341',
  Arts: '#D3968C',
  Science: '#839958',
  School: '#8C0902',
  Vocational: '#210100',
  Sports: '#8C0902',
  Performing: '#D3968C',
  Design: '#E6A341',
  Humanities: '#D3968C',
  Commerce: '#E6A341',
  JuniorCollege: '#839958',
  Primary: '#D3968C',
}

function ClubChit({ club, onClick }: { club: ClubProfile; onClick: () => void }) {
  const catColors = CATEGORY_COLORS[club.category]
  const typeColors = TYPE_BADGE_COLORS[club.type]

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative text-left paper-panel p-5 flex flex-col gap-3 group cursor-pointer overflow-hidden"
      style={{ borderLeft: `4px solid ${club.color}` }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${club.color}10 0%, transparent 60%)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Type + Category badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span
              className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-bold"
              style={{ background: typeColors.bg, color: typeColors.text }}
            >
              {club.type}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-bold"
              style={{ background: catColors.bg, color: catColors.text }}
            >
              {club.category}
            </span>
          </div>

          <h3 className="font-display font-black text-[#210100] text-xl uppercase tracking-tighter leading-tight group-hover:text-[#8C0902] transition-colors">
            {club.name}
          </h3>
          <p className="font-serif italic text-sm text-[#210100]/60 mt-0.5">{club.tagline}</p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-[#210100]/20 flex items-center justify-center group-hover:bg-[#8C0902] group-hover:border-[#8C0902] transition-all duration-200">
          <svg className="w-3.5 h-3.5 text-[#210100]/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#210100]/30" />
          <span className="font-mono text-[10px] text-[#210100]/50 uppercase tracking-widest">{club.members} members</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#210100]/30" />
          <span className="font-mono text-[10px] text-[#210100]/50 uppercase tracking-widest">{club.eventsDone} events hosted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#210100]/30" />
          <span className="font-mono text-[10px] text-[#210100]/50 uppercase tracking-widest">Est. {club.founded}</span>
        </div>
      </div>
    </motion.button>
  )
}

function CollegeAccordion({ institution, isOpen, onToggle }: {
  institution: Institution
  isOpen: boolean
  onToggle: () => void
}) {
  const navigate = useNavigate()
  const color = INST_TYPE_COLOR[institution.type] || '#8C0902'
  const typeLabel = INST_TYPE_LABEL[institution.type] || institution.type

  return (
    <div className="overflow-hidden">
      {/* College Header Row — the clickable trigger */}
      <button
        onClick={onToggle}
        className="w-full text-left relative group"
      >
        <div
          className={`paper-panel p-6 flex items-center justify-between gap-4 transition-all duration-300 ${isOpen ? 'shadow-[var(--shadow-soft-hover)]' : 'hover:shadow-[var(--shadow-soft)]'}`}
          style={isOpen ? { borderLeft: `5px solid ${color}` } : {}}
        >
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Number/Index pill */}
            <div
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-display font-black text-lg transform -rotate-3"
              style={{ background: color, color: '#F7F4D5' }}
            >
              {institution.clubs.length}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold"
                  style={{ background: color + '20', color }}
                >
                  {typeLabel}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#210100]/40">
                  {institution.shortName}
                </span>
              </div>
              <h2 className="font-display font-black text-[#210100] text-xl md:text-2xl uppercase tracking-tighter leading-tight">
                {institution.name}
              </h2>
              <p className="font-mono text-[10px] text-[#210100]/40 uppercase tracking-widest mt-1">
                {institution.clubs.length} {institution.clubs.length === 1 ? 'club / council' : 'clubs & councils'}
              </p>
            </div>
          </div>

          {/* Expand/Collapse indicator */}
          <div className="flex-shrink-0">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 border-2 border-[#210100]/30 flex items-center justify-center font-display text-xl text-[#210100]/60 group-hover:border-[#8C0902] group-hover:text-[#8C0902] transition-colors"
            >
              +
            </motion.div>
          </div>
        </div>
      </button>

      {/* Expanded Club Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="py-4 px-2 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-l-4 ml-4"
              style={{ borderColor: color + '40', background: color + '05' }}
            >
              {institution.clubs.map((club, i) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ClubChit
                    club={club}
                    onClick={() => navigate(`/app/campus/club/${club.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CampusPage() {
  const [openInstitutions, setOpenInstitutions] = useState<Set<string>>(new Set(['kjse']))
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('All')

  const typeFilters = [
    'All',
    'Engineering', 'Management', 'Science', 'Arts', 'Commerce',
    'Humanities', 'Design', 'Performing', 'Sports', 'Vocational',
    'School', 'JuniorCollege', 'Primary'
  ]

  const filteredInstitutions = useMemo(() => {
    return SOMAIYA_INSTITUTIONS.filter(inst => {
      const matchesType = typeFilter === 'All' || inst.type === typeFilter
      const matchesSearch = !searchQuery || (
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.clubs.some(c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      return matchesType && matchesSearch
    })
  }, [searchQuery, typeFilter])

  const totalClubs = SOMAIYA_INSTITUTIONS.reduce((acc, inst) => acc + inst.clubs.length, 0)

  const toggle = (id: string) => {
    setOpenInstitutions(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setOpenInstitutions(new Set(filteredInstitutions.map(i => i.id)))
  const collapseAll = () => setOpenInstitutions(new Set())

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 relative overflow-hidden text-[#F7F4D5]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-overlay pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b-2 border-[#E6A341]/20 pb-8 mb-12"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-[#E6A341]/80 mb-2">Somaiya Vidyavihar University</p>
          <h1 className="font-display text-6xl md:text-9xl text-[#F7F4D5] uppercase tracking-tighter mix-blend-difference drop-shadow-lg leading-none">
            Campus
          </h1>
          <p className="font-serif italic text-2xl text-[#E6A341] mt-4 leading-snug">
            {SOMAIYA_INSTITUTIONS.length} institutions · {totalClubs} clubs & councils
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col gap-4"
        >
          {/* Search bar */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#210100]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search institutions, clubs, councils..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-md text-[#210100] placeholder-[#210100]/40 font-body pl-10 pr-4 py-3 rounded-xl border-2 border-[#210100]/20 focus:outline-none focus:border-[#8C0902] transition-colors shadow-sm"
            />
          </div>

          {/* Type filter pills — horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {typeFilters.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`flex-shrink-0 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 font-bold transition-all ${
                  typeFilter === t
                    ? 'bg-[#8C0902] text-[#F7F4D5] shadow-md'
                    : 'bg-white/60 text-[#210100]/60 hover:bg-white hover:text-[#210100]'
                }`}
              >
                {t === 'JuniorCollege' ? 'Jr College' : t === 'Primary' ? 'Primary' : t}
              </button>
            ))}
          </div>

          {/* Expand / Collapse controls */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/40">
              {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''} shown
            </p>
            <div className="flex gap-3">
              <button
                onClick={expandAll}
                className="font-mono text-[10px] uppercase tracking-widest text-[#E6A341] hover:text-[#F7F4D5] transition-colors"
              >
                Expand All
              </button>
              <span className="text-[#F7F4D5]/20">·</span>
              <button
                onClick={collapseAll}
                className="font-mono text-[10px] uppercase tracking-widest text-[#E6A341] hover:text-[#F7F4D5] transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Institution Accordion List */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredInstitutions.length === 0 ? (
            <div className="text-center py-20 paper-panel">
              <p className="font-display text-4xl text-[#210100] uppercase tracking-tighter mb-2">No results</p>
              <p className="font-serif italic text-[#210100]/60">Try a different search or filter</p>
            </div>
          ) : (
            filteredInstitutions.map((inst, i) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <CollegeAccordion
                  institution={inst}
                  isOpen={openInstitutions.has(inst.id)}
                  onToggle={() => toggle(inst.id)}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Footer note */}
        <div className="mt-16 border-t border-[#E6A341]/20 pt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F7F4D5]/30">
            Is your club missing? Contact your club coordinator to register on Campus Sphere.
          </p>
        </div>
      </div>
    </div>
  )
}
