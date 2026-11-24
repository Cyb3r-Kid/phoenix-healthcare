import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/data/services";
import { whatsappUrl, enquiryUrl } from "../src/lib/whatsapp";
const routes = ["/", "/about", "/services", ...services.map(s => `/services/${s.slug}`), "/medical-equipment", "/contact", "/privacy"];

test("every route has unique metadata, working images, valid internal links and no browser errors", async ({ page, request }) => {
  const errors: string[] = [];
  const titles = new Set<string>();
  const hrefs = new Set<string>();
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title(); expect(titles.has(title), route).toBe(false); titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${route.replaceAll("/", "\\/")}$`));
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBeTruthy();
      expect(await img.getAttribute("alt")).toBeTruthy();
    }
    for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute("href")!))) hrefs.add(href);
    for (const link of await page.locator('a[href^="https://wa.me"]').all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.pathname).toBe("/916374930178"); expect(url.searchParams.get("text")).toContain("Phoenix Home Healthcare");
      expect(await link.getAttribute("rel")).toContain("noopener");
    }
    for (const link of await page.locator('a[href^="tel:"]').all()) await expect(link).toHaveAttribute("href", "tel:+916374930178");
  }
  for (const href of hrefs) expect((await request.get(href)).status(), href).toBe(200);
  expect(errors).toEqual([]);
});

test("homepage navigation, service enquiry and keyboard FAQ work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Professional care/ })).toBeVisible();
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Our Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.getByRole("heading", { name: "Elderly Care Services", exact: true }).getByRole("link").click();
  await expect(page).toHaveURL(/\/services\/elderly-care$/);
  const url = new URL((await page.getByRole("link", { name: "Enquire About This Service" }).getAttribute("href"))!);
  expect(url.searchParams.get("text")).toContain("Elderly Care Services");
  await page.goto("/");
  const faq = page.locator("summary").first(); await faq.focus(); await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.keyboard.press("Enter"); await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});

test("mobile menu is keyboard accessible, closes on escape and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" }); await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape"); await expect(toggle).toHaveAttribute("aria-expanded", "false"); await expect(toggle).toBeFocused();
  await toggle.click(); await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About Us" }).click();
  await expect(page).toHaveURL(/\/about$/); await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
  await expect(page.locator(".mobile-contact-bar")).toBeVisible();
  const footer = page.locator(".footer-bottom"); await footer.scrollIntoViewIfNeeded();
  const footerBox = await footer.boundingBox(); const barBox = await page.locator(".mobile-contact-bar").boundingBox();
  expect(footerBox!.y + footerBox!.height).toBeLessThanOrEqual(barBox!.y + 1);
});

test("enquiry validates, encodes details and requires the visitor to send in WhatsApp", async ({ page }) => {
  await page.addInitScript(() => { window.open = (url) => { (window as Window & { handoff?: string }).handoff = String(url); return null; }; });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter a valid 10-digit Indian mobile number, optionally with +91.")).toBeVisible();
  await expect(page.getByText("Please select a service.")).toBeVisible();
  await expect(page.getByLabel("Full name *", { exact: true })).toBeFocused();
  await page.getByLabel("Full name *", { exact: true }).fill("Asha & Family");
  await page.getByLabel("Mobile number *").fill("12345");
  await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
  await expect(page.locator("#phone-error")).toBeVisible();
  await page.getByLabel("Mobile number *").fill("+91 98765 43210");
  await page.getByLabel("Service required *").selectOption("Elderly Care Services");
  await page.getByLabel("Your location").fill("Urapakkam");
  await page.getByLabel("Preferred contact time").selectOption("Morning (9 am–12 pm)");
  await page.getByLabel("Anything else").fill("Please discuss daily support & timings.");
  await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing has been sent automatically");
  const href = await page.evaluate(() => (window as Window & { handoff?: string }).handoff);
  const url = new URL(href!); expect(url.origin).toBe("https://wa.me"); expect(url.pathname).toBe("/916374930178");
  for (const value of ["Asha & Family", "+91 98765 43210", "Elderly Care Services", "Urapakkam", "Morning (9 am–12 pm)", "daily support & timings"]) expect(url.searchParams.get("text")).toContain(value);
  await expect(page.getByRole("link", { name: "Open WhatsApp if it didn’t open" })).toHaveAttribute("href", href!);
  await page.getByLabel("Your location").fill("Chennai"); await expect(page.getByRole("status")).not.toBeVisible();
});

test("WhatsApp helpers encode service names and personal input safely", () => {
  expect(new URL(whatsappUrl("Care & support")).searchParams.get("text")).toContain("Care & support");
  const url = new URL(enquiryUrl({ name: "தமிழ் & Family", phone: "9876543210", service: "Home Nursing Services", message: "Help? #care" }));
  expect(url.searchParams.size).toBe(1); expect(url.searchParams.get("text")).toContain("தமிழ் & Family");
});

for (const width of [320,360,375,390,414,430,768,1024,1280,1440]) {
  test(`layout has no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/about", "/services", "/services/elderly-care", "/medical-equipment", "/contact"]) {
      await page.goto(route); await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width);
      const heading = page.locator("h1"); const box = await heading.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
  });
}

for (const viewport of [{ width: 390,height: 844 },{ width: 768,height: 1024 },{ width: 1440,height: 900 }]) {
  test(`homepage screenshot ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport); await page.goto("/"); await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("main img").all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBeTruthy(); }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" })); await expect(page.locator("h1")).toBeInViewport();
    await page.screenshot({ path: `qa/screenshots/home-${viewport.width}x${viewport.height}.png`, fullPage: true, animations: "disabled" });
    await page.screenshot({ path: `qa/screenshots/home-${viewport.width}x${viewport.height}-viewport.png`, animations: "disabled" });
  });
}

test("key pages have no automated WCAG A/AA violations", async ({ page }) => {
  for (const width of [390,1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/services", "/services/home-nursing", "/contact", "/medical-equipment"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a","wcag2aa","wcag21aa","wcag22aa"]).analyze();
      expect(results.violations, `${width} ${route}: ${JSON.stringify(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`).toEqual([]);
    }
  }
});

test("reduced motion, structured data, staging robots and 404 are correct", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(schema.telephone).toBe("+916374930178"); expect(schema).not.toHaveProperty("aggregateRating"); expect(schema).not.toHaveProperty("openingHours");
  const robots = await request.get("/robots.txt"); expect(robots.ok()).toBeTruthy(); expect(await robots.text()).toContain("Disallow: /");
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await page.goto("/not-a-real-page"))?.status()).toBe(404);
});
