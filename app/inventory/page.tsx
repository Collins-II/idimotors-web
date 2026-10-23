import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InventoryBrowser from "@/components/dealership/InventoryBrowser";
import { getVehicles } from "@/lib/portal";

export const metadata: Metadata = {
  title: "The Collection | IDI Motors",
  description: "Explore the carefully selected car collection at IDI Motors in Lusaka.",
};

type InventoryPageProps = {
  searchParams: Promise<{ q?: string; make?: string; body?: string }>;
};

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const { q = "", make = "", body = "" } = await searchParams;
  const inventory = await getVehicles({ limit: 100 });

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-12 text-[#22251f] sm:px-8 sm:pt-16 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#7b7e74] transition hover:text-[#252820]"><ArrowLeft size={14} /> Back to IDI Motors</Link>
        <div className="mb-9 mt-8 flex flex-col justify-between gap-5 sm:mb-12 sm:mt-10 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818579]">Thoughtfully chosen, ready for you</p>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.07em] text-[#22251f] sm:text-5xl">The collection.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#777970]">A considered edit of exceptional cars, each selected for its character, condition and the journey ahead.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#55594f] transition hover:text-[#20231d]">Looking for something specific? <span className="underline underline-offset-4">Talk to us</span></Link>
        </div>
        {inventory ? (
          <InventoryBrowser vehicles={inventory.vehicles} initialQuery={q} initialMake={make} initialBody={body} />
        ) : (
          <div role="alert" className="rounded-2xl border border-dashed border-[#d8d9d1] bg-white px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-[#272a23]">The collection is briefly unavailable</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777970]">We’re refreshing our listings. Please try again in a moment, or talk to our team directly.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#20231d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3e34]">Contact the team</Link>
          </div>
        )}
      </div>
    </main>
  );
}
