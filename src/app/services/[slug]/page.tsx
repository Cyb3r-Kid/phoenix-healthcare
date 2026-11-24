import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { Eyebrow, Photo, WhatsAppLink, CallLink, ServiceCard } from "@/components/ui";
import { FinalCTA, HowItWorks } from "@/components/sections";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) return {};
  return pageMetadata(`${service.name} in Chennai`, `${service.description} Discuss ${service.shortName.toLowerCase()} at home with Phoenix Home Healthcare in Urapakkam, Chennai.`, `/services/${slug}`);
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const related = services.filter(item => item.slug !== slug).slice(0,3);
  return <><section className="page-intro"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page">{service.shortName}</span></nav><div className="split"><div><Eyebrow>{service.name}</Eyebrow><h1>{service.intro}</h1><p className="lead">{service.detail}</p><WhatsAppLink service={service.name}>Enquire About This Service</WhatsAppLink></div><Photo src={service.image} alt={service.alt} priority/></div></div></section><section className="section"><div className="container service-detail"><div><Eyebrow>LET’S UNDERSTAND YOUR NEEDS</Eyebrow><h2>What we can discuss together.</h2><p>Start with what would make daily life more comfortable for your loved one. We’ll help you explore suitable assistance.</p><ul className="support-list">{service.support.map(item => <li key={item}><Check size={19}/>{item}</li>)}</ul><p className="service-note">{service.note}</p></div><aside className="care-aside"><MessageCircle size={30}/><h3>There’s a person at the other end.</h3><p>Share your location, preferred timings and the kind of help you need. No complicated process — just a conversation.</p><WhatsAppLink service={service.name}>Discuss Your Requirements</WhatsAppLink><CallLink/><small>Please avoid sharing sensitive medical details in your initial enquiry.</small></aside></div></section><HowItWorks/><section className="section services-section"><div className="container"><Eyebrow>MORE WAYS WE CAN HELP</Eyebrow><h2>Explore other care services.</h2><div className="service-grid related-services">{related.map(item => <ServiceCard service={item} key={item.slug}/>)}</div></div></section><FinalCTA/></>;
}
