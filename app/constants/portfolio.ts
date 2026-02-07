export interface Project {
  id: string;
  clientName: string;
  location: string;
  imageUrl: string;
  testimonial: string;
  testimonialAuthor?: string;
  services: string[];
  year: string;
}

export const PORTFOLIO_PROJECTS_EN: Project[] = [
  {
    id: '2',
    clientName: 'SOTA LOS ANGELES',
    location: 'LIFESTYLE CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/2_lvrwrq.jpg', // Snow/Ice
    testimonial: "An ethereal digital presence that mirrors our volcanic landscape. Truly sophisticated storytelling.",
    testimonialAuthor: 'Sigríður Sigurðardóttir, CMO',
    services: ['Web Design', 'Content Direction', 'SEO'],
    year: '2024'
  },
  {
    id: '3',
    clientName: 'EXPRESSARTE UK',
    location: 'SOCIAL MEDIA MANAGEMENT, PHOTOGRAPHY AND VIDEO',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261223/3_oopuab.jpg', // Desert/Horizon
    testimonial: "We spearheaded the digital promotion for London’s premier Mexican Independence Day celebration. We developed a comprehensive strategic content framework and social media calendar, collaborating closely with guest artists and sponsors to amplify the event's reach. Our team executed end-to-end content production and managed targeted Facebook ad campaigns designed to drive ticket sales and brand awareness. Furthermore, we provided comprehensive live coverage, capturing the energy of the event through professional photography and videography for real-time social engagement.",
    services: ['Strategy', 'Content Production', 'Ads', 'Live Coverage'],
    year: '2023'
  },
  {
    id: '4',
    clientName: 'CASAS DEL ACANTILADO',
    location: 'LIFESTYLE PHOTOGRAPHY',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261224/5_cfkwxi.jpg', // Rocky coast/Sea
    testimonial: "A masterclass in restraint. They let the raw beauty of our island speak through the design.",
    testimonialAuthor: 'Zita Cobb, Innkeeper',
    services: ['Digital Strategy', 'Editorial Content', 'Film'],
    year: '2023'
  },
  {
    id: '5',
    clientName: 'ESTUDIA EN IRLANDA',
    location: 'LIFESTYLE CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/4_zgubqk.jpg', // Canyons
    testimonial: "Our guests expect perfection. Wanderlust Creative delivered a seamless digital extension of our guest experience.",
    testimonialAuthor: 'General Manager',
    services: ['App Development', 'UX/UI', 'Member Portal'],
    year: '2024'
  },
  {
    id: '6',
    clientName: 'TRAVEL BLOG OF LOS ANGELES',
    location: 'TRAVEL PHOTOGRAPHY AND CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770262107/6_qjdlbt.jpg', // Vineyard/Green
    testimonial: "Warmth, history, and modernity tailored into one cohesive brand story. Exceptional work.",
    testimonialAuthor: 'Sofia Silva, Marketing Director',
    services: ['Rebranding', 'Print Collateral', 'Digital Marketing'],
    year: '2025'
  },
  {
    id: '1',
    clientName: 'UGC & TRAVEL CONTENT',
    location: 'TRAVEL BLOG CONTENT & COLLABORATIONS',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/1_vd47a8.jpg', // Forest/Nature
    testimonial: "Wanderlust Creative captured the soul of our sanctuary. The visual narrative they wove is as organic as our architecture.",
    testimonialAuthor: 'Eduardo Neira, Founder',
    services: ['Brand Strategy', 'Visual Identity', 'Social Curation'],
    year: '2025'
  }
];

export const PORTFOLIO_PROJECTS_ES: Project[] = [
  {
    id: '2',
    clientName: 'SOTA LOS ANGELES',
    location: 'LIFESTYLE CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/2_lvrwrq.jpg',
    testimonial: "Una presencia digital etérea que refleja nuestro paisaje volcánico. Una narración verdaderamente sofisticada.",
    testimonialAuthor: 'Sigríður Sigurðardóttir, CMO',
    services: ['Diseño Web', 'Dirección de Contenido', 'SEO'],
    year: '2024'
  },
  {
    id: '3',
    clientName: 'EXPRESSARTE UK',
    location: 'SOCIAL MEDIA MANAGEMENT, PHOTOGRAPHY AND VIDEO',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261223/3_oopuab.jpg',
    testimonial: "Lideramos la promoción digital del evento más importante de la Independencia de México en Londres. Gestionamos la estrategia de contenido 360°, colaboraciones y campañas de Facebook Ads para impulsar ventas. Además, realizamos la cobertura audiovisual en vivo para maximizar la interacción en tiempo real.",
    services: ['Estrategia', 'Producción de Contenido', 'Anuncios', 'Cobertura en Vivo'],
    year: '2025'
  },
  {
    id: '4',
    clientName: 'CASAS DEL ACANTILADO',
    location: 'LIFESTYLE PHOTOGRAPHY',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261224/5_cfkwxi.jpg',
    testimonial: "Una clase magistral de moderación. Dejaron que la belleza cruda de nuestra isla hablara a través del diseño.",
    testimonialAuthor: 'Zita Cobb, Posadera',
    services: ['Estrategia Digital', 'Contenido Editorial', 'Cine'],
    year: '2023'
  },
  {
    id: '5',
    clientName: 'ESTUDIA EN IRLANDA',
    location: 'LIFESTYLE CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/4_zgubqk.jpg',
    testimonial: "Nuestros huéspedes esperan perfección. Wanderlust Creative entregó una extensión digital perfecta de nuestra experiencia.",
    testimonialAuthor: 'Gerente General',
    services: ['Desarrollo de Apps', 'UX/UI', 'Portal de Miembros'],
    year: '2024'
  },
  {
    id: '6',
    clientName: 'TRAVEL BLOG OF LOS ANGELES',
    location: 'TRAVEL PHOTOGRAPHY AND CONTENT',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770262107/6_qjdlbt.jpg',
    testimonial: "Calidez, historia y modernidad adaptadas en una historia de marca cohesiva. Un trabajo excepcional.",
    testimonialAuthor: 'Sofia Silva, Directora de Marketing',
    services: ['Rebranding', 'Material Impreso', 'Marketing Digital'],
    year: '2025'
  },
  {
    id: '1',
    clientName: 'UGC & TRAVEL CONTENT',
    location: 'TRAVEL BLOG CONTENT & COLLABORATIONS',
    imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/v1770261222/1_vd47a8.jpg',
    testimonial: "Wanderlust Creative capturó el alma de nuestro santuario. La narrativa visual que tejieron es tan orgánica como nuestra arquitectura.",
    testimonialAuthor: 'Eduardo Neira, Fundador',
    services: ['Estrategia de Marca', 'Identidad Visual', 'Curaduría Social'],
    year: '2025'
  }
];
