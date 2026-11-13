// GRAVEL — Admin Account Directory [F-ACC-201..206] [F-UI-005] [F-UI-006]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { StudentRecord } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Upload, 
  CheckSquare, 
  Square, 
  Trash2, 
  BellRing, 
  Edit3, 
  Eye, 
  Download,
  AlertCircle
} from 'lucide-react';
import { StudentInspectorDrawer } from '../common/StudentInspectorDrawer';
import { SingleAccountWizardModal } from '../common/SingleAccountWizardModal';
import { BulkImporterModal } from '../common/BulkImporterModal';

export const AdminDirectory: React.FC = () => {
  const { 
    students, 
    bulkDeleteStudents, 
    bulkUpdateStatus, 
    bulkSendTmaReminder,
    deleteStudent 
  } = useAppStore();

  // Search & Filter State [F-ACC-203]
  const [searchTerm, setSearchTerm] = useState('');
  const [streamFilter, setStreamFilter] = useState('ALL');
  const [tmaFilter, setTmaFilter] = useState('ALL');
  const [arFilter, setArFilter] = useState('ALL'); // 'ALL' | 'BELOW_75'

  // Sort State [F-ACC-204]
  const [sortBy, setSortBy] = useState<'name' | 'enrolment' | 'attendance' | 'tma'>('attendance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Multi-Selection State [F-UI-006]
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals & Drawers
  const [inspectingStudent, setInspectingStudent] = useState<StudentRecord | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [importerOpen, setImporterOpen] = useState(false);

  // Filter Logic
  const filteredStudents = students.filter(s => {
    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match = s.name.toLowerCase().includes(q) || s.nios.enrolmentNo.includes(q) || s.email.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Stream
    if (streamFilter !== 'ALL' && s.nios.streamBlock !== streamFilter) return false;

    // TMA Pending
    if (tmaFilter === 'PENDING') {
      const hasPending = s.subjects.some(sub => sub.tmaStatus === 'Pending');
      if (!hasPending) return false;
    } else if (tmaFilter === 'EVALUATED') {
      const allEvaluated = s.subjects.every(sub => sub.tmaStatus === 'Evaluated');
      if (!allEvaluated) return false;
    }

    // Attendance < 75%
    if (arFilter === 'BELOW_75' && s.attendanceRate >= 75) return false;

    return true;
  });

  // Sort Logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let result = 0;
    if (sortBy === 'name') {
      result = a.name.localeCompare(b.name);
    } else if (sortBy === 'enrolment') {
      result = a.nios.enrolmentNo.localeCompare(b.nios.enrolmentNo);
    } else if (sortBy === 'attendance') {
      result = a.attendanceRate - b.attendanceRate;
    } else if (sortBy === 'tma') {
      const aTma = a.subjects.reduce((sum, s) => sum + (s.tmaMarks || 0), 0);
      const bTma = b.subjects.reduce((sum, s) => sum + (s.tmaMarks || 0), 0);
      result = aTma - bTma;
    }
    return sortOrder === 'asc' ? result : -result;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(sortedStudents.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    const selected = students.filter(s => selectedIds.includes(s.id));
    const header = 'Enrolment No,Student Name,Course,Stream,Attendance Rate,Exam Fee Paid\n';
    const rows = selected.map(s => 
      `"${s.nios.enrolmentNo}","${s.name}","${s.nios.courseLevel}","${s.nios.streamBlock}",${s.attendanceRate}%,${s.examFeePaid ? 'YES' : 'NO'}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gravel_nios_students_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Directory Title & Main Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
              [F-ACC-201..206]
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              NIOS Study Centre #270123 Directory
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
            Student Account Directory & Nominal Roll
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => setImporterOpen(true)}
            className="gravel-btn gravel-btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            <Upload size={14} /> Bulk CSV Importer [F-ACC-202]
          </button>
          <button
            onClick={() => setWizardOpen(true)}
            className="gravel-btn gravel-btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <Plus size={15} /> + New Student [F-ACC-201]
          </button>
        </div>
      </div>

      {/* Filter & Sort Controls [F-ACC-203, F-ACC-204] */}
      <div
        className="gravel-card"
        style={{
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-surface-primary)',
        }}
      >
        {/* Left: Search & Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter by name, enrolment no..."
              className="gravel-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.75rem', width: '200px', padding: '0.35rem 0.6rem' }}
            />
          </div>

          {/* Stream Filter */}
          <select
            className="gravel-input"
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
          >
            <option value="ALL">All Streams & Blocks</option>
            <option value="Stream 1, Block 1">Stream 1, Block 1 (April)</option>
            <option value="Stream 1, Block 2">Stream 1, Block 2 (October)</option>
            <option value="Stream 2">Stream 2 (Failed Regulars)</option>
            <option value="Stream 3 (ODE)">Stream 3 (ODE)</option>
          </select>

          {/* TMA Filter */}
          <select
            className="gravel-input"
            value={tmaFilter}
            onChange={(e) => setTmaFilter(e.target.value)}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
          >
            <option value="ALL">All TMA States</option>
            <option value="PENDING">TMA Pending First</option>
            <option value="EVALUATED">TMA Fully Evaluated</option>
          </select>

          {/* AR Low Warning Filter */}
          <button
            onClick={() => setArFilter(arFilter === 'ALL' ? 'BELOW_75' : 'ALL')}
            className={`gravel-btn ${arFilter === 'BELOW_75' ? 'gravel-btn-danger' : 'gravel-btn-outline'}`}
            style={{ fontSize: '0.72rem', padding: '0.35rem 0.6rem' }}
          >
            <AlertCircle size={13} /> AR &lt; 75% Warning
          </button>
        </div>

        {/* Right: Sort dropdown [F-ACC-204] */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Sort:</span>
          <select
            className="gravel-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
          >
            <option value="attendance">Attendance Rate (AR%)</option>
            <option value="name">Student Name (A-Z)</option>
            <option value="enrolment">NIOS Enrolment No</option>
            <option value="tma">TMA Score Total</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="gravel-btn gravel-btn-outline"
            style={{ padding: '0.35rem 0.5rem' }}
            title={`Toggle Sort Direction (Current: ${sortOrder.toUpperCase()})`}
          >
            <ArrowUpDown size={13} />
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            Showing {sortedStudents.length} of {students.length}
          </span>
        </div>
      </div>

      {/* Interactive Data Table Engine [F-UI-005] */}
      <div className="gravel-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--bg-surface-muted)',
                  borderBottom: 'var(--border-width) solid var(--border-hairline)',
                  textAlign: 'left',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                <th style={{ padding: '0.65rem 0.75rem', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === sortedStudents.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th style={{ padding: '0.65rem 0.75rem' }}>NIOS ENROLMENT NO</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>STUDENT NAME</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>STREAM / BLOCK</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>TMA PROGRESS</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>ATTENDANCE RATE</th>
                <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
                <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                const evaluatedCount = student.subjects.filter(s => s.tmaStatus === 'Evaluated').length;
                const totalSubjects = student.subjects.length;
                const isArWarning = student.attendanceRate < 75;

                return (
                  <tr
                    key={student.id}
                    style={{
                      borderBottom: '1px solid var(--border-hairline)',
                      backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                      transition: 'background-color 0.1s ease',
                    }}
                    className="gravel-card-hover"
                  >
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(student.id)}
                      />
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span className="font-mono" style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                        {student.nios.enrolmentNo}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{student.phone}</div>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span style={{ fontSize: '0.75rem' }}>{student.nios.streamBlock}</span>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{student.nios.courseLevel}</div>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        {evaluatedCount} / {totalSubjects} Evaluated
                      </span>
                      <div
                        style={{
                          height: 4,
                          width: '80px',
                          backgroundColor: 'var(--bg-surface-muted)',
                          borderRadius: 2,
                          overflow: 'hidden',
                          marginTop: 3,
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${(evaluatedCount / totalSubjects) * 100}%`,
                            backgroundColor: evaluatedCount === totalSubjects ? 'var(--status-present)' : 'var(--status-late)',
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          className="font-mono"
                          style={{
                            fontWeight: 700,
                            color: isArWarning ? 'var(--status-absent)' : 'var(--status-present)',
                          }}
                        >
                          {student.attendanceRate}%
                        </span>
                        {isArWarning && (
                          <span
                            title="Attendance below 75% threshold! Risk of exam debarment."
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '1px 4px',
                              backgroundColor: 'var(--status-absent-bg)',
                              color: 'var(--status-absent)',
                              borderRadius: 3,
                            }}
                          >
                            !
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                        {student.totalPresent}P / {student.totalLate}L / {student.totalAbsent}A
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem' }}>
                      <span
                        className={`status-pill ${student.status === 'Active' ? 'status-pill-present' : 'status-pill-absent'}`}
                        style={{ fontSize: '0.65rem' }}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                        <button
                          onClick={() => setInspectingStudent(student)}
                          className="gravel-btn gravel-btn-outline"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                          title="Open Slide-Over Inspector Drawer [F-UI-007]"
                        >
                          <Eye size={12} /> Inspect
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete student account for ${student.name}?`)) {
                              deleteStudent(student.id);
                            }
                          }}
                          className="gravel-btn gravel-btn-outline"
                          style={{ padding: '0.25rem 0.4rem', color: 'var(--status-absent)' }}
                          title="Delete Account"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk-Action Bar [F-UI-006] */}
      {selectedIds.length > 0 && (
        <div className="floating-bulk-bar">
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
            [{selectedIds.length} Selected]
          </span>

          <button
            onClick={() => {
              bulkSendTmaReminder(selectedIds);
              alert(`Urgent TMA reminder broadcast sent to ${selectedIds.length} students.`);
            }}
            className="gravel-btn gravel-btn-subtle"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
          >
            <BellRing size={13} /> Send TMA Reminder
          </button>

          <button
            onClick={() => {
              bulkUpdateStatus(selectedIds, 'Active');
              alert(`Activated ${selectedIds.length} accounts.`);
            }}
            className="gravel-btn gravel-btn-subtle"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
          >
            Activate All
          </button>

          <button
            onClick={handleExportCsv}
            className="gravel-btn gravel-btn-subtle"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
          >
            <Download size={13} /> Export CSV
          </button>

          <button
            onClick={() => {
              if (confirm(`Permanently remove ${selectedIds.length} selected accounts?`)) {
                bulkDeleteStudents(selectedIds);
                setSelectedIds([]);
              }
            }}
            className="gravel-btn gravel-btn-danger"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
          >
            <Trash2 size={13} /> Bulk Delete
          </button>

          <button
            onClick={() => setSelectedIds([])}
            style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.75rem', opacity: 0.8 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Inspector Drawer [F-UI-007] */}
      <StudentInspectorDrawer
        student={inspectingStudent}
        onClose={() => setInspectingStudent(null)}
      />

      {/* Single Account Wizard Modal [F-ACC-201] */}
      <SingleAccountWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />

      {/* Bulk Importer Modal [F-ACC-202] */}
      <BulkImporterModal
        isOpen={importerOpen}
        onClose={() => setImporterOpen(false)}
      />
    </div>
  );
};

