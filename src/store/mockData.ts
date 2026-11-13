// GRAVEL — Initial Rich Mock Dataset for NIOS AI Study Centre #270123
import { 
  StudentRecord, 
  TeacherRecord, 
  ScheduleEvent, 
  StudyMaterial, 
  SyllabusChecklistTopic, 
  NotificationItem, 
  AuditLogEntry,
  AttendanceEntry
} from '../types';

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '2006-04-15',
    gender: 'Male',
    bloodGroup: 'B+',
    status: 'Active',
    address: 'Flat 402, Shanti Heights, Sector 14, Rohini, New Delhi',
    guardian: {
      fatherName: 'Rajesh Sharma',
      motherName: 'Sunita Sharma',
      relationship: 'Father',
      phone: '+91 98765 43211',
      guardianEmail: 'rajesh.sharma@example.com',
      annualIncome: '₹4,50,000'
    },
    nios: {
      enrolmentNo: '270123210014',
      refNo: 'REF-2026-DEL-894',
      aiCode: '270123',
      regionalCentre: 'Delhi (East)',
      courseLevel: 'Senior Secondary (Class XII)',
      streamBlock: 'Stream 1, Block 1',
      medium: 'English',
      admissionStatus: 'ID Card Issued',
      sessionYear: '2026-2027'
    },
    subjects: [
      {
        code: '302',
        name: 'English',
        hasPractical: false,
        theoryMarks: 68,
        tmaStatus: 'Evaluated',
        tmaMarks: 18,
        tocApplied: false,
        pcpAttended: 24,
        mandatoryPcpSessions: [8, 9, 8, 9, 8]
      },
      {
        code: '311',
        name: 'Mathematics',
        hasPractical: false,
        theoryMarks: 52,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 18,
        mandatoryPcpSessions: [7, 6, 7, 6, 7]
      },
      {
        code: '312',
        name: 'Physics',
        hasPractical: true,
        theoryMarks: 48,
        practicalMarks: 17,
        tmaStatus: 'Submitted to AI',
        tmaMarks: 14,
        tocApplied: false,
        pcpAttended: 20,
        mandatoryPcpSessions: [8, 8, 9, 7, 8]
      },
      {
        code: '313',
        name: 'Chemistry',
        hasPractical: true,
        theoryMarks: 44,
        practicalMarks: 16,
        tmaStatus: 'Evaluated',
        tmaMarks: 15,
        tocApplied: false,
        pcpAttended: 19,
        mandatoryPcpSessions: [8, 7, 8, 8, 7]
      },
      {
        code: '336',
        name: 'Data Entry Operations',
        hasPractical: true,
        theoryMarks: 24,
        practicalMarks: 56,
        tmaStatus: 'Evaluated',
        tmaMarks: 19,
        tocApplied: false,
        pcpAttended: 26,
        mandatoryPcpSessions: [9, 10, 9, 10, 10]
      }
    ],
    compliance: {
      idProofType: 'Aadhaar',
      idProofNumber: '7842 9102 3341',
      socialCategory: 'General',
      isDivyangjan: false
    },
    coachingPreferences: {
      preferredTimings: '09:00 AM - 01:00 PM (Morning Slot)',
      academicProgress: {
        booksReceived: 'Yes',
        tmaStarted: 'In Progress',
        practicalFileCompleted: 'In Progress'
      },
      homeStudySetup: {
        managedBy: 'Both Collaboratively',
        primaryDevice: 'Smartphone (Android/iOS)',
        internetAccess: 'Broadband WiFi'
      }
    },
    attendanceRate: 64.2,
    totalClassesHeld: 42,
    totalPresent: 25,
    totalLate: 4,
    totalAbsent: 13,
    examFeePaid: true,
    hallTicketStatus: 'Ready'
  },
  {
    id: 'std-002',
    name: 'Diya Nair',
    email: 'diya.nair@example.com',
    phone: '+91 98112 34567',
    dob: '2007-08-22',
    gender: 'Female',
    bloodGroup: 'O+',
    status: 'Active',
    address: 'B-12, Mayur Vihar Phase 1, Delhi',
    guardian: {
      fatherName: 'Gopal Nair',
      motherName: 'Anitha Nair',
      relationship: 'Mother',
      phone: '+91 98112 34568',
      guardianEmail: 'anitha.nair@example.com',
      annualIncome: '₹6,00,000'
    },
    nios: {
      enrolmentNo: '270123210089',
      refNo: 'REF-2026-DEL-1022',
      aiCode: '270123',
      regionalCentre: 'Delhi (East)',
      courseLevel: 'Senior Secondary (Class XII)',
      streamBlock: 'Stream 1, Block 1',
      medium: 'English',
      admissionStatus: 'ID Card Issued',
      sessionYear: '2026-2027'
    },
    subjects: [
      {
        code: '302',
        name: 'English',
        hasPractical: false,
        theoryMarks: 74,
        tmaStatus: 'Evaluated',
        tmaMarks: 19,
        tocApplied: false,
        pcpAttended: 27,
        mandatoryPcpSessions: [9, 9, 9, 10, 9]
      },
      {
        code: '311',
        name: 'Mathematics',
        hasPractical: false,
        theoryMarks: 60,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 22,
        mandatoryPcpSessions: [8, 8, 7, 8, 8]
      },
      {
        code: '314',
        name: 'Biology',
        hasPractical: true,
        theoryMarks: 58,
        practicalMarks: 18,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 25,
        mandatoryPcpSessions: [9, 8, 9, 8, 9]
      },
      {
        code: '312',
        name: 'Physics',
        hasPractical: true,
        theoryMarks: 54,
        practicalMarks: 16,
        tmaStatus: 'Submitted to AI',
        tmaMarks: 15,
        tocApplied: false,
        pcpAttended: 21,
        mandatoryPcpSessions: [8, 7, 8, 7, 8]
      },
      {
        code: '313',
        name: 'Chemistry',
        hasPractical: true,
        theoryMarks: 52,
        practicalMarks: 17,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 20,
        mandatoryPcpSessions: [7, 8, 8, 7, 8]
      }
    ],
    compliance: {
      idProofType: 'Aadhaar',
      idProofNumber: '6123 4492 8821',
      socialCategory: 'OBC',
      isDivyangjan: false
    },
    attendanceRate: 68.0,
    totalClassesHeld: 42,
    totalPresent: 27,
    totalLate: 3,
    totalAbsent: 12,
    examFeePaid: true,
    hallTicketStatus: 'Ready'
  },
  {
    id: 'std-003',
    name: 'Kabir Verma',
    email: 'kabir.verma@example.com',
    phone: '+91 97234 56789',
    dob: '2005-11-10',
    gender: 'Male',
    bloodGroup: 'A+',
    status: 'Active',
    address: 'C-89, Preet Vihar, Vikas Marg, Delhi',
    guardian: {
      fatherName: 'Vipin Verma',
      motherName: 'Renu Verma',
      relationship: 'Father',
      phone: '+91 97234 56780',
      guardianEmail: 'vipin.verma@example.com'
    },
    nios: {
      enrolmentNo: '270123210102',
      refNo: 'REF-2026-DEL-1304',
      aiCode: '270123',
      regionalCentre: 'Delhi (East)',
      courseLevel: 'Senior Secondary (Class XII)',
      streamBlock: 'Stream 3 (ODE)',
      medium: 'English',
      admissionStatus: 'ID Card Issued',
      sessionYear: '2026-2027'
    },
    subjects: [
      {
        code: '302',
        name: 'English',
        hasPractical: false,
        theoryMarks: 82,
        tmaStatus: 'Evaluated',
        tmaMarks: 20,
        tocApplied: true,
        tocMarksCarried: 0,
        pcpAttended: 29,
        mandatoryPcpSessions: [10, 9, 10, 10, 10]
      },
      {
        code: '311',
        name: 'Mathematics',
        hasPractical: false,
        theoryMarks: 76,
        tmaStatus: 'Evaluated',
        tmaMarks: 18,
        tocApplied: false,
        pcpAttended: 28,
        mandatoryPcpSessions: [9, 9, 10, 9, 9]
      },
      {
        code: '312',
        name: 'Physics',
        hasPractical: true,
        theoryMarks: 72,
        practicalMarks: 19,
        tmaStatus: 'Evaluated',
        tmaMarks: 19,
        tocApplied: false,
        pcpAttended: 28,
        mandatoryPcpSessions: [10, 10, 9, 10, 9]
      },
      {
        code: '313',
        name: 'Chemistry',
        hasPractical: true,
        theoryMarks: 70,
        practicalMarks: 18,
        tmaStatus: 'Evaluated',
        tmaMarks: 18,
        tocApplied: false,
        pcpAttended: 27,
        mandatoryPcpSessions: [9, 9, 9, 9, 9]
      },
      {
        code: '336',
        name: 'Data Entry Operations',
        hasPractical: true,
        theoryMarks: 28,
        practicalMarks: 58,
        tmaStatus: 'Evaluated',
        tmaMarks: 20,
        tocApplied: false,
        pcpAttended: 30,
        mandatoryPcpSessions: [10, 10, 10, 10, 10]
      }
    ],
    compliance: {
      idProofType: 'Aadhaar',
      idProofNumber: '9901 2341 5567',
      socialCategory: 'General',
      isDivyangjan: false
    },
    attendanceRate: 88.5,
    totalClassesHeld: 42,
    totalPresent: 36,
    totalLate: 2,
    totalAbsent: 4,
    examFeePaid: true,
    hallTicketStatus: 'Ready'
  },
  {
    id: 'std-004',
    name: 'Meera Patel',
    email: 'meera.patel@example.com',
    phone: '+91 99887 76655',
    dob: '2006-02-18',
    gender: 'Female',
    bloodGroup: 'AB+',
    status: 'Active',
    address: 'Pocket D, Dilshad Garden, Delhi',
    guardian: {
      fatherName: 'Bhavesh Patel',
      motherName: 'Meena Patel',
      relationship: 'Father',
      phone: '+91 99887 76654'
    },
    nios: {
      enrolmentNo: '270123210145',
      refNo: 'REF-2026-DEL-1560',
      aiCode: '270123',
      regionalCentre: 'Delhi (East)',
      courseLevel: 'Senior Secondary (Class XII)',
      streamBlock: 'Stream 2',
      medium: 'Hindi',
      admissionStatus: 'ID Card Issued',
      sessionYear: '2026-2027'
    },
    subjects: [
      {
        code: '201',
        name: 'Hindi',
        hasPractical: false,
        theoryMarks: 86,
        tmaStatus: 'Evaluated',
        tmaMarks: 20,
        tocApplied: true,
        tocMarksCarried: 0,
        pcpAttended: 30,
        mandatoryPcpSessions: [10, 10, 10, 10, 10]
      },
      {
        code: '302',
        name: 'English',
        hasPractical: false,
        theoryMarks: 78,
        tmaStatus: 'Evaluated',
        tmaMarks: 19,
        tocApplied: false,
        pcpAttended: 29,
        mandatoryPcpSessions: [9, 10, 9, 10, 9]
      },
      {
        code: '311',
        name: 'Mathematics',
        hasPractical: false,
        theoryMarks: 68,
        tmaStatus: 'Evaluated',
        tmaMarks: 17,
        tocApplied: false,
        pcpAttended: 27,
        mandatoryPcpSessions: [9, 9, 8, 9, 9]
      },
      {
        code: '312',
        name: 'Physics',
        hasPractical: true,
        theoryMarks: 66,
        practicalMarks: 18,
        tmaStatus: 'Evaluated',
        tmaMarks: 18,
        tocApplied: false,
        pcpAttended: 28,
        mandatoryPcpSessions: [9, 9, 9, 9, 10]
      },
      {
        code: '313',
        name: 'Chemistry',
        hasPractical: true,
        theoryMarks: 64,
        practicalMarks: 17,
        tmaStatus: 'Submitted to AI',
        tmaMarks: 16,
        tocApplied: false,
        pcpAttended: 26,
        mandatoryPcpSessions: [8, 9, 9, 8, 9]
      }
    ],
    compliance: {
      idProofType: 'Aadhaar',
      idProofNumber: '3312 8899 0012',
      socialCategory: 'OBC',
      isDivyangjan: false
    },
    attendanceRate: 91.0,
    totalClassesHeld: 42,
    totalPresent: 38,
    totalLate: 1,
    totalAbsent: 3,
    examFeePaid: true,
    hallTicketStatus: 'Ready'
  },
  {
    id: 'std-005',
    name: 'Rohan Sen',
    email: 'rohan.sen@example.com',
    phone: '+91 98450 12345',
    dob: '2007-09-05',
    gender: 'Male',
    bloodGroup: 'O-',
    status: 'Active',
    address: 'Tower 3, Ashoka Enclave, Anand Vihar, Delhi',
    guardian: {
      fatherName: 'Debabrata Sen',
      motherName: 'Mousumi Sen',
      relationship: 'Father',
      phone: '+91 98450 12346'
    },
    nios: {
      enrolmentNo: '270123210188',
      refNo: 'REF-2026-DEL-1890',
      aiCode: '270123',
      regionalCentre: 'Delhi (East)',
      courseLevel: 'Senior Secondary (Class XII)',
      streamBlock: 'Stream 1, Block 2',
      medium: 'English',
      admissionStatus: 'Verified',
      sessionYear: '2026-2027'
    },
    subjects: [
      {
        code: '302',
        name: 'English',
        hasPractical: false,
        theoryMarks: 62,
        tmaStatus: 'Submitted to AI',
        tmaMarks: 16,
        tocApplied: false,
        pcpAttended: 22,
        mandatoryPcpSessions: [8, 8, 7, 8, 8]
      },
      {
        code: '311',
        name: 'Mathematics',
        hasPractical: false,
        theoryMarks: 42,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 17,
        mandatoryPcpSessions: [6, 7, 6, 7, 6]
      },
      {
        code: '312',
        name: 'Physics',
        hasPractical: true,
        theoryMarks: 40,
        practicalMarks: 15,
        tmaStatus: 'Pending',
        tmaMarks: 0,
        tocApplied: false,
        pcpAttended: 18,
        mandatoryPcpSessions: [7, 7, 8, 7, 7]
      },
      {
        code: '314',
        name: 'Biology',
        hasPractical: true,
        theoryMarks: 50,
        practicalMarks: 16,
        tmaStatus: 'Evaluated',
        tmaMarks: 15,
        tocApplied: false,
        pcpAttended: 20,
        mandatoryPcpSessions: [8, 8, 8, 8, 8]
      },
      {
        code: '336',
        name: 'Data Entry Operations',
        hasPractical: true,
        theoryMarks: 22,
        practicalMarks: 50,
        tmaStatus: 'Submitted to AI',
        tmaMarks: 17,
        tocApplied: false,
        pcpAttended: 24,
        mandatoryPcpSessions: [9, 8, 9, 9, 8]
      }
    ],
    compliance: {
      idProofType: 'Aadhaar',
      idProofNumber: '4455 6677 8899',
      socialCategory: 'General',
      isDivyangjan: true,
      disabilityType: 'LD',
      concessions: {
        scribeNeeded: false,
        extraTime20Mins: true,
        practicalExemption: false
      }
    },
    attendanceRate: 71.4,
    totalClassesHeld: 42,
    totalPresent: 28,
    totalLate: 4,
    totalAbsent: 10,
    examFeePaid: false,
    hallTicketStatus: 'Not Generated'
  }
];

export const INITIAL_TEACHERS: TeacherRecord[] = [
  {
    id: 'tch-001',
    name: 'Dr. Aruna Saxena',
    email: 'aruna.saxena@gravel-ai270123.org',
    phone: '+91 98101 22334',
    employeeId: 'AI-FAC-014',
    designation: 'PCP Counsellor',
    department: 'Science & Mathematics',
    specializations: ['311', '312'],
    assignedBatches: ['XII-Stream1-B1', 'XII-Stream3-ODE'],
    maxWeeklyHours: 24,
    employmentType: 'Full-Time',
    status: 'Active',
    delegation: {
      isDelegated: true,
      canCreateEditStudents: true,
      canApproveSchedules: true,
      canUnlockAttendance: true,
      canVerifyTmaMarks: true,
      canViewGlobalAnalytics: true,
      scope: 'Institution-Wide',
      expiresAt: '2026-12-31'
    }
  },
  {
    id: 'tch-002',
    name: 'Prof. Rajesh Kulkarni',
    email: 'rajesh.kulkarni@gravel-ai270123.org',
    phone: '+91 98202 33445',
    employeeId: 'AI-FAC-022',
    designation: 'TMA Evaluator',
    department: 'Humanities & Languages',
    specializations: ['302', '201'],
    assignedBatches: ['XII-Stream1-B1', 'XII-Stream1-B2', 'XII-Stream2'],
    maxWeeklyHours: 20,
    employmentType: 'Full-Time',
    status: 'Active',
    delegation: {
      isDelegated: false,
      canCreateEditStudents: false,
      canApproveSchedules: false,
      canUnlockAttendance: false,
      canVerifyTmaMarks: true,
      canViewGlobalAnalytics: false,
      scope: 'Assigned Batches Only'
    }
  },
  {
    id: 'tch-003',
    name: 'Sunita Deshmukh',
    email: 'sunita.deshmukh@gravel-ai270123.org',
    phone: '+91 98303 44556',
    employeeId: 'AI-FAC-031',
    designation: 'Practical Examiner',
    department: 'Science & Computer Applications',
    specializations: ['313', '314', '336'],
    assignedBatches: ['XII-Stream1-B1', 'XII-Stream1-B2'],
    maxWeeklyHours: 18,
    employmentType: 'Visiting PCP Faculty',
    status: 'Active',
    delegation: {
      isDelegated: false,
      canCreateEditStudents: false,
      canApproveSchedules: false,
      canUnlockAttendance: false,
      canVerifyTmaMarks: false,
      canViewGlobalAnalytics: false,
      scope: 'Assigned Batches Only'
    }
  }
];

export const INITIAL_SCHEDULES: ScheduleEvent[] = [
  {
    id: 'sch-101',
    title: 'Mathematics PCP Session 04 — Calculus & Vectors',
    subjectCode: '311',
    subjectName: 'Mathematics',
    batch: 'XII-Stream1-B1',
    teacherId: 'tch-001',
    teacherName: 'Dr. Aruna Saxena',
    date: '2026-11-08',
    startTime: '10:00',
    endTime: '11:30',
    room: 'Room 204 (Smart Lab)',
    sessionType: 'NIOS Theory PCP',
    syllabusTopic: 'Differential Equations and Applications',
    status: 'RESCHEDULED',
    previousTime: '09:00 - 10:30',
    previousRoom: 'Room 102 (Old Hall)'
  },
  {
    id: 'sch-102',
    title: 'Physics Practical PCP Formative Session 3',
    subjectCode: '312',
    subjectName: 'Physics',
    batch: 'XII-Stream1-B1',
    teacherId: 'tch-001',
    teacherName: 'Dr. Aruna Saxena',
    date: '2026-11-08',
    startTime: '12:00',
    endTime: '14:00',
    room: 'Physics Lab 1',
    sessionType: 'NIOS Mandatory Practical PCP',
    practicalSessionIndex: 3,
    syllabusTopic: 'Simple Pendulum & Verification of g',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-103',
    title: 'English Language & Comprehension Lecture',
    subjectCode: '302',
    subjectName: 'English',
    batch: 'XII-Stream1-B1',
    teacherId: 'tch-002',
    teacherName: 'Prof. Rajesh Kulkarni',
    date: '2026-11-09',
    startTime: '10:00',
    endTime: '11:15',
    room: 'Room 201',
    sessionType: 'Regular Lecture',
    syllabusTopic: 'Report Writing & Job Application Format',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-104',
    title: 'Chemistry Laboratory PCP Formative Session 4',
    subjectCode: '313',
    subjectName: 'Chemistry',
    batch: 'XII-Stream1-B1',
    teacherId: 'tch-003',
    teacherName: 'Sunita Deshmukh',
    date: '2026-11-09',
    startTime: '11:30',
    endTime: '13:30',
    room: 'Chemistry Lab',
    sessionType: 'NIOS Mandatory Practical PCP',
    practicalSessionIndex: 4,
    syllabusTopic: 'Volumetric Analysis (Titration of Oxalic Acid vs KMnO4)',
    status: 'SCHEDULED'
  },
  {
    id: 'sch-105',
    title: 'Data Entry Operations Practical Session',
    subjectCode: '336',
    subjectName: 'Data Entry Operations',
    batch: 'XII-Stream1-B1',
    teacherId: 'tch-003',
    teacherName: 'Sunita Deshmukh',
    date: '2026-11-07',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Computer Lab A',
    sessionType: 'Regular Lecture',
    status: 'CANCELLED',
    cancellationReason: 'Scheduled power maintenance in IT block'
  }
];

export const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-001',
    title: 'Physics Practical Lab Manual & Record Book Template',
    subjectCode: '312',
    subjectName: 'Physics',
    materialType: 'Practical Manual',
    categoryTag: 'Lab / Practical',
    chapterNo: 3,
    chapterTitle: 'Ch 3: Mechanics & Motion Labs',
    fileContentType: 'PDF',
    targetExamBlock: 'Stream 1 Block 1 (April 2027)',
    targetCohorts: ['All', 'Stream 1, Block 1'],
    fileUrl: '/docs/physics-lab-manual-312.pdf',
    fileSize: '4.8 MB',
    compressedSize: '420 KB',
    uploadDate: '2026-11-10',
    teacherId: 'tch-002',
    teacherName: 'Prof. Ananya Gupta',
    linkedLectureDate: '2026-11-10',
    instructions: 'Complete experiments 1 through 5 before PCP Formative Assessment 3.',
    previewContent: 'Mandatory experiment protocols: Simple Pendulum, Screw Gauge, Vernier Caliper & Inclined Plane.',
    savedOffline: true
  },
  {
    id: 'mat-002',
    title: 'Mathematics TMA 2026-27 Official Reference Guidelines',
    subjectCode: '311',
    subjectName: 'Mathematics',
    materialType: 'TMA Question Booklet',
    categoryTag: 'TMA Help',
    chapterNo: 4,
    chapterTitle: 'Ch 4: Quadratic Equations & Progressions',
    fileContentType: 'PDF',
    targetExamBlock: 'Stream 1 Block 1',
    targetCohorts: ['All', 'Score < 40%'],
    fileUrl: '/docs/math-tma-guidelines-311.pdf',
    fileSize: '2.1 MB',
    compressedSize: '280 KB',
    uploadDate: '2026-11-08',
    teacherId: 'tch-001',
    teacherName: 'Dr. Ramesh Chandra',
    instructions: 'Step-by-step guidance for TMA Questions 1 to 6 (worth 20 marks).',
    previewContent: 'TMA Question 1: Solve x^2 - 7x + 12 = 0. TMA Question 2: Find the 15th term of AP 3, 7, 11...',
    savedOffline: true
  },
  {
    id: 'mat-003',
    title: 'Mathematics Whiteboard Board Snapshot — Quadratic Roots Derivation',
    subjectCode: '311',
    subjectName: 'Mathematics',
    materialType: 'Lecture Notes',
    categoryTag: 'Class Notes',
    chapterNo: 4,
    chapterTitle: 'Ch 4: Quadratic Equations & Progressions',
    fileContentType: 'IMAGE',
    targetExamBlock: 'Stream 1 Block 1',
    targetCohorts: ['All'],
    fileUrl: '/images/board-snapshot-math-ch4.jpg',
    fileSize: '3.6 MB',
    compressedSize: '190 KB',
    uploadDate: '2026-11-10',
    teacherId: 'tch-001',
    teacherName: 'Dr. Ramesh Chandra',
    linkedLectureDate: '2026-11-10',
    instructions: 'Captured live during Tuesday 10:30 AM lecture. Essential for students who missed class.',
    previewContent: 'Formula derivation: x = (-b +/- sqrt(b^2 - 4ac)) / (2a). Discriminant D > 0 (two distinct real roots).',
    savedOffline: false
  },
  {
    id: 'mat-004',
    title: 'Quadratic Equations 1-Page Quick Revision Mind Map',
    subjectCode: '311',
    subjectName: 'Mathematics',
    materialType: 'Lecture Notes',
    categoryTag: 'Quick Revision',
    chapterNo: 4,
    chapterTitle: 'Ch 4: Quadratic Equations & Progressions',
    fileContentType: 'IMAGE',
    targetExamBlock: 'All Streams',
    targetCohorts: ['All'],
    fileUrl: '/images/math-ch4-revision-mindmap.png',
    fileSize: '1.8 MB',
    compressedSize: '140 KB',
    uploadDate: '2026-11-11',
    teacherId: 'tch-001',
    teacherName: 'Dr. Ramesh Chandra',
    instructions: '1-page cheatsheet with all formulas and factorization shortcuts.',
    previewContent: 'Sum of roots = -b/a, Product of roots = c/a. Nature of roots summary table.',
    savedOffline: true
  },
  {
    id: 'mat-005',
    title: 'Quadratic Equations Practice Worksheet & Past 5-Year PYQs',
    subjectCode: '311',
    subjectName: 'Mathematics',
    materialType: 'Worksheet',
    categoryTag: 'Practice / PYQ',
    chapterNo: 4,
    chapterTitle: 'Ch 4: Quadratic Equations & Progressions',
    fileContentType: 'PDF',
    targetExamBlock: 'All Streams',
    targetCohorts: ['All'],
    fileUrl: '/docs/math-ch4-practice-pyq.pdf',
    fileSize: '2.4 MB',
    compressedSize: '310 KB',
    uploadDate: '2026-11-12',
    teacherId: 'tch-001',
    teacherName: 'Dr. Ramesh Chandra',
    instructions: 'Solve 15 selected problems. Solutions will be discussed in Thursday doubt slot.',
    previewContent: 'Problem 1 (NIOS 2024): If roots of px^2 + 4x + 1 = 0 are real and equal, find p.',
    savedOffline: false
  },
  {
    id: 'mat-006',
    title: 'English Reading Skills & Summary Writing Notes',
    subjectCode: '302',
    subjectName: 'English',
    materialType: 'NIOS Study Material',
    categoryTag: 'Class Notes',
    chapterNo: 1,
    chapterTitle: 'Ch 1: Reading Comprehension & Note Making',
    fileContentType: 'PDF',
    targetExamBlock: 'All Streams',
    targetCohorts: ['All'],
    fileUrl: '/docs/english-module1-302.pdf',
    fileSize: '5.4 MB',
    compressedSize: '480 KB',
    uploadDate: '2026-11-09',
    teacherId: 'tch-004',
    teacherName: 'Sunita Mehra',
    instructions: 'Read passage 3 and write a 100-word summary with abbreviations.',
    previewContent: 'Format of note-making: Title, Sub-headings, Indentation, Key to abbreviations.',
    savedOffline: false
  },
  {
    id: 'mat-007',
    title: 'Chemistry Periodic Properties & Chemical Bonding Board Notes',
    subjectCode: '313',
    subjectName: 'Chemistry',
    materialType: 'Lecture Notes',
    categoryTag: 'Class Notes',
    chapterNo: 2,
    chapterTitle: 'Ch 2: Periodic Table & Trends',
    fileContentType: 'IMAGE',
    targetExamBlock: 'Stream 1 & Stream 2',
    targetCohorts: ['All'],
    fileUrl: '/images/chem-periodic-trends-board.jpg',
    fileSize: '4.2 MB',
    compressedSize: '220 KB',
    uploadDate: '2026-11-10',
    teacherId: 'tch-003',
    teacherName: 'Rajesh Verma',
    linkedLectureDate: '2026-11-10',
    instructions: 'Tuesday practical session notes on ionization enthalpy and electronegativity variation.',
    previewContent: 'Trends across period: Atomic radius decreases, IE increases, Electronegativity increases.',
    savedOffline: false
  }
];

export const INITIAL_CHECKLIST: SyllabusChecklistTopic[] = [
  {
    id: 'chk-101',
    chapterNo: 4,
    title: 'Laws of Motion, Momentum & Friction',
    subjectCode: '312',
    bifurcation: 'TMA-40%',
    isHighWeightage: true,
    isPracticalPcp: false,
    scheduledDate: '2026-10-12',
    status: 'MASTERED',
    linkedNotesTitle: 'Newtonian Dynamics Summary Sheet'
  },
  {
    id: 'chk-102',
    chapterNo: 6,
    title: 'Work, Energy & Power Theorem',
    subjectCode: '312',
    bifurcation: 'Public-Exam-60%',
    isHighWeightage: true,
    isPracticalPcp: false,
    scheduledDate: '2026-10-24',
    status: 'NEEDS_REVISION',
    linkedNotesTitle: 'Conservative vs Non-Conservative Forces'
  },
  {
    id: 'chk-103',
    chapterNo: 9,
    title: 'Gravitation & Planetary Orbits',
    subjectCode: '312',
    bifurcation: 'Public-Exam-60%',
    isHighWeightage: false,
    isPracticalPcp: false,
    scheduledDate: '2026-11-02',
    status: 'TO_STUDY',
    linkedNotesTitle: 'Kepler Laws & Escape Velocity Formulas'
  },
  {
    id: 'chk-104',
    chapterNo: 15,
    title: 'Practical PCP Session 3: Simple Pendulum Lab',
    subjectCode: '312',
    bifurcation: 'Public-Exam-60%',
    isHighWeightage: false,
    isPracticalPcp: true,
    scheduledDate: '2026-11-08',
    status: 'TO_STUDY',
    linkedNotesTitle: 'Physics Lab Manual Experiment 3'
  },
  {
    id: 'chk-105',
    chapterNo: 2,
    title: 'Relations and Functions & Inverse Trig',
    subjectCode: '311',
    bifurcation: 'TMA-40%',
    isHighWeightage: true,
    isPracticalPcp: false,
    scheduledDate: '2026-10-15',
    status: 'MASTERED',
    linkedNotesTitle: 'Domain, Range and Principal Value Branches'
  },
  {
    id: 'chk-106',
    chapterNo: 7,
    title: 'Continuity, Differentiability & Derivatives',
    subjectCode: '311',
    bifurcation: 'Public-Exam-60%',
    isHighWeightage: true,
    isPracticalPcp: false,
    scheduledDate: '2026-11-04',
    status: 'NEEDS_REVISION',
    linkedNotesTitle: 'Chain Rule and Implicit Differentiation Drills'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'not-001',
    title: 'TMA Submission Portal Closing in 14 Days',
    message: 'All Stream 1 Block 1 learners must upload completed TMA booklets for all enrolled subjects. Unsubmitted TMAs receive zero score in continuous assessment.',
    severity: 'NIOS Deadline Warning',
    targetRole: 'STUDENT',
    targetStream: 'Stream 1, Block 1',
    createdAt: '2026-11-06 09:30',
    readCount: 38,
    totalTargetCount: 42,
    pinned: true,
    deadlineDate: '2026-11-22'
  },
  {
    id: 'not-002',
    title: 'PCP Formative Assessment Practical Sessions 1-5 Schedule',
    message: 'Mandatory 5 practical PCP sessions for Physics (312), Chemistry (313), and Biology (314) have commenced at Study Centre 270123. Attendance is compulsory for practical eligibility.',
    severity: 'Urgent Alert',
    targetRole: 'ALL',
    createdAt: '2026-11-05 14:15',
    readCount: 41,
    totalTargetCount: 45,
    pinned: true,
    deadlineDate: '2026-11-15'
  },
  {
    id: 'not-003',
    title: 'Hall Ticket Verification for April-May Public Exam',
    message: 'Hall tickets have been provisionally uploaded on the student dashboard. Check Subject Codes and Regional Exam Centre details immediately.',
    severity: 'Academic',
    targetRole: 'STUDENT',
    createdAt: '2026-11-04 11:00',
    readCount: 35,
    totalTargetCount: 42,
    pinned: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-11-08 10:02:14',
    action: 'LOGIN',
    userRole: 'DEV',
    userName: 'Lead System Developer',
    details: 'Dev console session initiated from local workstation',
    ip: '127.0.0.1'
  },
  {
    id: 'log-002',
    timestamp: '2026-11-08 10:15:20',
    action: 'UPDATE',
    userRole: 'ADMIN',
    userName: 'Academic Administrator',
    details: 'Rescheduled Math PCP-04 session from 09:00 to 10:00 (Room 204)',
    ip: '192.168.1.10'
  },
  {
    id: 'log-003',
    timestamp: '2026-11-08 10:30:45',
    action: 'PERMISSION_GRANT',
    userRole: 'ADMIN',
    userName: 'Academic Administrator',
    details: 'Granted Dr. Aruna Saxena delegated student & schedule editing permissions',
    ip: '192.168.1.10'
  },
  {
    id: 'log-004',
    timestamp: '2026-11-08 10:45:00',
    action: 'ATTENDANCE_MARK',
    userRole: 'TEACHER',
    userName: 'Dr. Aruna Saxena',
    details: 'Submitted attendance roster for 311-MATH (38 present, 1 absent, 1 late)',
    ip: '192.168.1.45'
  }
];

