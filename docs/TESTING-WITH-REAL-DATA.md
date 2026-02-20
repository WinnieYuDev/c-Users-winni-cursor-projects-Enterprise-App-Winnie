# Testing Functionality and AI with Real Data

This guide explains how to test the cold chain app and AI features using real or sample data.

## Prerequisites

- App and Convex running (`npm run dev` and Convex linked).
- Database seeded at least once: `npx convex run seed:run`.
- **For AI:** In [Convex Dashboard](https://dashboard.convex.dev) → your deployment → **Settings** → **Environment Variables**, set **`OPENAI_API_KEY`** (your OpenAI API key). Redeploy if needed.

---

## 1. Ingest real data (CSV or JSON)

### From the UI (recommended)

1. Log in as a user with **Supervisor** (or Admin) role so **Data Upload** is visible in the sidebar.
2. Go to **Dashboard** → **Data Upload**.
3. Choose **Format**: CSV or JSON.
4. Select **Facility** (e.g. North Region Warehouse) and **Policy** (e.g. Food Cold Chain or Pharma GDP/GxP).
5. Pick a **File** and click **Upload & Ingest**.

**What happens:** The file is parsed, normalized, and written to `temperatureReadings` (and new rows in `shipments` if needed). For each affected shipment, **excursion detection** runs automatically, then **risk scoring** and **AI audit explanations** are scheduled. You don’t need to trigger AI manually for new excursions.

### Expected file format

**CSV** – header row, then one row per reading. Column names are flexible (case-insensitive, underscores allowed):

| Column (any of these) | Example |
|-----------------------|--------|
| `shipment_id` / `shipmentId` | FOOD-REAL-001 |
| `timestamp` / `time` / `datetime` | 2024-02-01T08:00:00Z or Unix ms |
| `temperature` / `temp_c` / `temp` | 5.2 |
| `product_type` / `productType` | dairy, vaccine, etc. |
| `facility_id` (optional) | ignored; facility comes from the form |

**JSON** – array of objects (or single object). Same field names:

- `shipmentId` or `shipment_id`, `timestamp` or `time`, `temperature` or `tempC`/`temp_c`, `productType` or `product_type`, optional `facilityId`.

**Example CSV (minimal):**

```csv
shipment_id,timestamp,temperature,product_type
REAL-001,2024-02-01T08:00:00Z,4,dairy
REAL-001,2024-02-01T09:00:00Z,12,dairy
REAL-001,2024-02-01T10:00:00Z,5,dairy
```

**Example JSON:**

```json
[
  {"shipmentId":"REAL-001","timestamp":1706774400000,"temperature":4,"productType":"dairy"},
  {"shipmentId":"REAL-001","timestamp":1706778000000,"temperature":12,"productType":"dairy"}
]
```

### Sample files in the repo

Pre-made samples that produce excursions and trigger AI:

- **CSV:** `data/mock/food_shipments.csv` – food shipments with in-range and out-of-range temperatures.
- **JSON:** `data/mock/pharma_readings.json` – pharma readings with excursions.

Use them from **Data Upload**: select a facility and the matching policy (Food or Pharma), then upload the file.

---

## 2. Where to see results (functionality + AI)

| Where | What you see |
|-------|-------------------------------|
| **Dashboard** | KPIs (shipments, temperature alerts, high risk, audit events today), temperature chart with excursion bands, latest AI insight card, recent audit log. |
| **Shipments** | List of shipments; click one for detail. |
| **Shipment detail** | Temperature chart, excursions, **AI insight cards** (excursion analysis, policy recommendation if present). |
| **Audit log** | All events; each row can have an **AI explanation** (regulator-friendly sentence) once `explainAuditLog` has run. |
| **Policies** | View/edit policies (Admin). |

After an upload, give Convex a few seconds to run excursion detection and AI actions. Refresh the dashboard or shipment/audit pages to see new excursions, risk scores, and AI text.

---

## 3. How AI is triggered (automatic vs manual)

- **Automatic (no extra step):**
  - **Audit log explanation:** For every new excursion, the system creates an audit log entry and schedules `explainAuditLog`. OpenAI generates a short explanation and it is stored in that audit log row (`aiExplanation`). Ensure `OPENAI_API_KEY` is set or explanations stay empty.
  - **Risk scoring:** Computed and stored per shipment after detection.

- **Seeded / stored AI insights:** The seed inserts sample `aiInsights` (e.g. excursion analysis, policy recommendation). After you upload new data, new excursion analyses can be written by the internal `analyzeExcursion` flow if wired; the main user-facing AI you get “for free” from real data is the **audit log explanation** above.

- **Policy recommendation (optional):** The action `recommendPolicy` takes a text summary of recent excursions and suggests a policy tweak. It is not wired to a button in the UI. To test it:
  - **From Convex Dashboard:** Functions → run `ingestion/mockApi:ingestMockData` or use another way to create excursions, then run **`ai/analysis:recommendPolicy`** with args, e.g.  
    `{"recentExcursionSummary": "Several 2–8°C excursions over 15 minutes in vaccine shipments.", "policyType": "pharma"}`  
  - Or call it from your own script/API using the Convex client.

---

## 4. Quick test flow with real data

1. Set **OPENAI_API_KEY** in Convex (Environment Variables).
2. Log in as Supervisor (or Admin).
3. **Data Upload** → Facility: e.g. **North Region Warehouse** → Policy: **Food Cold Chain (HACCP/FSMA)** → upload **`data/mock/food_shipments.csv`**.
4. Wait a few seconds, then open **Dashboard**: you should see updated KPIs, chart, and audit entries.
5. Open **Audit log**: new excursion events should get **AI explanation** text once the action has run.
6. Open **Shipments** → click a shipment that had an excursion → check **excursions** and **AI insight** cards.
7. (Optional) Run **`ai/analysis:recommendPolicy`** from the Convex dashboard with a short summary and `policyType` to see a policy recommendation and where it appears (e.g. in insights or audit context, depending on how you expose it).

---

## 5. Ingest more data without a file (mock API)

To add more temperature readings without uploading a file (e.g. for load or demo):

```bash
npx convex run ingestion/mockApi:ingestMockData '{"facilityId":"<FACILITY_ID>","policyId":"<POLICY_ID>","shipmentId":"MOCK-001","productType":"vaccine","count":24}'
```

Replace `<FACILITY_ID>` and `<POLICY_ID>` with IDs from the Convex dashboard (Data → `facilities` and `policies`). This inserts 24 sample readings and triggers the same pipeline (detection, risk, AI audit explanation).

---

## Summary

- **Real data:** Use **Data Upload** with CSV/JSON in the documented format; choose facility and policy in the UI.
- **AI:** Set **OPENAI_API_KEY** in Convex; audit log explanations run automatically for new excursions; view results on Dashboard, Shipment detail, and Audit log.
- **Sample data:** Use `data/mock/food_shipments.csv` and `data/mock/pharma_readings.json` for quick, repeatable tests.
