export type Trade = "electrician" | "plumber";

export type Availability = "available" | "busy" | "offline";

export type RequestStatus =
  | "sent"
  | "accepted"
  | "on_the_way"
  | "started"
  | "completed";

export interface ProblemType {
  id: string;
  label: string;
  trade: Trade;
  basePrice: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Provider {
  id: string;
  name: string;
  trade: Trade;
  photo: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  distanceKm: number;
  startingPrice: number;
  availability: Availability;
  emergency: boolean;
  area: string;
  workingHours: string;
  about: string;
  services: { name: string; price: number }[];
  reviews: Review[];
}

export interface ServiceRequest {
  id: string;
  providerId: string;
  providerName: string;
  trade: Trade;
  problemId: string;
  problemLabel: string;
  description: string;
  photoName?: string;
  date: string;
  time: string;
  address: string;
  estimate: number;
  status: RequestStatus;
  createdAt: string;
  emergency: boolean;
  review?: { rating: number; text: string };
}
