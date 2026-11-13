// GRAVEL PWA — Type Definitions

export type Role = 'DEV' | 'ADMIN' | 'TEACHER' | 'STUDENT';

export type InstitutionPreset = 'NIOS' | 'COLLEGE' | 'COACHING' | 'CUSTOM';

export type ThemeId = 
  | 'slate-light' 
  | 'slate-dark' 
  | 'paper-light' 
  | 'paper-dark' 
  | 'kinetic-light' 
  | 'kinetic-dark';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  design: 'Gravel Slate (Bento)' | 'NIOS Academic Editorial' | 'Kinetic Pulse (OLED)';
  mode: 'light' | 'dark';
  canvasBg: string;
  surfaceBg: string;
  primaryAccent: string;
  cardRadius: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
}

export type NiosAcademicStage = 
  | 'OBE_A' 
  | 'OBE_B' 
  | 'OBE_C' 
  | 'SECONDARY' 
  | 'SR_SECONDARY';

export type NiosSubjectGroup = 
  | 'GROUP_A' 
  | 'GROUP_B' 
  | 'GROUP_C' 
  | 'GROUP_D' 
  | 'GROUP_E' 
  | 'GROUP_F' 
  | 'IKT' 
  | 'VOCATIONAL';

export interface NiosCatalogSubject {
  code: string;
  name: string;
  stage: NiosAcademicStage;
  group: NiosSubjectGroup;
  groupLabel: string;
  isLanguage: boolean;
  hasPractical: boolean;
  tmaCeiling: number;
  theoryMax: number;
  practicalMax: number;
  clashGroupId?: 'C' | 'D' | 'E' | 'F';
  description?: string;
}

export interface NiosStageInfo {
  stage: NiosAcademicStage;
  name: string;
  equivalent: string;
  minAge: number;
  description: string;
  prerequisites: string;
  minSubjects: number;
  maxSubjects: number;
  minLanguages: number;
  maxPrimaryLanguages: number;
  hasClashRules: boolean;
}

export interface NiosEnrollmentValidationResult {
  isValid: boolean;
  totalSubjects: number;
  languageCount: number;
  clashes: Array<{ group: string; subjectCodes: string[]; subjectNames: string[] }>;
  ageValid: boolean;
  age?: number;
  ageError?: string;
  gapValid?: boolean;
  gapWarning?: string;
  errors: string[];
  warnings: string[];
}

export interface FeatureIndex {
  id: string; // e.g. [F-UI-001]
  category: 'UI' | 'DEV' | 'DAT' | 'ACC' | 'MATH' | 'GRPH' | 'SCH' | 'ATT' | 'MAT' | 'NOT' | 'VAL';
  name: string;
  description: string;
  enabled: boolean;
  allowedRoles: Role[];
  applicablePresets: InstitutionPreset[];
}

export interface StudentRecord {
  id: string; // Internal UUID or ID
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  status: 'Active' | 'Onboarding' | 'Suspended' | 'Archived';
  avatar?: string;
  address: string;

  // Guardian Details [F-DAT-102]
  guardian: {
    fatherName: string;
    motherName: string;
    guardianName?: string;
    relationship: string;
    phone: string;
    guardianEmail?: string;
    annualIncome?: string;
  };

  // NIOS Core Enrolment [F-DAT-103]
  nios: {
    enrolmentNo: string; // 12-digit e.g. 270123210014
    refNo: string;
    aiCode: string; // Study centre code e.g. 270123
    regionalCentre: string;
    courseLevel: 'Secondary (Class X)' | 'Senior Secondary (Class XII)' | 'OBE (A/B/C)' | 'Vocational';
    admissionStatusType?: 'Already Registered with NIOS' | 'Fresh Admission via Coaching Centre';
    previousDocumentType?: 'Class 8/9 Mark Sheet / TC' | 'Self-Declaration (Age 14+)' | 'Class 10 Board Pass Certificate';
    previousSchoolName?: string;
    streamBlock: 'Stream 1, Block 1' | 'Stream 1, Block 2' | 'Stream 2' | 'Stream 3 (ODE)' | 'Stream 4 (ODE)';
    medium: 'English' | 'Hindi' | 'Urdu' | 'Regional';
    admissionStatus: 'Provisional' | 'Verified' | 'ID Card Issued';
    sessionYear: string;
    tocDetails?: {
      prevBoard: string;
      prevRollNo: string;
      passingYear?: string;
      passedSubjects?: string;
    };
  };

  // Subjects, TOC, TMA & PCP [F-DAT-104]
  subjects: Array<{
    code: string; // e.g. "311"
    name: string; // "Mathematics"
    hasPractical: boolean;
    theoryMarks?: number; // max 80 (or 100)
    practicalMarks?: number; // max 20
    tmaStatus: 'Pending' | 'Submitted to AI' | 'Uploaded on Portal' | 'Evaluated';
    tmaMarks?: number; // max 20
    tmaLateFee?: boolean;
    tmaFeedback?: string;
    tocApplied: boolean;
    tocMarksCarried?: number;
    pcpAttended: number; // out of 30
    mandatoryPcpSessions: number[]; // marks for sessions 1-5
  }>;

  // KYC, Category & PwD [F-DAT-105]
  compliance: {
    idProofType: 'Aadhaar' | 'Passport' | 'Ration Card';
    idProofNumber: string;
    socialCategory: 'General' | 'OBC' | 'SC' | 'ST' | 'Ex-Serviceman';
    isDivyangjan: boolean;
    disabilityType?: 'LD' | 'VI' | 'HI' | 'ID' | 'Multiple';
    concessions?: {
      scribeNeeded: boolean;
      extraTime20Mins: boolean;
      practicalExemption: boolean;
    };
  };

  // College Extension [F-DAT-106]
  college?: {
    universityRegNo: string;
    degreeProgram: string;
    semester: number;
    creditHours: number;
    sgpa: number;
    cgpa: number;
    backlogs: number;
  };

  // Coaching Extension [F-DAT-107]
  coaching?: {
    targetExam: 'NIOS Crash Course' | 'JEE' | 'NEET' | 'CUET' | 'Board';
    batchSlot: 'Morning' | 'Evening' | 'Weekend';
    feeStatus: 'Paid' | 'Due' | 'Overdue';
    mockRank: number;
  };

  // Coaching Operations & Schedule Preferences (Intake Questions)
  coachingPreferences?: {
    preferredTimings: string;
    academicProgress: {
      booksReceived: 'Yes' | 'No' | 'In Transit';
      tmaStarted: 'Not Started' | 'In Progress' | 'Completed';
      practicalFileCompleted: 'Not Started' | 'In Progress' | 'Ready for Evaluation';
    };
    homeStudySetup: {
      managedBy: 'Student' | 'Parent' | 'Both Collaboratively';
      primaryDevice: 'Smartphone (Android/iOS)' | 'Laptop / Desktop' | 'Tablet' | 'Shared Family Phone';
      internetAccess?: 'Broadband WiFi' | 'Mobile Hotspot (4G/5G)' | 'Limited / Offline';
    };
  };

  // Calculated / Cached Stats
  attendanceRate: number; // 0 - 100
  totalClassesHeld: number;
  totalPresent: number;
  totalLate: number;
  totalAbsent: number;
  examFeePaid: boolean;
  hallTicketStatus: 'Not Generated' | 'Ready' | 'Downloaded';
}

export interface TeacherRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  designation: 'PCP Counsellor' | 'Subject Teacher' | 'TMA Evaluator' | 'Practical Examiner' | 'Batch Coordinator';
  department: string;
  specializations: string[]; // Subject codes
  assignedBatches: string[];
  maxWeeklyHours: number;
  employmentType: 'Full-Time' | 'Visiting PCP Faculty';
  status: 'Active' | 'On Leave' | 'Suspended';
  avatar?: string;

  // Delegated Admin Permissions [F-ACC-207]
  delegation?: {
    isDelegated: boolean;
    canCreateEditStudents: boolean;
    canApproveSchedules: boolean;
    canUnlockAttendance: boolean;
    canVerifyTmaMarks: boolean;
    canViewGlobalAnalytics: boolean;
    scope: 'Assigned Batches Only' | 'Institution-Wide';
    expiresAt?: string;
  };
}

export interface ScheduleEvent {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  batch: string;
  teacherId: string;
  teacherName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room: string;
  sessionType: 'Regular Lecture' | 'NIOS Theory PCP' | 'NIOS Mandatory Practical PCP' | 'Doubt Clearing' | 'Mock/Internal Exam';
  practicalSessionIndex?: number; // 1 to 5 if Practical PCP
  syllabusTopic?: string;
  status: 'SCHEDULED' | 'RESCHEDULED' | 'CANCELLED';
  previousTime?: string;
  previousRoom?: string;
  cancellationReason?: string;
  isSpecialEvent?: boolean;
}

// =========================================================================
// NIOS 3-LAYER SCHEDULING & OVERRIDE ARCHITECTURE TYPES
// =========================================================================

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// Layer 1: Weekly Template Slot (Base Schedule)
export interface WeeklyTemplateSlot {
  id: string;
  dayOfWeek: DayOfWeek;
  slotLabel: string; // e.g. "Morning Slot 1 (09:00 - 10:30)"
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  subjectCode: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  room: string;
  sessionType: 'Regular Lecture' | 'NIOS Theory PCP' | 'NIOS Mandatory Practical PCP' | 'Doubt Clearing' | 'Mock/Internal Exam';
}

// Layer 2: Calendar Override Engine (Exceptions & Day-Swaps)
export type OverrideType = 'NORMAL' | 'HOLIDAY' | 'DAY_SWAP' | 'EVENT';

export interface CalendarOverride {
  id: string;
  date: string; // YYYY-MM-DD
  type: OverrideType;
  title: string; // e.g. "Diwali Holiday", "Follow Tuesday Timetable", "TMA Submission Drive"
  targetDayOfWeek?: DayOfWeek; // For DAY_SWAP (e.g. Saturday follows Tuesday)
  description?: string;
  eventDetails?: {
    eventName: string;
    description: string;
    room?: string;
    coordinator?: string;
    timings?: string;
  };
}

// Layer 3: Resolved Daily Schedule & Student Agenda
export interface ResolvedDailySchedule {
  date: string;
  dayOfWeek: DayOfWeek;
  state: OverrideType;
  overrideInfo?: CalendarOverride;
  isHoliday: boolean;
  slots: ScheduleEvent[];
}

export interface StudentDropInCheckIn {
  studentId: string;
  studentName: string;
  enrolmentNo: string;
  arrivalTime: string; // HH:mm
  expectedSlot?: ScheduleEvent;
  nextSlotToday?: ScheduleEvent;
  gapMinutes?: number;
  gapNotice?: string;
  status: 'EXPECTED' | 'CHECKED_IN' | 'NO_CLASS_NOW' | 'EARLY' | 'LATE';
}

export interface AttendanceEntry {
  id: string;
  scheduleId: string;
  date: string;
  subjectCode: string;
  batch: string;
  locked: boolean;
  records: Array<{
    studentId: string;
    studentName: string;
    enrolmentNo: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    lateMinutes?: 5 | 15 | 30;
    excusedNote?: string;
    pcpFormativeMarks?: number; // 0-10 for mandatory PCP
  }>;
}

export type MaterialCategory = 
  | 'Class Notes' 
  | 'TMA Help' 
  | 'Practice / PYQ' 
  | 'Quick Revision' 
  | 'Lab / Practical' 
  | 'Textbook';

export type FileContentType = 'PDF' | 'IMAGE' | 'LINK' | 'NOTE';

export interface StudyMaterial {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  materialType: 'NIOS Study Material' | 'TMA Question Booklet' | 'Solved Sample Paper' | 'Lecture Notes' | 'Practical Manual' | 'Worksheet' | string;
  categoryTag?: MaterialCategory;
  chapterNo?: number;
  chapterTitle?: string;
  fileContentType?: FileContentType;
  fileUrl: string;
  fileSize: string;
  compressedSize?: string;
  uploadDate: string;
  teacherId?: string;
  teacherName?: string;
  linkedLectureDate?: string;
  linkedScheduleId?: string;
  instructions?: string;
  previewContent?: string;
  savedOffline?: boolean;
  targetExamBlock?: string;
  targetCohorts?: string[];
}

export interface SyllabusChecklistTopic {
  id: string;
  chapterNo: number;
  title: string;
  subjectCode: string;
  bifurcation: 'TMA-40%' | 'Public-Exam-60%';
  isHighWeightage: boolean;
  isPracticalPcp: boolean;
  scheduledDate?: string;
  status: 'TO_STUDY' | 'NEEDS_REVISION' | 'MASTERED';
  linkedNotesTitle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: 'Info' | 'Academic' | 'Urgent Alert' | 'NIOS Deadline Warning';
  targetRole: 'ALL' | 'STUDENT' | 'TEACHER';
  targetStream?: string;
  createdAt: string;
  readCount: number;
  totalTargetCount: number;
  pinned: boolean;
  deadlineDate?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'PERMISSION_GRANT' | 'DB_OVERRIDE' | 'ATTENDANCE_MARK';
  userRole: Role;
  userName: string;
  details: string;
  ip: string;
}

