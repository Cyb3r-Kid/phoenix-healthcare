export const business = {
  name: "Phoenix Home Healthcare",
  tagline: "Healing Happens Best at Home.",
  phone: "+91 63749 30178",
  phoneHref: "tel:+916374930178",
  whatsapp: "916374930178",
  instagram: "https://www.instagram.com/phoen_ix3005/",
  address: "4/54, Karanai Puducherry Road, Urapakkam, Chennai, Tamil Nadu, India – 603202",
  // Business-provided claims. Owner should verify before launch; set to null to hide.
  experience: "8+ Years of Care & Trust" as string | null,
  coverage: "Home Nursing Across Tamil Nadu" as string | null,
};
export const navigation = [
  { href: "/", label: "Home" }, { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/medical-equipment", label: "Medical Equipment" }, { href: "/contact", label: "Contact Us" },
];
export const testimonials: { quote: string; name: string; consentVerified: boolean }[] = [];
export const faqs = [
  { question: "What home healthcare services does Phoenix provide?", answer: "You can enquire about elderly care, home nursing, personal care assistance, household support and medical equipment rental or sales. Our team will discuss your requirements and confirm which services are suitable and available." },
  { question: "How can I arrange home nursing support?", answer: "Call or WhatsApp our team with your location and the type of support you need. We will discuss your requirements, confirm suitable services and help you arrange care. Nursing support depends on staff qualifications and availability." },
  { question: "Do you provide elderly care assistance?", answer: "Yes. You can contact Phoenix for personal assistance and everyday support for senior citizens. Tell us about your family’s routines and needs so we can discuss suitable support." },
  { question: "Can I enquire about medical equipment rental?", answer: "Yes. Contact our team about medical equipment rental or purchase. Please confirm the equipment you need, availability, rental duration and pricing directly with us." },
  { question: "Which areas do you serve?", answer: "Phoenix is based in Urapakkam, Chennai. The business advertises home nursing across Tamil Nadu. Please share your exact location so the team can confirm service availability in your area." },
  { question: "How do I contact Phoenix Home Healthcare?", answer: "Call +91 63749 30178 or message the same number on WhatsApp. You can also use our enquiry form to prepare a WhatsApp message, review it and send it yourself." },
];
