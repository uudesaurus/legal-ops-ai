# UBO Analyzer — Frontend Prototype

**Design**: Monochrome Fog Bureau — YC + Anthropic aesthetic with ambient fog animations.
**Framework**: Next.js 16 + App Router + TypeScript + Framer Motion
**Styling**: CSS Modules (no Tailwind)

---

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## For Backend Engineers

This is a **frontend-only** prototype. The backend API is not yet wired up.
Here's what the frontend expects:

### API Contract

#### POST `/api/analyze`
Upload AHU PDF documents for UBO analysis.

**Request**: `multipart/form-data`
- `files`: PDF files (one or more)

**Response** `(200)`:
```json
{
  "id": "uuid-string",
  "status": "processing",
  "files": ["filename1.pdf", "filename2.pdf"]
}
```

#### GET `/api/analyze/:id`
Poll for analysis status.

**Response** `(200)`:
```json
{
  "id": "uuid-string",
  "status": "complete" | "processing" | "error",
  "stage": "parsing" | "analyzing" | "structuring" | "crystallizing",
  "progress": 75
}
```

#### GET `/api/analyze/:id/report`
Fetch the completed UBO report.

**Response** `(200)`: Full report JSON. See `lib/types.ts` for the expected shape.

### Wiring Up

1. Create `app/api/analyze/route.ts` and `app/api/analyze/[id]/route.ts`
2. Update `components/features/UBOFlow.tsx` to call these APIs instead of simulating delays
3. The upload zone already handles file selection — wire `onFilesUploaded` to POST `/api/analyze`
4. Replace the `ProcessingState` simulation with real stage/progress polling from GET `/api/analyze/:id`
5. Replace `UBOReport.tsx` mock data with the API response shape

### File Structure

```
app/
  layout.tsx          — Root layout with AppShell
  page.tsx            — Entry: renders <UBOFlow />
  globals.css         — Design tokens + animations

components/
  layout/
    AppShell.tsx      — Main layout wrapper (topbar + sidebar + fog)
    TopBar.tsx        — Header with logo + status
    Sidebar.tsx       — Analysis history list
    FogLayers.tsx     — Ambient animated fog orbs
  features/
    UBOFlow.tsx       — State machine: idle → uploading → processing → report
    UploadZone.tsx    — Drag & drop PDF upload
    ProcessingState.tsx — 5-stage animated processing
    UBOReport.tsx     — Tabbed report display + ownership diagram
    EmptyState.tsx    — Empty state placeholder

lib/
  design-system.ts    — Design tokens (colors, fonts, spacing, shadows)
  types.ts            — (TODO) shared TypeScript types for API contract
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000   # Backend URL
```

---

## Design System

- **Colors**: Near-black backgrounds (`#09090b`), luminous off-white text hierarchy, warm fogbow accent (`#fef3c7`)
- **Typography**: `Instrument Serif` (display) + `Space Mono` (body/mono)
- **Animations**: Fog drift, crystallize effect, staggered reveals, orbital processing orb
- **Atmosphere**: Grain overlay, ambient fog orbs, soft glows

## Deployment

```bash
npm run build
# Deploy to Vercel:
vercel --prod
```
