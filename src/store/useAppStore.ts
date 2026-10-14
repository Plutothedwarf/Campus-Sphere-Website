import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type StudentTier = 'free' | 'freemium' | 'premium'
export type ClubTier = 'free' | 'pro'
export type Role = 'student' | 'club'

export interface User {
  name: string
  email: string
  avatarSeed: string
  clubId?: string
  clubName?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: number
  location: string
  clubId: string
  clubName: string
  capacity: number
  rsvps: string[] // User emails
  volunteers: string[] // User emails
  volunteersNeeded: number
  category: string
  images?: string[]
}

export interface AppState {
  // Auth
  user: User | null
  role: Role
  studentTier: StudentTier
  clubTier: ClubTier
  isLoggedIn: boolean

  // ClubHub data
  events: Event[]

  // Actions
  login: (user: User, role: Role) => void
  logout: () => void
  setStudentTier: (tier: StudentTier) => void
  setClubTier: (tier: ClubTier) => void
  setRole: (role: Role) => void
  resetDemoData: () => void

  // ClubHub actions
  addEvent: (event: Omit<Event, 'id' | 'rsvps' | 'volunteers'>) => void
  toggleRsvp: (eventId: string, email: string) => void
  toggleVolunteer: (eventId: string, email: string) => void
}

const DEFAULT_STATE = {
  user: null,
  role: 'student' as Role,
  studentTier: 'free' as StudentTier,
  clubTier: 'free' as ClubTier,
  isLoggedIn: false,
  events: [
    {
      id: 'e1',
      title: 'Hackathon 2026',
      description: '48-hour coding marathon. Food and red bull provided.',
      date: Date.now() + 1000 * 60 * 60 * 24 * 5,
      location: 'Main Auditorium',
      clubId: 'eclub',
      clubName: 'Entrepreneurship Cell',
      capacity: 200,
      rsvps: [],
      volunteers: [],
      volunteersNeeded: 10,
      category: 'Tech',
      images: ['/images/events/hackathon poster.jpg']
    },
    {
      id: 'e2',
      title: 'Inter-college Debate',
      description: 'Topic: Is AI replacing programmers? Prize pool: ₹10,000.',
      date: Date.now() + 1000 * 60 * 60 * 24 * 2,
      location: 'Seminar Hall B',
      clubId: 'debate',
      clubName: 'Debate Society',
      capacity: 50,
      rsvps: ['demo.student@somaiya.edu'],
      volunteers: [],
      volunteersNeeded: 2,
      category: 'Cultural',
      images: ['/images/events/debating event poster.jpeg']
    },
    {
      id: 'e3',
      title: 'Robo Wars',
      description: 'Battle of the bots. Bring your own bot or just watch the carnage.',
      date: Date.now() + 1000 * 60 * 60 * 24 * 10,
      location: 'Sports Complex',
      clubId: 'robotics',
      clubName: 'Robotics Club',
      capacity: 500,
      rsvps: [],
      volunteers: ['demo.student@somaiya.edu'],
      volunteersNeeded: 20,
      category: 'Tech',
      images: ['/images/events/poster 1.jpeg']
    },
    {
      id: 'e4',
      title: 'National Youth Parliament',
      description: 'Mock parliament session focusing on new education policies and youth empowerment.',
      date: Date.now() + 1000 * 60 * 60 * 24 * 14,
      location: 'Main Auditorium',
      clubId: 'debate',
      clubName: 'Debate Society',
      capacity: 150,
      rsvps: [],
      volunteers: [],
      volunteersNeeded: 5,
      category: 'Cultural',
      images: ['/images/events/youth parliament poster.jpeg']
    }
  ] as Event[],
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      login: (user, role) => set({ user, role, isLoggedIn: true }),

      logout: () => set({ ...DEFAULT_STATE }),

      setStudentTier: (tier) => set({ studentTier: tier }),

      setClubTier: (tier) => set({ clubTier: tier }),

      setRole: (role) => set({ role }),

      resetDemoData: () =>
        set({
          events: DEFAULT_STATE.events,
        }),

      addEvent: (eventData) =>
        set((state) => {
          const newEvent: Event = {
            ...eventData,
            id: 'e' + Math.random().toString(36).substring(7),
            rsvps: [],
            volunteers: [],
          }
          return {
            events: [...state.events, newEvent]
          }
        }),
      
      toggleRsvp: (eventId, email) =>
        set((state) => ({
          events: state.events.map(event => {
            if (event.id === eventId) {
              const isRsvpd = event.rsvps.includes(email)
              return {
                ...event,
                rsvps: isRsvpd ? event.rsvps.filter(e => e !== email) : [...event.rsvps, email]
              }
            }
            return event
          })
        })),

      toggleVolunteer: (eventId, email) =>
        set((state) => ({
          events: state.events.map(event => {
            if (event.id === eventId) {
              const isVolunteering = event.volunteers.includes(email)
              return {
                ...event,
                volunteers: isVolunteering ? event.volunteers.filter(e => e !== email) : [...event.volunteers, email]
              }
            }
            return event
          })
        })),
    }),
    {
      name: 'campus-sphere-clubhub-v1',
    }
  )
)
