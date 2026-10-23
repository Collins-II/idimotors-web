import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, HandCoins, MoveUpRight, Repeat2, ShieldCheck, Sparkles } from "lucide-react";
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
    <div className="bg-[#f4f6f9] text-[#1e2026]">
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-16 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-12 lg:px-12 lg:pb-24">
        <div className="relative z-10 max-w-[590px]">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#636b7e]">
            <span className="h-px w-8 bg-[#8590a9]" /> A different kind of car buying
          </p>
          <h1 className="mt-7 text-[clamp(3rem,6.4vw,6rem)] font-medium leading-[0.98] tracking-[-0.075em] text-[#0f172a]">
            Good cars.<br />
            <span className="font-serif italic font-normal text-[#636b7f]">Good people.</span><br />
            Better journeys.
          </h1>
          <p className="mt-7 max-w-[410px] text-[15px] leading-7 text-[#656d80] sm:text-base">
            A considered collection of exceptional cars, chosen for the way they make you feel—not just the way they look.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/inventory" className="inline-flex items-center gap-3 rounded-full bg-[#1d4ed8] px-6 py-4 text-[13px] font-semibold text-white transition hover:bg-[#1e40af]">
              Explore the collection <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#494f5c] transition hover:text-[#1d4ed8]">
              Meet your motoring partner <MoveUpRight size={14} />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-[#dee1e7] pt-6">
            <div className="flex -space-x-2">
              {["#d9bca8", "#9ca4b6", "#c7ab93"].map((color, index) => <span key={color} className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f4f6f9] text-[9px] font-bold text-[#2d313a]" style={{ backgroundColor: color }}>{["JM", "KM", "TN"][index]}</span>)}
            </div>
            <p className="text-xs leading-5 text-[#677084]"><span className="font-semibold text-[#2c3038]">A little more human.</span><br />The right car, with the right people.</p>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] bg-[#d3d6dc] sm:min-h-[480px] lg:min-h-[610px]">
          <div className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-[1.02]" role="img" aria-label={heroCar ? `Featured ${vehicleName(heroCar)}` : "A car from the IDI Motors collection"} style={{ backgroundImage: cssUrl(heroCar?.image || HERO_FALLBACK) }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101218]/65 via-transparent to-black/10" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-7 sm:top-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93c5fd]" /> The collection, at a glance
          </div>
          <Link href={heroCar ? `/inventory/${heroCar.slug}` : "/inventory"} className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">{heroCar ? "In the spotlight" : "The collection"}</span>
              <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] sm:text-2xl">{heroCar ? vehicleName(heroCar) : "Explore what's new"}</h2>
              {heroCar && <p className="mt-1 text-sm text-white/70">{heroCar.mileage.toLocaleString()} km <span className="mx-1">·</span> {heroCar.body}</p>}
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1d4ed8] text-white transition hover:scale-105"><MoveUpRight size={18} /></span>
          </Link>
        </div>
      </section>

      <section aria-label="Find a vehicle" className="relative z-10 mx-auto -mt-1 max-w-[1440px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
        <div className="rounded-[20px] border border-[#dfe2e8] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.055)] sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a8296]">Your next chapter starts here</p>
              <h2 className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#22252b]">Find your kind of car</h2>
            </div>
            <Link href="/inventory" className="hidden items-center gap-2 text-xs font-semibold text-[#4e5463] transition hover:text-[#1d4ed8] sm:flex">Advanced search <ArrowRight size={14} /></Link>
          </div>
          <form action="/inventory" className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="rounded-xl bg-[#f0f2f6] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#858da0]">Make or model</span>
              <input name="q" placeholder="e.g. Porsche Macan" className="w-full bg-transparent text-sm text-[#24272d] outline-none placeholder:text-[#979ead]" />
            </label>
            <label className="rounded-xl bg-[#f0f2f6] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#858da0]">Make</span>
              <select name="make" defaultValue="" className="w-full bg-transparent text-sm text-[#494f5e] outline-none">
                <option value="">Any make</option>
                {makes.map((make) => <option key={make}>{make}</option>)}
              </select>
            </label>
            <label className="rounded-xl bg-[#f0f2f6] px-4 py-3">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#858da0]">Body style</span>
              <select name="body" defaultValue="" className="w-full bg-transparent text-sm text-[#494f5e] outline-none">
                <option value="">Any style</option>
                {BODY_STYLES.map((body) => <option key={body}>{body}</option>)}
              </select>
            </label>
            <button type="submit" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-[#1d4ed8] px-7 text-[13px] font-bold text-white transition hover:bg-[#1e40af]">
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
            <div key={title} className={`px-2 sm:px-5 ${index > 0 ? "md:border-l md:border-[#e1e3e9]" : ""}`}>
              <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#e5eaf6] text-[#4b597b]"><Check size={14} /></div>
              <h3 className="text-[13px] font-semibold text-[#2d3139]">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#778095]">{caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-9 flex items-end justify-between gap-5 sm:mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#70798e]">The collection</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.06em] text-[#1e2026] sm:text-4xl">A few worth a closer look.</h2>
          </div>
          <Link href="/inventory" className="hidden items-center gap-2 text-sm font-semibold text-[#4a505e] transition hover:text-[#1d4ed8] sm:flex">View all vehicles <ArrowRight size={15} /></Link>
        </div>

        {featured.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#cfd3db] bg-white px-6 py-14 text-center text-sm text-[#676f82]">
            New arrivals are being prepared. <Link href="/contact" className="font-semibold text-[#0f172a] underline underline-offset-4">Tell us what you’re looking for</Link>.
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((vehicle) => (
            <Link key={vehicle.slug} href={`/inventory/${vehicle.slug}`} className="group overflow-hidden rounded-[20px] border border-[#e1e3e9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)]">
              <div className="relative aspect-[1.48] overflow-hidden bg-[#eaecf0]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]" role="img" aria-label={vehicleName(vehicle)} style={vehicle.image ? { backgroundImage: cssUrl(vehicle.image) } : undefined} />
                {vehicle.badge && <span className="absolute left-4 top-4 rounded-full bg-[#eaeffa] px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-[#303f61]">{vehicle.badge}</span>}
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-[#2a2e36] transition group-hover:bg-[#1d4ed8] group-hover:text-white"><MoveUpRight size={16} /></span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#778094]">{vehicle.year} <span className="mx-1 text-[#bbc0ca]">/</span> {vehicle.body} <span className="mx-1 text-[#bbc0ca]">/</span> {vehicle.mileage.toLocaleString()} km</p>
                <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.04em] text-[#1d2129]">{vehicle.make} <span className="font-normal">{vehicle.model}</span></h3>
                <div className="mt-5 flex items-end justify-between border-t border-[#e7e9ef] pt-4">
                  <span className="text-[17px] font-semibold tracking-[-0.03em] text-[#1d2129]"><Price amount={vehicle.price} /></span>
                  <span className="text-[11px] font-semibold text-[#656d80] transition group-hover:text-[#2a2e36]">Discover <ArrowRight size={13} className="ml-1 inline" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/inventory" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#4a505e] sm:hidden">View all vehicles <ArrowRight size={15} /></Link>
      </section>

      <section id="approach" className="bg-[#1d4ed8] py-16 text-[#f0f3f9] sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bfdbfe]">The IDI Motors difference</p>
            <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.06em] sm:text-5xl">Buying a car should feel as good as driving one.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">We believe the best way to find your next car is with time, trust and a little more attention to the details. That’s how we do things here.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition hover:underline">Get to know us <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {reasons.map(({ icon: Icon, title, copy }, index) => (
              <div key={title} className="border-t border-white/20 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white"><Icon size={18} strokeWidth={1.6} /></span>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">0{index + 1}</p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/75">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="financing" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-[24px] bg-[#dbe2f1] px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-[#c4cce0] sm:right-8 sm:top-[-120px] sm:h-[460px] sm:w-[460px]" />
          <div className="pointer-events-none absolute -right-1 -top-14 h-52 w-52 rounded-full border border-[#c4cce0] sm:right-16 sm:top-[-88px] sm:h-[360px] sm:w-[360px]" />
          <div className="relative max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6680]">The numbers, made clearer</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.06em] text-[#1e2026] sm:text-4xl">Let’s make the next step feel simple.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#61697b]">From understanding your options to arranging a viewing, our team is here to make the process feel straightforward—and personal.</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-4 text-[13px] font-semibold text-white transition hover:bg-[#1e40af]">Talk through your options <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section id="sell" className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: HandCoins, eyebrow: "Sell to IDI Motors", title: "Get a fair offer for your car.", copy: "Share a few details and photos. We’ll review your car and come back with a straightforward offer—no listings, no strangers.", href: "/sell?type=Sell", cta: "Get an offer" },
            { icon: Repeat2, eyebrow: "Swap & top-up", title: "Trade in and drive away in something new.", copy: "Use your current car as part-payment on any vehicle in our collection and simply top up the difference.", href: "/sell?type=Swap", cta: "Start a swap" },
          ].map(({ icon: Icon, eyebrow, title, copy, href, cta }) => (
            <Link key={href} href={href} className="group flex flex-col justify-between gap-8 rounded-[24px] border border-[#dbe2f1] bg-white p-7 transition hover:-translate-y-1 hover:border-[#1d4ed8]/40 hover:shadow-[0_20px_48px_rgba(29,78,216,0.12)] sm:p-9">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#dbeafe] text-[#1d4ed8]"><Icon size={19} /></span>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]">{eyebrow}</p>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.05em] text-[#1e2026] sm:text-3xl">{title}</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-[#61697b]">{copy}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8]">{cta} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e1e3e9] bg-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#70798e]">Ready when you are</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-[-0.06em] text-[#1e2026] sm:text-4xl">Some things are better talked through.</h2>
            <p className="mt-3 text-sm leading-6 text-[#697286]">Tell us what you’re looking for. We’ll take it from there.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/inventory" className="inline-flex items-center gap-2 rounded-full border border-[#d5d9e1] px-6 py-4 text-[13px] font-semibold text-[#353943] transition hover:bg-[#ebeef6]">Browse the collection <ArrowRight size={15} /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-4 text-[13px] font-bold text-white transition hover:bg-[#1e40af]">Get in touch <MoveUpRight size={15} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
