import type { Event } from '../store/useAppStore'


export const EVENT_CATEGORIES = ['Tech', 'Cultural', 'Sports', 'Workshop', 'Social']

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Hackathon 2026',
    description: '48-hour coding marathon. Food and red bull provided.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 5, // 5 days from now
    location: 'Main Auditorium',
    clubId: 'eclub',
    clubName: 'Entrepreneurship Cell',
    capacity: 200,
    rsvps: [],
    volunteers: [],
    volunteersNeeded: 10,
    category: 'Tech'
  },
  {
    id: 'e2',
    title: 'Inter-college Debate',
    description: 'Topic: Is AI replacing programmers? Prize pool: ₹10,000.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days from now
    location: 'Seminar Hall B',
    clubId: 'debate',
    clubName: 'Debate Society',
    capacity: 50,
    rsvps: ['demo.student@somaiya.edu'],
    volunteers: [],
    volunteersNeeded: 2,
    category: 'Cultural'
  },
  {
    id: 'e3',
    title: 'Robo Wars',
    description: 'Battle of the bots. Bring your own bot or just watch the carnage.',
    date: Date.now() + 1000 * 60 * 60 * 24 * 10, // 10 days from now
    location: 'Sports Complex',
    clubId: 'robotics',
    clubName: 'Robotics Club',
    capacity: 500,
    rsvps: [],
    volunteers: ['demo.student@somaiya.edu'], // Demo student is volunteering here
    volunteersNeeded: 20,
    category: 'Tech'
  }
]
