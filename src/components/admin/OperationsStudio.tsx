// GRAVEL — NIOS 3-Layer Timetable & Operations Studio [F-SCH-501..509]
// Layer 1: Modular Subject-Slot Weekly Template (Base Schedule with Zero-Setup Rollout)
// Layer 2: Calendar Override Engine (Exceptions, Holidays, Day-Swaps & Special Events)
// Layer 3: Personalized Student Drop-In Arrival & Front-Desk Check-In Kiosk

import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Unlock,
  AlertCircle,
  Layers,
  Sparkles,
  Repeat,
  RefreshCw,
  UserCheck,
  Building,
  User,
  Coffee,
  HelpCircle,
  FileText,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { 
  DayOfWeek, 
  WeeklyTemplateSlot, 
  CalendarOverride, 
  OverrideType, 
  ScheduleEvent 
} from '../../types';
import { 
  DAYS_OF_WEEK, 
  MODULAR_TIME_SLOTS, 
  matchStudentDropIn, 
  timeToMinutes 
} from '../../utils/scheduleEngine';

export const OperationsStudio: React.FC = () => {
  const { 
    schedules, 
    addSchedule, 
    rescheduleClass, 
    cancelClass, 
    teachers,
    students,
    weeklyTemplate,
    updateWeeklyTemplate,
    saveLoggedSchedulesAsWeeklyTemplate,
    calendarOverrides,
    addCalendarOverride,
    deleteCalendarOverride,
    resolveDateSchedule,
    submitAttendance
  } = useAppStore();

  // Operations Sub-Tabs
  const [activeTab, setActiveTab] = useState<'resolved-agenda' | 'weekly-template' | 'calendar-overrides' | 'dropin-kiosk'>('resolved-agenda');

  // Selected Date for Daily Resolution (Defaults to today: 2026-11-14)
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');

  // Resolves schedule using Layer 2 Calendar Override Engine
  const resolvedToday = useMemo(() => {
    return resolveDateSchedule(selectedDate);
  }, [resolveDateSchedule, selectedDate]);

  // =========================================================================
  // LAYER 1: WEEKLY TEMPLATE STATE & CONTROLS
  // =========================================================================
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [isAddingTemplateSlot, setIsAddingTemplateSlot] = useState(false);
  const [tplSubjectCode, setTplSubjectCode] = useState('311');
  const [tplTeacherId, setTplTeacherId] = useState('tch-001');
  const [tplRoom, setTplRoom] = useState('Room 204');
  const [tplStartTime, setTplStartTime] = useState('09:00');
  const [tplEndTime, setTplEndTime] = useState('10:30');
  const [tplSessionType, setTplSessionType] = useState<WeeklyTemplateSlot['sessionType']>('Regular Lecture');
  const [zeroSetupMessage, setZeroSetupMessage] = useState<string | null>(null);

  // Template slots for the selected day
  const dayTemplateSlots = useMemo(() => {
    return weeklyTemplate
      .filter(t => t.dayOfWeek === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [weeklyTemplate, selectedDay]);

  const handleAddTemplateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find(t => t.id === tplTeacherId);
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

    const newSlot: WeeklyTemplateSlot = {
      id: `tpl-${selectedDay.toLowerCase()}-${Date.now()}`,
      dayOfWeek: selectedDay,
      slotLabel: `${tplStartTime} - ${tplEndTime} Block`,
      startTime: tplStartTime,
      endTime: tplEndTime,
      subjectCode: tplSubjectCode,
      subjectName: subjectNameMap[tplSubjectCode] || `Subject ${tplSubjectCode}`,
      teacherId: tplTeacherId,
      teacherName: teacher?.name || 'Faculty Member',
      room: tplRoom,
      sessionType: tplSessionType
    };

    updateWeeklyTemplate([...weeklyTemplate, newSlot]);
    setIsAddingTemplateSlot(false);
  };

  const handleDeleteTemplateSlot = (id: string) => {
    updateWeeklyTemplate(weeklyTemplate.filter(t => t.id !== id));
  };

  const handleZeroSetupRollout = () => {
    const res = saveLoggedSchedulesAsWeeklyTemplate();
    if (res.success) {
      setZeroSetupMessage(`Zero-Setup Success! Promoted ${res.count} logged sessions into the Master Weekly Template.`);
    } else {
      setZeroSetupMessage('No active schedules found to extract. Create slots first or use default template.');
    }
    setTimeout(() => setZeroSetupMessage(null), 5000);
  };

  // =========================================================================
  // LAYER 2: CALENDAR OVERRIDE STATE & CONTROLS
  // =========================================================================
  const [isAddingOverride, setIsAddingOverride] = useState(false);
  const [ovrDate, setOvrDate] = useState('2026-11-20');
  const [ovrType, setOvrType] = useState<OverrideType>('HOLIDAY');
  const [ovrTitle, setOvrTitle] = useState('');
  const [ovrTargetDay, setOvrTargetDay] = useState<DayOfWeek>('Tuesday');
  const [ovrEventName, setOvrEventName] = useState('NIOS Formative TMA Review');
  const [ovrEventRoom, setOvrEventRoom] = useState('Computer Lab 1');

  const handleCreateOverride = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarOverride({
      date: ovrDate,
      type: ovrType,
      title: ovrTitle || (ovrType === 'HOLIDAY' ? 'Official Holiday' : ovrType === 'DAY_SWAP' ? `Follow ${ovrTargetDay} Timetable` : ovrEventName),
      targetDayOfWeek: ovrType === 'DAY_SWAP' ? ovrTargetDay : undefined,
      description: ovrType === 'HOLIDAY' ? 'Centre closed. All regular lecture blocks suppressed.' : undefined,
      eventDetails: ovrType === 'EVENT' ? {
        eventName: ovrEventName,
        description: 'Special non-lecture NIOS milestone drive.',
        room: ovrEventRoom,
        coordinator: 'Centre Academic Coordinator',
        timings: '10:00 AM - 04:00 PM'
      } : undefined
    });
    setIsAddingOverride(false);
    setOvrTitle('');
  };

  // =========================================================================
  // LAYER 3: FRONT-DESK DROP-IN & KIOSK STATE
  // =========================================================================
  const [kioskStudentId, setKioskStudentId] = useState<string>(students[0]?.id || 'std-001');
  const [kioskArrivalTime, setKioskArrivalTime] = useState<string>('10:25');
  const [checkInNotice, setCheckInNotice] = useState<string | null>(null);

  const kioskStudent = students.find(s => s.id === kioskStudentId) || students[0];

  // Resolve kiosk student's agenda for selectedDate
  const kioskStudentAgenda = useMemo(() => {
    if (!kioskStudent || resolvedToday.isHoliday) return [];
    const enrolledCodes = kioskStudent.subjects.map(s => s.code);
    return resolvedToday.slots.filter(s => enrolledCodes.includes(s.subjectCode));
  }, [kioskStudent, resolvedToday]);

  // Match drop-in arrival against student's agenda
  const dropInMatch = useMemo(() => {
    if (!kioskStudent) return null;
    return matchStudentDropIn(kioskStudent, kioskArrivalTime, kioskStudentAgenda);
  }, [kioskStudent, kioskArrivalTime, kioskStudentAgenda]);

  const handleRecordSubjectAttendance = (subjectCode: string, slotTitle: string, status: 'PRESENT' | 'ABSENT') => {
    if (!kioskStudent) return;
    submitAttendance({
      scheduleId: dropInMatch?.expectedSlot?.id || `slot-${subjectCode}`,
      date: selectedDate,
      subjectCode,
      batch: 'Standard Enrolled Batch',
      locked: true,
      records: [
        {
          studentId: kioskStudent.id,
          studentName: kioskStudent.name,
          enrolmentNo: kioskStudent.nios.enrolmentNo,
          status: status === 'PRESENT' ? 'PRESENT' : 'ABSENT',
          excusedNote: status === 'ABSENT' ? 'Missed Lecture Block (Automated Alert Sent)' : undefined
        }
      ]
    });

    setCheckInNotice(
      status === 'PRESENT'
        ? `Checked In! Marked PRESENT for [${subjectCode}] ${slotTitle}.`
        : `Flagged MISSED LESSON for [${subjectCode}] ${slotTitle}. Dispatched follow-up alert to parent.`
    );
    setTimeout(() => setCheckInNotice(null), 4000);
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
              [F-SCH-507..509]
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              3-Layer Timetable &amp; Calendar Override Architecture
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
            Master Timetable &amp; Operations Studio
          </h2>
        </div>

        {/* Global Date Selector for Live Daily Resolution */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-surface-primary)', padding: '0.4rem 0.75rem', borderRadius: 6, border: '1px solid var(--border-hairline)' }}>
          <Calendar size={15} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Date:</span>
          <input
            type="date"
            className="gravel-input font-mono"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'resolved-agenda', label: '1. Today\'s Resolved Schedule', badge: resolvedToday.state },
          { id: 'weekly-template', label: 'Layer 1: Weekly Base Template (9AM-5PM)', badge: `${weeklyTemplate.length} Slots` },
          { id: 'calendar-overrides', label: 'Layer 2: Calendar Overrides & Day-Swaps', badge: `${calendarOverrides.length} Rules` },
          { id: 'dropin-kiosk', label: 'Layer 3: Front-Desk Check-In Kiosk', badge: 'Live Drop-In' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`gravel-btn ${activeTab === tab.id ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
            style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>{tab.label}</span>
            <span style={{ 
              fontSize: '0.65rem', 
              background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--accent-subtle)', 
              color: activeTab === tab.id ? '#fff' : 'var(--accent-primary)',
              padding: '1px 6px', 
              borderRadius: 4,
              fontWeight: 700
            }}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: RESOLVED DAILY TIMETABLE (LAYER 2 ENGINE OUTPUT)        */}
      {/* ============================================================== */}
      {activeTab === 'resolved-agenda' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Resolution Status Banner */}
          <div 
            className="gravel-card" 
            style={{ 
              padding: '1rem 1.25rem',
              borderLeft: resolvedToday.isHoliday 
                ? '4px solid var(--status-absent)' 
                : resolvedToday.state === 'DAY_SWAP' 
                ? '4px solid var(--status-late)' 
                : resolvedToday.state === 'EVENT'
                ? '4px solid var(--accent-secondary)'
                : '4px solid var(--status-present)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>
                    {resolvedToday.dayOfWeek}, {resolvedToday.date}
                  </span>
                  <span className={`status-pill ${
                    resolvedToday.isHoliday ? 'status-pill-absent' :
                    resolvedToday.state === 'DAY_SWAP' ? 'status-pill-late' :
                    resolvedToday.state === 'EVENT' ? 'status-pill-present' : 'status-pill-present'
                  }`} style={{ fontSize: '0.7rem' }}>
                    {resolvedToday.state}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  {resolvedToday.isHoliday && (
                    <strong style={{ color: 'var(--status-absent)' }}>
                      🛑 CENTRE CLOSED: {resolvedToday.overrideInfo?.title}. All regular lecture slots are suppressed. Automated class alerts are stopped.
                    </strong>
                  )}
                  {resolvedToday.state === 'DAY_SWAP' && (
                    <strong style={{ color: 'var(--status-late)' }}>
                      🔄 DAY-SWAP RULE ACTIVE: {resolvedToday.overrideInfo?.title}. Running {resolvedToday.overrideInfo?.targetDayOfWeek} timetable without altering master template.
                    </strong>
                  )}
                  {resolvedToday.state === 'EVENT' && (
                    <strong style={{ color: 'var(--accent-secondary)' }}>
                      🎯 SPECIAL MILESTONE DRIVE: {resolvedToday.overrideInfo?.title}. Overlaying non-lecture activities.
                    </strong>
                  )}
                  {resolvedToday.state === 'NORMAL' && (
                    <span>Standard operational weekday timetable running {resolvedToday.slots.length} modular subject blocks.</span>
                  )}
                </div>
              </div>

              {/* Quick Simulation Dates */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Simulate KSIT Rules:</span>
                <button 
                  onClick={() => setSelectedDate('2026-11-14')} 
                  className="gravel-btn gravel-btn-outline" 
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                >
                  Day-Swap (Nov 14)
                </button>
                <button 
                  onClick={() => setSelectedDate('2026-11-15')} 
                  className="gravel-btn gravel-btn-outline" 
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', color: 'var(--status-absent)' }}
                >
                  Holiday (Nov 15)
                </button>
                <button 
                  onClick={() => setSelectedDate('2026-11-18')} 
                  className="gravel-btn gravel-btn-outline" 
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', color: 'var(--accent-secondary)' }}
                >
                  TMA Drive (Nov 18)
                </button>
                <button 
                  onClick={() => setSelectedDate('2026-11-16')} 
                  className="gravel-btn gravel-btn-outline" 
                  style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
                >
                  Normal Mon (Nov 16)
                </button>
              </div>
            </div>
          </div>

          {/* Slots List */}
          {resolvedToday.isHoliday ? (
            <div className="gravel-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>🏖️</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Coaching Centre is Closed Today</h3>
              <p style={{ fontSize: '0.8rem', maxWidth: '450px', margin: '0.5rem auto 0' }}>
                {resolvedToday.overrideInfo?.description || 'All regular PCP and lecture sessions are paused. Self-study library desks remain accessible via digital PWA vault.'}
              </p>
            </div>
          ) : resolvedToday.slots.length === 0 ? (
            <div className="gravel-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No subject slots scheduled for this date.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.85rem' }}>
              {resolvedToday.slots.map((slot) => {
                const enrolledCount = students.filter(s => s.subjects.some(sub => sub.code === slot.subjectCode)).length;

                return (
                  <div 
                    key={slot.id} 
                    className="gravel-card" 
                    style={{ 
                      padding: '1rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.5rem',
                      borderLeft: slot.isSpecialEvent ? '4px solid var(--accent-secondary)' : '4px solid var(--accent-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.78rem' }}>
                          [{slot.subjectCode}]
                        </span>
                        <h4 style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 1 }}>{slot.title}</h4>
                      </div>
                      <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>
                        {slot.sessionType}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={13} />
                        <span className="font-mono"><strong>{slot.startTime} - {slot.endTime}</strong> (1.5h Slot)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={13} />
                        <span>Room: <strong>{slot.room}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <User size={13} />
                        <span>Faculty: <strong>{slot.teacherName}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <UserCheck size={13} style={{ color: 'var(--accent-primary)' }} />
                        <span>Enrolled NIOS Cohort: <strong>{enrolledCount} Students</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: LAYER 1 — WEEKLY BASE TEMPLATE (9AM-5PM)                */}
      {/* ============================================================== */}
      {activeTab === 'weekly-template' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Layer 1 Banner */}
          <div className="gravel-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Layer 1: Subject-Slot Weekly Base Template</h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                  [F-SCH-507]
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                Modular 1 to 1.5-hour subject blocks between 9:00 AM – 5:00 PM. NIOS students attend only their enrolled subjects.
              </p>
            </div>

            {/* Zero-Setup Rollout Button */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={handleZeroSetupRollout}
                className="gravel-btn gravel-btn-outline"
                style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}
                title="Converts recently logged sessions into default weekly schedule"
              >
                <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>Zero-Setup Rollout (Auto-Extract Template)</span>
              </button>

              <button
                onClick={() => setIsAddingTemplateSlot(!isAddingTemplateSlot)}
                className="gravel-btn gravel-btn-primary"
                style={{ fontSize: '0.78rem' }}
              >
                <Plus size={14} /> Add Slot to {selectedDay}
              </button>
            </div>
          </div>

          {zeroSetupMessage && (
            <div style={{ padding: '0.75rem', background: 'var(--status-present-bg)', color: 'var(--status-present)', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>
              {zeroSetupMessage}
            </div>
          )}

          {/* Add Slot Form Drawer */}
          {isAddingTemplateSlot && (
            <form onSubmit={handleAddTemplateSlot} className="gravel-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', border: '1.5px solid var(--accent-primary)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Add Subject Slot to {selectedDay} Base Schedule</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Subject Code &amp; Name</label>
                  <select className="gravel-input" style={{ width: '100%' }} value={tplSubjectCode} onChange={(e) => setTplSubjectCode(e.target.value)}>
                    <option value="311">[311] Mathematics (Class 12)</option>
                    <option value="312">[312] Physics (Class 12)</option>
                    <option value="313">[313] Chemistry (Class 12)</option>
                    <option value="302">[302] English (Class 12)</option>
                    <option value="330">[330] Computer Science (Class 12)</option>
                    <option value="336">[336] Data Entry Operations (Class 12)</option>
                    <option value="211">[211] Mathematics (Class 10)</option>
                    <option value="212">[212] Science &amp; Technology (Class 10)</option>
                    <option value="201">[201] Hindi (Class 10)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Start Time (9 AM - 5 PM)</label>
                  <input type="time" className="gravel-input font-mono" style={{ width: '100%' }} value={tplStartTime} onChange={(e) => setTplStartTime(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>End Time</label>
                  <input type="time" className="gravel-input font-mono" style={{ width: '100%' }} value={tplEndTime} onChange={(e) => setTplEndTime(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Assigned Faculty</label>
                  <select className="gravel-input" style={{ width: '100%' }} value={tplTeacherId} onChange={(e) => setTplTeacherId(e.target.value)}>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.employeeId})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Room / Hall</label>
                  <select className="gravel-input" style={{ width: '100%' }} value={tplRoom} onChange={(e) => setTplRoom(e.target.value)}>
                    <option value="Room 101">Room 101 (Lecture Hall)</option>
                    <option value="Room 102">Room 102 (Language Lab)</option>
                    <option value="Room 204">Room 204 (Maths &amp; Theory)</option>
                    <option value="Science Lab 1">Science Lab 1 (Physics/Chem)</option>
                    <option value="Computer Lab 1">Computer Lab 1 (CS &amp; DEO)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Session Type</label>
                  <select className="gravel-input" style={{ width: '100%' }} value={tplSessionType} onChange={(e) => setTplSessionType(e.target.value as any)}>
                    <option value="Regular Lecture">Regular Lecture</option>
                    <option value="NIOS Theory PCP">NIOS Theory PCP (Counselling)</option>
                    <option value="NIOS Mandatory Practical PCP">NIOS Mandatory Practical PCP</option>
                    <option value="Doubt Clearing">Doubt Clearing</option>
                    <option value="Mock/Internal Exam">Mock/Internal Exam</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
                <button type="button" onClick={() => setIsAddingTemplateSlot(false)} className="gravel-btn gravel-btn-outline" style={{ fontSize: '0.75rem' }}>
                  Cancel
                </button>
                <button type="submit" className="gravel-btn gravel-btn-primary" style={{ fontSize: '0.75rem' }}>
                  Save Slot to Template
                </button>
              </div>
            </form>
          )}

          {/* Day of Week Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {DAYS_OF_WEEK.map((day) => {
              const count = weeklyTemplate.filter(t => t.dayOfWeek === day).length;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`gravel-btn ${selectedDay === day ? 'gravel-btn-primary' : 'gravel-btn-outline'}`}
                  style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span>{day}</span>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    background: selectedDay === day ? 'rgba(255,255,255,0.2)' : 'var(--accent-subtle)', 
                    color: selectedDay === day ? '#fff' : 'var(--accent-primary)',
                    padding: '1px 5px', 
                    borderRadius: 3 
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slots Table for Selected Day */}
          <div className="gravel-card" style={{ padding: '1rem', overflowX: 'auto' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              {selectedDay} Base Slots ({dayTemplateSlots.length} Blocks):
            </h4>

            {dayTemplateSlots.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                No default slots defined for {selectedDay}. Click "+ Add Slot to {selectedDay}" to create one.
              </div>
            ) : (
              <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-hairline)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.5rem' }}>Time Slot</th>
                    <th style={{ padding: '0.5rem' }}>Subject Code &amp; Name</th>
                    <th style={{ padding: '0.5rem' }}>Assigned Faculty</th>
                    <th style={{ padding: '0.5rem' }}>Room / Lab</th>
                    <th style={{ padding: '0.5rem' }}>Type</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dayTemplateSlots.map((slot) => (
                    <tr key={slot.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                      <td style={{ padding: '0.5rem' }} className="font-mono">
                        <strong>{slot.startTime} - {slot.endTime}</strong>
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 700, marginRight: 6 }}>
                          [{slot.subjectCode}]
                        </span>
                        <span>{slot.subjectName}</span>
                      </td>
                      <td style={{ padding: '0.5rem' }}>{slot.teacherName}</td>
                      <td style={{ padding: '0.5rem' }}>{slot.room}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span className="status-pill status-pill-present" style={{ fontSize: '0.62rem' }}>
                          {slot.sessionType}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteTemplateSlot(slot.id)}
                          style={{ background: 'transparent', border: 'none', color: 'var(--status-absent)', cursor: 'pointer' }}
                          title="Delete slot"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LAYER 2 — CALENDAR OVERRIDE ENGINE & DAY-SWAPS           */}
      {/* ============================================================== */}
      {activeTab === 'calendar-overrides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="gravel-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Layer 2: Calendar Override Engine (KSIT Priority States)</h3>
                <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                  [F-SCH-508]
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                Evaluates dates against 4 priority states: <strong>NORMAL</strong>, <strong>HOLIDAY</strong> (suppresses all lectures), <strong>DAY_SWAP</strong> (e.g. Saturday follows Tuesday timetable), and <strong>EVENT</strong> (TMA / Practical drives).
              </p>
            </div>

            <button
              onClick={() => setIsAddingOverride(!isAddingOverride)}
              className="gravel-btn gravel-btn-primary"
              style={{ fontSize: '0.78rem' }}
            >
              <Plus size={14} /> Add Calendar Override
            </button>
          </div>

          {/* Add Override Drawer */}
          {isAddingOverride && (
            <form onSubmit={handleCreateOverride} className="gravel-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', border: '1.5px solid var(--accent-primary)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Add Calendar Exception or Day-Swap Rule</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Target Date</label>
                  <input type="date" className="gravel-input font-mono" style={{ width: '100%' }} value={ovrDate} onChange={(e) => setOvrDate(e.target.value)} required />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Rule Priority State</label>
                  <select className="gravel-input" style={{ width: '100%' }} value={ovrType} onChange={(e) => setOvrType(e.target.value as any)}>
                    <option value="HOLIDAY">HOLIDAY — Centre Closed (Suppress All Lectures)</option>
                    <option value="DAY_SWAP">DAY_SWAP — Follow Another Day's Timetable</option>
                    <option value="EVENT">EVENT — Non-Lecture NIOS Milestone Activity</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Rule Title / Reason</label>
                  <input type="text" className="gravel-input" style={{ width: '100%' }} placeholder="e.g. Guru Nanak Jayanti" value={ovrTitle} onChange={(e) => setOvrTitle(e.target.value)} required />
                </div>

                {ovrType === 'DAY_SWAP' && (
                  <div>
                    <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Target Timetable to Follow</label>
                    <select className="gravel-input" style={{ width: '100%' }} value={ovrTargetDay} onChange={(e) => setOvrTargetDay(e.target.value as any)}>
                      <option value="Monday">Follow Monday Timetable</option>
                      <option value="Tuesday">Follow Tuesday Timetable</option>
                      <option value="Wednesday">Follow Wednesday Timetable</option>
                      <option value="Thursday">Follow Thursday Timetable</option>
                      <option value="Friday">Follow Friday Timetable</option>
                    </select>
                  </div>
                )}

                {ovrType === 'EVENT' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Milestone Event Name</label>
                      <input type="text" className="gravel-input" style={{ width: '100%' }} value={ovrEventName} onChange={(e) => setOvrEventName(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Room / Venue</label>
                      <input type="text" className="gravel-input" style={{ width: '100%' }} value={ovrEventRoom} onChange={(e) => setOvrEventRoom(e.target.value)} />
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
                <button type="button" onClick={() => setIsAddingOverride(false)} className="gravel-btn gravel-btn-outline" style={{ fontSize: '0.75rem' }}>
                  Cancel
                </button>
                <button type="submit" className="gravel-btn gravel-btn-primary" style={{ fontSize: '0.75rem' }}>
                  Save Calendar Override
                </button>
              </div>
            </form>
          )}

          {/* Active Overrides Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.85rem' }}>
            {calendarOverrides.map((ovr) => (
              <div 
                key={ovr.id} 
                className="gravel-card" 
                style={{ 
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  borderLeft: ovr.type === 'HOLIDAY' 
                    ? '4px solid var(--status-absent)' 
                    : ovr.type === 'DAY_SWAP' 
                    ? '4px solid var(--status-late)' 
                    : '4px solid var(--accent-secondary)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {ovr.date}
                    </span>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: 1 }}>{ovr.title}</h4>
                  </div>
                  <span className={`status-pill ${
                    ovr.type === 'HOLIDAY' ? 'status-pill-absent' :
                    ovr.type === 'DAY_SWAP' ? 'status-pill-late' : 'status-pill-present'
                  }`} style={{ fontSize: '0.65rem' }}>
                    {ovr.type}
                  </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {ovr.type === 'DAY_SWAP' && (
                    <span>Injects <strong>{ovr.targetDayOfWeek}</strong> timetable blocks into this date.</span>
                  )}
                  {ovr.type === 'HOLIDAY' && (
                    <span>Suppresses all lectures and pauses automated class alerts.</span>
                  )}
                  {ovr.type === 'EVENT' && (
                    <span>Activity: <strong>{ovr.eventDetails?.eventName}</strong> ({ovr.eventDetails?.room || 'All Labs'})</span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, borderTop: '1px solid var(--border-hairline)', paddingTop: 6 }}>
                  <button
                    onClick={() => setSelectedDate(ovr.date)}
                    className="gravel-btn gravel-btn-outline"
                    style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
                  >
                    View Resolved Date
                  </button>
                  <button
                    onClick={() => deleteCalendarOverride(ovr.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--status-absent)', cursor: 'pointer', fontSize: '0.72rem' }}
                  >
                    Remove Rule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: LAYER 3 — FRONT-DESK CHECK-IN & DROP-IN KIOSK           */}
      {/* ============================================================== */}
      {activeTab === 'dropin-kiosk' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Header */}
          <div className="gravel-card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Layer 3: Front-Desk Check-In &amp; Drop-In Matching Engine</h3>
              <span className="font-mono" style={{ fontSize: '0.65rem', background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                [F-SCH-509]
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              Matches student arrival time against today's resolved subject blocks, calculates break gap-times, and logs subject-level attendance.
            </p>
          </div>

          {/* Student Picker & Arrival Time Selector */}
          <div className="gravel-card" style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>Select Arriving Learner</label>
              <select 
                className="gravel-input" 
                style={{ width: '100%', fontWeight: 600 }}
                value={kioskStudentId} 
                onChange={(e) => setKioskStudentId(e.target.value)}
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nios.enrolmentNo}) — Enrolled in {s.subjects.length} subjects
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>Arrival Timestamp (9 AM - 5 PM)</label>
              <input 
                type="time" 
                className="gravel-input font-mono" 
                style={{ width: '100%', fontWeight: 700 }}
                value={kioskArrivalTime} 
                onChange={(e) => setKioskArrivalTime(e.target.value)} 
              />
            </div>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 14 }}>
              <button 
                onClick={() => setKioskArrivalTime('10:25')} 
                className="gravel-btn gravel-btn-outline" 
                style={{ fontSize: '0.7rem' }}
              >
                10:25 AM (Before Maths)
              </button>
              <button 
                onClick={() => setKioskArrivalTime('12:15')} 
                className="gravel-btn gravel-btn-outline" 
                style={{ fontSize: '0.7rem' }}
              >
                12:15 PM (In Break Gap)
              </button>
              <button 
                onClick={() => setKioskArrivalTime('14:25')} 
                className="gravel-btn gravel-btn-outline" 
                style={{ fontSize: '0.7rem' }}
              >
                02:25 PM (Before CS)
              </button>
            </div>
          </div>

          {checkInNotice && (
            <div style={{ padding: '0.75rem', background: 'var(--status-present-bg)', color: 'var(--status-present)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700 }}>
              {checkInNotice}
            </div>
          )}

          {/* Drop-In Matching Result Card */}
          {dropInMatch && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              
              {/* Box 1: Expected Now */}
              <div 
                className="gravel-card" 
                style={{ 
                  padding: '1.25rem', 
                  borderTop: dropInMatch.expectedSlot ? '4px solid var(--status-present)' : '4px solid var(--border-hairline)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    1. EXPECTED LECTURE NOW:
                  </span>
                  {dropInMatch.expectedSlot ? (
                    <span className="status-pill status-pill-present" style={{ fontSize: '0.65rem' }}>In Window</span>
                  ) : (
                    <span className="status-pill status-pill-absent" style={{ fontSize: '0.65rem' }}>No Class Right Now</span>
                  )}
                </div>

                {dropInMatch.expectedSlot ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                        [{dropInMatch.expectedSlot.subjectCode}]
                      </span>
                      <strong style={{ fontSize: '0.95rem' }}>{dropInMatch.expectedSlot.title}</strong>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div>Time: <strong>{dropInMatch.expectedSlot.startTime} - {dropInMatch.expectedSlot.endTime}</strong></div>
                      <div>Room: <strong>{dropInMatch.expectedSlot.room}</strong></div>
                      <div>Faculty: <strong>{dropInMatch.expectedSlot.teacherName}</strong></div>
                    </div>

                    {/* 1-Click Subject-Level Attendance Action */}
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <button
                        onClick={() => handleRecordSubjectAttendance(dropInMatch.expectedSlot!.subjectCode, dropInMatch.expectedSlot!.title, 'PRESENT')}
                        className="gravel-btn gravel-btn-primary"
                        style={{ fontSize: '0.75rem', flex: 1, padding: '0.4rem' }}
                      >
                        <CheckCircle size={14} /> Mark Present for this Block
                      </button>
                      <button
                        onClick={() => handleRecordSubjectAttendance(dropInMatch.expectedSlot!.subjectCode, dropInMatch.expectedSlot!.title, 'ABSENT')}
                        className="gravel-btn gravel-btn-outline"
                        style={{ fontSize: '0.75rem', color: 'var(--status-absent)', padding: '0.4rem' }}
                        title="Flag Missed Lesson"
                      >
                        Flag Missed
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', padding: '1rem 0' }}>
                    Student has no active subject block starting at {kioskArrivalTime}.
                  </div>
                )}
              </div>

              {/* Box 2: Next Slot Today & Gap Time Flag */}
              <div 
                className="gravel-card" 
                style={{ 
                  padding: '1.25rem',
                  borderTop: dropInMatch.nextSlotToday ? '4px solid var(--accent-primary)' : '4px solid var(--border-hairline)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    2. NEXT UPCOMING SLOT TODAY:
                  </span>
                  {dropInMatch.nextSlotToday && (
                    <span className="status-pill status-pill-late" style={{ fontSize: '0.65rem' }}>Upcoming</span>
                  )}
                </div>

                {dropInMatch.nextSlotToday ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                        [{dropInMatch.nextSlotToday.subjectCode}]
                      </span>
                      <strong style={{ fontSize: '0.95rem' }}>{dropInMatch.nextSlotToday.title}</strong>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <div>Time: <strong>{dropInMatch.nextSlotToday.startTime} - {dropInMatch.nextSlotToday.endTime}</strong></div>
                      <div>Room: <strong>{dropInMatch.nextSlotToday.room}</strong></div>
                      <div>Faculty: <strong>{dropInMatch.nextSlotToday.teacherName}</strong></div>
                    </div>

                    {/* Gap-Time Warning Card */}
                    {dropInMatch.gapNotice && (
                      <div style={{ 
                        marginTop: 8, 
                        padding: '0.65rem 0.85rem', 
                        background: 'var(--accent-subtle)', 
                        borderRadius: 6, 
                        borderLeft: '3px solid var(--status-late)',
                        fontSize: '0.73rem',
                        color: 'var(--text-primary)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--status-late)', marginBottom: 2 }}>
                          <Coffee size={14} />
                          <span>Inter-Subject Gap Time Detected</span>
                        </div>
                        <div>{dropInMatch.gapNotice}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', padding: '1rem 0' }}>
                    No further lectures scheduled for this student today.
                  </div>
                )}
              </div>

              {/* Box 3: Student's Enrolled Subjects vs Today's Running Subjects */}
              <div className="gravel-card" style={{ padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
                  3. FILTERED DAILY AGENDA ({kioskStudentAgenda.length} Slots):
                </span>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Student is enrolled in {kioskStudent.subjects.length} subjects ({kioskStudent.subjects.map(s => s.code).join(', ')}). Today runs {resolvedToday.slots.length} total blocks across centre.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {kioskStudentAgenda.map((slot) => (
                    <div 
                      key={slot.id} 
                      style={{ 
                        padding: '4px 8px', 
                        background: 'var(--bg-surface-muted)', 
                        borderRadius: 4, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.72rem'
                      }}
                    >
                      <span>
                        <strong className="font-mono" style={{ color: 'var(--accent-primary)', marginRight: 4 }}>[{slot.subjectCode}]</strong>
                        {slot.subjectName}
                      </span>
                      <span className="font-mono"><strong>{slot.startTime} - {slot.endTime}</strong> ({slot.room})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
