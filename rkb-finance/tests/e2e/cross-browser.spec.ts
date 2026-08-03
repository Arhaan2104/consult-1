import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/", title: /R\.K\. Bansal Finance/i },
  { path: "/about", title: /About/i },
  { path: "/products", title: /Products|Short Term Loan/i },
  { path: "/contact", title: /Contact/i },
  { path: "/regulatory-disclosures", title: /Regulatory Disclosures/i },
  { path: "/legal/privacy-policy", title: /Privacy Policy/i },
];

const IGNORE_CONSOLE = [
  /Download the React DevTools/,
  /Failed to load resource.*favicon/,
  /Hydration failed/,
];

function attachConsoleGuard(page: import("@playwright/test").Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (IGNORE_CONSOLE.some((re) => re.test(text))) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

test.describe("Cross-browser route health", () => {
  for (const route of ROUTES) {
    test(`${route.path} loads without runtime errors`, async ({ page }) => {
      const errors = attachConsoleGuard(page);
      const response = await page.goto(route.path, { waitUntil: "networkidle" });
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("main")).toBeVisible();
      await expect(page).toHaveTitle(route.title);
      expect(errors, `Console errors on ${route.path}`).toEqual([]);
    });
  }
});

test.describe("Layout & overflow", () => {
  for (const route of ROUTES) {
    test(`${route.path} has no horizontal overflow`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("Home hero seal", () => {
  test("seal is visible and vertically centred on desktop", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop-only layout check");
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2200);

    const metrics = await page.evaluate(() => {
      const el = document.querySelector(".hero-seal");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        width: r.width,
        height: r.height,
        centerY: r.top + r.height / 2,
        viewportCenterY: window.innerHeight / 2,
        opacity: parseFloat(cs.opacity),
        visible: r.width > 200 && r.height > 200 && parseFloat(cs.opacity) > 0.2,
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics!.visible).toBe(true);
    expect(Math.abs(metrics!.centerY - metrics!.viewportCenterY)).toBeLessThan(40);
    expect(metrics!.width).toBeGreaterThan(400);
  });

  test("seal does not move on pointer hover (desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "Hover check is desktop-only");
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    const box = () => page.locator(".hero-seal").boundingBox();
    const a = await box();
    await page.mouse.move(120, 120);
    await page.waitForTimeout(250);
    const b = await box();
    await page.mouse.move(1200, 700);
    await page.waitForTimeout(250);
    const c = await box();

    expect(Math.round(a!.x)).toBe(Math.round(b!.x));
    expect(Math.round(a!.y)).toBe(Math.round(b!.y));
    expect(Math.round(b!.x)).toBe(Math.round(c!.x));
    expect(Math.round(b!.y)).toBe(Math.round(c!.y));
  });

  test("seal watermark visible on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only layout check");
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);

    const metrics = await page.evaluate(() => {
      const el = document.querySelector(".hero-seal");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        width: r.width,
        opacity: parseFloat(cs.opacity),
      };
    });

    expect(metrics!.width).toBeGreaterThan(280);
    expect(metrics!.opacity).toBeGreaterThan(0.15);
  });
});

test.describe("Navigation & accessibility", () => {
  test("skip link focuses main content", async ({ page, browserName }) => {
    await page.goto("/");
    const skip = page.getByRole("link", { name: /Skip to content/i });
    // WebKit/Safari may not assign first Tab to off-screen skip links in automation;
    // verify the skip-link contract directly, then keyboard activation.
    if (browserName === "webkit") {
      await skip.focus();
    } else {
      await page.keyboard.press("Tab");
    }
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("header nav reaches key pages", async ({ page }) => {
    await page.goto("/");
    const width = page.viewportSize()?.width ?? 1440;
    const useMobileNav = width < 768;

    if (useMobileNav) {
      await page.getByRole("button", { name: /Open menu/i }).click();
      await page.locator("header").getByRole("link", { name: "Products" }).click();
    } else {
      await page.locator('header nav[aria-label="Primary"] a[href="/products"]').click();
    }
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("primary CTAs meet minimum touch target on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Touch-target check is mobile-only");
    await page.goto("/");
    const apply = page.getByRole("link", { name: /Apply now/i }).first();
    const box = await apply.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  });
});

test.describe("Safari / WebKit rendering", () => {
  test("hero seal filter hover works without layout shift", async ({ page, browserName, isMobile }) => {
    test.skip(browserName !== "webkit" || isMobile, "WebKit desktop hover check");
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    const before = await page.evaluate(() => ({
      filter: getComputedStyle(document.querySelector(".hero-seal")!).filter,
      width: document.querySelector(".hero-seal")!.getBoundingClientRect().width,
    }));

    await page.hover(".hero-vault");
    await page.waitForTimeout(400);

    const after = await page.evaluate(() => ({
      filter: getComputedStyle(document.querySelector(".hero-seal")!).filter,
      width: document.querySelector(".hero-seal")!.getBoundingClientRect().width,
    }));

    expect(before.filter).toBe("none");
    expect(after.filter).not.toBe("none");
    expect(Math.round(before.width)).toBe(Math.round(after.width));
  });

  test("header backdrop-filter renders on WebKit", async ({ page, browserName }) => {
    test.skip(browserName !== "webkit", "WebKit backdrop check");
    await page.goto("/");
    const backdrop = await page.evaluate(() => {
      const header = document.querySelector("header");
      if (!header) return null;
      const cs = getComputedStyle(header.querySelector("nav") ?? header);
      return cs.backdropFilter || cs.webkitBackdropFilter;
    });
    expect(backdrop).toBeTruthy();
  });
});

test.describe("Forms & interaction", () => {
  test("contact form submits client-side success state", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/Name/i).fill("Test User");
    await page.getByLabel(/Mobile/i).fill("9876543210");
    await page.getByLabel(/Email/i).fill("test@example.com");
    await page.locator("select[name=category]").selectOption({ label: "General enquiry" });
    await page.getByRole("button", { name: /Send message/i }).click();
    await expect(page.getByText("Thank you.")).toBeVisible();
  });

  test("products calculator sliders are usable", async ({ page }) => {
    await page.goto("/products");
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    await slider.focus();
    await expect(slider).toBeFocused();
  });
});
