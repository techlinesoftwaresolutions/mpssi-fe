export interface Member {
  id: number;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  type: 'founder' | 'committee';
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  category: 'Education' | 'Social' | 'Award';
  description: string;
  image: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  category: 'Events' | 'Awards' | 'Students' | 'Community';
  caption: string;
}

export interface Publication {
  id: number;
  title: string;
  year: string;
  coverImage: string;
  description: string;
  highlights: string[];
}

export interface HighlightItem {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  span?: string; // For grid layout control (e.g., 'row-span-2')
}

export interface Patron {
  id: number;
  name: string;
  address: string;
  totalDonation: string;
  currentYearDonation: string;
  joiningYear: number;
  image?: string;
}
