import { Plus } from "lucide-react";
import { faqs } from "@/data/business";
import { Eyebrow, CallLink } from "./ui";
export function FAQ() {
  return <section className="section faq-section"><div className="container faq-layout"><div><Eyebrow>A LITTLE CLARITY</Eyebrow><h2>Your questions,<br />answered with care.</h2><p>Choosing care for someone you love is a big decision. We’re here to help you take the next step.</p><CallLink>Talk to our team</CallLink></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<Plus size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
