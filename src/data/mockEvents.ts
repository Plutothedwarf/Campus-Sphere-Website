import type { Event } from '../store/useAppStore'


export const EVENT_CATEGORIES = ['Tech', 'Cultural', 'Sports', 'Workshop', 'Social']

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Hackathon 2026: Code The Future',
    description: '48-hour intense coding marathon with tracks in AI/ML, Web3, and Open Innovation. Hardware kits, mentor sessions, meals, and midnight pizza included. Total prize pool: ₹75,000.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 5, // 5 days from now
    location: 'Main Auditorium & Innovation Lab',
    clubId: 'eclub',
    clubName: 'Entrepreneurship Cell',
    capacity: 200,
    rsvps: [],
    volunteers: [],
    volunteersNeeded: 10,
    category: 'Tech',
    images: ['/images/events/hackathon poster.jpg', '/images/events/poster 1.jpeg']
  },
  {
    id: 'e2',
    title: 'Inter-College Parliamentary Debate',
    description: 'Flagship Oxford-style debating championship. Motions span global economics, digital privacy, and ethical AI governance. Adjudicated by national circuit adjudicators.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days from now
    location: 'Seminar Hall B, Block 3',
    clubId: 'debate',
    clubName: 'Debate Society',
    capacity: 80,
    rsvps: ['demo.student@somaiya.edu'],
    volunteers: [],
    volunteersNeeded: 4,
    category: 'Cultural',
    images: ['/images/events/debating event poster.jpeg', '/images/events/youth parliament poster.jpeg']
  },
  {
    id: 'e3',
    title: 'Youth Parliament Summit 2026',
    description: 'Simulated Lok Sabha and Rajya Sabha sessions tackling sustainable urban policy and student welfare reforms. Formal Indian attire recommended. Delegate kits and certificates provided.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days from now
    location: 'Central Amphitheatre',
    clubId: 'yps',
    clubName: 'Youth Parliament Society',
    capacity: 150,
    rsvps: [],
    volunteers: [],
    volunteersNeeded: 8,
    category: 'Social',
    images: ['/images/events/youth parliament poster.jpeg']
  },
  {
    id: 'e4',
    title: 'RoboWars Arena: Clash of Titans',
    description: 'High-torque heavyweight and featherweight combat bot showdown. Arena equipped with pneumatic flippers, rotating blades, and flame hazard zones. Safety goggles mandatory.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 10, // 10 days from now
    location: 'Indoor Sports Complex',
    clubId: 'robotics',
    clubName: 'Robotics Club',
    capacity: 400,
    rsvps: [],
    volunteers: ['demo.student@somaiya.edu'],
    volunteersNeeded: 15,
    category: 'Tech',
    images: ['/images/events/poster 1.jpeg']
  }
]
