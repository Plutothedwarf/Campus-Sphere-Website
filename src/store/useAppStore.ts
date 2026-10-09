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

export type ListingCondition = 'new' | 'like-new' | 'good' | 'fair'
export type ListingType = 'sell' | 'rent'

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: ListingCondition
  type: ListingType
  sellerId: string
  sellerName: string
  images: string[]
  createdAt: number
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

  // Swap counters
  requestCount: number
  categoriesUsed: string[]
  activeListingCount: number
  
  // Swap data
  listings: Listing[]

  // ClubHub data
  events: Event[]

  // Actions
  login: (user: User, role: Role) => void
  logout: () => void
  setStudentTier: (tier: StudentTier) => void
  setClubTier: (tier: ClubTier) => void
  setRole: (role: Role) => void
  incrementRequest: () => void
  addCategory: (cat: string) => void
  incrementListing: () => void
  decrementListing: () => void
  resetDemoData: () => void

  // Swap actions
  addListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => void
  deleteListing: (id: string) => void

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
  requestCount: 0,
  categoriesUsed: [],
  activeListingCount: 1, // Demo student starts with 1 active listing
  listings: [
    {
      id: 'l1',
      title: 'Noise Cancelling Headphones',
      description: 'Barely used, comes with the case. Upgraded to AirPods so selling these.',
      price: 3500,
      category: 'Electronics',
      condition: 'like-new',
      type: 'sell',
      sellerId: 'demo.student@somaiya.edu',
      sellerName: 'Demo Student',
      images: ['/images/swap/headphones.jpg'],
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: 'l2',
      title: 'Engineering Mathematics (4th Ed)',
      description: 'A bit worn out but no pages missing. Has some highlights.',
      price: 450,
      category: 'Books',
      condition: 'fair',
      type: 'sell',
      sellerId: 'other1@somaiya.edu',
      sellerName: 'Rahul Kumar',
      images: ['/images/swap/mathematics books.jpeg'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
    {
      id: 'l3',
      title: 'Mini Fridge for Dorm',
      description: 'Renting out my mini fridge for the semester. Works perfectly, freezes water in 2 hours.',
      price: 500,
      category: 'Room Essentials',
      condition: 'good',
      type: 'rent',
      sellerId: 'other2@somaiya.edu',
      sellerName: 'Priya Singh',
      images: ['/images/swap/fridge for dorm 1.webp', '/images/swap/fridge for dorm 2.webp'],
      createdAt: Date.now() - 1000 * 60 * 60 * 48,
    },
    {
      id: 'l4',
      title: 'Coldplay Concert Tickets x2',
      description: 'Cannot go due to mid-terms :( Selling at original price, no scalping.',
      price: 12000,
      category: 'Tickets',
      condition: 'new',
      type: 'sell',
      sellerId: 'other3@somaiya.edu',
      sellerName: 'Aditya V',
      images: [],
      createdAt: Date.now() - 1000 * 60 * 15,
    },
    {
      id: 'l5',
      title: 'Casio Scientific Calculator Fx-991ES',
      description: 'Works perfectly, used it for 2 semesters. No scratches.',
      price: 600,
      category: 'Electronics',
      condition: 'good',
      type: 'sell',
      sellerId: 'other4@somaiya.edu',
      sellerName: 'Karan M',
      images: ['/images/swap/calculator.jpeg'],
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: 'l6',
      title: 'Lab Coat (Size M)',
      description: 'Clean, washed lab coat. Only wore it a few times for chemistry lab.',
      price: 250,
      category: 'Miscellaneous',
      condition: 'like-new',
      type: 'sell',
      sellerId: 'other5@somaiya.edu',
      sellerName: 'Sneha P',
      images: ['/images/swap/labcoat.jpeg'],
      createdAt: Date.now() - 1000 * 60 * 60 * 12,
    }
  ] as Listing[],
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

      incrementRequest: () =>
        set((state) => ({ requestCount: state.requestCount + 1 })),

      addCategory: (cat) =>
        set((state) => ({
          categoriesUsed: state.categoriesUsed.includes(cat)
            ? state.categoriesUsed
            : [...state.categoriesUsed, cat],
        })),

      incrementListing: () =>
        set((state) => ({ activeListingCount: state.activeListingCount + 1 })),

      decrementListing: () =>
        set((state) => ({
          activeListingCount: Math.max(0, state.activeListingCount - 1),
        })),

      resetDemoData: () =>
        set({
          requestCount: 0,
          categoriesUsed: [],
          activeListingCount: 1,
          listings: DEFAULT_STATE.listings,
          events: DEFAULT_STATE.events,
        }),

      addListing: (listingData) =>
        set((state) => {
          const newListing: Listing = {
            ...listingData,
            id: 'l' + Math.random().toString(36).substring(7),
            createdAt: Date.now(),
          }
          return {
            listings: [newListing, ...state.listings],
            activeListingCount: state.activeListingCount + 1,
            categoriesUsed: state.categoriesUsed.includes(listingData.category)
              ? state.categoriesUsed
              : [...state.categoriesUsed, listingData.category],
          }
        }),

      deleteListing: (id) =>
        set((state) => ({
          listings: state.listings.filter((l) => l.id !== id),
          activeListingCount: Math.max(0, state.activeListingCount - 1),
        })),

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
      name: 'campus-sphere-v2',
    }
  )
)
