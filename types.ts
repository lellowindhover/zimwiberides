
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ElementType; // For SVG components
  image: string;
  planyoResourceLink?: string; // Specific Planyo link for this service
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface NavItem {
  name: string;
  path: string;
}
