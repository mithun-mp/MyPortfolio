# Mithun M P — Personal Command Portfolio & Studio

> **MCA Student · Aspiring Software Engineer · Full Stack Developer**  
> Production-ready supercomputer portfolio built with Next.js 14 App Router, Three.js / R3F, GSAP ScrollTrigger, MongoDB, Auth.js GitHub OAuth, Resend, Vitest, Playwright, and Render Web Service deployment.

---

## Technical Stack & Architecture

- **Framework**: Next.js 14 (App Router) + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom CSS Variables + Space Grotesk & JetBrains Mono (`next/font/google`)
- **3D Hero Scene**: Three.js + React Three Fiber + Drei (Lazy-loaded workstation core with particle fields)
- **Scroll Choreography**: GSAP + ScrollTrigger (Desktop pinned horizontal project command deck)
- **Forms & Validation**: React Hook Form + Zod
- **Database**: MongoDB Atlas + Mongoose (With in-memory seed fallback for offline local dev)
- **Authentication**: Auth.js / NextAuth (GitHub OAuth, restricted strictly to `mithun-mp`)
- **Email Service**: Resend API (Transactional notification dispatch to `mithunmp2004@gmail.com`)
- **Media Hosting**: Cloudinary API
- **Testing**: Vitest (Unit tests) + Playwright (Multi-viewport E2E tests)
- **Deployment**: Render Web Service (`render.yaml` + `/api/health` healthcheck endpoint)

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### 2. Installation
```bash
# Clone repository and enter workspace
cd Mithun_Profile

# Install all dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your service credentials:

```bash
cp .env.example .env.local
```

Example `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_very_secure_random_secret_32_chars
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
ADMIN_GITHUB_USERNAME=mithun-mp
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/mithun_portfolio
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=re_123456789
CONTACT_RECEIVER_EMAIL=mithunmp2004@gmail.com
```

*Note: If `MONGODB_URI`, `RESEND_API_KEY`, or `CLOUDINARY` keys are omitted during local development, the application automatically falls back to in-memory seed data so you can run and test all visual components offline!*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public portfolio.  
Access [http://localhost:3000/studio](http://localhost:3000/studio) for the protected admin dashboard.

---

## Testing Strategy

### Unit Tests (Vitest)
Executes Zod validation schema tests, honeypot anti-spam filters, and authorization allowlist unit tests:
```bash
npm test
```

### End-to-End Tests (Playwright)
Executes multi-viewport integration tests (Desktop 1440, Laptop 1024, Tablet 768, Mobile 360):
```bash
# Run Playwright end-to-end test suite
npm run test:e2e
```

---

## Render Deployment Guide

The portfolio is configured for Render Web Service deployment using `render.yaml`.

1. Push code to GitHub repository `mithun-mp/portfolio`.
2. Log into [Render Dashboard](https://dashboard.render.com/) and click **New + -> Blueprint**.
3. Connect your GitHub repository. Render will automatically detect `render.yaml`.
4. Fill in the environment variables (`MONGODB_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `RESEND_API_KEY`, `CLOUDINARY` credentials).
5. Deploy Web Service. Render monitors `/api/health` to confirm successful operational health.

---

## Content Management via Studio (`/studio`)

Log into `/studio` using GitHub OAuth. Access is protected by server-side checks enforcing the GitHub username `mithun-mp`:

- **Projects Deck**: Add/Edit project dossiers, featured status, order, problem statements, and live/repository URLs.
- **Stack Lab**: Manage languages, technologies, and tools descriptions.
- **Skills Reactor**: Update constellation capability nodes and evidence links.
- **Achievements & Certs**: Manage NPTEL and HackerRank certificates.
- **Media Gallery**: Upload screenshot assets to Cloudinary.
- **Contact Submissions**: View logged transmissions received via the contact form.
