// GRAVEL — Official NIOS Master Course & Subject Catalog [F-DAT-106, F-DAT-107]
import { NiosCatalogSubject, NiosStageInfo, NiosAcademicStage } from '../types';

export const NIOS_STAGE_INFO: Record<NiosAcademicStage, NiosStageInfo> = {
  OBE_A: {
    stage: 'OBE_A',
    name: 'Open Basic Education (OBE) Level A',
    equivalent: 'Classes 1–3 Equivalent',
    minAge: 7,
    description: 'Foundational literacy, numeracy, and environmental awareness for children (7+) and adult learners (14+).',
    prerequisites: 'No prior schooling credentials required. Self-certification of age.',
    minSubjects: 3,
    maxSubjects: 5,
    minLanguages: 1,
    maxPrimaryLanguages: 2,
    hasClashRules: false
  },
  OBE_B: {
    stage: 'OBE_B',
    name: 'Open Basic Education (OBE) Level B',
    equivalent: 'Classes 4–5 Equivalent',
    minAge: 10,
    description: 'Preparatory stage strengthening primary arithmetic, language fluency, and local ecology concepts.',
    prerequisites: 'Successful completion of OBE Level A or certified foundational literacy/numeracy proof.',
    minSubjects: 3,
    maxSubjects: 5,
    minLanguages: 1,
    maxPrimaryLanguages: 2,
    hasClashRules: false
  },
  OBE_C: {
    stage: 'OBE_C',
    name: 'Open Basic Education (OBE) Level C',
    equivalent: 'Classes 6–8 Equivalent',
    minAge: 14,
    description: 'Middle school equivalency enabling direct gateway qualification for NIOS Class 10 Secondary registration.',
    prerequisites: 'Passing OBE Level B or direct entry for learners aged 14+ with self-declared foundational competency.',
    minSubjects: 5,
    maxSubjects: 7,
    minLanguages: 1,
    maxPrimaryLanguages: 2,
    hasClashRules: false
  },
  SECONDARY: {
    stage: 'SECONDARY',
    name: 'Secondary Course (Class 10)',
    equivalent: 'Class 10 / High School Equivalent',
    minAge: 14,
    description: 'National secondary school certificate examination recognized across India for further education and employment.',
    prerequisites: 'Passed Class 8 / OBE Level C certificate or self-certificate declaration stating studied enough to pursue Class 10 (min age 14).',
    minSubjects: 5,
    maxSubjects: 7,
    minLanguages: 1,
    maxPrimaryLanguages: 2,
    hasClashRules: false
  },
  SR_SECONDARY: {
    stage: 'SR_SECONDARY',
    name: 'Senior Secondary Course (Class 12)',
    equivalent: 'Class 12 / Intermediate / Higher Secondary Equivalent',
    minAge: 15,
    description: 'Pre-university certificate with strict examination clash constraints across Groups C, D, E, and F.',
    prerequisites: 'Passed Class 10 / Secondary Examination from a recognized education board. Note: 2-year gap required to complete all 5 subjects if passed 10th recently.',
    minSubjects: 5,
    maxSubjects: 7,
    minLanguages: 1,
    maxPrimaryLanguages: 2,
    hasClashRules: true
  }
};

export const MASTER_SUBJECT_CATALOG: NiosCatalogSubject[] = [
  // ==========================================
  // 1. OBE LEVEL A (Classes 1–3 Equivalent)
  // ==========================================
  {
    code: 'OBE-A-01',
    name: 'Basic Mother Tongue / Vernacular Language',
    stage: 'OBE_A',
    group: 'GROUP_A',
    groupLabel: 'Core Language',
    isLanguage: true,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0,
    description: 'Foundational reading, comprehension, and handwriting in regional language/mother tongue.'
  },
  {
    code: 'OBE-A-02',
    name: 'Basic Mathematics (Ganit)',
    stage: 'OBE_A',
    group: 'GROUP_B',
    groupLabel: 'Core Numeracy',
    isLanguage: false,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0,
    description: 'Basic number sense, counting, single-digit operations, and practical daily utility math.'
  },
  {
    code: 'OBE-A-03',
    name: 'Environmental Studies (Paryavaran / EVS)',
    stage: 'OBE_A',
    group: 'GROUP_B',
    groupLabel: 'Environmental Awareness',
    isLanguage: false,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0,
    description: 'Cleanliness, personal hygiene, nature observation, and civic sense.'
  },

  // ==========================================
  // 2. OBE LEVEL B (Classes 4–5 Equivalent)
  // ==========================================
  {
    code: 'OBE-B-01',
    name: 'Primary Language (Hindi / English / Regional)',
    stage: 'OBE_B',
    group: 'GROUP_A',
    groupLabel: 'Primary Language',
    isLanguage: true,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0
  },
  {
    code: 'OBE-B-02',
    name: 'Second Language (Optional Vernacular)',
    stage: 'OBE_B',
    group: 'GROUP_A',
    groupLabel: 'Optional Second Language',
    isLanguage: true,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0
  },
  {
    code: 'OBE-B-03',
    name: 'Mathematics (Ganit)',
    stage: 'OBE_B',
    group: 'GROUP_B',
    groupLabel: 'Primary Mathematics',
    isLanguage: false,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0
  },
  {
    code: 'OBE-B-04',
    name: 'Environmental Studies (EVS)',
    stage: 'OBE_B',
    group: 'GROUP_B',
    groupLabel: 'Social & Natural Studies',
    isLanguage: false,
    hasPractical: false,
    tmaCeiling: 20,
    theoryMax: 100,
    practicalMax: 0
  },

  // ==========================================
  // 3. OBE LEVEL C (Classes 6–8 Equivalent)
  // ==========================================
  // Group A (Languages)
  { code: 'OBE-C-01', name: 'Hindi', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-02', name: 'English', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-03', name: 'Sanskrit', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-04', name: 'Urdu', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-05', name: 'Bengali', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-06', name: 'Marathi', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-07', name: 'Regional Language', stage: 'OBE_C', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group B (Core Academic)
  { code: 'OBE-C-11', name: 'Mathematics', stage: 'OBE_C', group: 'GROUP_B', groupLabel: 'Group B: Core Academic', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: 'OBE-C-12', name: 'General Science', stage: 'OBE_C', group: 'GROUP_B', groupLabel: 'Group B: Core Academic', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: 'OBE-C-13', name: 'Social Science', stage: 'OBE_C', group: 'GROUP_B', groupLabel: 'Group B: Core Academic', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group C (Pre-Vocational)
  { code: 'OBE-C-21', name: 'Basic Computer Literacy', stage: 'OBE_C', group: 'GROUP_C', groupLabel: 'Group C: Pre-Vocational', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 60, practicalMax: 40 },
  { code: 'OBE-C-22', name: 'Cutting & Tailoring', stage: 'OBE_C', group: 'GROUP_C', groupLabel: 'Group C: Pre-Vocational', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: 'OBE-C-23', name: 'Agriculture', stage: 'OBE_C', group: 'GROUP_C', groupLabel: 'Group C: Pre-Vocational', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 60, practicalMax: 40 },
  { code: 'OBE-C-24', name: 'Carpentry', stage: 'OBE_C', group: 'GROUP_C', groupLabel: 'Group C: Pre-Vocational', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: 'OBE-C-25', name: 'Handicrafts', stage: 'OBE_C', group: 'GROUP_C', groupLabel: 'Group C: Pre-Vocational', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },

  // ==========================================
  // 4. SECONDARY COURSE (Class 10)
  // ==========================================
  // Group A (Languages)
  { code: '201', name: 'Hindi', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '202', name: 'English', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '203', name: 'Bengali', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '204', name: 'Marathi', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '205', name: 'Telugu', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '206', name: 'Urdu', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '207', name: 'Gujarati', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '208', name: 'Kannada', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '209', name: 'Sanskrit', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '210', name: 'Punjabi', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '228', name: 'Assamese', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '231', name: 'Nepali', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '232', name: 'Malayalam', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '233', name: 'Odia', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '235', name: 'Arabic', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '236', name: 'Persian', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '237', name: 'Tamil', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '238', name: 'Sindhi', stage: 'SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group B (Core Electives & Academic)
  { code: '211', name: 'Mathematics', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '212', name: 'Science & Technology', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 85, practicalMax: 15 },
  { code: '213', name: 'Social Science', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '214', name: 'Economics', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '215', name: 'Business Studies', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '216', name: 'Home Science', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 85, practicalMax: 15 },
  { code: '222', name: 'Psychology', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '223', name: 'Indian Culture & Heritage', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '224', name: 'Accountancy', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '225', name: 'Painting', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 30, practicalMax: 70 },
  { code: '229', name: 'Data Entry Operations', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '242', name: 'Hindustani Music', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '243', name: 'Carnatic Music', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '246', name: 'Sanskrit Vyakaran', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '247', name: 'Bharatiya Darshan', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '248', name: 'Sanskrit Sahitya', stage: 'SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: Academic Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Vocational Electives (Secondary)
  { code: '601', name: 'Basic Computing', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '605', name: 'Cutting & Tailoring', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '606', name: 'Dress Designing', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '612', name: 'Beauty Culture & Hair Care', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '603', name: 'Carpentry', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '604', name: 'Solar Energy Technician', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '613', name: 'Bakery & Confectionery', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '663', name: 'Hand & Foot Care', stage: 'SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },

  // ==========================================
  // 5. SENIOR SECONDARY COURSE (Class 12)
  // ==========================================
  // Group A (Languages)
  { code: '301', name: 'Hindi', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '302', name: 'English', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '303', name: 'Bengali', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '304', name: 'Tamil', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '305', name: 'Odia', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '306', name: 'Urdu', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '307', name: 'Gujarati', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '309', name: 'Sanskrit', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '310', name: 'Punjabi', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '341', name: 'Arabic', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '342', name: 'Persian', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '343', name: 'Malayalam', stage: 'SR_SECONDARY', group: 'GROUP_A', groupLabel: 'Group A: Languages', isLanguage: true, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group B (General Electives)
  { code: '311', name: 'Mathematics', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '316', name: 'Geography', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '318', name: 'Economics', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '319', name: 'Business Studies', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '321', name: 'Home Science', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '328', name: 'Psychology', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '332', name: 'Painting', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 30, practicalMax: 70 },
  { code: '335', name: 'Mass Communication', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '336', name: 'Data Entry Operations', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '337', name: 'Tourism', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '333', name: 'Environmental Science', stage: 'SR_SECONDARY', group: 'GROUP_B', groupLabel: 'Group B: General Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },

  // Group C (Select at most one - Examination Clash Constraint)
  { code: '312', name: 'Physics', stage: 'SR_SECONDARY', group: 'GROUP_C', groupLabel: 'Group C (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'C', tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '315', name: 'History', stage: 'SR_SECONDARY', group: 'GROUP_C', groupLabel: 'Group C (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'C', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '339', name: 'Library & Information Science', stage: 'SR_SECONDARY', group: 'GROUP_C', groupLabel: 'Group C (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'C', tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },

  // Group D (Select at most one - Examination Clash Constraint)
  { code: '313', name: 'Chemistry', stage: 'SR_SECONDARY', group: 'GROUP_D', groupLabel: 'Group D (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'D', tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '317', name: 'Political Science', stage: 'SR_SECONDARY', group: 'GROUP_D', groupLabel: 'Group D (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'D', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '374', name: 'Military Studies', stage: 'SR_SECONDARY', group: 'GROUP_D', groupLabel: 'Group D (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'D', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group E (Select at most one - Examination Clash Constraint)
  { code: '314', name: 'Biology', stage: 'SR_SECONDARY', group: 'GROUP_E', groupLabel: 'Group E (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'E', tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },
  { code: '320', name: 'Accountancy', stage: 'SR_SECONDARY', group: 'GROUP_E', groupLabel: 'Group E (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'E', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '338', name: 'Introduction to Law', stage: 'SR_SECONDARY', group: 'GROUP_E', groupLabel: 'Group E (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'E', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '375', name: 'Military History', stage: 'SR_SECONDARY', group: 'GROUP_E', groupLabel: 'Group E (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'E', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Group F (Select at most one - Examination Clash Constraint)
  { code: '330', name: 'Computer Science', stage: 'SR_SECONDARY', group: 'GROUP_F', groupLabel: 'Group F (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'F', tmaCeiling: 20, theoryMax: 60, practicalMax: 40 },
  { code: '331', name: 'Sociology', stage: 'SR_SECONDARY', group: 'GROUP_F', groupLabel: 'Group F (Select max 1)', isLanguage: false, hasPractical: false, clashGroupId: 'F', tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '373', name: 'Physical Education & Yog', stage: 'SR_SECONDARY', group: 'GROUP_F', groupLabel: 'Group F (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'F', tmaCeiling: 20, theoryMax: 70, practicalMax: 30 },
  { code: '376', name: 'Early Childhood Care and Education', stage: 'SR_SECONDARY', group: 'GROUP_F', groupLabel: 'Group F (Select max 1)', isLanguage: false, hasPractical: true, clashGroupId: 'F', tmaCeiling: 20, theoryMax: 80, practicalMax: 20 },

  // Indian Knowledge Tradition (IKT)
  { code: '345', name: 'Veda Adhyan', stage: 'SR_SECONDARY', group: 'IKT', groupLabel: 'Indian Knowledge Tradition (IKT)', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '346', name: 'Sanskrit Vyakaran', stage: 'SR_SECONDARY', group: 'IKT', groupLabel: 'Indian Knowledge Tradition (IKT)', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '347', name: 'Bharatiya Darshan', stage: 'SR_SECONDARY', group: 'IKT', groupLabel: 'Indian Knowledge Tradition (IKT)', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '348', name: 'Sanskrit Sahitya', stage: 'SR_SECONDARY', group: 'IKT', groupLabel: 'Indian Knowledge Tradition (IKT)', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },

  // Vocational Courses (Senior Secondary)
  { code: '660', name: 'Web Development', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '661', name: 'Computer Hardware Assembly & Maintenance', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '326', name: 'Secretarial Practice', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: false, tmaCeiling: 20, theoryMax: 100, practicalMax: 0 },
  { code: '356', name: 'Housekeeping', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '357', name: 'Catering Management', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '363', name: 'Preservation of Fruits and Vegetables', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '351', name: 'Plant Protection', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 },
  { code: '354', name: 'Furniture & Cabinet Making', stage: 'SR_SECONDARY', group: 'VOCATIONAL', groupLabel: 'Vocational Electives', isLanguage: false, hasPractical: true, tmaCeiling: 20, theoryMax: 40, practicalMax: 60 }
];

export function getSubjectsByStage(stage: NiosAcademicStage): NiosCatalogSubject[] {
  return MASTER_SUBJECT_CATALOG.filter(s => s.stage === stage);
}

export function findCatalogSubject(code: string): NiosCatalogSubject | undefined {
  return MASTER_SUBJECT_CATALOG.find(s => s.code === code);
}

