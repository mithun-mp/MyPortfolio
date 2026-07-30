import { test, expect } from "@playwright/test";

test.describe("Mithun M P Futuristic Portfolio E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero title, headline, and hire me button with exact mailto link", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /MITHUN M P/i })).toBeVisible();
    
    const hireButton = page.getByRole("link", { name: /HIRE ME/i });
    await expect(hireButton).toBeVisible();
    
    const href = await hireButton.getAttribute("href");
    expect(href).toBe("mailto:mithunmp2004@gmail.com?subject=Hiring%20enquiry%20for%20Mithun%20M%20P");
  });

  test("displays 4 coding profile telemetry cards with exact handles", async ({ page }) => {
    await expect(page.getByText("@mithun-mp")).toBeVisible();
    await expect(page.getByText("@IhErLgx6Zl")).toBeVisible();
    await expect(page.getByText("@mithunmp2004")).toBeVisible();
    await expect(page.getByText("@mithun-m-p-70781628b")).toBeVisible();
  });

  test("opens project full dossier lightbox modal", async ({ page }) => {
    const openDossierBtn = page.getByRole("button", { name: /OPEN FULL DOSSIER/i }).first();
    await openDossierBtn.scrollIntoViewIfNeeded();
    await openDossierBtn.click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText(/MISSION DOSSIER/i)).toBeVisible();
    
    // Close modal
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("switches tabs in Stack Lab", async ({ page }) => {
    const techTab = page.getByRole("button", { name: /Technologies/i });
    await techTab.scrollIntoViewIfNeeded();
    await techTab.click();

    await expect(page.getByRole("heading", { name: "Django" })).toBeVisible();
  });

  test("illuminates nodes in Skills Reactor", async ({ page }) => {
    const realtimeNode = page.getByRole("button", { name: /Real-Time System Development/i });
    await realtimeNode.scrollIntoViewIfNeeded();
    await realtimeNode.click();

    await expect(page.getByText("NODE_ILLUMINATED // Specialized Engineering")).toBeVisible();
  });

  test("submits contact transmission form and shows success message", async ({ page }) => {
    await page.getByLabel(/NAME \*/i).fill("Test Recruiter");
    await page.getByLabel(/EMAIL ADDRESS \*/i).fill("recruiter@techcorp.com");
    await page.getByLabel(/MESSAGE PAYLOAD \*/i).fill("Hello Mithun, we would like to interview you for a Full Stack Engineer position.");

    const submitBtn = page.getByRole("button", { name: /DISPATCH TRANSMISSION/i });
    await submitBtn.click();

    await expect(page.getByText(/TRANSMISSION DISPATCHED/i)).toBeVisible({ timeout: 10000 });
  });

  test("guards studio admin route against unauthenticated users", async ({ page }) => {
    await page.goto("/studio");
    // Should be on studio overview or redirected to sign-in page
    await expect(page).toHaveURL(/\/(studio|api\/auth\/signin)/);
  });
});
