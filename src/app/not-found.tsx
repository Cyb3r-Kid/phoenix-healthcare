import Link from "next/link";
import { Eyebrow } from "@/components/ui";
export default function NotFound() { return <section className="section"><div className="container prose"><Eyebrow>LET’S GET YOU BACK HOME</Eyebrow><h1>This page isn’t here.</h1><p>You can explore our care services or contact our team for support.</p><div className="button-row"><Link href="/" className="button button-primary">Back to Home</Link><Link href="/contact" className="button button-outline">Contact Us</Link></div></div></section>; }
