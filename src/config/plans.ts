// Business rule constants for Campusphere
// No em dashes anywhere in this file

export const CAMPUS_DOMAIN = '@somaiya.edu'

export const STUDENT_TIERS = {
  FREE: 'free',
  FREEMIUM: 'freemium',
  PREMIUM: 'premium',
} as const

export const CLUB_TIERS = {
  FREE: 'free',
  PRO: 'pro',
} as const

export const STUDENT_PRICES = {
  free: 0,
  freemium: 99,
  premium: 199,
}

export const CLUB_PRICES = {
  free: 0,
  pro: 699,
}

// ClubHub student rules
export const CLUBHUB_STUDENT_LIMITS = {
  free: {
    calendar: true,
    basicVolunteer: true,
    profilePreferences: false,
    digitalCertificates: false,
    priorityRsvp: false,
    volunteerHoursTracking: false,
  },
  freemium: {
    calendar: true,
    basicVolunteer: true,
    profilePreferences: true,
    digitalCertificates: false,
    priorityRsvp: true,
    volunteerHoursTracking: true,
  },
  premium: {
    calendar: true,
    basicVolunteer: true,
    profilePreferences: true,
    digitalCertificates: true,
    priorityRsvp: true,
    volunteerHoursTracking: true,
  },
}


// Club limits
export const CLUB_LIMITS = {
  free: {
    eventsPerMonth: 3,
    passesPerEvent: 50,
    qrScanning: false,
    volunteerPipeline: false,
    financials: false,
    bulkCertificates: false,
  },
  pro: {
    eventsPerMonth: Infinity,
    passesPerEvent: Infinity,
    qrScanning: true,
    volunteerPipeline: true,
    financials: true,
    bulkCertificates: true,
  },
}

export const CLUBS = [
  { id: 'debate', name: 'Debate Society', emoji: '🎙' },
  { id: 'robotics', name: 'Robotics Club', emoji: '🤖' },
  { id: 'cultural', name: 'Cultural Committee', emoji: '🎭' },
  { id: 'eclub', name: 'Entrepreneurship Cell', emoji: '💡' },
]
