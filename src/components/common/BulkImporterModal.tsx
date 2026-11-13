// GRAVEL — Bulk CSV/Excel Account Importer [F-ACC-202] with Constraint Validation [F-VAL-208]
import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { X, Upload, FileSpreadsheet, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { NiosAcademicStage } from '../../types';
import { validateNIOSSubjectSelection } from '../../utils/niosValidation';
import { findCatalogSubject, MASTER_SUBJECT_CATALOG } from '../../data/niosSubjectCatalog';

interface BulkImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedRow {
  enrolmentNo: string;
  name: string;
  stage: NiosAcademicStage;
  streamBlock: any;
  dob: string;
  phone: string;
  email: string;
  subjectCodes: string[];
  validation: ReturnType<typeof validateNIOSSubjectSelection>;
}

export const BulkImporterModal: React.FC<BulkImporterModalProps> = ({ isOpen, onClose }) => {
  const { addStudent } = useAppStore();

  const [csvText, setCsvText] = useState<string>(
`enrolment_no,student_name,stage,stream_block,dob,phone,email,enrolled_subjects
270123210201,Pooja Verma,SR_SECONDARY,Stream 1 Block 1,2007-04-12,+91 98111 22334,pooja.v@example.com,302,311,312,313,336
270123210202,Tanmay Kulkarni,SECONDARY,Stream 1 Block 1,2009-08-20,+91 98222 33445,tanmay.k@example.com,201,202,211,212,213
270123210203,Simran Kaur,SR_SECONDARY,Stream 3 (ODE),2006-11-15,+91 98333 44556,simran.k@example.com,301,302,311,312,315
270123210204,Devansh Rawat,SR_SECONDARY,Stream 1 Block 1,2007-02-18,+91 98444 55667,devansh.r@example.com,311,312,313,336
270123210205,Ananya Sen,OBE_C,Stream 1 Block 1,2010-09-05,+91 98555 66778,ananya.s@example.com,OBE-C-01,OBE-C-02,OBE-C-11,OBE-C-12,OBE-C-21`
  );

  const [importSummary, setImportSummary] = useState<{ imported: number; skipped: number } | null>(null);

  // Parse and validate rows live
  const parsedRows: ParsedRow[] = useMemo(() => {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) return [];

    const rows: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Handle CSV parsing: split by comma, but allow enrolled_subjects at the end
      const parts = line.split(',').map(p => p.trim());
      if (parts.length >= 7) {
        const enrolmentNo = parts[0];
        const name = parts[1];
        let stageRaw = parts[2].toUpperCase().replace(/\s+/g, '_');
        if (!['OBE_A', 'OBE_B', 'OBE_C', 'SECONDARY', 'SR_SECONDARY'].includes(stageRaw)) {
          stageRaw = 'SR_SECONDARY';
        }
        const stage = stageRaw as NiosAcademicStage;
        const streamBlock = parts[3] || 'Stream 1, Block 1';
        const dob = parts[4] || '2007-01-01';
        const phone = parts[5] || '+91 98000 00000';
        const email = parts[6] || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        
        // Remaining parts are the subject codes (could be comma or pipe separated)
        const rawSubjectCodes = parts.slice(7).flatMap(p => p.includes('|') ? p.split('|') : [p]).map(s => s.trim()).filter(Boolean);
        const subjectCodes = rawSubjectCodes.length > 0 ? rawSubjectCodes : ['302', '311', '312', '313', '336'];

        const validation = validateNIOSSubjectSelection(
          stage,
          subjectCodes,
          MASTER_SUBJECT_CATALOG,
          dob
        );

        rows.push({
          enrolmentNo,
          name,
          stage,
          streamBlock,
          dob,
          phone,
          email,
          subjectCodes,
          validation
        });
      }
    }
    return rows;
  }, [csvText]);

  const validRows = parsedRows.filter(r => r.validation.isValid);
  const invalidRows = parsedRows.filter(r => !r.validation.isValid);

  if (!isOpen) return null;

  const handleProcessImport = () => {
    if (validRows.length === 0) {
      alert('No valid student rows to import. Please check constraint validation errors in your CSV.');
      return;
    }

    const courseLevelMap: Record<NiosAcademicStage, any> = {
      OBE_A: 'OBE (A/B/C)',
      OBE_B: 'OBE (A/B/C)',
      OBE_C: 'OBE (A/B/C)',
      SECONDARY: 'Secondary (Class X)',
      SR_SECONDARY: 'Senior Secondary (Class XII)'
    };

    validRows.forEach(row => {
      const studentSubjects = row.subjectCodes.map(code => {
        const cat = findCatalogSubject(code);
        return {
          code,
          name: cat?.name || `Subject ${code}`,
          hasPractical: cat?.hasPractical || false,
          theoryMarks: 62,
          practicalMarks: cat?.hasPractical ? 16 : undefined,
          tmaStatus: 'Submitted to AI' as const,
          tmaMarks: 16,
          tocApplied: false,
          pcpAttended: 18,
          mandatoryPcpSessions: [8, 8, 8, 8, 8]
        };
      });

      addStudent({
        name: row.name,
        email: row.email,
        phone: row.phone,
        dob: row.dob,
        gender: 'Male',
        bloodGroup: 'B+',
        status: 'Active',
        address: 'Delhi AI Catchment Area',
        guardian: {
          fatherName: 'Guardian ' + row.name,
          motherName: 'Mother ' + row.name,
          relationship: 'Parent',
          phone: row.phone
        },
        nios: {
          enrolmentNo: row.enrolmentNo,
          refNo: 'REF-2026-DEL-' + Math.floor(1000 + Math.random() * 9000),
          aiCode: '270123',
          regionalCentre: 'Delhi (East)',
          courseLevel: courseLevelMap[row.stage],
          streamBlock: row.streamBlock,
          medium: 'English',
          admissionStatus: 'Verified',
          sessionYear: '2026-2027'
        },
        subjects: studentSubjects,
        compliance: {
          idProofType: 'Aadhaar',
          idProofNumber: '7788 9900 1122',
          socialCategory: 'General',
          isDivyangjan: false
        },
        attendanceRate: 75.0,
        totalClassesHeld: 24,
        totalPresent: 18,
        totalLate: 0,
        totalAbsent: 6,
        examFeePaid: true,
        hallTicketStatus: 'Ready'
      });
    });

    setImportSummary({
      imported: validRows.length,
      skipped: invalidRows.length
    });

    setTimeout(() => {
      onClose();
    }, 2000);
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
          maxWidth: '840px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSpreadsheet size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Bulk CSV Account Importer</h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                  [F-ACC-202] [F-VAL-208]
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Automated Constraint Validation Engine checks each row for Subject Quotas, Languages &amp; Group Clashes
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {importSummary ? (
            <div
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--status-present-bg)',
                color: 'var(--status-present)',
                borderRadius: 'var(--card-radius)',
              }}
            >
              <CheckCircle size={40} style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Import Batch Complete!</h4>
              <p style={{ fontSize: '0.85rem', marginTop: 4 }}>
                Successfully onboarded <strong>{importSummary.imported}</strong> compliant learners.
                {importSummary.skipped > 0 && ` (${importSummary.skipped} invalid rows with rule conflicts were safely rejected).`}
              </p>
            </div>
          ) : (
            <>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                  CSV Nominal Roll Input (Supports <code>enrolled_subjects</code> column):
                </label>
                <textarea
                  className="gravel-input font-mono"
                  style={{ width: '100%', minHeight: '120px', fontSize: '0.72rem', lineHeight: 1.4, resize: 'vertical' }}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                />
              </div>

              {/* LIVE PARSED PREVIEW WITH VALIDATION BADGES [F-VAL-208] */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                    Live Row Validation Preview ({parsedRows.length} Rows Parsed):
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem' }}>
                    <span style={{ color: 'var(--status-present)', fontWeight: 600 }}>{validRows.length} Valid Rows</span>
                    <span style={{ color: 'var(--status-absent)', fontWeight: 600 }}>{invalidRows.length} Conflicted Rows</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '240px', overflowY: 'auto' }}>
                  {parsedRows.map((row, idx) => {
                    const isValid = row.validation.isValid;
                    return (
                      <div
                        key={idx}
                        className="gravel-card"
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderLeft: isValid ? '4px solid var(--status-present)' : '4px solid var(--status-absent)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 3,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                              #{idx + 1}
                            </span>
                            <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{row.name}</span>
                            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)' }}>
                              [{row.enrolmentNo}]
                            </span>
                            <span style={{ fontSize: '0.68rem', padding: '1px 5px', background: 'var(--bg-surface-muted)', borderRadius: 3 }}>
                              {row.stage}
                            </span>
                          </div>

                          <span
                            className={`status-pill ${isValid ? 'status-pill-present' : 'status-pill-absent'}`}
                            style={{ fontSize: '0.65rem' }}
                          >
                            {isValid ? 'VALID' : 'CONSTRAINT CONFLICT'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          <span className="font-mono">
                            Subjects ({row.subjectCodes.length}): {row.subjectCodes.join(', ')}
                          </span>
                          <span>DOB: {row.dob}</span>
                        </div>

                        {/* Error Badges */}
                        {!isValid && (
                          <div style={{ marginTop: 2, display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.7rem', color: 'var(--status-absent)' }}>
                            {row.validation.errors.map((err, errIdx) => (
                              <div key={errIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                                <span>⚠</span> <span>{err}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderTop: 'var(--border-width) solid var(--border-hairline)',
            backgroundColor: 'var(--bg-surface-muted)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>
            Only rows passing NIOS subject &amp; clash constraints will be committed to the database.
          </span>
          <button
            onClick={handleProcessImport}
            disabled={validRows.length === 0 || importSummary !== null}
            className="gravel-btn gravel-btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <Upload size={14} /> Commit {validRows.length} Valid Records
          </button>
        </div>
      </div>
    </div>
  );
};
