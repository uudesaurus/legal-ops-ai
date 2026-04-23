/**
 * UBO ANALYZER — API CONTRACT
 * For Backend Engineers
 *
 * This file defines the complete API contract between the frontend and backend.
 * The frontend is already wired to call these endpoints — you just need to
 * implement the backend.
 *
 * BASE URL: Set via NEXT_PUBLIC_API_URL env var (default: http://localhost:3000)
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalysisInitResponse {
  id: string;                     // UUID — unique analysis ID
  status: 'queued' | 'processing';
  files: Array<{
    name: string;
    size: number;               // bytes
  }>;
  createdAt: string;            // ISO 8601
}

export interface AnalysisStatusResponse {
  id: string;
  status: 'queued' | 'processing' | 'complete' | 'error';
  stage?: ProcessingStage;
  progress: number;              // 0–100
  error?: string;                // only when status === 'error'
  updatedAt: string;             // ISO 8601
}

export type ProcessingStage =
  | 'queued'
  | 'parsing'        // Extracting text from AHU PDFs
  | 'analyzing'      // Tracing shareholder chains & calculating effective %
  | 'structuring'   // Building ownership tables & family groups
  | 'crystallizing' // Generating final UBO report
  | 'complete';

export interface UBOReportResponse {
  id: string;

  // Report metadata
  meta: {
    companyName: string;         // e.g. "PT Ekacitta Dian Pertiwi"
    preparedFor: string;          // e.g. "Darin Putra Bagaskara"
    date: string;                 // e.g. "17 April 2026"
    classification: string;        // e.g. "PMDN NON FASILITAS — TERTUTUP"
    source: string;               // e.g. "Ditjen AHU Online (downloaded 27 Maret 2026)"
    totalCompanies: number;       // target + intermediate holdings
  };

  // UBO list
  ubos: Array<{
    id: number;
    name: string;
    effectivePercent: number;    // e.g. 47.10
    familyGroup: string;         // e.g. "Trismitro" or "—"
    threshold: string;           // e.g. ">25%" or ">5%" or "—"
    status: 'UBO' | 'Near' | 'Minor' | '—';
    // Status logic:
    //   UBO   = effectivePercent > 25
    //   Near  = effectivePercent > 5 && effectivePercent <= 25
    //   Minor = effectivePercent <= 5
    //   —     = not a traced UBO
  }>;

  // Family summary
  familySummary: Array<{
    family: string;               // e.g. "Trismitro family"
    totalPercent: number;         // e.g. 88.31
  }>;

  // Total ownership
  totalTraced: number;           // e.g. 100.00
  totalUntraced: number;        // e.g. 0.00

  // Key findings (auto-generated, max 5)
  keyFindings: string[];

  // Shareholder tables per company
  companies: Array<{
    name: string;                 // e.g. "PT Ekacitta Dian Pertiwi"
    source: string;              // e.g. "SK AHU-0023616.AH.01.02.TAHUN 2022"
    totalShares: string;          // e.g. "4,000 shares"
    shareholders: Array<{
      name: string;
      shares: string;
      directPercent: string;     // e.g. "30.00%"
      type: 'Individual' | 'Company';
    }>;
  }>;

  // Ownership structure for diagram rendering
  structure: {
    // Tree nodes
    nodes: Array<{
      id: string;
      name: string;
      type: 'target' | 'holding' | 'individual';
      // For individuals
      effectivePercent?: number;
      status?: 'UBO' | 'Near' | 'Minor';
      // For holdings
      directPercent?: number;    // % direct ownership of parent
      viaPath?: string;          // e.g. "via PT EDP"
    }>;
    // Edges between nodes
    edges: Array<{
      from: string;              // node id
      to: string;               // node id
      percent: number;           // e.g. 30.5
    }>;
  };

  // Methodology notes
  methodology: {
    dataSource: string;
    calculation: string;
    cycleHandling: string;
    accuracyNote: string;
    disclaimer: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYSIS HISTORY
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalysisHistoryItem {
  id: string;
  companyName: string;
  preparedFor: string;
  date: string;                   // e.g. "17 Apr 2026"
  status: 'ready' | 'processing' | 'error';
  uboCount: number;
}

// GET /api/analyses
export interface AnalysisHistoryResponse {
  analyses: AnalysisHistoryItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR RESPONSE (all endpoints)
// ─────────────────────────────────────────────────────────────────────────────

export interface APIError {
  error: {
    code: string;                // e.g. "INVALID_FILE_TYPE"
    message: string;             // Human-readable message
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/analyze
 *
 * Upload AHU PDF documents and start UBO analysis.
 *
 * Request:  multipart/form-data
 *   - files: PDF files (1–10 files, max 50MB each)
 *   - preparedFor?: string (client name, optional)
 *
 * Response: 201 Created
 *   - Body: AnalysisInitResponse
 *
 * Errors:
 *   400 — Invalid file type (not PDF) or exceeds size limit
 *   413 — Payload too large
 *   500 — Internal server error
 *
 * Frontend calls this when files are dropped in UploadZone.
 */
export const ENDPOINT_ANALYZE = '/api/analyze';

/**
 * GET /api/analyze/:id
 *
 * Poll for analysis status and progress.
 *
 * Response: 200 OK
 *   - Body: AnalysisStatusResponse
 *
 * Errors:
 *   404 — Analysis not found
 *   500 — Internal server error
 *
 * Frontend polls this every 1–2 seconds while status is "queued" or "processing".
 */
export const ENDPOINT_STATUS = (id: string) => `/api/analyze/${id}`;

/**
 * GET /api/analyze/:id/report
 *
 * Fetch the completed UBO report.
 *
 * Response: 200 OK
 *   - Body: UBOReportResponse
 *
 * Errors:
 *   404 — Analysis not found
 *   425 — Analysis not yet complete (retry later)
 *   500 — Internal server error
 *
 * Frontend calls this once status === 'complete'.
 */
export const ENDPOINT_REPORT = (id: string) => `/api/analyze/${id}/report`;

/**
 * GET /api/analyses
 *
 * Fetch list of past analyses for the sidebar history.
 *
 * Response: 200 OK
 *   - Body: AnalysisHistoryResponse
 *
 * The frontend maintains local state for the sidebar, but you can also
 * implement server-side history storage.
 */
export const ENDPOINT_HISTORY = '/api/analyses';

/**
 * DELETE /api/analyze/:id
 *
 * Delete an analysis and its report.
 *
 * Response: 204 No Content
 *
 * Errors:
 *   404 — Analysis not found
 *   500 — Internal server error
 */
export const ENDPOINT_DELETE = (id: string) => `/api/analyze/${id}`;

// ─────────────────────────────────────────────────────────────────────────────
// TYPICAL FRONTEND FLOW
// ─────────────────────────────────────────────────────────────────────────────
/*
1. User drops PDF files in UploadZone
2. Frontend calls: POST /api/analyze  (multipart/form-data with files)
3. Frontend receives: { id: "uuid", status: "queued", files: [...] }
4. Frontend polls:   GET /api/analyze/:id every 1.5s
5. Polling response: { id, status: "processing", stage: "parsing", progress: 35 }
6. When stage === "complete":
   - Frontend calls: GET /api/analyze/:id/report
   - Frontend receives: Full UBOReportResponse
   - Frontend renders: <UBOReport data={report} />
*/
