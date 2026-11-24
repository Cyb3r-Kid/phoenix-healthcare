import { business } from "@/data/business";
export function whatsappUrl(service?: string) {
  const message = service
    ? `Hello Phoenix Home Healthcare, I would like to enquire about ${service}. Please share more information.`
    : "Hello Phoenix Home Healthcare, I would like to enquire about your home healthcare services. Please share more information.";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function enquiryUrl(data: { name: string; phone: string; service: string; location?: string; time?: string; message?: string }) {
  const message = ["Hello Phoenix Home Healthcare, I would like to enquire about your services.", `Name: ${data.name}`, `Phone: ${data.phone}`, `Service: ${data.service}`, data.location && `Location: ${data.location}`, data.time && `Preferred contact time: ${data.time}`, data.message && `Message: ${data.message}`].filter(Boolean).join("\n");
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
