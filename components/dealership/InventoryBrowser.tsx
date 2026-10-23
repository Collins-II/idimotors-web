"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowDownUp, ArrowRight, SlidersHorizontal } from "lucide-react";
import type { Vehicle } from "@/lib/portal";
import VehicleCard from "./VehicleCard";

type InventoryBrowserProps = {
  vehicles: Vehicle[];
  initialQuery?: string;
  initialMake?: string;
  initialBody?: string;
};

export default function InventoryBrowser({ vehicles, initialQuery = "", initialMake = "", initialBody = "" }: InventoryBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const [make, setMake] = useState(initialMake);
  const [body, setBody] = useState(initialBody);
  const [sort, setSort] = useState("featured");

  const makes = useMemo(() => Array.from(new Set(vehicles.map((vehicle) => vehicle.make))).sort(), [vehicles]);
  const bodies = useMemo(() => Array.from(new Set(vehicles.map((vehicle) => vehicle.body))).sort(), [vehicles]);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = vehicles.filter((vehicle) => {
      const haystack = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.body} ${vehicle.color} ${vehicle.fuel}`.toLowerCase();
      return terms.every((term) => haystack.includes(term))
        && (!make || vehicle.make.toLowerCase() === make.toLowerCase())
        && (!body || vehicle.body === body);
    });

    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "newest") return [...filtered].sort((a, b) => b.year - a.year);
    return filtered;
  }, [body, make, query, sort, vehicles]);

  function syncUrl(next: { q?: string; make?: string; body?: string }) {
    const params = new URLSearchParams();
    const values = { q: query, make, body, ...next };
    for (const [key, value] of Object.entries(values)) if (value) params.set(key, value);
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false });
  }

  function clearFilters() {
    setQuery("");
    setMake("");
    setBody("");
    setSort("featured");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-[#e6e6df] bg-white p-4 shadow-[0_12px_40px_rgba(32,35,29,0.04)] md:grid-cols-[1fr_180px_160px_180px] md:p-5">
        <label className="flex items-center gap-3 rounded-xl bg-[#f5f5f1] px-4 py-3">
          <SlidersHorizontal size={16} className="shrink-0 text-[#8a8c83]" />
          <span className="sr-only">Search by make or model</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => syncUrl({ q: query.trim() })}
            placeholder="Make, model or keyword"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#262920] outline-none placeholder:text-[#9b9d94]"
          />
        </label>
        <label className="rounded-xl bg-[#f5f5f1] px-4 py-3">
          <span className="sr-only">Filter by make</span>
          <select value={make} onChange={(event) => { setMake(event.target.value); syncUrl({ make: event.target.value }); }} className="w-full bg-transparent text-sm text-[#464940] outline-none">
            <option value="">All makes</option>
            {makes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="rounded-xl bg-[#f5f5f1] px-4 py-3">
          <span className="sr-only">Filter by body style</span>
          <select value={body} onChange={(event) => { setBody(event.target.value); syncUrl({ body: event.target.value }); }} className="w-full bg-transparent text-sm text-[#464940] outline-none">
            <option value="">All body styles</option>
            {bodies.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-[#f5f5f1] px-4 py-3">
          <ArrowDownUp size={15} className="shrink-0 text-[#8a8c83]" />
          <span className="sr-only">Sort inventory</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="w-full bg-transparent text-sm text-[#464940] outline-none">
            <option value="featured">Curated order</option>
            <option value="newest">Newest year</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mb-5 mt-8 flex items-center justify-between">
        <p className="text-sm text-[#777970]" aria-live="polite"><span className="font-semibold text-[#292c25]">{results.length} {results.length === 1 ? "vehicle" : "vehicles"}</span> selected with care</p>
        {(query || make || body) && <button onClick={clearFilters} className="text-xs font-semibold text-[#55594f] underline underline-offset-4">Clear filters</button>}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((vehicle) => <VehicleCard key={vehicle.slug} vehicle={vehicle} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#d8d9d1] bg-white px-6 py-20 text-center">
          <h2 className="text-xl font-semibold text-[#272a23]">{vehicles.length ? "No exact match just yet" : "New arrivals are on their way"}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777970]">{vehicles.length ? "Try another make or body style, or speak with our team and we’ll help find the right car for you." : "Our collection is being refreshed. Tell us what you’re looking for and we’ll be in touch."}</p>
          {vehicles.length > 0 && <button onClick={clearFilters} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#20231d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3e34]">Reset filters <ArrowRight size={15} /></button>}
        </div>
      )}
    </div>
  );
}
