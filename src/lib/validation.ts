import { z } from "zod";
import { services } from "@/data/services";
export const serviceOptions = [...services.map(s => s.name), "Medical equipment", "Help me choose"];
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Please use 80 characters or fewer."),
  phone: z.string().trim().regex(/^(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number, optionally with +91."),
  service: z.string().refine(value => serviceOptions.includes(value), "Please select a service."),
  location: z.string().trim().max(120, "Please use 120 characters or fewer."),
  time: z.string().max(80),
  message: z.string().trim().max(600, "Please use 600 characters or fewer."),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;
