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
    images: ['/images/swap/headphones.jpg'],
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
    images: ['/images/swap/mathematics books.jpeg'],
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
    images: ['/images/swap/fridge for dorm 1.webp', '/images/swap/fridge for dorm 2.webp'],
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
]
