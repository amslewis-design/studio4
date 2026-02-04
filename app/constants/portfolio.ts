export interface Project {
  id: string;
  clientName: string;
  location: string;
  imageUrl: string;
  testimonial: string;
  testimonialAuthor: string;
  services: string[];
  year: string;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    clientName: 'Azulik',
    location: 'Tulum, Mexico',
    imageUrl: 'https://picsum.photos/id/10/800/1200', // Forest/Nature
    testimonial: "Wanderlust Creative captured the soul of our sanctuary. The visual narrative they wove is as organic as our architecture.",
    testimonialAuthor: 'Eduardo Neira, Founder',
    services: ['Brand Strategy', 'Visual Identity', 'Social Curation'],
    year: '2025'
  },
  {
    id: '2',
    clientName: 'The Retreat',
    location: 'Blue Lagoon, Iceland',
    imageUrl: 'https://picsum.photos/id/1036/800/1200', // Snow/Ice
    testimonial: "An ethereal digital presence that mirrors our volcanic landscape. Truly sophisticated storytelling.",
    testimonialAuthor: 'Sigríður Sigurðardóttir, CMO',
    services: ['Web Design', 'Content Direction', 'SEO'],
    year: '2024'
  },
  {
    id: '3',
    clientName: 'Scarabeo Camp',
    location: 'Agafay Desert, Morocco',
    imageUrl: 'https://picsum.photos/id/1044/800/1200', // Desert/Horizon
    testimonial: "They translated the silence of the desert into a digital language. Minimalist, impactful, and beautiful.",
    testimonialAuthor: 'Florence & Vincent, Owners',
    services: ['Photography', 'Website Redesign', 'Booking Integration'],
    year: '2025'
  },
  {
    id: '4',
    clientName: 'Fogo Island Inn',
    location: 'Newfoundland, Canada',
    imageUrl: 'https://picsum.photos/id/1015/800/1200', // Rocky coast/Sea
    testimonial: "A masterclass in restraint. They let the raw beauty of our island speak through the design.",
    testimonialAuthor: 'Zita Cobb, Innkeeper',
    services: ['Digital Strategy', 'Editorial Content', 'Film'],
    year: '2023'
  },
  {
    id: '5',
    clientName: 'Amangiri',
    location: 'Utah, USA',
    imageUrl: 'https://picsum.photos/id/1016/800/1200', // Canyons
    testimonial: "Our guests expect perfection. Wanderlust Creative delivered a seamless digital extension of our guest experience.",
    testimonialAuthor: 'General Manager',
    services: ['App Development', 'UX/UI', 'Member Portal'],
    year: '2024'
  },
  {
    id: '6',
    clientName: 'Six Senses',
    location: 'Douro Valley, Portugal',
    imageUrl: 'https://picsum.photos/id/114/800/1200', // Vineyard/Green
    testimonial: "Warmth, history, and modernity tailored into one cohesive brand story. Exceptional work.",
    testimonialAuthor: 'Sofia Silva, Marketing Director',
    services: ['Rebranding', 'Print Collateral', 'Digital Marketing'],
    year: '2025'
  }
];
