// GRAVEL — Global Command & Quick-Search Bar [F-UI-003] (Cmd/Ctrl + K)
import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { Search, X, User, BookOpen, Calendar, Cpu, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    searchOpen, 
    setSearchOpen, 
    students, 
    teachers, 
    schedules, 
    materials, 
    features,
    setCurrentRole,
    setImpersonatedStudentId
  } = useAppStore();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const q = query.trim().toLowerCase();

  // Filter items
  const matchedStudents = q ? students.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.nios.enrolmentNo.includes(q) ||
    s.email.toLowerCase().includes(q)
  ) : [];

  const matchedTeachers = q ? teachers.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.employeeId.toLowerCase().includes(q) ||
    t.department.toLowerCase().includes(q)
  ) : [];

  const matchedClasses = q ? schedules.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.subjectCode.includes(q) ||
    c.room.toLowerCase().includes(q)
  ) : [];

  const matchedFeatures = q ? features.filter(f => 
    f.id.toLowerCase().includes(q) || 
    f.name.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q)
  ) : [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="gravel-card"
        style={{
          width: '100%',
          maxWidth: '620px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: 'var(--border-width) solid var(--border-hairline)',
          }}
        >
          <Search size={20} style={{ color: 'var(--accent-primary)' }} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a student name, NIOS Enrolment No, subject, or feature ID..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => setSearchOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Area */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.75rem' }}>
          {!q && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Search across Students, Teachers, Scheduled Classes, and Feature Indices [F-UI-003]
              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="gravel-card" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Try: "Aarav"</span>
                <span className="gravel-card" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Try: "270123"</span>
                <span className="gravel-card" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Try: "Physics"</span>
                <span className="gravel-card" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>Try: "F-MATH"</span>
              </div>
            </div>
          )}

          {/* Students */}
          {matchedStudents.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Students ({matchedStudents.length})
              </div>
              {matchedStudents.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    setImpersonatedStudentId(s.id);
                    setCurrentRole('STUDENT');
                    setSearchOpen(false);
                  }}
                  className="gravel-card gravel-card-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    marginBottom: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <User size={16} style={{ color: 'var(--accent-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.name}</div>
                      <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        Enrol: {s.nios.enrolmentNo} • {s.nios.streamBlock} • AR: {s.attendanceRate}%
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 3 }}>
                    View Student <ArrowRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Teachers */}
          {matchedTeachers.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Faculty ({matchedTeachers.length})
              </div>
              {matchedTeachers.map(t => (
                <div
                  key={t.id}
                  onClick={() => {
                    setCurrentRole('TEACHER');
                    setSearchOpen(false);
                  }}
                  className="gravel-card gravel-card-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    marginBottom: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      {t.designation} • {t.department} ({t.employeeId})
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)' }}>Switch Role</span>
                </div>
              ))}
            </div>
          )}

          {/* Schedules */}
          {matchedClasses.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Classes & PCP Sessions ({matchedClasses.length})
              </div>
              {matchedClasses.map(c => (
                <div
                  key={c.id}
                  className="gravel-card"
                  style={{ padding: '0.6rem 0.8rem', marginBottom: '4px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.title}</span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                      {c.startTime} - {c.endTime}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {c.date} • {c.room} • {c.teacherName}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {matchedFeatures.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Feature Indices ({matchedFeatures.length})
              </div>
              {matchedFeatures.map(f => (
                <div
                  key={f.id}
                  className="gravel-card"
                  style={{ padding: '0.5rem 0.8rem', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 700, marginRight: 8, fontSize: '0.8rem' }}>
                      {f.id}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{f.name}</span>
                  </div>
                  <span
                    className={`status-pill ${f.enabled ? 'status-pill-present' : 'status-pill-absent'}`}
                    style={{ fontSize: '0.65rem' }}
                  >
                    {f.enabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {q && matchedStudents.length === 0 && matchedTeachers.length === 0 && matchedClasses.length === 0 && matchedFeatures.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No matches found for "{query}".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '0.6rem 1.25rem',
            borderTop: 'var(--border-width) solid var(--border-hairline)',
            backgroundColor: 'var(--bg-surface-muted)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>Use ESC to dismiss</span>
          <span>Indexed Feature: [F-UI-003]</span>
        </div>
      </div>
    </div>
  );
};

