
import { AirportRide, Tour, ServiceCategory, NavItem, Feedback } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Airport Rides', path: '/airport-rides' },
  { label: 'Tour Experiences', path: '/tours' },
  { label: 'Art Tours', path: '/art-tours' },
  { label: 'Feedback', path: '/feedback' },
];

export const AIRPORT_RIDES: AirportRide[] = [
  {
    id: 'ride001',
    name: 'Standard Sedan (Airport to City)',
    description: 'Comfortable sedan for up to 3 passengers. Ideal for solo travelers or couples.',
    price: 35,
    imageUrl: 'https://picsum.photos/seed/sedanride/600/400',
    category: ServiceCategory.AIRPORT_RIDE,
    vehicleType: 'Sedan',
    capacity: 3,
  },
  {
    id: 'ride002',
    name: 'SUV/Minivan (Airport to City)',
    description: 'Spacious SUV or Minivan for up to 5 passengers with extra luggage space.',
    price: 55,
    imageUrl: 'https://picsum.photos/seed/suvride/600/400',
    category: ServiceCategory.AIRPORT_RIDE,
    vehicleType: 'SUV/Minivan',
    capacity: 5,
  },
  {
    id: 'ride003',
    name: 'Luxury Sedan (Airport to City)',
    description: 'Travel in style with our premium luxury sedan service. Includes refreshments.',
    price: 75,
    imageUrl: 'https://picsum.photos/seed/luxuryride/600/400',
    category: ServiceCategory.AIRPORT_RIDE,
    vehicleType: 'Luxury Sedan',
    capacity: 3,
  },
];

export const TOUR_EXPERIENCES: Tour[] = [
  {
    id: 'tour001',
    name: 'Harare City Exploration',
    description: 'A comprehensive tour of Harare\'s key landmarks, markets, and historical sites.',
    price: 80,
    imageUrl: 'https://picsum.photos/seed/hararecity/600/400',
    category: ServiceCategory.TOUR_EXPERIENCE,
    duration: 'Approx. 5 Hours',
    highlights: ['National Heroes Acre', 'Mbare Musika', 'Chapungu Sculpture Park', 'Parliament Building'],
  },
  {
    id: 'tour002',
    name: 'Great Zimbabwe Ruins Day Trip',
    description: 'Journey to the ancient city of Great Zimbabwe, a UNESCO World Heritage site.',
    price: 250, // Includes transport and guide
    imageUrl: 'https://picsum.photos/seed/greatzimbabwe/600/400',
    category: ServiceCategory.TOUR_EXPERIENCE,
    duration: 'Full Day (Approx. 12 Hours)',
    highlights: ['Explore the Hill Complex', 'The Great Enclosure', 'Valley Ruins', 'Learn about Shona history'],
  },
  {
    id: 'tour003',
    name: 'Chinhoyi Caves Adventure',
    description: 'Discover the stunning cobalt blue waters of the Chinhoyi Caves system.',
    price: 120,
    imageUrl: 'https://picsum.photos/seed/chinhoyicaves/600/400',
    category: ServiceCategory.TOUR_EXPERIENCE,
    duration: 'Half Day (Approx. 6 Hours)',
    highlights: ['Sleeping Pool (Chirorodziva)', 'Dark Cave', 'Learn local legends'],
  },
];

export const ART_TOURS: Tour[] = [
  {
    id: 'art001',
    name: 'Harare Contemporary Art Scene',
    description: 'Immerse yourself in Harare\'s vibrant contemporary art with visits to top galleries and artist studios.',
    price: 65,
    imageUrl: 'https://picsum.photos/seed/harareartgallery/600/400',
    category: ServiceCategory.ART_TOUR,
    duration: 'Approx. 4 Hours',
    highlights: ['National Gallery of Zimbabwe', 'Gallery Delta', 'Emerging artist studios (subject to availability)'],
  },
  {
    id: 'art002',
    name: 'Shona Sculpture Workshop Visit',
    description: 'Witness the creation of world-renowned Shona sculptures and meet the artists.',
    price: 90,
    imageUrl: 'https://picsum.photos/seed/shonasculpture/600/400',
    category: ServiceCategory.ART_TOUR,
    duration: 'Approx. 3 Hours',
    highlights: ['Learn sculpting techniques', 'Interact with master sculptors', 'Opportunity to purchase authentic art'],
  },
];

export const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 'fb1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    rating: 5,
    message: 'The Harare City Exploration was fantastic! Our guide was very knowledgeable.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    serviceUsed: 'Harare City Exploration',
  },
  {
    id: 'fb2',
    name: 'John Smith',
    email: 'john@example.com',
    rating: 4,
    message: 'Airport ride was smooth and on time. Clean vehicle.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    serviceUsed: 'Standard Sedan (Airport to City)',
  }
];