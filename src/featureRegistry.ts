// GRAVEL — Master Classified Feature Registry [F-DEV-001]
import { FeatureIndex, InstitutionPreset, Role } from './types';

export const MASTER_FEATURE_REGISTRY: FeatureIndex[] = [
  // CATEGORY 00: UI SHELL, NAVIGATION & THEME [F-UI-xxx]
  {
    id: '[F-UI-001]',
    category: 'UI',
    name: 'Responsive App Shell Controller',
    description: 'Auto-switches Desktop 3-zone layout (>=1024px) vs Mobile 5-slot thumb-zone (<768px)',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-002]',
    category: 'UI',
    name: 'Modular Theme Engine ("Swappable by Dev")',
    description: 'CSS token switching: Gravel Slate, NIOS Academic Editorial, Kinetic Pulse (Light/Dark)',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-003]',
    category: 'UI',
    name: 'Global Command & Quick-Search Bar (Cmd/Ctrl + K)',
    description: 'Universal modal search across users (by Name, NIOS Enrolment, Roll No), classes & materials',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-004]',
    category: 'UI',
    name: 'PWA Offline Sync & Connectivity Banner',
    description: 'Monitors online/offline state, caches read views & mutations, triggers background sync',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-005]',
    category: 'UI',
    name: 'Interactive Data Table Engine',
    description: 'Virtualized, high-density table with sticky headers, inline actions and row checkboxes',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-006]',
    category: 'UI',
    name: 'Floating Bulk-Action Bar',
    description: 'Bottom floating bar animating into view when >=1 items are selected for mass operations',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-007]',
    category: 'UI',
    name: 'Slide-Over Inspector Drawer',
    description: 'Right-hand overlay (Desktop) or bottom sheet (Mobile) for editing without losing scroll context',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-UI-008]',
    category: 'UI',
    name: 'Dynamic Delegated-Permission SidebarInjector',
    description: 'Dynamically injects Admin Tools drawer into Teacher navigation if granted elevated permissions',
    enabled: true,
    allowedRoles: ['TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 01: DEVELOPER PLATFORM CONTROL [F-DEV-xxx]
  {
    id: '[F-DEV-001]',
    category: 'DEV',
    name: 'Institution Profile & Feature Configurator',
    description: 'Dev selection of Institution Preset and live ON/OFF toggling of feature indices per role',
    enabled: true,
    allowedRoles: ['DEV'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DEV-002]',
    category: 'DEV',
    name: 'Admin Account Provisioning Console',
    description: 'Create, suspend, reset credentials, assign rate/tenant limits, or delete Admin accounts',
    enabled: true,
    allowedRoles: ['DEV'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DEV-003]',
    category: 'DEV',
    name: 'Global Audit Log & Mutation Stream',
    description: 'Real-time searchable log of all mutations across all users with role, IP and timestamp filters',
    enabled: true,
    allowedRoles: ['DEV'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DEV-004]',
    category: 'DEV',
    name: 'Raw Database Inspector & Query Console',
    description: 'Direct tabular and JSON read/write access to all collections for immediate diagnostics',
    enabled: true,
    allowedRoles: ['DEV'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DEV-005]',
    category: 'DEV',
    name: 'Snapshot Backup, Restore & Cache Purge',
    description: 'One-click manual database snapshot creation, JSON restore, and PWA cache invalidation bump',
    enabled: true,
    allowedRoles: ['DEV'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DEV-006]',
    category: 'DEV',
    name: 'Shadow Login ("Impersonate User" Sandbox)',
    description: 'Allows Dev or Admin to view and test live interface as any specific Admin, Teacher, or Student',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 02: MODULAR DATA SCHEMAS [F-DAT-xxx]
  {
    id: '[F-DAT-101]',
    category: 'DAT',
    name: 'Base User Identity Schema',
    description: 'Universal personal details: Full Legal Name, DOB, Gender, Phone, Email, Residential Address',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DAT-102]',
    category: 'DAT',
    name: 'Guardian & Emergency Contact Schema',
    description: 'Father/Mother/Guardian names, WhatsApp/SMS alert numbers, income bracket and relationship',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-DAT-103]',
    category: 'DAT',
    name: 'NIOS Core Enrolment & Stream Schema',
    description: '12-Digit Enrolment No, AI Code 270123, Course Class X/XII, Stream 1-4 Block 1/2, Medium',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-DAT-104]',
    category: 'DAT',
    name: 'NIOS Subject, TOC, TMA & PCP Schema',
    description: 'Enrolled subjects (3-digit codes), TOC eligibility & marks, TMA status/marks, PCP attendance',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-DAT-105]',
    category: 'DAT',
    name: 'NIOS KYC, Social Category & PwD Compliance',
    description: 'Aadhaar ID, Social Category (Gen/OBC/SC/ST), Divyangjan UDID, Scribe & Extra time flags',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-DAT-106]',
    category: 'DAT',
    name: 'NIOS Academic Hierarchy & Stage Engine',
    description: 'Data schemas and prerequisite/age validation rules for OBE (Levels A, B, C), Secondary, and Senior Secondary',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-DAT-107]',
    category: 'DAT',
    name: 'Master Course & Subject Code Catalog',
    description: 'Comprehensive database of all official NIOS subjects categorized by group, code, practical flags, and TMA ceilings',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-DAT-108]',
    category: 'DAT',
    name: 'Teacher / Academic Facilitator Schema',
    description: 'Employee ID, Designation (PCP Counsellor, TMA Evaluator), Assigned Batches, Max Weekly Hours',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 03: ACCOUNT & PERMISSION FEATURES [F-ACC-xxx]
  {
    id: '[F-ACC-201]',
    category: 'ACC',
    name: 'Single Account Creator Wizard',
    description: 'Stepped form dynamically rendering modular field packs to onboard students or teachers',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-202]',
    category: 'ACC',
    name: 'Bulk CSV/Excel Account Importer',
    description: 'Mass-onboarding utility with column-mapping preview for NIOS AI rosters or tuition sheets',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-203]',
    category: 'ACC',
    name: 'Multi-Facet Account Filter Engine',
    description: 'Filters directory by NIOS Criteria (Course, Stream, Block, TMA Pending, AR<75%) and Universal',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-204]',
    category: 'ACC',
    name: 'Multi-Criteria Account Sorting Engine',
    description: 'Sorts directory by Name, NIOS Enrolment No, Admission Date, Attendance Rate, TMA %',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-205]',
    category: 'ACC',
    name: 'Bulk Account Action Processor',
    description: 'Executes mass operations on selected accounts: Status change, TMA reminders, Batch reassignment',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-206]',
    category: 'ACC',
    name: 'Inline Row Actions & Full-Override Account Editor',
    description: 'Quick row actions opening slide-over drawer to alter any student/teacher field with audit log',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ACC-207]',
    category: 'ACC',
    name: 'Granular Permission Delegation Matrix',
    description: 'Grants teachers elevated sub-admin tools with Scope (Batches vs All) and Expiry date',
    enabled: true,
    allowedRoles: ['ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-VAL-208]',
    category: 'VAL',
    name: 'Enrollment Subject Selection & Constraint Validator',
    description: 'Interactive validation engine enforcing subject quotas, language thresholds, and examination group clash rules',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },

  // CATEGORY 04: MATHEMATICAL & STATISTICAL ANALYTICS [F-MATH-xxx]
  {
    id: '[F-MATH-301]',
    category: 'MATH',
    name: 'Weighted Attendance Rate (AR) Calculator',
    description: 'Computes AR = ((N_present + w*N_late) / N_total) * 100 with configurable late weight w=0.5',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MATH-302]',
    category: 'MATH',
    name: 'Attendance Safe-Margin & Recovery Calculator',
    description: 'Computes M_safe (classes student can miss) or C_req (consecutive classes needed to hit threshold T)',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MATH-303]',
    category: 'MATH',
    name: 'NIOS Composite Subject Score & TMA Weightage Engine',
    description: 'Computes Theory + TMA (20% weight) + Practical marks; enforces NIOS 33% aggregate & component rule',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-MATH-304]',
    category: 'MATH',
    name: 'NIOS 5-Session Formative PCP Score Aggregator',
    description: 'Calculates practical PCP marks across 5 mandatory contact sessions: sum(p_k for k=1..5)',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-MATH-305]',
    category: 'MATH',
    name: 'Cohort Mean & Standard Deviation Engine',
    description: 'Calculates mean (mu) and dispersion (sigma) per subject, batch, or mock exam series',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MATH-306]',
    category: 'MATH',
    name: 'Student Percentile Rank Calculator',
    description: 'Computes relative standing within batch or stream: PR = ((L + 0.5*S) / N) * 100',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MATH-307]',
    category: 'MATH',
    name: 'Attendance-to-Performance Pearson Correlation (r)',
    description: 'Quantifies linear relationship between attendance rate and academic test scores',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MATH-308]',
    category: 'MATH',
    name: 'College Credit & SGPA/CGPA Engine',
    description: 'Computes SGPA = sum(Credit_j * Grade_j) / sum(Credit_j) for university departments',
    enabled: false,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['COLLEGE', 'CUSTOM']
  },

  // CATEGORY 05: GRAPHICAL & VISUALIZATION WIDGETS [F-GRPH-xxx]
  {
    id: '[F-GRPH-401]',
    category: 'GRPH',
    name: 'Calendar Attendance Heatmap',
    description: 'GitHub-style daily grid showing attendance density and PCP participation over weeks and months',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-GRPH-402]',
    category: 'GRPH',
    name: 'Multi-Axis Score & Attendance Trend Line Chart',
    description: 'Plots longitudinal score progress against weekly attendance percentage overlay',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-GRPH-403]',
    category: 'GRPH',
    name: 'Subject-Wise Stacked Attendance Bar Chart',
    description: 'Compares Present, Late, and Absent proportions across all enrolled subjects or batches',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-GRPH-404]',
    category: 'GRPH',
    name: 'Student vs. Cohort Radar (Spider) Chart',
    description: 'Overlays individual student subject scores against batch mean (mu) and 33% passing line',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-GRPH-405]',
    category: 'GRPH',
    name: 'Score Distribution Histogram & Box-Plot',
    description: 'Displays subject exam score spread, median, quartiles, and at-risk outliers',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-GRPH-406]',
    category: 'GRPH',
    name: 'NIOS TMA & PCP Compliance Funnel Chart',
    description: 'Enrolled -> PCP>=50% -> TMA Submitted -> TMA Evaluated -> Exam Fee Paid -> Hall Ticket Ready',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-GRPH-407]',
    category: 'GRPH',
    name: 'Stream, Block & ODE Distribution Donut Chart',
    description: 'Institutional headcount across Stream 1 Block 1, Block 2, Stream 2, and ODE Streams 3/4',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-GRPH-408]',
    category: 'GRPH',
    name: 'Component Breakdown Stacked Bar (Theory+TMA+Prac)',
    description: 'Subject score broken down by Theory, TMA boost, Practical marks, and TOC credit',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },

  // CATEGORY 06: SCHEDULE & TIMETABLE FEATURES [F-SCH-xxx]
  {
    id: '[F-SCH-501]',
    category: 'SCH',
    name: 'Master & Batch Timetable Viewer',
    description: 'Interactive calendar (Agenda, Day, Week) filtered by Batch, Stream, Subject, Teacher',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-502]',
    category: 'SCH',
    name: 'Class & PCP Session Scheduler',
    description: 'Creates sessions tagged Regular Lecture, NIOS Theory PCP, NIOS Practical PCP 1-5, or Mock Exam',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-503]',
    category: 'SCH',
    name: 'Rescheduler with Conflict Detection Engine',
    description: 'Moves sessions while automatically checking Teacher, Batch, or Room double-booking conflicts',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-504]',
    category: 'SCH',
    name: 'Class Unscheduler (Cancellation & Alert Trigger)',
    description: 'Cancels session with mandatory reason and auto-dispatches alerts to enrolled students',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-505]',
    category: 'SCH',
    name: 'Visual Diff "Updated Schedule" Highlight System',
    description: 'Dedicated badges showing RESCHEDULED classes with old time struck-through and new time highlighted',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-506]',
    category: 'SCH',
    name: 'Substitute Teacher & Exam Slot Booker',
    description: 'Assigns replacement faculty when primary teacher is on leave and tracks ODE exam date slots',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-507]',
    category: 'SCH',
    name: 'Modular Subject-Slot Weekly Template Engine',
    description: '1 to 1.5h subject blocks inside 9am-5pm with Teacher/Room binding and Zero-Setup Rollout from logged days',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-508]',
    category: 'SCH',
    name: 'Calendar Override Engine (Holidays, Day-Swaps & Events)',
    description: 'Resolves daily schedule against 4 priority states: NORMAL, HOLIDAY, DAY_SWAP (e.g. Sat follows Tue), and EVENT',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-SCH-509]',
    category: 'SCH',
    name: 'Personalized Student Drop-In Arrival & Gap-Time Matcher',
    description: 'Front-desk & student matching: Expected Now, Next Slot Today, Gap-Time flags, and subject-block attendance',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 07: ATTENDANCE & ROLL-CALL [F-ATT-xxx]
  {
    id: '[F-ATT-601]',
    category: 'ATT',
    name: 'Class-Specific Attendance Roster Loader',
    description: 'Auto-loads active session roster showing Student Photo, Enrolment No, and current AR%',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ATT-602]',
    category: 'ATT',
    name: '3-State Segmented Radio Control',
    description: 'Touch-optimized per-student toggle: [(o) Present] [( ) Absent] [( ) Late]',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ATT-603]',
    category: 'ATT',
    name: '"Mark All Present" 15-Second Accelerator',
    description: 'One-tap button to mark entire roster Present by default so teacher only taps exceptions',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ATT-604]',
    category: 'ATT',
    name: 'Late-Arrival Time Chips & Excused Reason Popover',
    description: '+5m, +15m, +30m quick chips when Late is chosen, plus optional Excused Medical Note',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-ATT-605]',
    category: 'ATT',
    name: 'NIOS 5-Session Formative Practical PCP Attendance',
    description: 'Logs completion and formative assessment marks for 5 mandatory NIOS practical sessions',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-ATT-606]',
    category: 'ATT',
    name: 'Admin Attendance Override, Lock & Holiday Manager',
    description: 'Unlocks past attendance sheets, overrides erroneous entries with audit logging, logs holidays',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 08: STUDY MATERIAL, TMA & SYLLABUS CHECKLIST [F-MAT-xxx]
  {
    id: '[F-MAT-701]',
    category: 'MAT',
    name: 'Multi-Select Student & Cohort Target Picker',
    description: 'Selects students by Stream/Block or performance filter (Score < 40%, TOC) for material targeting',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MAT-702]',
    category: 'MAT',
    name: 'Mass Study Material Uploader with Tagging & Message',
    description: 'Uploads materials with Subject Code, Type (NIOS Material, TMA, Solved Paper), Block, Instructions',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MAT-703]',
    category: 'MAT',
    name: 'NIOS TMA Submission & Evaluation Workflow Module',
    description: 'Tracks TMA booklet deadlines, student digital/physical receipts, teacher marks & feedback',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT'],
    applicablePresets: ['NIOS', 'CUSTOM']
  },
  {
    id: '[F-MAT-704]',
    category: 'MAT',
    name: 'Student Textbook & Notes Library with PWA Vault',
    description: 'Filterable textbook repository with "Save for Offline" toggle storing files in local cache',
    enabled: true,
    allowedRoles: ['STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MAT-705]',
    category: 'MAT',
    name: 'Interactive Scheduled-Topic Syllabus Checklist',
    description: 'Distinguishes 40% TMA vs 60% Public Exam chapters; 3-state toggle: To Study, Needs Revision, Mastered',
    enabled: true,
    allowedRoles: ['STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-MAT-706]',
    category: 'MAT',
    name: 'Checklist Sorting & Multi-Tag Filtering Engine',
    description: 'Filters topics by #Public-Exam-60%, #TMA-40%, #High-Weightage, #Practical, Subject Codes, Date',
    enabled: true,
    allowedRoles: ['STUDENT'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },

  // CATEGORY 09: NOTIFICATION & BROADCAST [F-NOT-xxx]
  {
    id: '[F-NOT-801]',
    category: 'NOT',
    name: 'Targeted Group Notification Composer',
    description: 'Creates alerts for Batches, Streams, or custom cohorts with Info/Academic/Urgent/NIOS Deadline levels',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-NOT-802]',
    category: 'NOT',
    name: 'Automated NIOS & Institutional Deadline Trigger',
    description: 'Pre-configured alerts for TMA Deadlines, Public Exam Fee Window, PCP Schedules, Hall Tickets',
    enabled: true,
    allowedRoles: ['DEV', 'ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  },
  {
    id: '[F-NOT-803]',
    category: 'NOT',
    name: 'Notification History, Read-Receipts & Revoke Manager',
    description: 'Shows "Seen by 38/42", pinned announcements, and ability to edit or revoke alerts',
    enabled: true,
    allowedRoles: ['ADMIN', 'TEACHER'],
    applicablePresets: ['NIOS', 'COLLEGE', 'COACHING', 'CUSTOM']
  }
];

export function applyPresetToFeatures(
  features: FeatureIndex[], 
  preset: InstitutionPreset
): FeatureIndex[] {
  return features.map(feat => {
    // If feature applies to this preset, enable it, else disable
    const applies = feat.applicablePresets.includes(preset) || feat.applicablePresets.includes('CUSTOM');
    return {
      ...feat,
      enabled: applies
    };
  });
}

