# GRAVEL — Offline-First Progressive Web Application (PWA)
## Feature-Indexed Modular Architecture & NIOS Study Centre Blueprint

**Gravel** is an educational operating system and progressive web application built with a micro-module feature-indexed architecture. It comes pre-configured for **NIOS (National Institute of Open Schooling) Accredited Institutions (AIs) & Study Centres**, and can be hot-swapped at runtime by the `DEV` role to support **Degree Colleges / Universities** or **Coaching / Tuition Institutes**.

---

## 🚀 Live Production & Deployment Readiness

- **Status**: Production Ready (`dist/` directory generated via `npm run build`)
- **PWA Capabilities**: Service Worker (`public/sw.js`), Web App Manifest (`public/manifest.webmanifest`), full offline vault caching (`[F-UI-004]`).
- **Deploy Options**:
  - **Vercel / Netlify / Cloudflare Pages**: Connect repo or run `vercel --prod` / `netlify deploy --dir=dist --prod`.
  - **Static Server / Docker**: Serve the `dist/` folder using Nginx, Caddy, or `serve -s dist`.
  - **Local Preview**: Run `npm run preview`.

---

## 🎨 Modular Theme Engine (`[F-UI-002]`)

Supports **3 UI Design Directions** across **Light and Dark Modes** (6 active theme token dictionaries) compliant with WCAG AAA ($7:1$) and AA ($4.5:1$) contrast standards:

1. **Design 1: Gravel Slate (Swiss Bento Grid)**
   - *Light*: Alabaster & Graphite (`#F8FAFC`, `#FFFFFF`, `#0F172A`, `#2563EB`)
   - *Dark*: Obsidian & Cyan Slate (`#090D16`, `#111827`, `#F8FAFC`, `#38BDF8`)
2. **Design 2: NIOS Academic Editorial (Neo-Paper & Ink)**
   - *Light*: Warm Parchment & Terracotta (`#FBF9F5`, `#FFFFFF`, `#1C1917`, `#C2410C`)
   - *Dark*: Midnight Library & Warm Amber (`#141210`, `#1F1C18`, `#F5F5F4`, `#F59E0B`)
3. **Design 3: Kinetic Pulse (Floating Dock & OLED)**
   - *Light*: Daylight Frost & Indigo Pulse (`#F4F4F8`, `#FFFFFF`, `#09090B`, `#4F46E5`)
   - *Dark*: True OLED Cyber Pitch & Neon Emerald (`#000000`, `#0C0C0E`, `#FAFAFA`, `#10B981`)

---

## 🧩 Master Feature Index Coverage

Every capability is cataloged under a dedicated permanent **Feature Index ID**:

### CATEGORY 00: UI Shell, Navigation & Theme (`[F-UI-xxx]`)
- `[F-UI-001]` **Responsive App Shell Controller**: Desktop 3-zone layout ($\ge 1024\text{px}$) vs. Mobile 5-slot bottom thumb-zone dock ($< 768\text{px}$).
- `[F-UI-002]` **Modular Theme Engine**: Dynamic runtime CSS Custom Property token switcher.
- `[F-UI-003]` **Global Command & Quick-Search Bar**: `Cmd/Ctrl + K` instant search across students, teachers, classes, and feature indices.
- `[F-UI-004]` **PWA Offline Sync & Connectivity Banner**: Online/offline detection with IndexedDB/LocalStorage sync.
- `[F-UI-005]` **Interactive Data Table Engine**: Sticky headers, inline row actions, multi-select checkboxes.
- `[F-UI-006]` **Floating Bulk-Action Bar**: Smooth bottom floating bar for mass operations.
- `[F-UI-007]` **Slide-Over Inspector Drawer**: Right-hand overlay for Student 360 profiling and grading.
- `[F-UI-008]` **Dynamic Delegated-Permission Sidebar Injector**: Dynamically displays Admin Tools to faculty with sub-admin delegation.

### CATEGORY 01: Developer Platform Control (`[F-DEV-xxx]`)
- `[F-DEV-001]` **Institution Profile & Feature Configurator**: Live blueprint preset hot-swapper (`NIOS`, `COLLEGE`, `COACHING`, `CUSTOM`) and toggle matrix.
- `[F-DEV-002]` **Admin Account Provisioning Console**: Administrative scopes and tenant limits.
- `[F-DEV-003]` **Global Audit Log & Mutation Stream**: Real-time searchable activity trace.
- `[F-DEV-004]` **Raw Database Inspector**: Collection counts and JSON inspection.
- `[F-DEV-005]` **Snapshot Backup, Restore & Reset**: One-click JSON backup and point-in-time restore.
- `[F-DEV-006]` **Shadow Login Sandbox**: Impersonate any Admin, Teacher, or Student instantly.

### CATEGORY 02 & 03: Data Schemas & Directory (`[F-DAT-xxx]`, `[F-ACC-xxx]`)
- `[F-DAT-101]` Base User Identity Schema
- `[F-DAT-102]` Guardian & Emergency Contact Schema (with direct WhatsApp/Call triggers)
- `[F-DAT-103]` NIOS 12-Digit Enrolment, AI Code, Regional Centre, and Stream 1-4 Blocks
- `[F-DAT-104]` NIOS 3-Digit Subjects (`302`, `311`, `312`, `313`, `336`), TOC credits, TMA status & PCP records
- `[F-DAT-105]` KYC, Social Category & Divyangjan/PwD concessions (Scribe, +20m/hr extra time)
- `[F-ACC-201]` Single Account Stepped Wizard
- `[F-ACC-202]` Bulk CSV/Nominal-Roll Importer
- `[F-ACC-203]` Multi-Facet Filter Engine (Stream, Block, TMA Pending, AR < 75%)
- `[F-ACC-204]` Multi-Criteria Sort Engine (Name, Enrolment No, AR%, TMA Score)
- `[F-ACC-205]` Bulk Action Processor (TMA Reminders, Activation, CSV Export, Delete)
- `[F-ACC-206]` Full-Override Account Editor Drawer
- `[F-ACC-207]` Granular Permission Delegation Matrix (with time-bound expiry and scoped authority)

### CATEGORY 04 & 05: Mathematical Engines & Visualizations (`[F-MATH-xxx]`, `[F-GRPH-xxx]`)
- `[F-MATH-301]` **Weighted Attendance Rate**: $AR = \frac{N_{\text{present}} + w \cdot N_{\text{late}}}{N_{\text{total}}} \times 100\%$ ($w = 0.5$)
- `[F-MATH-302]` **Attendance Safe-Margin & Recovery**: $M_{\text{safe}} = \lfloor \frac{N_{\text{present}} - T \cdot N_{\text{total}}}{T} \rfloor$, $C_{\text{req}} = \lceil \frac{T \cdot N_{\text{total}} - N_{\text{present}}}{1 - T} \rceil$
- `[F-MATH-303]` **NIOS Composite Subject Score & TMA Weightage**: 20% TMA continuous assessment scaling, Practical marks, and $33\%$ aggregate/component passing rules.
- `[F-MATH-304]` **NIOS 5-Session Formative Practical PCP Aggregator**
- `[F-MATH-305]` **Cohort Mean ($\mu$) & Standard Deviation ($\sigma$) Engine**
- `[F-MATH-306]` **Student Percentile Rank ($PR$) Calculator**
- `[F-MATH-307]` **Attendance-to-Performance Pearson Correlation ($r$)**
- `[F-GRPH-401]` Calendar Attendance Heatmap
- `[F-GRPH-402]` Multi-Axis Score & Attendance Trend Line Chart
- `[F-GRPH-403]` Subject-Wise Stacked Attendance Bar Chart
- `[F-GRPH-404]` Student vs. Cohort Radar (Spider) Chart with $33\%$ Passing Threshold Line
- `[F-GRPH-405]` Score Distribution Histogram & Box-Plot Quartiles
- `[F-GRPH-406]` NIOS TMA & PCP Compliance Funnel Chart
- `[F-GRPH-407]` Stream, Block & ODE Distribution Donut Chart
- `[F-GRPH-408]` Component Breakdown Stacked Bar (Theory + TMA + Practical + TOC)

### CATEGORY 06 & 07: Timetable & Roll-Call (`[F-SCH-xxx]`, `[F-ATT-xxx]`)
- `[F-SCH-501]` Master Timetable Viewer
- `[F-SCH-502]` Class & PCP Session Scheduler
- `[F-SCH-503]` Drag/Drop Rescheduler with Conflict Detection Engine
- `[F-SCH-504]` Class Unscheduling (Cancellation with mandatory reason & auto-alert)
- `[F-SCH-505]` Visual Diff Highlight System (RESCHEDULED strikethrough & room change diffs)
- `[F-ATT-601]` Class Roster Loader
- `[F-ATT-602]` 3-State Touch Control (`Present`, `Absent`, `Late`)
- `[F-ATT-603]` 15-Second Roll-Call Accelerator ("Mark All Present" 1-tap)
- `[F-ATT-604]` Late Time Chips (`+5m`, `+15m`, `+30m`) and Excused Notes
- `[F-ATT-605]` NIOS 5-Session Mandatory Practical PCP Grader

### CATEGORY 08 & 09: Materials & Broadcasts (`[F-MAT-xxx]`, `[F-NOT-xxx]`)
- `[F-MAT-701]` Multi-Select Student / Stream / Remedial Cohort Target Picker
- `[F-MAT-702]` Mass Study Material Uploader with Tags & Note
- `[F-MAT-703]` NIOS TMA Submission & Evaluation Workflow
- `[F-MAT-704]` Student Textbook Library with PWA Offline Vault
- `[F-MAT-705]` Interactive 3-State Topic Checklist distinguishing `#TMA-40%` vs. `#Public-Exam-60%`
- `[F-MAT-706]` Checklist Sorting & Multi-Tag Filtering Engine
- `[F-NOT-801..803]` Targeted Group Notification Composer, Deadline Triggers, Read Receipts ("Seen by 38/42"), and Revoke Manager.

---

## 💻 Quick Start & Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Create production deployment build
npm run build

# 4. Preview production build locally
npm run preview
```

