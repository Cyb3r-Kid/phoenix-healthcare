import Link from "next/link";
import Image from "next/image";
import { Heart, HeartHandshake, House, Stethoscope, Plus, MessageCircle, Phone, HandHeart } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { business } from "@/data/business";
import type { Service } from "@/data/services";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="Phoenix Home Healthcare home"><span className="brand-symbol"><HeartHandshake size={31} strokeWidth={1.5} /></span><span><span className="brand-name">phoenix<span className="brand-dot">.</span></span><span className="brand-sub">HOME HEALTHCARE</span></span></Link>;
}
export function WhatsAppLink({ children = "Get Care at Home", service, className = "button button-primary" }: { children?: React.ReactNode; service?: string; className?: string }) {
  return <a href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer" className={className}><MessageCircle size={18} aria-hidden="true" />{children}</a>;
}
export function CallLink({ children = "Call Now", className = "button button-outline" }: { children?: React.ReactNode; className?: string }) {
  return <a href={business.phoneHref} className={className}><Phone size={17} aria-hidden="true" />{children}</a>;
}
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}
export function Photo({ src, alt, className = "", priority = false, sizes = "(max-width: 767px) 100vw, 50vw" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`photo ${className}`}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} /></div>;
}
const icons = { heart: Heart, stethoscope: Stethoscope, hand: HandHeart, home: House, cross: Plus };
export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return <article className="service-card"><Link href={`/services/${service.slug}`} tabIndex={-1} aria-hidden="true"><Photo src={service.image} alt={service.alt} sizes="(max-width: 650px) 100vw, (max-width: 1023px) 50vw, 33vw" /></Link><div className="service-card-body"><span className="icon-box"><Icon size={23} strokeWidth={1.6} /></span><h3><Link href={`/services/${service.slug}`}>{service.name}</Link></h3><p>{service.description}</p><div className="card-actions"><Link href={`/services/${service.slug}`} className="text-link">Explore service</Link><WhatsAppLink service={service.name} className="enquire-link">Enquire</WhatsAppLink></div></div></article>;
}
export function PageIntro({ eyebrow, title, description, image, alt }: { eyebrow: string; title: string; description: string; image: string; alt: string }) {
  return <section className="page-intro"><div className="container split"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p className="lead">{description}</p><WhatsAppLink /></div><Photo src={image} alt={alt} priority /></div></section>;
}
