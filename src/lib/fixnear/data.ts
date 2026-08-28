import pro1 from "@/assets/pro-1.jpg";
import pro2 from "@/assets/pro-2.jpg";
import pro3 from "@/assets/pro-3.jpg";
import pro4 from "@/assets/pro-4.jpg";
import pro5 from "@/assets/pro-5.jpg";
import pro6 from "@/assets/pro-6.jpg";
import type { ProblemType, Provider, RequestStatus, Trade } from "./types";

export const TRADE_META: Record<
  Trade,
  { label: string; glyph: string; tagline: string; jobs: string[] }
> = {
  electrician: {
    label: "Electrician",
    glyph: "⚡",
    tagline: "Wiring, fittings and power faults",
    jobs: [
      "Wiring & rewiring",
      "Switch / socket repair",
      "Fan installation",
      "Light installation",
      "Power issues",
    ],
  },
  plumber: {
    label: "Plumber",
    glyph: "🔧",
    tagline: "Leaks, fittings and drainage",
    jobs: [
      "Pipe leakage",
      "Tap repair",
      "Bathroom plumbing",
      "Water tank problems",
      "Drain blockage",
    ],
  },
};

export const PROBLEM_TYPES: ProblemType[] = [
  { id: "wiring", label: "Electrical wiring", trade: "electrician", basePrice: 599 },
  { id: "fan", label: "Fan problem", trade: "electrician", basePrice: 349 },
  { id: "light", label: "Light problem", trade: "electrician", basePrice: 249 },
  { id: "switch", label: "Switch / socket problem", trade: "electrician", basePrice: 199 },
  { id: "leak", label: "Pipe leakage", trade: "plumber", basePrice: 499 },
  { id: "tap", label: "Tap problem", trade: "plumber", basePrice: 299 },
  { id: "drain", label: "Drain blockage", trade: "plumber", basePrice: 449 },
  { id: "tank", label: "Water tank problem", trade: "plumber", basePrice: 649 },
  { id: "other", label: "Other", trade: "electrician", basePrice: 299 },
];

export const STATUS_META: Record<
  RequestStatus,
  { label: string; dot: string; order: number }
> = {
  sent: { label: "Request sent", dot: "bg-warning", order: 0 },
  accepted: { label: "Professional accepted", dot: "bg-water", order: 1 },
  on_the_way: { label: "Professional on the way", dot: "bg-primary", order: 2 },
  started: { label: "Service started", dot: "bg-electric", order: 3 },
  completed: { label: "Completed", dot: "bg-success", order: 4 },
};

export const STATUS_ORDER: RequestStatus[] = [
  "sent",
  "accepted",
  "on_the_way",
  "started",
  "completed",
];

export const PROVIDERS: Provider[] = [
  {
    id: "arun-electrical",
    name: "Arun Electrical Services",
    trade: "electrician",
    photo: pro1,
    rating: 4.8,
    reviewCount: 126,
    completedJobs: 412,
    experienceYears: 7,
    distanceKm: 1.8,
    startingPrice: 199,
    availability: "available",
    emergency: true,
    area: "Anna Nagar",
    workingHours: "Mon–Sat, 8:00 AM – 9:00 PM",
    about:
      "Licensed electrician handling residential wiring, fittings and fault-finding. Known for tidy work and honest estimates, with a 30-day workmanship guarantee on every job.",
    services: [
      { name: "Switch / socket repair", price: 199 },
      { name: "Fan installation", price: 349 },
      { name: "Light & fixture fitting", price: 279 },
      { name: "Full room rewiring", price: 2400 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Sanjay M.",
        rating: 5,
        date: "2 days ago",
        text: "Very quick service and reasonable price. Fixed the tripping MCB in 20 minutes.",
      },
      {
        id: "r2",
        author: "Divya R.",
        rating: 5,
        date: "1 week ago",
        text: "Installed three fans neatly and cleaned up afterwards. Will book again.",
      },
      {
        id: "r3",
        author: "Karthik S.",
        rating: 4,
        date: "3 weeks ago",
        text: "Arrived a little late but the work was solid and priced as quoted.",
      },
    ],
  },
  {
    id: "nilesh-pipeflow",
    name: "Nilesh Pipe & Flow",
    trade: "plumber",
    photo: pro2,
    rating: 4.9,
    reviewCount: 203,
    completedJobs: 640,
    experienceYears: 11,
    distanceKm: 0.9,
    startingPrice: 249,
    availability: "available",
    emergency: true,
    area: "Adyar",
    workingHours: "All days, 7:00 AM – 10:00 PM",
    about:
      "Plumbing specialist for leak detection, bathroom fittings and overhead tank issues. Carries pressure-testing tools so leaks are found without breaking extra tiles.",
    services: [
      { name: "Tap repair / replacement", price: 249 },
      { name: "Pipe leakage fix", price: 499 },
      { name: "Drain unblocking", price: 449 },
      { name: "Bathroom fitting set", price: 1800 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Preethi K.",
        rating: 5,
        date: "Yesterday",
        text: "Found a hidden leak behind the wall without breaking half the bathroom. Excellent.",
      },
      {
        id: "r2",
        author: "Ganesh V.",
        rating: 5,
        date: "5 days ago",
        text: "Came at 9 PM for an emergency overflow. Sorted it out fast.",
      },
    ],
  },
  {
    id: "meera-voltcare",
    name: "Meera Volt Care",
    trade: "electrician",
    photo: pro3,
    rating: 4.7,
    reviewCount: 88,
    completedJobs: 191,
    experienceYears: 4,
    distanceKm: 2.4,
    startingPrice: 159,
    availability: "busy",
    emergency: false,
    area: "T. Nagar",
    workingHours: "Mon–Fri, 9:00 AM – 7:00 PM",
    about:
      "Diploma-certified electrician focused on appliance wiring, inverter setups and safety audits for older apartments.",
    services: [
      { name: "Safety / load audit", price: 159 },
      { name: "Inverter & battery wiring", price: 899 },
      { name: "Appliance point wiring", price: 399 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Aravind T.",
        rating: 5,
        date: "4 days ago",
        text: "Explained exactly why the old wiring was overheating. Very professional.",
      },
    ],
  },
  {
    id: "rajesh-aqua",
    name: "Rajesh Aqua Works",
    trade: "plumber",
    photo: pro4,
    rating: 4.6,
    reviewCount: 154,
    completedJobs: 520,
    experienceYears: 14,
    distanceKm: 3.6,
    startingPrice: 219,
    availability: "available",
    emergency: false,
    area: "Velachery",
    workingHours: "Mon–Sat, 8:00 AM – 8:00 PM",
    about:
      "Fourteen years of sanitary and water-line work across apartments and independent houses. Handles tank cleaning, motor issues and full bathroom re-piping.",
    services: [
      { name: "Water tank cleaning", price: 219 },
      { name: "Motor / pump check", price: 399 },
      { name: "Re-piping per line", price: 1200 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Lakshmi N.",
        rating: 4,
        date: "1 week ago",
        text: "Good work on the tank cleaning, price was fair.",
      },
    ],
  },
  {
    id: "vikram-sparks",
    name: "Vikram Sparks & Fittings",
    trade: "electrician",
    photo: pro5,
    rating: 4.5,
    reviewCount: 61,
    completedJobs: 143,
    experienceYears: 3,
    distanceKm: 4.9,
    startingPrice: 149,
    availability: "available",
    emergency: true,
    area: "Porur",
    workingHours: "All days, 24 hours",
    about:
      "Round-the-clock electrician for urgent faults — short circuits, sudden power loss and burnt sockets. Fast dispatch within a 6 km radius.",
    services: [
      { name: "Emergency fault visit", price: 149 },
      { name: "Short-circuit repair", price: 549 },
      { name: "Socket replacement", price: 189 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Hari P.",
        rating: 5,
        date: "3 days ago",
        text: "Reached at 1 AM when the whole flat lost power. Lifesaver.",
      },
    ],
  },
  {
    id: "asha-hydrofix",
    name: "Asha HydroFix",
    trade: "plumber",
    photo: pro6,
    rating: 4.8,
    reviewCount: 97,
    completedJobs: 260,
    experienceYears: 6,
    distanceKm: 2.1,
    startingPrice: 189,
    availability: "busy",
    emergency: true,
    area: "Ambattur",
    workingHours: "All days, 7:00 AM – 11:00 PM",
    about:
      "Bathroom and kitchen plumbing with a focus on modern fittings, concealed lines and mixer installations. Sends a photo report after every job.",
    services: [
      { name: "Mixer / shower fitting", price: 189 },
      { name: "Concealed line leak", price: 799 },
      { name: "Kitchen sink & trap", price: 349 },
    ],
    reviews: [
      {
        id: "r1",
        author: "Nithya B.",
        rating: 5,
        date: "6 days ago",
        text: "Neat concealed pipe work and shared before/after photos. Very reassuring.",
      },
    ],
  },
];

export function getProvider(id: string) {
  return PROVIDERS.find((p) => p.id === id);
}

export function estimateFor(basePrice: number, emergency: boolean) {
  const visitFee = 79;
  const surge = emergency ? Math.round(basePrice * 0.25) : 0;
  return basePrice + visitFee + surge;
}

export function suggestTrade(text: string): { trade: Trade; problemId: string } | null {
  const t = text.toLowerCase();
  const rules: { keys: string[]; trade: Trade; problemId: string }[] = [
    { keys: ["tap", "faucet", "drip"], trade: "plumber", problemId: "tap" },
    { keys: ["leak", "pipe", "seep", "water on floor"], trade: "plumber", problemId: "leak" },
    { keys: ["drain", "block", "clog", "sewage"], trade: "plumber", problemId: "drain" },
    { keys: ["tank", "motor", "pump", "overflow"], trade: "plumber", problemId: "tank" },
    { keys: ["fan", "ceiling fan"], trade: "electrician", problemId: "fan" },
    { keys: ["light", "bulb", "tube"], trade: "electrician", problemId: "light" },
    { keys: ["switch", "socket", "plug"], trade: "electrician", problemId: "switch" },
    { keys: ["wiring", "short circuit", "power", "mcb", "current", "spark"], trade: "electrician", problemId: "wiring" },
  ];
  for (const rule of rules) {
    if (rule.keys.some((k) => t.includes(k))) {
      return { trade: rule.trade, problemId: rule.problemId };
    }
  }
  return null;
}
