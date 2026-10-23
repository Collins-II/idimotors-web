import Link from "next/link";
import { ArrowRight, Mail, MapPin, MoveUpRight, Phone } from "lucide-react";
import { getSiteSettings, telHref } from "@/lib/portal";

export default async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="bg-[#20231d] text-[#f5f5ef]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.4fr_0.7fr_0.9fr] lg:px-12">
        <div>
          <Link href="/" aria-label="IDI Motors home" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d3ed88] text-[#20231d]"><span className="text-sm font-black tracking-[-0.08em]">IDI</span></span>
            <span><span className="block text-[17px] font-bold leading-none tracking-[0.12em]">IDI MOTORS</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.24em] text-white/45">The collection</span></span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">A considered collection of exceptional cars. Thoughtfully chosen in Lusaka, for wherever the road takes you.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d3ed88] transition hover:text-white">Come say hello <ArrowRight size={15} /></Link>
        </div>

        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Explore IDI Motors</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li><Link href="/inventory" className="transition hover:text-[#d3ed88]">The collection</Link></li>
            <li><Link href="/#approach" className="transition hover:text-[#d3ed88]">Our approach</Link></li>
            <li><Link href="/#financing" className="transition hover:text-[#d3ed88]">Financing</Link></li>
            <li><Link href="/contact" className="transition hover:text-[#d3ed88]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Let’s talk</h2>
          {settings.phone && <a href={telHref(settings.phone)} className="mt-5 flex items-center gap-3 text-sm text-white/75 transition hover:text-[#d3ed88]"><Phone size={15} /> {settings.phone}</a>}
          {settings.email && <a href={`mailto:${settings.email}`} className="mt-3 flex items-center gap-3 text-sm text-white/75 transition hover:text-[#d3ed88]"><Mail size={15} /> {settings.email}</a>}
          <p className="mt-3 flex items-center gap-3 text-sm text-white/75"><MapPin size={15} /> {settings.address}</p>
          <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#d3ed88] transition hover:text-white">Arrange a viewing <MoveUpRight size={13} /></Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} {settings.dealership}. {settings.address}.</span>
          <span>Considered cars. Thoughtful service.</span>
        </div>
      </div>
    </footer>
  );
}
