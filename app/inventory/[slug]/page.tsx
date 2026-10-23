import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Gauge, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import EnquiryForm from "@/components/dealership/EnquiryForm";
import VehicleGallery from "@/components/dealership/VehicleGallery";
import { Price } from "@/components/dealership/SiteProvider";
import { cssUrl, getSiteSettings, getVehicle, telHref, vehicleName, whatsappHref } from "@/lib/portal";

type VehiclePageProps = {
  params: Promise<{ slug: string }>;
};

async function loadVehicle(slug: string) {
  try {
    return { data: await getVehicle(slug), unavailable: false };
  } catch (error) {
    console.error("[portal] vehicle unavailable:", error instanceof Error ? error.message : error);
    return { data: undefined, unavailable: true };
  }
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { data } = await loadVehicle((await params).slug);
  if (!data) return { title: "Vehicle not found | IDI Motors" };
  const { vehicle } = data;
  return {
    title: `${vehicleName(vehicle)} | IDI Motors`,
    description: vehicle.description.slice(0, 160),
    openGraph: { title: vehicleName(vehicle), description: vehicle.description.slice(0, 160), images: vehicle.image ? [vehicle.image] : [] },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const [{ data, unavailable }, settings] = await Promise.all([loadVehicle(slug), getSiteSettings()]);

  if (unavailable) {
    return (
      <main className="min-h-[60vh] bg-[#f8f8f5] px-5 py-20 text-center text-[#22251f]">
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">This listing is briefly unavailable</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777970]">We couldn’t load the latest details just now. Please try again shortly or get in touch with our team.</p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/inventory" className="rounded-full border border-[#e4e5dd] px-5 py-3 text-sm font-semibold text-[#41443c]">Back to the collection</Link>
          <Link href="/contact" className="rounded-full bg-[#20231d] px-5 py-3 text-sm font-semibold text-white">Contact us</Link>
        </div>
      </main>
    );
  }
  if (!data) notFound();

  const { vehicle, related } = data;
  const name = vehicleName(vehicle);
  const whatsapp = settings.whatsapp || settings.phone;
  const specs: [string, string][] = [
    ["Year", String(vehicle.year)],
    ["Mileage", `${vehicle.mileage.toLocaleString()} km`],
    ["Transmission", vehicle.transmission],
    ["Fuel", vehicle.fuel],
    ["Body", vehicle.body],
    ["Colour", vehicle.color],
  ];

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-10 text-[#22251f] sm:px-8 sm:pt-14 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <Link href="/inventory" className="inline-flex items-center gap-2 text-xs font-semibold text-[#7b7e74] transition hover:text-[#252820]"><ArrowLeft size={14} /> Back to the collection</Link>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <div>
            <VehicleGallery images={vehicle.images} name={name} label={vehicle.status === "Reserved" ? "Reserved" : vehicle.badge || `${vehicle.year} collection`} />
            <div className="mt-8 border-t border-[#e6e6df] pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85877e]">A closer look</p>
              <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#686c62]">{vehicle.description}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#686c62]">Every detail is here to help you decide with confidence. Get in touch to arrange a personal viewing or ask us anything about this car.</p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e7e7e0] bg-white p-4">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#92948b]">{label}</span>
                  <span className="mt-2 block text-sm font-semibold text-[#34372f]">{value}</span>
                </div>
              ))}
            </div>
            <section id="enquire" className="mt-10 scroll-mt-8 rounded-[22px] border border-[#e7e7e0] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85877e]">Talk to us about this car</p>
              <h2 className="mb-6 mt-2 text-2xl font-medium tracking-[-0.05em]">Ask a question or book a test drive</h2>
              <EnquiryForm vehicleSlug={vehicle.slug} vehicleName={name} />
            </section>
          </div>

          <aside className="h-fit rounded-[22px] border border-[#e7e7e0] bg-white p-6 sm:p-8 lg:sticky lg:top-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85877e]">IDI Motors selection</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.06em] text-[#24271f]">{vehicle.make}<br /><span className="font-normal">{vehicle.model}</span></h1>
            <p className="mt-2 text-sm text-[#777970]">{vehicle.year} <span className="mx-1 text-[#d0d1ca]">/</span> {vehicle.body} <span className="mx-1 text-[#d0d1ca]">/</span> {vehicle.color}</p>
            <div className="my-6 border-t border-[#edede8]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#96988f]">Asking price</span>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-[#24271f]"><Price amount={vehicle.price} /></p>
            {vehicle.status === "Reserved" && <p className="mt-2 text-xs font-semibold text-[#8a6d2f]">Currently reserved. Ask us to join the waiting list.</p>}
            <div className="mt-6 space-y-3 text-xs text-[#696d63]">
              <p className="flex items-center gap-2"><Gauge size={15} className="text-[#858a78]" /> {vehicle.mileage.toLocaleString()} km driven</p>
              <p className="flex items-center gap-2"><MapPin size={15} className="text-[#858a78]" /> Available to view in {settings.address}</p>
              <p className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#858a78]" /> Carefully selected by {settings.dealership}</p>
            </div>
            <a href="#enquire" className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#20231d] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#3a3e34]">
              Enquire or book a test drive
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {whatsapp && <a href={whatsappHref(whatsapp, `Hello ${settings.dealership}, I'm interested in the ${name}.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-[#e4e5dd] px-4 py-3.5 text-sm font-semibold text-[#41443c] transition hover:bg-[#f6f6f2]"><MessageCircle size={15} /> WhatsApp</a>}
              {settings.phone && <a href={telHref(settings.phone)} className="flex items-center justify-center gap-2 rounded-full border border-[#e4e5dd] px-4 py-3.5 text-sm font-semibold text-[#41443c] transition hover:bg-[#f6f6f2]"><Phone size={15} /> Call</a>}
            </div>
            <p className="mt-5 text-center text-[10px] leading-5 text-[#92948c]">Questions are welcome. Our team is happy to help you get to know this car.</p>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-[#e6e6df] pt-10">
            <div className="mb-7 flex items-end justify-between">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85877e]">A few more possibilities</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.05em]">Also in the collection</h2></div>
              <Link href="/inventory" className="hidden items-center gap-2 text-xs font-semibold text-[#55594f] sm:flex">View all <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <Link key={item.slug} href={`/inventory/${item.slug}`} className="group flex items-center gap-4 rounded-2xl border border-[#e7e7e0] bg-white p-3 transition hover:shadow-md">
                  <div className="h-20 w-24 shrink-0 rounded-xl bg-[#efefeb] bg-cover bg-center" role="img" aria-label={vehicleName(item)} style={item.image ? { backgroundImage: cssUrl(item.image) } : undefined} />
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#34372f]">{item.make} {item.model}</p><p className="mt-1 text-xs text-[#85877e]">{item.year} · {item.body}</p><p className="mt-2 text-xs font-semibold text-[#46493f]"><Price amount={item.price} /></p></div>
                  <ArrowRight size={14} className="ml-auto shrink-0 text-[#a1a795] transition group-hover:text-[#52603c]" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
