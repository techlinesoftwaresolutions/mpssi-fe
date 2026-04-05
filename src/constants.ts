import { EventItem, GalleryItem, Publication, HighlightItem, Patron } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: 'home' },
  { name: 'About Us', path: 'about' },
  { name: 'Committee', path: 'committee' },
  { name: 'Events', path: 'events' },
  { name: 'Patrons', path: 'patrons' },
  { name: 'Publications', path: 'publications' },
  { name: 'Gallery', path: 'gallery' },
  { name: 'Welfare', path: 'welfare' },
  { name: 'Scholarship', path: 'scholarship' },
  { name: 'Merit List', path: 'meritlist' },
  { name: 'Contact', path: 'contact' },
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
    description: "Free health checkup camp organized for the residents of Shukteerth and nearby villages.",
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
  { id: 2, category: 'Students', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', caption: 'Classroom Session' },
  { id: 3, category: 'Awards', src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800', caption: 'Best Student Award' },
  { id: 4, category: 'Community', src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800', caption: 'Food Distribution Drive' },
  { id: 5, category: 'Events', src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', caption: 'Cultural Performance' },
  { id: 6, category: 'Students', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', caption: 'Science Exhibition' },
  { id: 7, category: 'Awards', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800', caption: 'वर्ष 2024 के मेधावी छात्र-छात्राओं के अलंकरण समारोह के कुछ दृश्य' },
  { id: 8, category: 'Events', src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', caption: '35वीं वार्षिक अलंकरण समारोह - 2024' },
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

export const PATRONS: Patron[] = [
  {
    id: 1,
    name: "श्री राजीव कुमार",
    address: "मवाना, मेरठ, उत्तर प्रदेश - 250411",
    totalDonation: "₹50,00,000",
    currentYearDonation: "₹10,00,000",
    joiningYear: 2015,
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "श्रीमती सुनीता शर्मा",
    address: "खतौली, मुजफ्फरनगर, उत्तर प्रदेश - 251315",
    totalDonation: "₹35,50,000",
    currentYearDonation: "₹7,50,000",
    joiningYear: 2018,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 3,
    name: "श्री अजय प्रजापति",
    address: "शुकतीर्थ, मुजफ्फरनगर, उत्तर प्रदेश - 251309",
    totalDonation: "₹42,00,000",
    currentYearDonation: "₹8,50,000",
    joiningYear: 2016,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 4,
    name: "श्री विजय सिंह",
    address: "दिल्ली, भारत - 110001",
    totalDonation: "₹60,00,000",
    currentYearDonation: "₹12,00,000",
    joiningYear: 2014,
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 5,
    name: "डॉ. राज कुमार चौधरी",
    address: "गाजियाबाद, उत्तर प्रदेश - 201001",
    totalDonation: "₹55,75,000",
    currentYearDonation: "₹11,00,000",
    joiningYear: 2017,
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 6,
    name: "श्रीमती प्रिया वर्मा",
    address: "नोएडा, उत्तर प्रदेश - 201309",
    totalDonation: "₹38,25,000",
    currentYearDonation: "₹8,00,000",
    joiningYear: 2019,
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 7,
    name: "श्री संजय पटेल",
    address: "लखनऊ, उत्तर प्रदेश - 226001",
    totalDonation: "₹45,50,000",
    currentYearDonation: "₹9,25,000",
    joiningYear: 2015,
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 8,
    name: "श्री मोहन शर्मा",
    address: "आगरा, उत्तर प्रदेश - 282001",
    totalDonation: "₹32,00,000",
    currentYearDonation: "₹6,75,000",
    joiningYear: 2020,
    image: "https://randomuser.me/api/portraits/men/6.jpg"
  }
];
