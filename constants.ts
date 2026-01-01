import { Member, EventItem, GalleryItem, Publication, HighlightItem } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: 'home' },
  { name: 'About Us', path: 'about' },
  { name: 'Committee', path: 'committee' },
  { name: 'Events', path: 'events' },
  { name: 'Publications', path: 'publications' },
  { name: 'Gallery', path: 'gallery' },
  { name: 'Welfare', path: 'welfare' },
  { name: 'Contact', path: 'contact' },
];

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Late Shri Ram Lal Prajapati",
    designation: "Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    type: "founder",
    bio: "The visionary who laid the foundation of the Samiti 35 years ago with a mission to educate every child in the community."
  },
  {
    id: 2,
    name: "Shri Om Prakash Prajapati",
    designation: "President",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    type: "committee",
    bio: "Leading the organization with dedication and focusing on modernizing education facilities."
  },
  {
    id: 3,
    name: "Smt. Saroj Devi",
    designation: "Secretary",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    type: "committee",
    bio: "A strong advocate for women's empowerment and girl child education within the Samiti."
  },
  {
    id: 4,
    name: "Dr. Rajesh Kumar",
    designation: "Treasurer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    type: "committee",
    bio: "Ensuring financial transparency and resource allocation for welfare programs."
  },
  {
    id: 5,
    name: "Shri Vinod Kumar",
    designation: "Executive Member",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    type: "committee"
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "35th Annual Alankaran Samaroh",
    date: "November 14, 2024",
    category: "Award",
    description: "Celebrating excellence in education and honoring meritorious students from across the district.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Community Health Camp",
    date: "October 02, 2024",
    category: "Social",
    description: "Free health checkup camp organized for the residents of Sukhertaal and nearby villages.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Scholarship Distribution Ceremony",
    date: "August 15, 2024",
    category: "Education",
    description: "Financial aid distributed to 50+ underprivileged students to support their higher education.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: 'Events', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', caption: 'Annual Function 2023' },
  { id: 2, category: 'Students', src: 'https://images.unsplash.com/photo-1427504494785-3a9ca280155c?auto=format&fit=crop&q=80&w=800', caption: 'Classroom Session' },
  { id: 3, category: 'Awards', src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800', caption: 'Best Student Award' },
  { id: 4, category: 'Community', src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800', caption: 'Food Distribution Drive' },
  { id: 5, category: 'Events', src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', caption: 'Cultural Performance' },
  { id: 6, category: 'Students', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', caption: 'Science Exhibition' },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: "Samiti Darpan 2024-25",
    year: "2024-2025",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    description: "The annual magazine highlighting the achievements, stories, and financial reports of the Samiti.",
    highlights: ["Chairman's Message", "Topper's Interviews", "Annual Audit Report", "Social Impact Survey"]
  }
];

// New highlights section for the images provided
export const HOME_HIGHLIGHTS: HighlightItem[] = [
  { 
    id: 1, 
    src: "https://placehold.co/800x1200/E9730F/white?text=35th+Annual+Alankaran+Samaroh+Poster", 
    alt: "35th Annual Alankaran Samaroh Poster",
    caption: "35th Annual Alankaran Samaroh - 14th Sept 2025",
    span: "row-span-2" 
  },
  { 
    id: 2, 
    src: "https://placehold.co/800x1200/1E3A8A/white?text=Family+Tribute+%26+Blessings", 
    alt: "Family Tribute - Lucrose Group",
    caption: "In Memory of Late Smt. Shanti Devi & Shri Jhabbar Singh",
    span: "row-span-2"
  },
  { 
    id: 3, 
    src: "https://placehold.co/800x600/darkgreen/white?text=Alankaran+Ceremony+Highlights", 
    alt: "Award Ceremony Collage 1",
    caption: "Honoring Meritorious Students",
    span: "col-span-1"
  },
  { 
    id: 4, 
    src: "https://placehold.co/800x1200/purple/white?text=Udit+Chain+Manufacturing+Ad", 
    alt: "Udit Chain Manufacturing",
    caption: "Hearty Congratulations to the Community",
    span: "row-span-2"
  },
   { 
    id: 5, 
    src: "https://placehold.co/800x1200/black/white?text=Shraddhanjali+Tribute+Poster", 
    alt: "Shraddhanjali Tribute",
    caption: "Heartfelt Tribute to Late Shri Jhabbar Singh Prajapati",
    span: "row-span-2"
  },
  { 
    id: 6, 
    src: "https://placehold.co/800x1200/FFC107/black?text=Prajapati+Foundation+Aid", 
    alt: "Prajapati Foundation Financial Aid",
    caption: "Financial Assistance Program Details",
    span: "row-span-2"
  },
  { 
    id: 7, 
    src: "https://placehold.co/800x600/darkred/white?text=Community+Gathering+Collage", 
    alt: "Event Highlights 2",
    caption: "Community Gathering & Celebrations",
    span: "col-span-1"
  },
];