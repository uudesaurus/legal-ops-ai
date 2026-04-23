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

---

## For Backend Engineers

This is a **frontend-only** prototype. Implement the backend API below.

### Environment

```env
NEXT_PUBLIC_API_URL=http://localhost:3000   # Backend URL
```

---

## API Contract

### 1. Start Analysis
```
POST /api/analyze
Content-Type: multipart/form-data

fields:
  - files: PDF files (1–10 files, max 50MB each)
  - preparedFor?: string (client name, optional)

Response 201:
{
  "id": "uuid-string",
  "status": "queued",
  "files": [{ "name": "file.pdf", "size": 123456 }],
  "createdAt": "2026-04-23T10:00:00Z"
}

Errors:
  400 — Invalid file type or exceeds size limit
  413 — Payload too large
```

### 2. Poll Status
```
GET /api/analyze/:id

Response 200:
{
  "id": "uuid-string",
  "status": "queued" | "processing" | "complete" | "error",
  "stage": "queued" | "parsing" | "analyzing" | "structuring" | "crystallizing" | "complete",
  "progress": 0-100,
  "error": "error message",   // only when status === "error"
  "updatedAt": "2026-04-23T10:00:00Z"
}

Poll every 1.5 seconds while status is "queued" or "processing".
```

### 3. Fetch Report
```
GET /api/analyze/:id/report

Response 200:
{
  "id": "uuid-string",

  "meta": {
    "companyName": "PT Ekacitta Dian Pertiwi",
    "preparedFor": "Darin Putra Bagaskara",
    "date": "17 April 2026",
    "classification": "PMDN NON FASILITAS — TERTUTUP",
    "source": "Ditjen AHU Online (downloaded 27 Maret 2026)",
    "totalCompanies": 4
  },

  "ubos": [
    {
      "id": 1,
      "name": "Angela Trismitro",
      "effectivePercent": 47.10,
      "familyGroup": "Trismitro",
      "threshold": ">25%",
      "status": "UBO"    // UBO >25%, Near >5%, Minor ≤5%, — not traced
    },
    ...
  ],

  "familySummary": [
    { "family": "Trismitro family", "totalPercent": 88.31 },
    { "family": "Juda family", "totalPercent": 11.15 }
  ],

  "totalTraced": 100.00,
  "totalUntraced": 0.00,

  "keyFindings": [
    "Angela Trismitro is the largest UBO with 47.10% effective ownership.",
    ...
  ],

  "companies": [
    {
      "name": "PT Ekacitta Dian Pertiwi",
      "source": "SK AHU-0023616.AH.01.02.TAHUN 2022 (Perubahan)",
      "totalShares": "4,000 shares",
      "shareholders": [
        {
          "name": "PT Laniros Gemala Sakti",
          "shares": "1,200",
          "directPercent": "30.00%",
          "type": "Company"
        },
        ...
      ]
    },
    ...
  ],

  "structure": {
    "nodes": [
      {
        "id": "target-1",
        "name": "PT Ekacitta Dian Pertiwi",
        "type": "target"
      },
      {
        "id": "holding-1",
        "name": "PT Laniros Gemala Sakti",
        "type": "holding",
        "directPercent": 30,
        "viaPath": null
      },
      {
        "id": "ind-1",
        "name": "Angela Trismitro",
        "type": "individual",
        "effectivePercent": 47.10,
        "status": "UBO"
      },
      ...
    ],
    "edges": [
      { "from": "holding-1", "to": "ind-1", "percent": 30.5 },
      ...
    ]
  },

  "methodology": {
    "dataSource": "Ditjen AHU company profile documents...",
    "calculation": "Formula: (lembar_A / total_A) x ...",
    "cycleHandling": "PT Laniros appears both as direct shareholder...",
    "accuracyNote": "All share counts extracted from AHU...",
    "disclaimer": "This report is for due diligence purposes only..."
  }
}
```

### 4. Analysis History
```
GET /api/analyses

Response 200:
{
  "analyses": [
    {
      "id": "uuid",
      "companyName": "PT Ekacitta Dian Pertiwi",
      "preparedFor": "Darin Putra Bagaskara",
      "date": "17 Apr 2026",
      "status": "ready" | "processing" | "error",
      "uboCount": 6
    }
  ]
}
```

### 5. Delete Analysis
```
DELETE /api/analyze/:id

Response: 204 No Content
```

---

## Frontend Flow

```
1. User drops PDF files in UploadZone
2. POST /api/analyze  →  { id, status: "queued" }
3. Poll GET /api/analyze/:id every 1.5s
   → { status: "processing", stage: "parsing", progress: 35 }
4. When status === "complete":
   GET /api/analyze/:id/report  →  Full UBOReportResponse
   Render <UBOReport data={report} />
```

---

## File Structure

```
app/
  layout.tsx          — Root layout with AppShell
  page.tsx            — Entry: renders <UBOFlow />
  globals.css         — Design tokens + animations

components/
  layout/
    AppShell.tsx      — Main layout wrapper (topbar + sidebar + fog)
    TopBar.tsx        — Header with logo + KARNA badge + theme toggle
    Sidebar.tsx       — Analysis history list
    FogLayers.tsx     — Ambient animated fog orbs
  features/
    UBOFlow.tsx       — State machine: idle → uploading → processing → report
    UploadZone.tsx    — Drag & drop PDF upload
    ProcessingState.tsx — 5-stage animated processing
    UBOReport.tsx     — Tabbed report display
    OwnershipDiagram.tsx — Animated SVG ownership structure
    EmptyState.tsx    — Empty state placeholder

lib/
  design-system.ts    — Design tokens (colors, fonts, spacing, shadows)
  api-contract.ts     — TypeScript types + API endpoint definitions
```

---

## Design System

- **Colors**: Near-black backgrounds (`#09090b`), luminous off-white text, warm fogbow accent (`#fef3c7`)
- **Light mode**: Full theme inversion — warm cream backgrounds, dark text, adaptive fog
- **Typography**: `Instrument Serif` (display) + `Space Mono` (body/mono)
- **Animations**: Fog drift, crystallize effect, staggered reveals, orbital processing orb
- **Atmosphere**: Grain overlay, ambient fog orbs, soft glows
- **Theme toggle**: Persisted via `localStorage` key `karna-theme`

## Deployment

```bash
npm run build
vercel --prod
```

## Vercel

- GitHub repo: https://github.com/uudesaurus/legal-ops-ai
- Branch: `frontend`
- Set `NEXT_PUBLIC_API_URL` in Vercel project environment variables.
