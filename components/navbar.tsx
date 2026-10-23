"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MoveUpRight, Phone, Search, X } from "lucide-react";
import { useState } from "react";
import { CurrencySwitcher, useSite } from "@/components/dealership/SiteProvider";
import { telHref } from "@/lib/portal";

const links = [
  { label: "The collection", href: "/inventory" },
  { label: "Our approach", href: "/#approach" },
  { label: "Financing", href: "/#financing" },
  { label: "Visit us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSite()

  return (
    <header className="relative z-50 border-b border-[#e7e7e1] bg-[#f8f8f5]">
      <div className="border-b border-[#e7e7e1] bg-[#f1f1ec]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#74766e] sm:px-8 lg:px-12">
          <span>{settings.address} <span className="mx-2 text-[#c7c8c0]">/</span> Curated cars, considered differently</span>
          <div className="flex items-center gap-5">
            {settings.phone && (
              <a className="hidden items-center gap-2 transition hover:text-[#20231d] sm:flex" href={telHref(settings.phone)}>
                <Phone size={12} /> {settings.phone}
              </a>
            )}
            <CurrencySwitcher className="text-[#74766e]" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="IDI Motors home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#20231d] text-[#d3ed88] transition group-hover:bg-[#34382f]">
            <span className="text-sm font-black tracking-[-0.08em]">IDI</span>
          </span>
          <span className="flex flex-col">
            <span className="text-[17px] font-bold leading-none tracking-[0.12em] text-[#20231d]">IDI MOTORS</span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#85877f]">The collection</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const active = link.href === "/inventory" && pathname.startsWith("/inventory");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition ${active ? "text-[#20231d]" : "text-[#777970] hover:text-[#20231d]"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/inventory" aria-label="Browse inventory" className="text-[#5f6259] transition hover:text-[#20231d]">
            <Search size={18} strokeWidth={1.8} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#20231d] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-[#3a3e34]">
            Start a conversation <MoveUpRight size={14} />
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#e4e4dd] text-[#20231d] lg:hidden"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full border-t border-[#e7e7e1] bg-[#f8f8f5] px-5 pb-6 pt-3 shadow-xl lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-[#e7e7e1] py-4 text-sm font-medium text-[#34372f]"
            >
              {link.label}<MoveUpRight size={15} />
            </Link>
          ))}
          {settings.phone && (
            <a href={telHref(settings.phone)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#34372f]">
              <Phone size={15} /> {settings.phone}
            </a>
          )}
        </nav>
      )}
    </header>
  );
}
