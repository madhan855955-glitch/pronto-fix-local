import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Timer } from "lucide-react";
import heroImage from "@/assets/hero-electrician.jpg";
import { LocationField } from "@/components/fixnear/location-field";
import { ProviderCard } from "@/components/fixnear/provider-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROBLEM_TYPES, PROVIDERS, TRADE_META, suggestTrade } from "@/lib/fixnear/data";
import type { Trade } from "@/lib/fixnear/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FixNear — Reliable Electricians & Plumbers Near You" },
      {
        name: "description",
        content:
          "Find trusted local electricians and plumbers, compare ratings and prices, request a service and track it until the job is done.",
      },
      { property: "og:title", content: "FixNear — Reliable Electricians & Plumbers Near You" },
      {
        property: "og:description",
        content:
          "Find trusted local professionals and get your home problems fixed quickly with live job tracking.",
      },
    ],
  }),
  component: Home,
});

const TRADES: Trade[] = ["electrician", "plumber"];

function Home() {
  const navigate = useNavigate();
  const [describe, setDescribe] = useState("");
  const suggestion = describe.trim().length > 6 ? suggestTrade(describe) : null;
  const featured = [...PROVIDERS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 pb-6 lg:grid-cols-12 lg:px-8 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">Local service finder</p>
          <h1 className="mt-4 text-[2.75rem] leading-[1.03] sm:text-6xl">
            Reliable electricians &amp; plumbers near you.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Find trusted local professionals and get your home problems fixed quickly.
          </p>

          <div className="mt-8 max-w-xl">
            <LocationField onSubmit={() => navigate({ to: "/electricians" })} />
          </div>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-success" />
              <dt className="font-semibold">ID-verified</dt>
              <dd className="text-muted-foreground">professionals</dd>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="size-4 text-electric" />
              <dt className="font-semibold">Under 60 min</dt>
              <dd className="text-muted-foreground">emergency dispatch</dd>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-water" />
              <dt className="font-semibold">Upfront</dt>
              <dd className="text-muted-foreground">price estimates</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <img
            src={heroImage}
            alt="Electrician installing a ceiling fan in a bright apartment"
            width={1088}
            height={1280}
            className="aspect-4/5 w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {TRADES.map((trade) => {
            const meta = TRADE_META[trade];
            return (
              <div key={trade} className="panel lift p-6">
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl text-2xl ${
                      trade === "electrician" ? "bg-electric-soft" : "bg-water-soft"
                    }`}
                    aria-hidden
                  >
                    {meta.glyph}
                  </span>
                  <span className="eyebrow">{meta.tagline}</span>
                </div>
                <h2 className="mt-5 text-2xl">{meta.label}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {meta.jobs.map((job) => (
                    <li key={job} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span
                        className={`size-1.5 rounded-full ${
                          trade === "electrician" ? "bg-electric" : "bg-water"
                        }`}
                      />
                      {job}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={trade === "electrician" ? "electric" : "water"}
                  className="mt-6"
                  asChild
                >
                  <Link to={trade === "electrician" ? "/electricians" : "/plumbers"}>
                    Find a {meta.label.toLowerCase()} <ArrowRight />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Smart problem matcher */}
      <section className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
        <div className="panel p-6 sm:p-8">
          <p className="eyebrow">Not sure who to call?</p>
          <h2 className="mt-3 text-2xl">Describe the problem in your own words</h2>
          <Input
            value={describe}
            onChange={(e) => setDescribe(e.target.value.slice(0, 200))}
            placeholder="e.g. My bathroom tap is continuously leaking"
            className="mt-4 h-12"
          />
          {suggestion ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-surface p-4">
              <span aria-hidden className="text-xl">
                {TRADE_META[suggestion.trade].glyph}
              </span>
              <p className="text-sm">
                Sounds like a job for a{" "}
                <strong>{TRADE_META[suggestion.trade].label.toLowerCase()}</strong> —{" "}
                {PROBLEM_TYPES.find((p) => p.id === suggestion.problemId)?.label}.
              </p>
              <Button size="sm" className="ml-auto" asChild>
                <Link to={suggestion.trade === "electrician" ? "/electricians" : "/plumbers"}>
                  See {TRADE_META[suggestion.trade].label.toLowerCase()}s
                </Link>
              </Button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              We'll match your description to the right trade and job type.
            </p>
          )}
        </div>
      </section>

      {/* Featured providers */}
      <section className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl">Top rated near you</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ranked by customer rating and completed jobs
            </p>
          </div>
          <Link
            to="/electricians"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Browse all professionals →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
        <div className="panel bg-surface p-6 sm:p-10">
          <h2 className="text-2xl">How FixNear works</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Find", "Enter your area and pick a trade."],
              ["Compare", "Check ratings, experience and starting price."],
              ["Request", "Send the job details, photo and time slot."],
              ["Track & review", "Follow the status live, then rate the work."],
            ].map(([title, body], i) => (
              <li key={title}>
                <span className="font-display text-3xl font-extrabold text-primary/40">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-lg">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Emergency */}
      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <div className="panel flex flex-col items-start justify-between gap-6 bg-primary p-8 text-primary-foreground md:flex-row md:items-center lg:p-12">
          <div>
            <span className="text-2xl" aria-hidden>
              🚨
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl">Need help right now?</h2>
            <p className="mt-2 max-w-md text-primary-foreground/75">
              Power failure or flooding? Emergency professionals are shown separately and sorted by
              who can reach you fastest.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="electric" size="lg" asChild>
              <Link to="/emergency" search={{ trade: "electrician" }}>
                ⚡ Emergency Electrician
              </Link>
            </Button>
            <Button variant="water" size="lg" asChild>
              <Link to="/emergency" search={{ trade: "plumber" }}>
                🔧 Emergency Plumber
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
