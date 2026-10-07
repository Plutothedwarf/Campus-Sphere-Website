import type { Listing } from '../store/useAppStore'


export const SWAP_CATEGORIES = [
  'Electronics',
  'Books',
  'Room Essentials',
  'Fashion',
  'Tickets',
  'Miscellaneous'
]

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Noise Cancelling Headphones',
    description: 'Barely used, comes with the case. Upgraded to AirPods so selling these.',
    price: 3500,
    category: 'Electronics',
    condition: 'like-new',
    type: 'sell',
    sellerId: 'demo.student@somaiya.edu', // match demo user so they can delete it
    sellerName: 'Demo Student',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
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
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: 'l3',
    title: 'Mini Fridge for Dorm',
    description: 'Renting out my mini fridge for the semester. Works perfectly, freezes water in 2 hours.',
    price: 500, // per month rent
    category: 'Room Essentials',
    condition: 'good',
    type: 'rent',
    sellerId: 'other2@somaiya.edu',
    sellerName: 'Priya Singh',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
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
    createdAt: Date.now() - 1000 * 60 * 15, // 15 mins ago
  }
]
