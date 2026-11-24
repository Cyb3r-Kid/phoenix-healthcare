"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { business, navigation } from "@/data/business";
import { Brand } from "./ui";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!panel.current?.contains(e.target as Node) && !toggle.current?.contains(e.target as Node)) setOpen(false); };
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", close); document.addEventListener("pointerdown", outside); media.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); media.removeEventListener("change", resize); };
  }, [open]);
  return <><div className="announcement"><div className="container announcement-inner"><span><MapPin size={13} />Compassionate Home Healthcare <span className="announcement-location"> | Urapakkam, Chennai</span></span><a href={business.phoneHref}><Phone size={13} />{business.phone}</a></div></div><header className="header"><div className="container navigation"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><Link href="/contact" className="button button-primary header-cta">Get Care <HeartIcon /></Link><button className="menu-toggle" ref={toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.div ref={panel} id="mobile-navigation" className="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : .18 }}><nav aria-label="Mobile navigation">{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}<Link className="button button-primary" href="/contact" onClick={() => setOpen(false)}>Discuss your care needs</Link></nav></motion.div>}</AnimatePresence></header></>;
}
function HeartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>; }
