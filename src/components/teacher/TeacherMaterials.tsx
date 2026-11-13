// GRAVEL — Teacher Subject-Scoped, Tag-Driven Resource Hub [F-MAT-701..704]
// 15-Second "Tag & Drop" Upload Workflow with Auto-Compression & Lecture Slot Binding

import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { StudyMaterial, MaterialCategory, FileContentType } from '../../types';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Layers, 
  Tag, 
  Zap, 
  Filter, 
  Calendar,
  AlertCircle,
  FileCheck,
  Smartphone,
  Eye,
  Trash2,
  Paperclip
} from 'lucide-react';

export const TeacherMaterials: React.FC = () => {
  const { 
    materials, 
    addStudyMaterial, 
    teachers, 
    impersonatedTeacherId, 
    students,
    schedules 
  } = useAppStore();

  // Active Teacher
  const currentTeacher = teachers.find(t => t.id === (impersonatedTeacherId || 'tch-001')) || teachers[0];

  // Teacher's Assigned Subjects (Auto-Filtered)
  const teacherSubjects = useMemo(() => {
    return currentTeacher.specializations || ['311', '312'];
  }, [currentTeacher]);

  const [isUploading, setIsUploading] = useState(false);

  // 15-Second Upload State
  const [subjectCode, setSubjectCode] = useState<string>(teacherSubjects[0] || '311');
  const [title, setTitle] = useState('');
  const [fileContentType, setFileContentType] = useState<FileContentType>('PDF');
  const [categoryTag, setCategoryTag] = useState<MaterialCategory>('Class Notes');
  const [chapterChoice, setChapterChoice] = useState<string>('Ch 4: Quadratic Equations & Progressions');
  const [customChapter, setCustomChapter] = useState('');
  const [attachToTodayLecture, setAttachToTodayLecture] = useState(true);
  const [lectureDate, setLectureDate] = useState('2026-11-10');
  const [quickNotesText, setQuickNotesText] = useState('');
  const [instructions, setInstructions] = useState('');
  const [simulatedCompression, setSimulatedCompression] = useState(true);
  const [filterView, setFilterView] = useState<'ALL' | MaterialCategory>('ALL');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  // Pre-loaded chapters for popular NIOS subjects
  const preloadedChapters: Record<string, string[]> = {
    '311': [
      'Ch 1: Sets, Relations & Functions',
      'Ch 2: Complex Numbers & Quadratic Equations',
      'Ch 3: Linear Inequalities',
      'Ch 4: Quadratic Equations & Progressions',
      'Ch 5: Combinatorics & Binomial Theorem',
      'Ch 6: Coordinate Geometry & Straight Lines',
      'Ch 7: Trigonometric Functions & Identities',
      'Ch 8: Calculus & Differentiation'
    ],
    '312': [
      'Ch 1: Units, Dimensions & Measurement',
      'Ch 2: Motion in a Straight Line',
      'Ch 3: Mechanics & Motion Labs',
      'Ch 4: Laws of Motion, Work, Energy & Power',
      'Ch 5: Gravitation & Fluid Mechanics',
      'Ch 6: Thermal Properties of Matter'
    ],
    '313': [
      'Ch 1: Atoms, Molecules & Chemical Arithmetic',
      'Ch 2: Periodic Table & Trends',
      'Ch 3: Chemical Bonding & Molecular Structure',
      'Ch 4: States of Matter & Thermodynamics'
    ],
    '302': [
      'Ch 1: Reading Comprehension & Note Making',
      'Ch 2: Letter Writing & Official Correspondence',
      'Ch 3: Summary & Report Drafting'
    ]
  };

  const currentChapterList = preloadedChapters[subjectCode] || [
    'Ch 1: Introduction & Fundamentals',
    'Ch 2: Core Concepts & Principles',
    'Ch 3: Advanced Applications & PYQs'
  ];

  // Map Subject Code to Name
  const subjectNameMap: Record<string, string> = {
    '302': 'English (Class 12)',
    '311': 'Mathematics (Class 12)',
    '312': 'Physics (Class 12)',
    '313': 'Chemistry (Class 12)',
    '330': 'Computer Science (Class 12)',
    '336': 'Data Entry Operations (Class 12)',
    '201': 'Hindi (Class 10)',
    '211': 'Mathematics (Class 10)',
    '212': 'Science & Technology (Class 10)',
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalChapter = chapterChoice === '__CUSTOM__' ? customChapter : chapterChoice;
    const chapterMatch = finalChapter.match(/Ch\s*(\d+)/i);
    const chapterNo = chapterMatch ? parseInt(chapterMatch[1], 10) : 1;

    const newMaterial: StudyMaterial = {
      id: 'mat-' + Date.now(),
      title: title.trim(),
      subjectCode,
      subjectName: subjectNameMap[subjectCode] || `Subject ${subjectCode}`,
      materialType: categoryTag === 'TMA Help' ? 'TMA Question Booklet' : categoryTag === 'Lab / Practical' ? 'Practical Manual' : 'Lecture Notes',
      categoryTag,
      chapterNo,
      chapterTitle: finalChapter,
      fileContentType,
      fileUrl: fileContentType === 'IMAGE' ? '/images/board-snapshot.jpg' : '/docs/study-material.pdf',
      fileSize: fileContentType === 'IMAGE' ? '3.8 MB' : '2.4 MB',
      compressedSize: fileContentType === 'IMAGE' ? '210 KB' : '380 KB',
      uploadDate: new Date().toISOString().split('T')[0],
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      linkedLectureDate: attachToTodayLecture ? lectureDate : undefined,
      instructions: instructions || (attachToTodayLecture ? `Attached to lecture slot (${lectureDate}). Review before next doubt session.` : 'Uploaded for self-study and revision.'),
      previewContent: quickNotesText || `Official study material for ${finalChapter}. High-weightage exam resource.`,
      savedOffline: false,
      targetCohorts: ['All Enrolled']
    };

    addStudyMaterial(newMaterial);
    setTitle('');
    setQuickNotesText('');
    setInstructions('');
    setIsUploading(false);
  };

  // Filtered materials by teacher's subject & category
  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      if (filterView !== 'ALL' && m.categoryTag !== filterView) return false;
      return true;
    });
  }, [materials, filterView]);

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1200px', margin: '0 auto', width: '100%', paddingBottom: '5.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
              [F-MAT-701..704]
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              15-Second Tag &amp; Drop Resource Hub
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
            Study Material Distribution Hub
          </h2>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Logged in as <strong>{currentTeacher.name}</strong> • Linked Subjects: {teacherSubjects.map(code => `[${code}] ${subjectNameMap[code] || ''}`).join(', ')}
          </div>
        </div>

        <button
          onClick={() => setIsUploading(!isUploading)}
          className="gravel-btn gravel-btn-primary"
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Upload size={14} /> {isUploading ? 'Close Uploader' : '+ 15-Second Upload (Tag & Drop)'}
        </button>
      </div>

      {/* 15-Second Upload Drawer */}
      {isUploading && (
        <form
          onSubmit={handleUploadSubmit}
          className="gravel-card"
          style={{ 
            padding: '1.25rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            border: '2px solid var(--accent-primary)',
            background: 'var(--bg-surface-primary)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-hairline)', paddingBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={16} style={{ color: 'var(--accent-primary)' }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                15-Second "Tag &amp; Drop" Study Material Dispatch
              </h3>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Zero Folder Maintenance • Auto-Delivered to Enrolled Learners
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            
            {/* STEP 1: Pick Subject (Auto-Filtered to Teacher) */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                Step 1: Pick Subject (Auto-Filtered to your courses) *
              </label>
              <select
                className="gravel-input"
                style={{ width: '100%', fontWeight: 700, color: 'var(--accent-primary)' }}
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              >
                {teacherSubjects.map(code => (
                  <option key={code} value={code}>
                    [{code}] {subjectNameMap[code] || `Subject ${code}`}
                  </option>
                ))}
              </select>
            </div>

            {/* STEP 2: File Type & Title */}
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                Step 2: Content Type *
              </label>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { type: 'PDF', label: 'PDF Doc', icon: FileText },
                  { type: 'IMAGE', label: 'Board Photo', icon: ImageIcon },
                  { type: 'NOTE', label: 'Quick Note', icon: Sparkles },
                  { type: 'LINK', label: 'Video Link', icon: LinkIcon }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setFileContentType(item.type as any)}
                      className={`gravel-btn ${fileContentType === item.type ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                      style={{ fontSize: '0.68rem', padding: '0.25rem 0.5rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                    >
                      <Icon size={12} /> {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                Document / Board Title *
              </label>
              <input
                type="text"
                className="gravel-input"
                style={{ width: '100%', fontWeight: 600 }}
                placeholder="e.g. Ch 4: Quadratic Roots Whiteboard Snapshot &amp; Formulas"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* STEP 3: SELECT 3 LIGHTWEIGHT GROUPING TAGS */}
          <div className="gravel-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-surface-muted)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Tag size={14} style={{ color: 'var(--accent-primary)' }} />
              <span>Step 3: Select 3 Lightweight Grouping Tags (No Folders Needed)</span>
            </div>

            {/* Tag 1: Chapter / Topic Pill */}
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 3 }}>
                Tag 1: Topic / Chapter Pill (Pick preloaded or enter custom)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <select
                  className="gravel-input"
                  value={chapterChoice}
                  onChange={(e) => setChapterChoice(e.target.value)}
                  style={{ fontSize: '0.75rem' }}
                >
                  {currentChapterList.map(ch => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                  <option value="__CUSTOM__">+ Type Custom Chapter Name...</option>
                </select>

                {chapterChoice === '__CUSTOM__' && (
                  <input
                    type="text"
                    className="gravel-input"
                    placeholder="Enter chapter / topic name"
                    value={customChapter}
                    onChange={(e) => setCustomChapter(e.target.value)}
                    required
                  />
                )}
              </div>
            </div>

            {/* Tag 2: Material Type (1-Tap Chip) */}
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Tag 2: Material Type (1-Tap Purpose Chip) *
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  { tag: 'Class Notes', desc: 'Board photos & lecture summaries' },
                  { tag: 'TMA Help', desc: 'Assignment guidelines & reference' },
                  { tag: 'Practice / PYQ', desc: 'Worksheets & past papers' },
                  { tag: 'Quick Revision', desc: '1-page formulas & mind maps' },
                  { tag: 'Lab / Practical', desc: 'Practical file instructions' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => setCategoryTag(item.tag as any)}
                    className={`gravel-btn ${categoryTag === item.tag ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem' }}
                  >
                    {categoryTag === item.tag && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                    {item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag 3: Target Group & Lecture Slot Binding */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, borderTop: '1px solid var(--border-hairline)', paddingTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={attachToTodayLecture}
                  onChange={(e) => setAttachToTodayLecture(e.target.checked)}
                />
                <span>Attach to Lecture Slot ({lectureDate}) — Highlights "Missed Class Catch-Up" for absent students</span>
              </label>

              {/* Mobile Auto-Compression Flag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: 'var(--status-present)' }}>
                <Smartphone size={14} />
                <span>Auto-compress for 2G / mobile data (3.8MB &rarr; ~210KB)</span>
              </div>
            </div>
          </div>

          {/* Quick Notes / Preview text */}
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>
              Quick Text Notes / Summary Formulas (Rendered directly in student app)
            </label>
            <textarea
              className="gravel-input"
              style={{ width: '100%', minHeight: '48px', fontSize: '0.75rem' }}
              placeholder="e.g. Key formula: x = (-b ± √(b² - 4ac)) / 2a. Review problem 4 on page 78."
              value={quickNotesText}
              onChange={(e) => setQuickNotesText(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              type="button"
              onClick={() => setIsUploading(false)}
              className="gravel-btn gravel-btn-outline"
              style={{ fontSize: '0.78rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gravel-btn gravel-btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.45rem 1.25rem', fontWeight: 700 }}
            >
              <Upload size={14} /> Dispatch Material (Auto-Delivers)
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar by Material Type */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Filter By Purpose:</span>
        {[
          'ALL',
          'Class Notes',
          'TMA Help',
          'Practice / PYQ',
          'Quick Revision',
          'Lab / Practical'
        ].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterView(tag as any)}
            className={`gravel-btn ${filterView === tag ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
            style={{ fontSize: '0.7rem', padding: '0.25rem 0.55rem' }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grouped Library Display (Zero Folder Maintenance) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.85rem' }}>
        {filteredMaterials.map((mat) => {
          return (
            <div
              key={mat.id}
              className="gravel-card"
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.65rem',
                borderLeft: mat.categoryTag === 'TMA Help' 
                  ? '4px solid var(--accent-primary)' 
                  : mat.categoryTag === 'Quick Revision'
                  ? '4px solid var(--status-present)'
                  : mat.categoryTag === 'Lab / Practical'
                  ? '4px solid var(--accent-secondary)'
                  : '4px solid var(--border-hairline)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700 }}>
                    [{mat.subjectCode}] {mat.subjectName}
                  </span>
                  <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
                    {mat.categoryTag || 'Class Notes'}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 4 }}>
                  {mat.title}
                </h4>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
                  {mat.chapterTitle && (
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {mat.chapterTitle}
                    </span>
                  )}
                  {mat.linkedLectureDate && (
                    <span style={{ marginLeft: 6, color: 'var(--status-late)', fontWeight: 600 }}>
                      • Linked to {mat.linkedLectureDate} Lecture
                    </span>
                  )}
                </div>

                {mat.previewContent && (
                  <div style={{ 
                    padding: '0.45rem 0.65rem', 
                    background: 'var(--bg-surface-muted)', 
                    borderRadius: 4, 
                    fontSize: '0.72rem', 
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.3
                  }}>
                    {mat.previewContent.slice(0, 100)}...
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>
                  {mat.fileContentType} • {mat.compressedSize || mat.fileSize}
                </span>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="gravel-btn gravel-btn-outline"
                    style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
                  >
                    <Eye size={12} /> In-App View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-App Instant Viewer Modal */}
      {previewMaterial && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setPreviewMaterial(null)}
        >
          <div
            className="gravel-card"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 700 }}>
                  [{previewMaterial.subjectCode}] {previewMaterial.categoryTag}
                </span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{previewMaterial.title}</h3>
              </div>
              <button onClick={() => setPreviewMaterial(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ 
                padding: '1.5rem', 
                background: 'var(--bg-canvas)', 
                borderRadius: 6, 
                border: '1px dashed var(--border-hairline)',
                textAlign: 'center'
              }}>
                {previewMaterial.fileContentType === 'IMAGE' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <ImageIcon size={48} style={{ color: 'var(--accent-primary)' }} />
                    <strong style={{ fontSize: '0.85rem' }}>Simulated High-Resolution Whiteboard Snapshot</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Pinch-to-zoom enabled • Auto-compressed from 3.8MB to {previewMaterial.compressedSize || '210KB'}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <FileText size={48} style={{ color: 'var(--accent-primary)' }} />
                    <strong style={{ fontSize: '0.85rem' }}>Document View: {previewMaterial.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      In-App reader (no external PDF app required)
                    </div>
                  </div>
                )}
              </div>

              {previewMaterial.previewContent && (
                <div className="gravel-card" style={{ padding: '0.85rem', background: 'var(--bg-surface-muted)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Quick Content Notes:
                  </div>
                  <div style={{ fontSize: '0.78rem', lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}>
                    {previewMaterial.previewContent}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-surface-muted)' }}>
              <button onClick={() => setPreviewMaterial(null)} className="gravel-btn gravel-btn-primary" style={{ fontSize: '0.75rem' }}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
