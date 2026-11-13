// GRAVEL — NIOS Comprehensive Student Admission & Enrollment Engine
// Implements 3 Admission Question Sections:
// 1. Personal & Guardian Details
// 2. Academic & NIOS Enrollment Details (with [F-DAT-106], [F-DAT-107], [F-VAL-208])
// 3. Coaching Operations & Schedule Preferences
// 4. Portal Credentials & Dossier Confirmation

import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { 
  X, 
  CheckCircle, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  AlertCircle, 
  BookOpen, 
  Info, 
  Trash2, 
  ShieldCheck, 
  Key, 
  Layers, 
  Sparkles, 
  Calendar,
  Clock,
  Smartphone,
  CheckSquare,
  FileText,
  Home,
  User,
  Users
} from 'lucide-react';
import { NiosAcademicStage, NiosCatalogSubject } from '../../types';
import { 
  NIOS_STAGE_INFO, 
  MASTER_SUBJECT_CATALOG, 
  getSubjectsByStage, 
  findCatalogSubject 
} from '../../data/niosSubjectCatalog';
import { validateNIOSSubjectSelection } from '../../utils/niosValidation';

interface SingleAccountWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleAccountWizardModal: React.FC<SingleAccountWizardModalProps> = ({ isOpen, onClose }) => {
  const { addStudent } = useAppStore();

  const [step, setStep] = useState<number>(1);

  // =========================================================================
  // SECTION 1: PERSONAL & GUARDIAN DETAILS
  // =========================================================================
  const [name, setName] = useState('');
  const [dob, setDob] = useState('2008-05-14');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [address, setAddress] = useState('');
  const [socialCategory, setSocialCategory] = useState<'General' | 'OBC' | 'SC' | 'ST' | 'Ex-Serviceman'>('General');
  const [concessionProofAttached, setConcessionProofAttached] = useState(false);
  const [isDivyangjan, setIsDivyangjan] = useState(false);
  const [disabilityType, setDisabilityType] = useState<'LD' | 'VI' | 'HI' | 'ID' | 'Multiple'>('LD');
  const [scribeNeeded, setScribeNeeded] = useState(false);
  const [extraTime20Mins, setExtraTime20Mins] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('B+');

  // =========================================================================
  // SECTION 2: ACADEMIC & NIOS ENROLLMENT DETAILS
  // =========================================================================
  const [stage, setStage] = useState<NiosAcademicStage>('SR_SECONDARY');
  const [admissionStatusType, setAdmissionStatusType] = useState<'Already Registered with NIOS' | 'Fresh Admission via Coaching Centre'>('Fresh Admission via Coaching Centre');
  const [refNo, setRefNo] = useState('');
  const [existingEnrolmentNo, setExistingEnrolmentNo] = useState('');
  const [aiCode, setAiCode] = useState('270123');
  const [previousDocumentType, setPreviousDocumentType] = useState<'Class 8/9 Mark Sheet / TC' | 'Self-Declaration (Age 14+)' | 'Class 10 Board Pass Certificate'>('Class 10 Board Pass Certificate');
  const [previousSchoolName, setPreviousSchoolName] = useState('');
  const [streamBlock, setStreamBlock] = useState<any>('Stream 1, Block 1');
  const [medium, setMedium] = useState<'English' | 'Hindi' | 'Urdu' | 'Regional'>('English');
  const [tocApplied, setTocApplied] = useState(false);
  const [tocPrevBoard, setTocPrevBoard] = useState('CBSE');
  const [tocPrevRoll, setTocPrevRoll] = useState('');
  const [tocPassingYear, setTocPassingYear] = useState('2024');
  const [tocPassedSubjects, setTocPassedSubjects] = useState('English, Social Science');
  const [class10PassingYear, setClass10PassingYear] = useState<number>(2024);
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['302', '311', '312', '313', '336']);

  // =========================================================================
  // SECTION 3: COACHING OPERATIONS & SCHEDULE PREFERENCES
  // =========================================================================
  const [preferredTimings, setPreferredTimings] = useState<string>('09:00 AM - 01:00 PM (Morning Slot)');
  const [booksReceived, setBooksReceived] = useState<'Yes' | 'No' | 'In Transit'>('No');
  const [tmaStarted, setTmaStarted] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [practicalFileCompleted, setPracticalFileCompleted] = useState<'Not Started' | 'In Progress' | 'Ready for Evaluation'>('Not Started');
  const [managedBy, setManagedBy] = useState<'Student' | 'Parent' | 'Both Collaboratively'>('Both Collaboratively');
  const [primaryDevice, setPrimaryDevice] = useState<'Smartphone (Android/iOS)' | 'Laptop / Desktop' | 'Tablet' | 'Shared Family Phone'>('Smartphone (Android/iOS)');
  const [internetAccess, setInternetAccess] = useState<'Broadband WiFi' | 'Mobile Hotspot (4G/5G)' | 'Limited / Offline'>('Mobile Hotspot (4G/5G)');

  // =========================================================================
  // SECTION 4: CREDENTIALS & CONFIRMATION
  // =========================================================================
  const [enrolmentNo, setEnrolmentNo] = useState(() => '27012321' + Math.floor(1000 + Math.random() * 9000));
  const [tempPassword, setTempPassword] = useState('Nios@2026');

  // Stage Info & Available Subjects
  const stageInfo = NIOS_STAGE_INFO[stage];
  const availableSubjects = useMemo(() => getSubjectsByStage(stage), [stage]);

  // Live Validation using [F-VAL-208]
  const validation = useMemo(() => {
    return validateNIOSSubjectSelection(
      stage,
      selectedCodes,
      MASTER_SUBJECT_CATALOG,
      dob,
      stage === 'SR_SECONDARY' ? class10PassingYear : undefined
    );
  }, [stage, selectedCodes, dob, class10PassingYear]);

  // Calculated Age
  const calculatedAge = useMemo(() => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, [dob]);

  // When stage changes, adjust initial default subjects and doc requirement
  const handleStageChange = (newStage: NiosAcademicStage) => {
    setStage(newStage);
    if (newStage === 'OBE_A') {
      setSelectedCodes(['OBE-A-01', 'OBE-A-02', 'OBE-A-03']);
      setPreviousDocumentType('Self-Declaration (Age 14+)');
    } else if (newStage === 'OBE_B') {
      setSelectedCodes(['OBE-B-01', 'OBE-B-03', 'OBE-B-04']);
      setPreviousDocumentType('Self-Declaration (Age 14+)');
    } else if (newStage === 'OBE_C') {
      setSelectedCodes(['OBE-C-01', 'OBE-C-02', 'OBE-C-11', 'OBE-C-12', 'OBE-C-13']);
      setPreviousDocumentType('Self-Declaration (Age 14+)');
    } else if (newStage === 'SECONDARY') {
      setSelectedCodes(['201', '202', '211', '212', '213']);
      setPreviousDocumentType('Class 8/9 Mark Sheet / TC');
    } else {
      setSelectedCodes(['302', '311', '312', '313', '336']);
      setPreviousDocumentType('Class 10 Board Pass Certificate');
    }
  };

  const handleToggleCode = (code: string) => {
    if (selectedCodes.includes(code)) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
    } else {
      if (selectedCodes.length >= stageInfo.maxSubjects) {
        alert(`Maximum ${stageInfo.maxSubjects} subjects allowed for ${stageInfo.name}.`);
        return;
      }
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const handleRemoveChip = (code: string) => {
    setSelectedCodes(selectedCodes.filter(c => c !== code));
  };

  // Grouped available subjects
  const groupedSubjects = useMemo(() => {
    const groups: Record<string, NiosCatalogSubject[]> = {};
    for (const sub of availableSubjects) {
      const key = sub.groupLabel || sub.group;
      if (!groups[key]) groups[key] = [];
      groups[key].push(sub);
    }
    return groups;
  }, [availableSubjects]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) {
      alert(`Cannot submit enrollment. Please resolve constraint errors: \n${validation.errors.join('\n')}`);
      return;
    }

    const courseLevelMap: Record<NiosAcademicStage, any> = {
      OBE_A: 'OBE (A/B/C)',
      OBE_B: 'OBE (A/B/C)',
      OBE_C: 'OBE (A/B/C)',
      SECONDARY: 'Secondary (Class X)',
      SR_SECONDARY: 'Senior Secondary (Class XII)'
    };

    const finalEnrolmentNo = admissionStatusType === 'Already Registered with NIOS' && existingEnrolmentNo.trim()
      ? existingEnrolmentNo.trim()
      : enrolmentNo;

    const studentSubjects = selectedCodes.map(code => {
      const cat = findCatalogSubject(code);
      return {
        code,
        name: cat?.name || `Subject ${code}`,
        hasPractical: cat?.hasPractical || false,
        theoryMarks: 60,
        practicalMarks: cat?.hasPractical ? 16 : undefined,
        tmaStatus: tmaStarted === 'Completed' ? ('Uploaded on Portal' as const) : ('Pending' as const),
        tmaMarks: tmaStarted === 'Completed' ? 16 : undefined,
        tocApplied,
        tocMarksCarried: tocApplied ? 0 : undefined,
        pcpAttended: 15,
        mandatoryPcpSessions: [8, 8, 8, 8, 8]
      };
    });

    addStudent({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone || '+91 98765 00000',
      dob,
      gender,
      bloodGroup,
      status: 'Active',
      address: address || 'Delhi AI Catchment Area, New Delhi',
      guardian: {
        fatherName: fatherName || 'Guardian Father',
        motherName: motherName || 'Guardian Mother',
        relationship: 'Parent',
        phone: guardianPhone || phone || '+91 98765 00000',
        guardianEmail: guardianEmail || `${fatherName.toLowerCase().replace(/\s+/g, '.')}@example.com`
      },
      nios: {
        enrolmentNo: finalEnrolmentNo,
        refNo: refNo.trim() || ('REF-2026-DEL-' + Math.floor(1000 + Math.random() * 9000)),
        aiCode: aiCode.trim() || '270123',
        regionalCentre: 'Delhi (East)',
        courseLevel: courseLevelMap[stage],
        admissionStatusType,
        previousDocumentType,
        previousSchoolName: previousSchoolName.trim() || undefined,
        streamBlock,
        medium,
        admissionStatus: admissionStatusType === 'Already Registered with NIOS' ? 'Verified' : 'Provisional',
        sessionYear: '2026-2027',
        tocDetails: tocApplied ? {
          prevBoard: tocPrevBoard,
          prevRollNo: tocPrevRoll,
          passingYear: tocPassingYear,
          passedSubjects: tocPassedSubjects
        } : undefined
      },
      subjects: studentSubjects,
      compliance: {
        idProofType: 'Aadhaar',
        idProofNumber: '7890 1234 5678',
        socialCategory,
        isDivyangjan,
        disabilityType: isDivyangjan ? disabilityType : undefined,
        concessions: isDivyangjan ? {
          scribeNeeded,
          extraTime20Mins,
          practicalExemption: false
        } : undefined
      },
      coachingPreferences: {
        preferredTimings,
        academicProgress: {
          booksReceived,
          tmaStarted,
          practicalFileCompleted
        },
        homeStudySetup: {
          managedBy,
          primaryDevice,
          internetAccess
        }
      },
      attendanceRate: 80.0,
      totalClassesHeld: 20,
      totalPresent: 16,
      totalLate: 2,
      totalAbsent: 2,
      examFeePaid: true,
      hallTicketStatus: 'Ready'
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="gravel-card"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wizard Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: 'var(--border-width) solid var(--border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-primary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 8, 
              backgroundColor: 'var(--accent-subtle)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--accent-primary)' 
            }}>
              <UserPlus size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>NIOS Student Admission &amp; Intake Engine</h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                  [F-VAL-208]
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Step {step} of 4: {
                  step === 1 ? '1. Personal & Guardian Details' :
                  step === 2 ? '2. Academic & NIOS Enrollment Details' :
                  step === 3 ? '3. Coaching Operations & Schedule Preferences' :
                  '4. Portal Credentials & Dossier Confirmation'
                }
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Wizard Progress Steps Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          borderBottom: '1px solid var(--border-hairline)',
          backgroundColor: 'var(--bg-surface-muted)',
          fontSize: '0.72rem'
        }}>
          {[
            { num: 1, label: '1. Personal & Guardian' },
            { num: 2, label: '2. Academic & NIOS' },
            { num: 3, label: '3. Coaching & Schedule' },
            { num: 4, label: '4. Credentials & Review' }
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                // Allow jumping backwards freely, forward only if current step is validated
                if (s.num < step) setStep(s.num);
                else if (s.num === 2 && name.trim()) setStep(2);
                else if (s.num === 3 && validation.isValid) setStep(3);
                else if (s.num === 4 && validation.isValid) setStep(4);
              }}
              style={{
                padding: '0.55rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                borderBottom: step === s.num ? '2.5px solid var(--accent-primary)' : '2.5px solid transparent',
                backgroundColor: step === s.num ? 'var(--bg-surface-primary)' : 'transparent',
                fontWeight: step === s.num ? 700 : 500,
                color: step === s.num ? 'var(--accent-primary)' : 'var(--text-secondary)'
              }}
            >
              <span style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                backgroundColor: step === s.num ? 'var(--accent-primary)' : 'var(--border-hairline)',
                color: step === s.num ? '#fff' : 'var(--text-muted)'
              }}>
                {s.num}
              </span>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* ============================================================== */}
            {/* STEP 1: PERSONAL & GUARDIAN DETAILS                            */}
            {/* ============================================================== */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  background: 'var(--accent-subtle)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 6, 
                  borderLeft: '3px solid var(--accent-primary)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  <strong>1. Personal &amp; Guardian Details:</strong> Exact name spelling matching official Aadhaar/Birth records, age verification for NIOS criteria, and active parent contact channels for portal OTPs &amp; timetable dispatches.
                </div>

                {/* Sub-block 1: Full Name, DOB & Gender */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                      Full Legal Student Name * (Exact spelling matching Aadhaar or Birth Certificate)
                    </label>
                    <input
                      type="text"
                      className="gravel-input"
                      style={{ width: '100%', fontWeight: 600 }}
                      placeholder="e.g. Priyanshu Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Must match spelling on primary Aadhaar card or government birth certificate without abbreviation discrepancies.
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                      Date of Birth * (For NIOS Age Verification)
                    </label>
                    <input
                      type="date"
                      className="gravel-input font-mono"
                      style={{ width: '100%' }}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                    <div style={{ 
                      marginTop: 4, 
                      fontSize: '0.7rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 4,
                      color: calculatedAge >= 14 ? 'var(--status-present)' : 'var(--status-absent)' 
                    }}>
                      <Info size={12} />
                      <span>Current Age: <strong>{calculatedAge} Years</strong> (Min 14 yrs for Class 10, 15 yrs for Class 12, 8+ for OBE)</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                      Gender
                    </label>
                    <select className="gravel-input" style={{ width: '100%' }} value={gender} onChange={(e) => setGender(e.target.value as any)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                      Blood Group
                    </label>
                    <select className="gravel-input font-mono" style={{ width: '100%' }} value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                {/* Sub-block 2: Parents' / Guardian's Full Names */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Users size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Parents' / Guardian's Official Names (as per records)</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Father's Full Name *</label>
                      <input
                        type="text"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="e.g. Ramesh Chandra Varma"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Mother's Full Name *</label>
                      <input
                        type="text"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        placeholder="e.g. Sunita Devi"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-block 3: Student & Parent Contact Numbers + Email ID */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Smartphone size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Student &amp; Parent Contact Numbers + Email ID (Active WhatsApp/SMS for OTPs &amp; Alerts)</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Student WhatsApp / Mobile *</label>
                      <input
                        type="text"
                        className="gravel-input font-mono"
                        style={{ width: '100%' }}
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Parent / Guardian Mobile (Primary SMS) *</label>
                      <input
                        type="text"
                        className="gravel-input font-mono"
                        style={{ width: '100%' }}
                        placeholder="+91 98111 22334"
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Student Email ID</label>
                      <input
                        type="email"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Parent Email ID (For Fee &amp; Reports)</label>
                      <input
                        type="email"
                        className="gravel-input"
                        style={{ width: '100%' }}
                        placeholder="parent@example.com"
                        value={guardianEmail}
                        onChange={(e) => setGuardianEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-block 4: Residential Address */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                    Residential Address (For study material delivery &amp; emergency contact) *
                  </label>
                  <textarea
                    className="gravel-input"
                    style={{ width: '100%', minHeight: '52px' }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full residential street, house/flat number, landmark, city, state, and 6-digit PIN code..."
                    required
                  />
                </div>

                {/* Sub-block 5: Category / Concession Proof */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span>Category / Concession Proof (SC/ST/OBC, PwD, or Ex-Serviceman for NIOS fee exemptions)</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Social Category</label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={socialCategory}
                        onChange={(e) => setSocialCategory(e.target.value as any)}
                      >
                        <option value="General">General (Unreserved)</option>
                        <option value="OBC">OBC (Non-Creamy Layer)</option>
                        <option value="SC">SC (Scheduled Caste - Fee Concession)</option>
                        <option value="ST">ST (Scheduled Tribe - Fee Concession)</option>
                        <option value="Ex-Serviceman">Ex-Serviceman / Defense Ward</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 16 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.75rem' }}>
                        <input
                          type="checkbox"
                          checked={concessionProofAttached}
                          onChange={(e) => setConcessionProofAttached(e.target.checked)}
                        />
                        <span>Category Certificate attached / verified</span>
                      </label>
                    </div>
                  </div>

                  {/* Divyangjan / PwD Concessions */}
                  <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={isDivyangjan}
                        onChange={(e) => setIsDivyangjan(e.target.checked)}
                      />
                      <span>Student with Special Needs / Divyangjan (PwD - Fee Exemption &amp; Exam Concessions)</span>
                    </label>

                    {isDivyangjan && (
                      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.72rem', background: 'var(--bg-surface-muted)', padding: '0.75rem', borderRadius: 4 }}>
                        <div>
                          <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 2 }}>Disability Type</label>
                          <select
                            className="gravel-input"
                            style={{ width: '100%' }}
                            value={disabilityType}
                            onChange={(e) => setDisabilityType(e.target.value as any)}
                          >
                            <option value="LD">Learning Disability (Dyslexia/Dyscalculia)</option>
                            <option value="VI">Visual Impairment</option>
                            <option value="HI">Hearing Impairment</option>
                            <option value="ID">Intellectual Disability</option>
                            <option value="Multiple">Multiple Disabilities</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={scribeNeeded}
                              onChange={(e) => setScribeNeeded(e.target.checked)}
                            />
                            <span>Require Scribe / Amanuensis</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={extraTime20Mins}
                              onChange={(e) => setExtraTime20Mins(e.target.checked)}
                            />
                            <span>Require 20 mins/hr Compensatory Time</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 2: ACADEMIC & NIOS ENROLLMENT DETAILS                     */}
            {/* ============================================================== */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  background: 'var(--accent-subtle)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 6, 
                  borderLeft: '3px solid var(--accent-primary)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  <strong>2. Academic &amp; NIOS Enrollment Details:</strong> Course stage, registration status (existing NIOS ref/enrolment or fresh admission via coaching), stream block, TOC credits, and 5–7 subject selection with live constraint validator ([F-VAL-208]).
                </div>

                {/* Course Level Selection */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                    Course Level: Open Basic Education (OBE A/B/C), Secondary (Class 10), or Senior Secondary (Class 12) *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
                    {(['OBE_A', 'OBE_B', 'OBE_C', 'SECONDARY', 'SR_SECONDARY'] as NiosAcademicStage[]).map(stg => {
                      const isSel = stage === stg;
                      const info = NIOS_STAGE_INFO[stg];
                      return (
                        <div
                          key={stg}
                          onClick={() => handleStageChange(stg)}
                          className="gravel-card"
                          style={{
                            padding: '0.65rem 0.75rem',
                            cursor: 'pointer',
                            border: isSel ? '2px solid var(--accent-primary)' : '1px solid var(--border-hairline)',
                            backgroundColor: isSel ? 'var(--accent-subtle)' : 'var(--bg-surface-primary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: isSel ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                              {stg === 'OBE_A' ? 'OBE Level A' : stg === 'OBE_B' ? 'OBE Level B' : stg === 'OBE_C' ? 'OBE Level C' : stg === 'SECONDARY' ? 'Secondary (Class 10)' : 'Senior Secondary (Class 12)'}
                            </span>
                            {isSel && <CheckCircle size={14} style={{ color: 'var(--accent-primary)' }} />}
                          </div>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                            {info.equivalent} • Min Age: {info.minAge}+
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Admission Status: Already registered vs Fresh admission */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Admission Status (Select Registration Mode):
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <label 
                      className="gravel-card" 
                      style={{ 
                        padding: '0.75rem', 
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8,
                        borderColor: admissionStatusType === 'Already Registered with NIOS' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                        background: admissionStatusType === 'Already Registered with NIOS' ? 'var(--accent-subtle)' : 'transparent'
                      }}
                    >
                      <input
                        type="radio"
                        name="admStatus"
                        checked={admissionStatusType === 'Already Registered with NIOS'}
                        onChange={() => setAdmissionStatusType('Already Registered with NIOS')}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>Already Registered with NIOS</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Has existing Ref No, Enrolment No &amp; AI Centre Code</div>
                      </div>
                    </label>

                    <label 
                      className="gravel-card" 
                      style={{ 
                        padding: '0.75rem', 
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8,
                        borderColor: admissionStatusType === 'Fresh Admission via Coaching Centre' ? 'var(--accent-primary)' : 'var(--border-hairline)',
                        background: admissionStatusType === 'Fresh Admission via Coaching Centre' ? 'var(--accent-subtle)' : 'transparent'
                      }}
                    >
                      <input
                        type="radio"
                        name="admStatus"
                        checked={admissionStatusType === 'Fresh Admission via Coaching Centre'}
                        onChange={() => setAdmissionStatusType('Fresh Admission via Coaching Centre')}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>Fresh Admission via Coaching Centre</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Requires previous school TC / marksheet declaration</div>
                      </div>
                    </label>
                  </div>

                  {/* Mode-specific Fields */}
                  {admissionStatusType === 'Already Registered with NIOS' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: 4 }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Reference Number *</label>
                        <input
                          type="text"
                          className="gravel-input font-mono"
                          style={{ width: '100%' }}
                          placeholder="e.g. REF-2026-DEL-8941"
                          value={refNo}
                          onChange={(e) => setRefNo(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>11/12-Digit Enrolment Number *</label>
                        <input
                          type="text"
                          className="gravel-input font-mono"
                          style={{ width: '100%', fontWeight: 700, color: 'var(--accent-primary)' }}
                          placeholder="e.g. 270123210084"
                          value={existingEnrolmentNo}
                          onChange={(e) => setExistingEnrolmentNo(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Allotted Study Centre (AI) Code *</label>
                        <input
                          type="text"
                          className="gravel-input font-mono"
                          style={{ width: '100%' }}
                          placeholder="e.g. 270123"
                          value={aiCode}
                          onChange={(e) => setAiCode(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: 4 }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Previous Credential Document *</label>
                        <select
                          className="gravel-input"
                          style={{ width: '100%' }}
                          value={previousDocumentType}
                          onChange={(e) => setPreviousDocumentType(e.target.value as any)}
                        >
                          {stage === 'SR_SECONDARY' ? (
                            <option value="Class 10 Board Pass Certificate">Class 10 Board Pass Certificate</option>
                          ) : stage === 'SECONDARY' ? (
                            <>
                              <option value="Class 8/9 Mark Sheet / TC">Class 8/9 Mark Sheet / School Leaving Certificate (TC)</option>
                              <option value="Self-Declaration (Age 14+)">Self-Declaration of Literacy &amp; Readiness (Age 14+)</option>
                            </>
                          ) : (
                            <option value="Self-Declaration (Age 14+)">Foundational Literacy Assessment / Self-Declaration</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Previous School / Institution Name</label>
                        <input
                          type="text"
                          className="gravel-input"
                          style={{ width: '100%' }}
                          placeholder="e.g. Kendriya Vidyalaya / Government Boys Sr Sec"
                          value={previousSchoolName}
                          onChange={(e) => setPreviousSchoolName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Stream & Target Exam Session */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 2 }}>
                      Stream &amp; Target Exam Session *
                    </label>
                    <select
                      className="gravel-input"
                      style={{ width: '100%' }}
                      value={streamBlock}
                      onChange={(e) => setStreamBlock(e.target.value as any)}
                    >
                      <option value="Stream 1, Block 1">Stream 1, Block 1 (April/May Public Exam)</option>
                      <option value="Stream 1, Block 2">Stream 1, Block 2 (October/November Public Exam)</option>
                      <option value="Stream 2">Stream 2 (Unsuccessful Regular Board Candidates)</option>
                      <option value="Stream 3 (ODE)">Stream 3 (Secondary On-Demand Examination)</option>
                      <option value="Stream 4 (ODE)">Stream 4 (Senior Secondary On-Demand Examination)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 2 }}>
                      Medium of Instruction *
                    </label>
                    <select
                      className="gravel-input"
                      style={{ width: '100%' }}
                      value={medium}
                      onChange={(e) => setMedium(e.target.value as any)}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Regional">Regional Language (Bengali/Marathi/Telugu/Tamil)</option>
                    </select>
                  </div>
                </div>

                {/* Transfer of Credit (TOC) Details */}
                <div className="gravel-card" style={{ padding: '0.9rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                    <input
                      type="checkbox"
                      checked={tocApplied}
                      onChange={(e) => setTocApplied(e.target.checked)}
                    />
                    <span>Transfer of Credit (TOC) from Recognized Board (Max 2 passed subjects transfer)</span>
                  </label>

                  {tocApplied && (
                    <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.75rem', background: 'var(--bg-surface-muted)', padding: '0.75rem', borderRadius: 4 }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Previous Board Name</label>
                        <select
                          className="gravel-input"
                          style={{ width: '100%' }}
                          value={tocPrevBoard}
                          onChange={(e) => setTocPrevBoard(e.target.value)}
                        >
                          <option value="CBSE">CBSE (Central Board)</option>
                          <option value="ICSE/CISCE">ICSE / CISCE</option>
                          <option value="State Board">State Board (UP/Maharashtra/Karnataka/etc.)</option>
                          <option value="Other Recognized">Other MHRD Recognized Board</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Previous Roll Number</label>
                        <input
                          type="text"
                          className="gravel-input font-mono"
                          style={{ width: '100%' }}
                          placeholder="e.g. 12903841"
                          value={tocPrevRoll}
                          onChange={(e) => setTocPrevRoll(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Passing / Failing Year</label>
                        <input
                          type="text"
                          className="gravel-input font-mono"
                          style={{ width: '100%' }}
                          value={tocPassingYear}
                          onChange={(e) => setTocPassingYear(e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Passed Subjects to Transfer</label>
                        <input
                          type="text"
                          className="gravel-input"
                          style={{ width: '100%' }}
                          placeholder="e.g. English, Economics"
                          value={tocPassedSubjects}
                          onChange={(e) => setTocPassedSubjects(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Senior Secondary Specific 2-Year Certification Gap input */}
                {stage === 'SR_SECONDARY' && (
                  <div className="gravel-card" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>Class 10 Passing Year (Mandatory 2-Year Gap Rule):</span>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                        NIOS requires a 2-year certification interval from Class 10 passing year to issue full Class 12 certificate.
                      </div>
                    </div>
                    <select
                      className="gravel-input font-mono"
                      value={class10PassingYear}
                      onChange={(e) => setClass10PassingYear(Number(e.target.value))}
                    >
                      <option value={2026}>2026 (Gap: 0 Years - Split Exam)</option>
                      <option value={2025}>2025 (Gap: 1 Year - Max 4 Subjects)</option>
                      <option value={2024}>2024 (Gap: 2 Years - Full Cert Valid)</option>
                      <option value={2023}>2023 or Earlier (Gap: 3+ Years)</option>
                    </select>
                  </div>
                )}

                {/* LIVE VALIDATION SUMMARY BANNER [F-VAL-208] */}
                <div
                  className="gravel-card"
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: validation.isValid ? 'var(--status-present-bg)' : 'var(--status-absent-bg)',
                    borderColor: validation.isValid ? 'var(--status-present)' : 'var(--status-absent)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {validation.isValid ? (
                        <CheckCircle size={18} style={{ color: 'var(--status-present)' }} />
                      ) : (
                        <AlertTriangle size={18} style={{ color: 'var(--status-absent)' }} />
                      )}
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: validation.isValid ? 'var(--status-present)' : 'var(--status-absent)' }}>
                        {validation.isValid ? 'NIOS Subject Selection Valid & Compliant' : 'Subject Selection Constraint Conflicts Detected'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem', flexWrap: 'wrap' }}>
                      <span
                        className="font-mono"
                        style={{
                          padding: '2px 6px',
                          borderRadius: 3,
                          backgroundColor: (selectedCodes.length >= stageInfo.minSubjects && selectedCodes.length <= stageInfo.maxSubjects) ? 'var(--status-present)' : 'var(--status-absent)',
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        Total: {selectedCodes.length} / {stageInfo.maxSubjects} (5 to 7 required)
                      </span>

                      <span
                        className="font-mono"
                        style={{
                          padding: '2px 6px',
                          borderRadius: 3,
                          backgroundColor: validation.languageCount >= stageInfo.minLanguages ? 'var(--accent-primary)' : 'var(--status-absent)',
                          color: '#fff',
                          fontWeight: 700,
                        }}
                      >
                        Languages: {validation.languageCount} (Min 1, Max 2 core)
                      </span>

                      {stage === 'SR_SECONDARY' && (
                        <span
                          className="font-mono"
                          style={{
                            padding: '2px 6px',
                            borderRadius: 3,
                            backgroundColor: validation.clashes.length === 0 ? 'var(--status-present)' : 'var(--status-absent)',
                            color: '#fff',
                            fontWeight: 700,
                          }}
                        >
                          Exam Clashes: {validation.clashes.length === 0 ? 'None' : `${validation.clashes.length} Conflict`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Errors and Warnings List */}
                  {validation.errors.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.73rem', color: 'var(--status-absent)' }}>
                      {validation.errors.map((err, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                          <span>•</span> <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.warnings.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.73rem', color: 'var(--status-late)' }}>
                      {validation.warnings.map((warn, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                          <span>⚠</span> <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SELECTED SUBJECTS REMOVABLE CHIPS */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Currently Selected Subjects ({selectedCodes.length}):
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selectedCodes.map(code => {
                      const cat = findCatalogSubject(code);
                      return (
                        <span
                          key={code}
                          className="gravel-card"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '3px 8px',
                            fontSize: '0.72rem',
                            backgroundColor: 'var(--bg-surface-muted)',
                            borderRadius: 4,
                          }}
                        >
                          <strong className="font-mono" style={{ color: 'var(--accent-primary)' }}>[{code}]</strong>
                          <span>{cat?.name || code}</span>
                          {cat?.hasPractical && (
                            <span style={{ fontSize: '0.62rem', background: 'var(--status-present-bg)', color: 'var(--status-present)', padding: '1px 3px', borderRadius: 2 }}>
                              PRAC
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveChip(code)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, marginLeft: 2 }}
                            title="Remove Subject"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* DYNAMIC SUBJECT CHECKLIST GROUPED BY NIOS TAXONOMY [F-DAT-107] */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {Object.entries(groupedSubjects).map(([groupTitle, list]) => {
                    const isClashGroup = ['Group C (Select max 1)', 'Group D (Select max 1)', 'Group E (Select max 1)', 'Group F (Select max 1)'].includes(groupTitle);
                    const selectedInThisGroup = list.filter(s => selectedCodes.includes(s.code));
                    const hasConflict = selectedInThisGroup.length > 1;

                    return (
                      <div
                        key={groupTitle}
                        className="gravel-card"
                        style={{
                          padding: '0.85rem',
                          border: hasConflict ? '1.5px solid var(--status-absent)' : '1px solid var(--border-hairline)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: isClashGroup ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                            {groupTitle}
                          </span>
                          {isClashGroup && (
                            <span style={{ fontSize: '0.65rem', color: selectedInThisGroup.length > 1 ? 'var(--status-absent)' : 'var(--text-secondary)' }}>
                              Selected: {selectedInThisGroup.length} / 1 {selectedInThisGroup.length > 1 && '⚠ CLASH!'}
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '6px' }}>
                          {list.map(sub => {
                            const isChecked = selectedCodes.includes(sub.code);
                            const siblingChecked = isClashGroup && selectedInThisGroup.length >= 1 && !isChecked;

                            return (
                              <label
                                key={sub.code}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '4px 6px',
                                  borderRadius: 4,
                                  cursor: 'pointer',
                                  fontSize: '0.72rem',
                                  backgroundColor: isChecked ? 'var(--accent-subtle)' : siblingChecked ? 'var(--bg-canvas)' : 'transparent',
                                  opacity: siblingChecked ? 0.75 : 1,
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleCode(sub.code)}
                                />
                                <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                                  [{sub.code}]
                                </span>
                                <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={sub.name}>
                                  {sub.name}
                                </span>
                                {sub.hasPractical && (
                                  <span style={{ fontSize: '0.6rem', color: 'var(--status-present)', border: '1px solid var(--status-present)', padding: '0 2px', borderRadius: 2 }}>
                                    P
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 3: COACHING OPERATIONS & SCHEDULE PREFERENCES             */}
            {/* ============================================================== */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  background: 'var(--accent-subtle)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 6, 
                  borderLeft: '3px solid var(--accent-primary)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  <strong>3. Coaching Operations &amp; Schedule Preferences:</strong> Preferred lecture hours between 9:00 AM – 5:00 PM, current academic progress (books, TMAs, practical files), and home study hardware setup.
                </div>

                {/* Sub-block 1: Preferred Lecture Timings / Availability */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={15} style={{ color: 'var(--accent-primary)' }} />
                    <span>Preferred Lecture Timings / Availability (Between 9:00 AM and 5:00 PM) *</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem' }}>
                    {[
                      { slot: '09:00 AM - 01:00 PM (Morning Slot)', desc: 'Focuses on Core Academic & Languages' },
                      { slot: '01:00 PM - 05:00 PM (Afternoon Slot)', desc: 'Ideal for Practical PCP & Lab Sessions' },
                      { slot: '09:00 AM - 05:00 PM (Full Day Intensive)', desc: 'Comprehensive full-day coaching track' },
                      { slot: 'Flexible / Staggered Subject Hours', desc: 'Attends lectures strictly for enrolled codes' },
                    ].map((opt) => (
                      <label
                        key={opt.slot}
                        className="gravel-card"
                        style={{
                          padding: '0.65rem 0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          borderColor: preferredTimings === opt.slot ? 'var(--accent-primary)' : 'var(--border-hairline)',
                          background: preferredTimings === opt.slot ? 'var(--accent-subtle)' : 'transparent',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <input
                            type="radio"
                            name="timingOpt"
                            checked={preferredTimings === opt.slot}
                            onChange={() => setPreferredTimings(opt.slot)}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>{opt.slot}</span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', paddingLeft: 20 }}>
                          {opt.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sub-block 2: Current Academic Progress */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
                    <span>Current Academic Progress &amp; Study Materials Status</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Received Official NIOS Printed Books?
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={booksReceived}
                        onChange={(e) => setBooksReceived(e.target.value as any)}
                      >
                        <option value="Yes">Yes — Complete Set Received</option>
                        <option value="No">No — Pending NIOS Dispatch</option>
                        <option value="In Transit">In Transit / Partial Chapters Received</option>
                      </select>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Coaching centre provides interim PDF chapters if books are pending.
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Tutor Marked Assignments (TMAs) Status
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={tmaStarted}
                        onChange={(e) => setTmaStarted(e.target.value as any)}
                      >
                        <option value="Not Started">Not Started — Needs Question Booklets</option>
                        <option value="In Progress">In Progress — Drafting Solutions</option>
                        <option value="Completed">Completed — Ready for Portal Upload</option>
                      </select>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        TMAs carry 20% continuous evaluation weightage in theory subjects.
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Practical Lab Files / Record Books
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={practicalFileCompleted}
                        onChange={(e) => setPracticalFileCompleted(e.target.value as any)}
                      >
                        <option value="Not Started">Not Started — Requires Experiment Manual</option>
                        <option value="In Progress">In Progress — Performing Experiments</option>
                        <option value="Ready for Evaluation">Ready for Formative PCP Evaluation</option>
                      </select>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Applies to practical electives (e.g., Physics, Data Entry, Painting).
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-block 3: Home Study Setup */}
                <div className="gravel-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Home size={15} style={{ color: 'var(--accent-primary)' }} />
                    <span>Home Study Setup &amp; Schedule Management</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Who is managing the study schedule &amp; reminders?
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={managedBy}
                        onChange={(e) => setManagedBy(e.target.value as any)}
                      >
                        <option value="Both Collaboratively">Both Collaboratively (Parent + Student)</option>
                        <option value="Student">Student Independently</option>
                        <option value="Parent">Parent / Guardian Guided</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Primary device used at home for notes &amp; reminders
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={primaryDevice}
                        onChange={(e) => setPrimaryDevice(e.target.value as any)}
                      >
                        <option value="Smartphone (Android/iOS)">Smartphone (Android/iOS PWA)</option>
                        <option value="Laptop / Desktop">Laptop / Desktop Computer</option>
                        <option value="Tablet">Tablet (iPad / Android Tablet)</option>
                        <option value="Shared Family Phone">Shared Family Mobile Phone</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                        Home Internet Connectivity
                      </label>
                      <select
                        className="gravel-input"
                        style={{ width: '100%' }}
                        value={internetAccess}
                        onChange={(e) => setInternetAccess(e.target.value as any)}
                      >
                        <option value="Broadband WiFi">Broadband Wi-Fi (Unlimited)</option>
                        <option value="Mobile Hotspot (4G/5G)">Mobile 4G/5G Data Pack</option>
                        <option value="Limited / Offline">Limited Connectivity (Requires PWA Offline Cache)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* STEP 4: PORTAL CREDENTIALS & CONFIRMATION                      */}
            {/* ============================================================== */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="gravel-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Key size={16} style={{ color: 'var(--accent-primary)' }} />
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      Portal Access Credentials
                    </h4>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Assigned NIOS Enrolment Number</label>
                      <input
                        type="text"
                        className="gravel-input font-mono"
                        style={{ width: '100%', fontWeight: 700, color: 'var(--accent-primary)' }}
                        value={admissionStatusType === 'Already Registered with NIOS' && existingEnrolmentNo.trim() ? existingEnrolmentNo : enrolmentNo}
                        onChange={(e) => setEnrolmentNo(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Temporary Student Portal Password</label>
                      <input
                        type="text"
                        className="gravel-input font-mono"
                        style={{ width: '100%' }}
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Admission Intake Dossier Summary */}
                <div className="gravel-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-hairline)', paddingBottom: 8 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      Comprehensive Admission Dossier Summary
                    </h4>
                    <span className="status-pill status-pill-present" style={{ fontSize: '0.7rem' }}>
                      Verified &amp; Ready to Enroll
                    </span>
                  </div>

                  {/* Section 1 Summary */}
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>
                      1. Personal &amp; Guardian Profile:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Full Name:</span> <strong>{name}</strong></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>DOB / Age:</span> <strong>{dob} ({calculatedAge} Yrs)</strong></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Gender / Blood:</span> {gender} ({bloodGroup})</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Father's Name:</span> {fatherName || 'Not specified'}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Mother's Name:</span> {motherName || 'Not specified'}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Student WhatsApp:</span> <span className="font-mono">{phone}</span></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Parent Phone:</span> <span className="font-mono">{guardianPhone}</span></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Category:</span> {socialCategory} {isDivyangjan && '(PwD Concession)'}</div>
                      <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-secondary)' }}>Address:</span> {address}</div>
                    </div>
                  </div>

                  {/* Section 2 Summary */}
                  <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 8 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>
                      2. Academic &amp; NIOS Enrollment:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Course Stage:</span> <strong>{stageInfo.name} ({stageInfo.equivalent})</strong></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Registration Mode:</span> {admissionStatusType}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Stream &amp; Session:</span> {streamBlock}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Medium:</span> {medium}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>TOC Status:</span> {tocApplied ? `Yes (${tocPrevBoard} - Roll ${tocPrevRoll})` : 'No'}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Total Subjects:</span> <strong>{selectedCodes.length} Subjects</strong></div>
                    </div>

                    {/* Enrolled Subjects Table */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                      {selectedCodes.map(code => {
                        const cat = findCatalogSubject(code);
                        return (
                          <div
                            key={code}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              background: 'var(--bg-surface-muted)',
                              borderRadius: 4,
                            }}
                          >
                            <span>
                              <strong className="font-mono" style={{ color: 'var(--accent-primary)', marginRight: 6 }}>[{code}]</strong>
                              {cat?.name || code}
                            </span>
                            <span style={{ display: 'flex', gap: 6, fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                              <span>TMA Max: {cat?.tmaCeiling || 20}</span>
                              {cat?.hasPractical && (
                                <span style={{ color: 'var(--status-present)' }}>• Practical Max: {cat?.practicalMax || 20}</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3 Summary */}
                  <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 8 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>
                      3. Coaching Operations &amp; Home Setup:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Preferred Slot:</span> <strong>{preferredTimings}</strong></div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Books Status:</span> {booksReceived}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>TMA Progress:</span> {tmaStarted}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Practical Lab File:</span> {practicalFileCompleted}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Schedule Manager:</span> {managedBy}</div>
                      <div><span style={{ color: 'var(--text-secondary)' }}>Primary Device:</span> {primaryDevice} ({internetAccess})</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wizard Footer Controls */}
          <div
            style={{
              padding: '0.75rem 1.25rem',
              borderTop: 'var(--border-width) solid var(--border-hairline)',
              backgroundColor: 'var(--bg-surface-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="gravel-btn gravel-btn-outline"
                style={{ fontSize: '0.8rem' }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    if (!name.trim()) {
                      alert('Please enter student full name as per Aadhaar/Birth Certificate.');
                      return;
                    }
                    if (!dob) {
                      alert('Please select date of birth to verify NIOS age eligibility.');
                      return;
                    }
                    if (!fatherName.trim() || !motherName.trim()) {
                      alert('Please enter father and mother names as per official records.');
                      return;
                    }
                    if (!phone.trim() && !guardianPhone.trim()) {
                      alert('Please provide active phone number for SMS and portal alerts.');
                      return;
                    }
                    if (!address.trim()) {
                      alert('Please provide residential address for study material delivery.');
                      return;
                    }
                  } else if (step === 2) {
                    if (!validation.isValid) {
                      alert(`Cannot advance. Please resolve constraint issues:\n\n${validation.errors.join('\n')}`);
                      return;
                    }
                  }
                  setStep(step + 1);
                }}
                className="gravel-btn gravel-btn-primary"
                style={{ fontSize: '0.8rem' }}
              >
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!validation.isValid}
                className="gravel-btn gravel-btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem', fontWeight: 700 }}
              >
                <CheckCircle size={15} /> Commit Enrollment &amp; Register Learner
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
