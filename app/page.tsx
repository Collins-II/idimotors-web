import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, MoveUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { Price } from "@/components/dealership/SiteProvider";
import { cssUrl, getVehicles, vehicleName } from "@/lib/portal";

const BODY_STYLES = ["SUV", "Sedan", "Coupe", "Wagon", "Hatchback", "Truck", "Convertible"];
const HERO_FALLBACK = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85";

const reasons = [
  { icon: BadgeCheck, title: "Every detail, considered", copy: "Each car is carefully selected and thoroughly reviewed before it joins our collection." },
  { icon: ShieldCheck, title: "Confidence comes standard", copy: "Clear histories, honest conversations and support that continues after the handover." },
  { icon: Sparkles, title: "A more personal way", copy: "No pressure, no noise. Just thoughtful guidance shaped around what matters to you." },
];

export default async function Home() {
  const inventory = await getVehicles({ sort: "featured", limit: 6 });
  const featured = inventory?.vehicles.slice(0, 3) ?? [];
  const heroCar = featured.find((vehicle) => vehicle.image);
  const makes = inventory?.makes ?? [];

  return (
    <div className="bg-[#f8f8f5] text-[#22251f]">
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-12 lg:px-12 lg:pb-24">
        <div className="relative z-10 max-w-[590px]">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#73776a]">
            <span className="h-px w-8 bg-[#9ba48a]" /> A different kind of car buying
          </p>
          <h1 className="mt-7 text-[clamp(3rem,6.4vw,6rem)] font-medium leading-[0.98] tracking-[-0.075em] text-[#20231d]">
            Good cars.<br />
            <span className="font-serif italic font-normal text-[#757b67]">Good people.</span><br />
            Better journeys.
          </h1>
          <p className="mt-7 max-w-[410px] text-[15px] leading-7 text-[#74776e] sm:text-base">
            A considered collection of exceptional cars, chosen for the way they make you feel—not just the way they look.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/inventory" className="inline-flex items-center gap-3 rounded-full bg-[#20231d] px-6 py-4 text-[13px] font-semibold text-white transition hover:bg-[#3a3e34]">
              Explore the collection <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#54584d] transition hover:text-[#20231d]">
              Meet your motoring partner <MoveUpRight size={14} />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-[#e6e6df] pt-6">
            <div className="flex -space-x-2">
              {["#d9bca8", "#a9b2a0", "#c7ab93"].map((color, index) => <span key={color} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f8f8f5] text-[9px] font-bold text-[#35382f]" style={{ backgroundColor: color }}>{["JM", "KM", "TN"][index]}</span>)}
            </div>
            <p className="text-xs leading-5 text-[#777a71]"><span className="font-semibold text-[#33362e]">A little more human.</span><br />The right car, with the right people.</p>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#dadbd4] sm:min-h-[480px] lg:min-h-[610px]">
          <div className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-[1.02]" role="img" aria-label={heroCar ? `Featured ${vehicleName(heroCar)}` : "A car from the IDI Motors collection"} style={{ backgroundImage: cssUrl(heroCar?.image || HERO_FALLBACK) }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141711]/65 via-transparent to-black/10" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-7 sm:top-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d3ed88]" /> The collection, at a glance
          </div>
          <Link href={heroCar ? `/inventory/${heroCar.slug}` : "/inventory"} className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">{heroCar ? "In the spotlight" : "The collection"}</span>
              <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] sm:text-2xl">{heroCar ? vehicleName(heroCar) : "Explore what's new"}</h2>
              {heroCar && <p className="mt-1 text-sm text-white/70">{heroCar.mileage.toLocaleString()} km <span className="mx-1">·</span> {heroCar.body}</p>}
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d3ed88] text-[#262a21] transition hover:scale-105"><MoveUpRight size={18} /></span>
          </Link>
        </div>
      </section>

      <section aria-label="Find a vehicle" className="relative z-10 mx-auto -mt-1 max-w-[1440px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
        <div className="rounded-[20px] border border-[#e7e7e0] bg-white p-5 shadow-[0_18px_55px_rgba(32,35,29,0.055)] sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a8d83]">Your next chapter starts here</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#272a23]">Find your kind of car</h2>
            </div>
            <Link href="/inventory" className="hidden items-center gap-2 text-xs font-semibold text-[#5a5e53] transition hover:text-[#20231d] sm:flex">Advanced search <ArrowRight size={14} /></Link>
          </div>
          <form action="/inventory" className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="rounded-xl bg-[#f5f5f1] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#95978e]">Make or model</span>
              <input name="q" placeholder="e.g. Porsche Macan" className="w-full bg-transparent text-sm text-[#292c25] outline-none placeholder:text-[#a4a69e]" />
            </label>
            <label className="rounded-xl bg-[#f5f5f1] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#95978e]">Make</span>
              <select name="make" defaultValue="" className="w-full bg-transparent text-sm text-[#55584f] outline-none">
                <option value="">Any make</option>
                {makes.map((make) => <option key={make}>{make}</option>)}
              </select>
            </label>
            <label className="rounded-xl bg-[#f5f5f1] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#95978e]">Body style</span>
              <select name="body" defaultValue="" className="w-full bg-transparent text-sm text-[#55584f] outline-none">
                <option value="">Any style</option>
                {BODY_STYLES.map((body) => <option key={body}>{body}</option>)}
              </select>
            </label>
            <button type="submit" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-[#d3ed88] px-7 text-[13px] font-bold text-[#30352a] transition hover:bg-[#c8e47a]">
              Find a car <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-5 sm:px-8 md:grid-cols-4 lg:px-12">
          {[
            ["Thoughtfully sourced", "Every car has a story worth knowing"],
            ["One-to-one guidance", "Real people, here when you need us"],
            ["Transparent from day one", "No surprises. Just honest answers"],
            ["Here for the long run", "Support beyond the handover"],
          ].map(([title, caption], index) => (
            <div key={title} className={`px-2 sm:px-5 ${index > 0 ? "md:border-l md:border-[#e8e8e2]" : ""}`}>
              <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f0f3e8] text-[#697452]"><Check size={14} /></div>
              <h3 className="text-[13px] font-semibold text-[#34372f]">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#888a82]">{caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-9 flex items-end justify-between gap-5 sm:mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818579]">The collection</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[#22251f] sm:text-4xl">A few worth a closer look.</h2>
          </div>
          <Link href="/inventory" className="hidden items-center gap-2 text-sm font-semibold text-[#55594f] transition hover:text-[#20231d] sm:flex">View all vehicles <ArrowRight size={15} /></Link>
        </div>

        {featured.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d8d9d1] bg-white px-6 py-14 text-center text-sm text-[#777970]">
            New arrivals are being prepared. <Link href="/contact" className="font-semibold text-[#20231d] underline underline-offset-4">Tell us what you’re looking for</Link>.
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((vehicle) => (
            <Link key={vehicle.slug} href={`/inventory/${vehicle.slug}`} className="group overflow-hidden rounded-[20px] border border-[#e8e8e2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(32,35,29,0.1)]">
              <div className="relative aspect-[1.48] overflow-hidden bg-[#efefeb]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]" role="img" aria-label={vehicleName(vehicle)} style={vehicle.image ? { backgroundImage: cssUrl(vehicle.image) } : undefined} />
                {vehicle.badge && <span className="absolute left-4 top-4 rounded-full bg-[#f5f7ed] px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-[#4d5a37]">{vehicle.badge}</span>}
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-[#30342c] transition group-hover:bg-[#d3ed88]"><MoveUpRight size={16} /></span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#888a81]">{vehicle.year} <span className="mx-1 text-[#c5c6bf]">/</span> {vehicle.body} <span className="mx-1 text-[#c5c6bf]">/</span> {vehicle.mileage.toLocaleString()} km</p>
                <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.04em] text-[#24271f]">{vehicle.make} <span className="font-normal">{vehicle.model}</span></h3>
                <div className="mt-5 flex items-end justify-between border-t border-[#edede8] pt-4">
                  <span className="text-[17px] font-semibold tracking-[-0.03em] text-[#24271f]"><Price amount={vehicle.price} /></span>
                  <span className="text-[11px] font-semibold text-[#74776e] transition group-hover:text-[#30342c]">Discover <ArrowRight size={13} className="ml-1 inline" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/inventory" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#55594f] sm:hidden">View all vehicles <ArrowRight size={15} /></Link>
      </section>

      <section id="approach" className="bg-[#20231d] py-16 text-[#f7f7f2] sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b4be9d]">The IDI Motors difference</p>
            <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.06em] sm:text-5xl">Buying a car should feel as good as driving one.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">We believe the best way to find your next car is with time, trust and a little more attention to the details. That’s how we do things here.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#d3ed88] transition hover:text-white">Get to know us <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {reasons.map(({ icon: Icon, title, copy }, index) => (
              <div key={title} className="border-t border-white/15 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#d3ed88]"><Icon size={18} strokeWidth={1.6} /></span>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">0{index + 1}</p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="financing" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-[24px] bg-[#e9eddf] px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-[#d5dcc8] sm:right-8 sm:top-[-120px] sm:h-[460px] sm:w-[460px]" />
          <div className="pointer-events-none absolute -right-1 -top-14 h-52 w-52 rounded-full border border-[#d5dcc8] sm:right-16 sm:top-[-88px] sm:h-[360px] sm:w-[360px]" />
          <div className="relative max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#727b60]">The numbers, made clearer</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.06em] text-[#22251f] sm:text-4xl">Let’s make the next step feel simple.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#6f7369]">From understanding your options to arranging a viewing, our team is here to make the process feel straightforward—and personal.</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#20231d] px-6 py-4 text-[13px] font-semibold text-white transition hover:bg-[#3a3e34]">Talk through your options <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8e8e2] bg-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#818579]">Ready when you are</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.06em] text-[#22251f] sm:text-4xl">Some things are better talked through.</h2>
            <p className="mt-3 text-sm leading-6 text-[#797c73]">Tell us what you’re looking for. We’ll take it from there.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/inventory" className="inline-flex items-center gap-2 rounded-full border border-[#dedfd7] px-6 py-4 text-[13px] font-semibold text-[#3d4038] transition hover:bg-[#f3f4ed]">Browse the collection <ArrowRight size={15} /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#d3ed88] px-6 py-4 text-[13px] font-bold text-[#30352a] transition hover:bg-[#c8e47a]">Get in touch <MoveUpRight size={15} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
