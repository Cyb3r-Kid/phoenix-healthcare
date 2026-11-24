import { PageIntro, ServiceCard, Eyebrow } from "@/components/ui";
import { services } from "@/data/services";
import { HowItWorks, FinalCTA } from "@/components/sections";
import { FAQ } from "@/components/faq";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Home Nursing & Elderly Care Services", "Explore elderly care, home nursing, personal care and household assistance in Chennai. Discuss suitable home healthcare services with Phoenix.", "/services");
export default function ServicesPage() {
  return <><PageIntro eyebrow="CARE, IN THE COMFORT OF HOME" title="Support for the everyday. Care for what matters." description="Every family’s needs are different. Explore our services, then speak with us about the right support for your loved one." image="/images/home-nursing.webp" alt="A nurse speaking with an older man in his home"/><section className="section"><div className="container"><div className="section-heading"><Eyebrow>OUR SERVICES</Eyebrow><h2>A helping hand, shaped around you.</h2><p>Specific tasks, staff suitability, timings and availability are confirmed with our team before you arrange care.</p></div><div className="service-grid">{services.map(service => <ServiceCard service={service} key={service.slug}/>)}</div></div></section><HowItWorks/><FAQ/><FinalCTA/></>;
}
