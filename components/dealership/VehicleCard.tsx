"use client";

import Link from "next/link";
import { ArrowRight, Gauge } from "lucide-react";
import { Price } from "./SiteProvider";
import { cssUrl, vehicleName, type Vehicle } from "@/lib/portal";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const label = vehicle.status === "Reserved" ? "RESERVED" : vehicle.badge?.toUpperCase();
  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#e8e8e2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(32,35,29,0.1)]">
      <Link href={`/inventory/${vehicle.slug}`} className="block">
        <div
          role="img"
          aria-label={vehicleName(vehicle)}
          className="relative aspect-[1.48] overflow-hidden bg-[#efefeb] bg-cover bg-center transition duration-500 group-hover:bg-[length:105%]"
          style={vehicle.image ? { backgroundImage: cssUrl(vehicle.image) } : undefined}
        >
          {!vehicle.image && <span className="absolute inset-0 grid place-items-center text-xs text-[#a3a59c]">Photos coming soon</span>}
          {label && <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] ${vehicle.status === "Reserved" ? "bg-[#20231d] text-[#d3ed88]" : "bg-[#f5f7ed] text-[#4d5a37]"}`}>{label}</span>}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#888a81]">{vehicle.year} <span className="mx-1 text-[#c5c6bf]">/</span> {vehicle.body}</p>
            <span className="text-[10px] text-[#8b8d85]">{vehicle.color}</span>
          </div>
          <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.04em] text-[#24271f]">{vehicle.make} <span className="font-normal">{vehicle.model}</span></h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#797c73]">
            <Gauge size={14} /> {vehicle.mileage.toLocaleString()} km <span className="text-[#d0d1ca]">·</span> {vehicle.transmission}
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-[#edede8] pt-4">
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#96988f]">Asking price</span>
              <span className="mt-1 block text-[17px] font-semibold tracking-[-0.03em] text-[#24271f]"><Price amount={vehicle.price} /></span>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3f4ed] text-[#44483d] transition group-hover:bg-[#d3ed88]"><ArrowRight size={16} /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}
