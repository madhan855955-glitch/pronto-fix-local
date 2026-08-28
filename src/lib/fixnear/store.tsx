import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STATUS_ORDER } from "./data";
import type { RequestStatus, ServiceRequest } from "./types";

export type Role = "customer" | "provider" | "admin";

export interface Account {
  name: string;
  email: string;
  role: Role;
}

const STORAGE_KEY = "fixnear.state.v1";

interface PersistedState {
  account: Account | null;
  location: string;
  requests: ServiceRequest[];
}

const SEED_REQUESTS: ServiceRequest[] = [
  {
    id: "REQ-4821",
    providerId: "nilesh-pipeflow",
    providerName: "Nilesh Pipe & Flow",
    trade: "plumber",
    problemId: "leak",
    problemLabel: "Pipe leakage",
    description: "Water seeping from the wall behind the bathroom sink since last night.",
    date: "2026-08-28",
    time: "10:00 AM – 12:00 PM",
    address: "12/4 Kasturi Street, Adyar, Chennai 600020",
    estimate: 578,
    status: "on_the_way",
    createdAt: "2026-08-28T04:10:00.000Z",
    emergency: false,
  },
  {
    id: "REQ-4790",
    providerId: "arun-electrical",
    providerName: "Arun Electrical Services",
    trade: "electrician",
    problemId: "fan",
    problemLabel: "Fan problem",
    description: "Bedroom fan making a grinding noise at high speed.",
    date: "2026-08-22",
    time: "4:00 PM – 6:00 PM",
    address: "12/4 Kasturi Street, Adyar, Chennai 600020",
    estimate: 428,
    status: "completed",
    createdAt: "2026-08-22T09:00:00.000Z",
    emergency: false,
    review: { rating: 5, text: "Very quick service and reasonable price." },
  },
];

interface StoreValue extends PersistedState {
  ready: boolean;
  signIn: (account: Account) => void;
  signOut: () => void;
  setLocation: (value: string) => void;
  createRequest: (
    input: Omit<ServiceRequest, "id" | "status" | "createdAt">,
  ) => ServiceRequest;
  advanceRequest: (id: string) => void;
  setRequestStatus: (id: string, status: RequestStatus) => void;
  addReview: (id: string, rating: number, text: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function FixNearProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [location, setLocationValue] = useState("");
  const [requests, setRequests] = useState<ServiceRequest[]>(SEED_REQUESTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedState>;
        if (parsed.account !== undefined) setAccount(parsed.account);
        if (typeof parsed.location === "string") setLocationValue(parsed.location);
        if (Array.isArray(parsed.requests)) setRequests(parsed.requests);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ account, location, requests } satisfies PersistedState),
      );
    } catch {
      /* storage full or unavailable */
    }
  }, [account, location, requests, ready]);

  const createRequest = useCallback<StoreValue["createRequest"]>((input) => {
    const created: ServiceRequest = {
      ...input,
      id: `REQ-${Math.floor(1000 + Math.random() * 8999)}`,
      status: "sent",
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [created, ...prev]);
    return created;
  }, []);

  const setRequestStatus = useCallback<StoreValue["setRequestStatus"]>((id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const advanceRequest = useCallback<StoreValue["advanceRequest"]>((id) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = STATUS_ORDER[Math.min(STATUS_ORDER.indexOf(r.status) + 1, 4)];
        return { ...r, status: next ?? r.status };
      }),
    );
  }, []);

  const addReview = useCallback<StoreValue["addReview"]>((id, rating, text) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, review: { rating, text } } : r)),
    );
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      account,
      location,
      requests,
      ready,
      signIn: setAccount,
      signOut: () => setAccount(null),
      setLocation: setLocationValue,
      createRequest,
      advanceRequest,
      setRequestStatus,
      addReview,
    }),
    [account, location, requests, ready, createRequest, advanceRequest, setRequestStatus, addReview],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useFixNear() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useFixNear must be used inside FixNearProvider");
  return ctx;
}
