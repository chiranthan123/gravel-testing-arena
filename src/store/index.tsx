// GRAVEL — Core Application Store & Persistence Context
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Role,
  InstitutionPreset,
  ThemeId,
  FeatureIndex,
  StudentRecord,
  TeacherRecord,
  ScheduleEvent,
  StudyMaterial,
  SyllabusChecklistTopic,
  NotificationItem,
  AuditLogEntry,
  AttendanceEntry,
  WeeklyTemplateSlot,
  CalendarOverride,
  ResolvedDailySchedule
} from '../types';
import { MASTER_FEATURE_REGISTRY, applyPresetToFeatures } from '../featureRegistry';
import { applyTheme } from '../theme/themes';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_SCHEDULES,
  INITIAL_MATERIALS,
  INITIAL_CHECKLIST,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from './mockData';
import {
  generateDefaultWeeklyTemplate,
  getDefaultCalendarOverrides,
  resolveDailySchedule,
  extractWeeklyTemplateFromLoggedSchedules
} from '../utils/scheduleEngine';

interface AppContextType {
  // Roles & Shell State
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  institutionPreset: InstitutionPreset;
  setInstitutionPreset: (preset: InstitutionPreset) => void;
  currentTheme: ThemeId;
  setCurrentTheme: (theme: ThemeId) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Shadow Login
  impersonatedStudentId: string | null;
  setImpersonatedStudentId: (id: string | null) => void;
  impersonatedTeacherId: string | null;
  setImpersonatedTeacherId: (id: string | null) => void;

  // Features
  features: FeatureIndex[];
  toggleFeature: (featureId: string) => void;
  isFeatureEnabled: (featureId: string) => boolean;

  // Entities
  students: StudentRecord[];
  teachers: TeacherRecord[];
  schedules: ScheduleEvent[];
  materials: StudyMaterial[];
  checklist: SyllabusChecklistTopic[];
  notifications: NotificationItem[];
  auditLogs: AuditLogEntry[];
  attendanceLogs: AttendanceEntry[];

  // Entity Actions
  addStudent: (student: Omit<StudentRecord, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;
  bulkDeleteStudents: (ids: string[]) => void;
  bulkUpdateStatus: (ids: string[], status: StudentRecord['status']) => void;
  bulkSendTmaReminder: (ids: string[]) => void;

  updateTeacher: (id: string, updates: Partial<TeacherRecord>) => void;
  toggleTeacherDelegation: (teacherId: string, delegation: TeacherRecord['delegation']) => void;

  addSchedule: (event: Omit<ScheduleEvent, 'id'>) => { success: boolean; conflictReason?: string };
  rescheduleClass: (id: string, newDate: string, newStart: string, newEnd: string, newRoom: string) => { success: boolean; conflictReason?: string };
  cancelClass: (id: string, reason: string) => void;

  submitAttendance: (entry: Omit<AttendanceEntry, 'id'>) => void;
  updateTmaMarks: (studentId: string, subjectCode: string, marks: number, status: 'Submitted to AI' | 'Evaluated' | 'Pending', feedback?: string) => void;
  updatePracticalMarks: (studentId: string, subjectCode: string, marks: number) => void;

  updateTopicStatus: (topicId: string, status: SyllabusChecklistTopic['status']) => void;
  toggleOfflineMaterial: (materialId: string) => void;
  addStudyMaterial: (material: Omit<StudyMaterial, 'id'>) => void;

  addNotification: (notif: Omit<NotificationItem, 'id' | 'createdAt' | 'readCount'>) => void;
  deleteNotification: (id: string) => void;

  // 3-Layer Timetable & Override Engine
  weeklyTemplate: WeeklyTemplateSlot[];
  calendarOverrides: CalendarOverride[];
  updateWeeklyTemplate: (slots: WeeklyTemplateSlot[]) => void;
  saveLoggedSchedulesAsWeeklyTemplate: () => { success: boolean; count: number };
  addCalendarOverride: (override: Omit<CalendarOverride, 'id'>) => void;
  deleteCalendarOverride: (id: string) => void;
  resolveDateSchedule: (date: string) => ResolvedDailySchedule;

  // Dev tools
  resetDatabase: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (json: string) => boolean;
  addAuditLog: (action: AuditLogEntry['action'], details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'gravel_pwa_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem(STORAGE_KEY_PREFIX + 'theme') as ThemeId) || 'slate-dark';
  });

  // Current Role
  const [currentRole, setCurrentRole] = useState<Role>('ADMIN');

  // Institution Preset
  const [institutionPreset, setInstitutionPresetState] = useState<InstitutionPreset>(() => {
    return (localStorage.getItem(STORAGE_KEY_PREFIX + 'preset') as InstitutionPreset) || 'NIOS';
  });

  // Online / Offline
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Global search modal
  const [searchOpen, setSearchOpen] = useState(false);

  // Shadow login / active targets
  const [impersonatedStudentId, setImpersonatedStudentId] = useState<string | null>(null);
  const [impersonatedTeacherId, setImpersonatedTeacherId] = useState<string | null>(null);

  // Features
  const [features, setFeatures] = useState<FeatureIndex[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'features');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return MASTER_FEATURE_REGISTRY;
  });

  // Entities
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<TeacherRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [schedules, setSchedules] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'schedules');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [checklist, setChecklist] = useState<SyllabusChecklistTopic[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'auditLogs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'attendanceLogs');
    return saved ? JSON.parse(saved) : [];
  });

  // Layer 1: Weekly Template (Base Schedule)
  const [weeklyTemplate, setWeeklyTemplateState] = useState<WeeklyTemplateSlot[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'weeklyTemplate');
    return saved ? JSON.parse(saved) : generateDefaultWeeklyTemplate();
  });

  // Layer 2: Calendar Overrides (Holidays, Day-Swaps, Special Events)
  const [calendarOverrides, setCalendarOverridesState] = useState<CalendarOverride[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'calendarOverrides');
    return saved ? JSON.parse(saved) : getDefaultCalendarOverrides();
  });

  // Apply Theme on change
  useEffect(() => {
    applyTheme(currentTheme);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'theme', currentTheme);
  }, [currentTheme]);

  // Network listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'features', JSON.stringify(features));
  }, [features]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'attendanceLogs', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'weeklyTemplate', JSON.stringify(weeklyTemplate));
  }, [weeklyTemplate]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'calendarOverrides', JSON.stringify(calendarOverrides));
  }, [calendarOverrides]);

  const addAuditLog = (action: AuditLogEntry['action'], details: string) => {
    const entry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action,
      userRole: currentRole,
      userName: currentRole === 'DEV' ? 'Platform Engineer' : currentRole === 'ADMIN' ? 'Head Administrator' : currentRole === 'TEACHER' ? 'Faculty' : 'Student',
      details,
      ip: '127.0.0.1'
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  const setCurrentTheme = (theme: ThemeId) => {
    setCurrentThemeState(theme);
    addAuditLog('UPDATE', `Theme switched to ${theme}`);
  };

  const setInstitutionPreset = (preset: InstitutionPreset) => {
    setInstitutionPresetState(preset);
    localStorage.setItem(STORAGE_KEY_PREFIX + 'preset', preset);
    const updated = applyPresetToFeatures(features, preset);
    setFeatures(updated);
    addAuditLog('UPDATE', `Institution Blueprint Preset switched to ${preset}`);
  };

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(f => {
      if (f.id === featureId) {
        const nextState = !f.enabled;
        addAuditLog('UPDATE', `Feature ${f.id} (${f.name}) toggled to ${nextState ? 'ENABLED' : 'DISABLED'}`);
        return { ...f, enabled: nextState };
      }
      return f;
    }));
  };

  const isFeatureEnabled = (featureId: string): boolean => {
    const feat = features.find(f => f.id === featureId);
    if (!feat) return false;
    return feat.enabled && feat.allowedRoles.includes(currentRole);
  };

  // Student operations
  const addStudent = (studentData: Omit<StudentRecord, 'id'>) => {
    const newStudent: StudentRecord = {
      ...studentData,
      id: 'std-' + Date.now()
    };
    setStudents(prev => [newStudent, ...prev]);
    addAuditLog('CREATE', `Added new student: ${newStudent.name} (Enrol: ${newStudent.nios.enrolmentNo})`);
  };

  const updateStudent = (id: string, updates: Partial<StudentRecord>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addAuditLog('UPDATE', `Updated student profile ID: ${id}`);
  };

  const deleteStudent = (id: string) => {
    const std = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    addAuditLog('DELETE', `Deleted student: ${std?.name || id}`);
  };

  const bulkDeleteStudents = (ids: string[]) => {
    setStudents(prev => prev.filter(s => !ids.includes(s.id)));
    addAuditLog('DELETE', `Bulk deleted ${ids.length} students`);
  };

  const bulkUpdateStatus = (ids: string[], status: StudentRecord['status']) => {
    setStudents(prev => prev.map(s => ids.includes(s.id) ? { ...s, status } : s));
    addAuditLog('UPDATE', `Bulk set status to ${status} for ${ids.length} students`);
  };

  const bulkSendTmaReminder = (ids: string[]) => {
    const newNotif: NotificationItem = {
      id: 'not-' + Date.now(),
      title: 'Action Required: Pending TMA Submission Reminder',
      message: `Automated urgent reminder dispatched to ${ids.length} students with pending Tutor Marked Assignments.`,
      severity: 'NIOS Deadline Warning',
      targetRole: 'STUDENT',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readCount: 0,
      totalTargetCount: ids.length,
      pinned: true,
      deadlineDate: '2026-11-20'
    };
    setNotifications(prev => [newNotif, ...prev]);
    addAuditLog('CREATE', `Dispatched TMA submission reminder to ${ids.length} students`);
  };

  const updateTeacher = (id: string, updates: Partial<TeacherRecord>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addAuditLog('UPDATE', `Updated teacher ID: ${id}`);
  };

  const toggleTeacherDelegation = (teacherId: string, delegation: TeacherRecord['delegation']) => {
    setTeachers(prev => prev.map(t => t.id === teacherId ? { ...t, delegation } : t));
    addAuditLog('PERMISSION_GRANT', `Updated delegation permissions for teacher ${teacherId}`);
  };

  // Schedule operations with conflict detection [F-SCH-503] & Cohort Double-Booking Check
  const addSchedule = (eventData: Omit<ScheduleEvent, 'id'>): { success: boolean; conflictReason?: string } => {
    // 1. Room conflict check
    const roomConflict = schedules.find(s =>
      s.status !== 'CANCELLED' &&
      s.date === eventData.date &&
      s.room.toLowerCase() === eventData.room.toLowerCase() &&
      ((eventData.startTime >= s.startTime && eventData.startTime < s.endTime) ||
        (eventData.endTime > s.startTime && eventData.endTime <= s.endTime) ||
        (eventData.startTime <= s.startTime && eventData.endTime >= s.endTime))
    );

    if (roomConflict) {
      return {
        success: false,
        conflictReason: `Room Booking Collision: ${eventData.room} is already booked by "${roomConflict.title}" (${roomConflict.startTime}-${roomConflict.endTime})`
      };
    }

    // 2. Teacher double-booking check
    const teacherConflict = schedules.find(s =>
      s.status !== 'CANCELLED' &&
      s.date === eventData.date &&
      s.teacherId === eventData.teacherId &&
      ((eventData.startTime >= s.startTime && eventData.startTime < s.endTime) ||
        (eventData.endTime > s.startTime && eventData.endTime <= s.endTime) ||
        (eventData.startTime <= s.startTime && eventData.endTime >= s.endTime))
    );

    if (teacherConflict) {
      return {
        success: false,
        conflictReason: `Faculty Schedule Collision: ${eventData.teacherName} is already assigned to "${teacherConflict.title}" during this slot (${teacherConflict.startTime}-${teacherConflict.endTime})`
      };
    }

    // 3. Enrolled Student Cohort Collision [Downstream Wiring 2]
    const cohortConflict = schedules.find(s => {
      if (s.status === 'CANCELLED' || s.date !== eventData.date) return false;
      const isTimeOverlap =
        (eventData.startTime >= s.startTime && eventData.startTime < s.endTime) ||
        (eventData.endTime > s.startTime && eventData.endTime <= s.endTime) ||
        (eventData.startTime <= s.startTime && eventData.endTime >= s.endTime);
      if (!isTimeOverlap) return false;

      // Check if students in common batch or common subject enrollment exist
      if (s.batch === eventData.batch) {
        // Find if any student is enrolled in both subjects
        const commonStudents = students.filter(st =>
          st.subjects.some(sub => sub.code === s.subjectCode) &&
          st.subjects.some(sub => sub.code === eventData.subjectCode)
        );
        return commonStudents.length > 0;
      }
      return false;
    });

    if (cohortConflict) {
      const affectedCount = students.filter(st =>
        st.subjects.some(sub => sub.code === cohortConflict.subjectCode) &&
        st.subjects.some(sub => sub.code === eventData.subjectCode)
      ).length;

      return {
        success: false,
        conflictReason: `Student Cohort Clash: ${affectedCount} learners in batch ${eventData.batch} are enrolled in both [${eventData.subjectCode}] and [${cohortConflict.subjectCode}]. Concurrent scheduling impossible.`
      };
    }

    const newEvent: ScheduleEvent = {
      ...eventData,
      id: 'sch-' + Date.now()
    };
    setSchedules(prev => [newEvent, ...prev]);
    addAuditLog('CREATE', `Scheduled session: ${newEvent.title} on ${newEvent.date}`);
    return { success: true };
  };

  const rescheduleClass = (
    id: string,
    newDate: string,
    newStart: string,
    newEnd: string,
    newRoom: string
  ): { success: boolean; conflictReason?: string } => {
    const existing = schedules.find(s => s.id === id);
    if (!existing) return { success: false, conflictReason: 'Class not found' };

    // 1. Room conflict check
    const roomConflict = schedules.find(s =>
      s.id !== id &&
      s.status !== 'CANCELLED' &&
      s.date === newDate &&
      s.room.toLowerCase() === newRoom.toLowerCase() &&
      ((newStart >= s.startTime && newStart < s.endTime) ||
        (newEnd > s.startTime && newEnd <= s.endTime) ||
        (newStart <= s.startTime && newEnd >= s.endTime))
    );

    if (roomConflict) {
      return {
        success: false,
        conflictReason: `Room Collision: ${newRoom} is already booked on ${newDate} by "${roomConflict.title}" (${roomConflict.startTime}-${roomConflict.endTime})`
      };
    }

    // 2. Teacher conflict
    const teacherConflict = schedules.find(s =>
      s.id !== id &&
      s.status !== 'CANCELLED' &&
      s.date === newDate &&
      s.teacherId === existing.teacherId &&
      ((newStart >= s.startTime && newStart < s.endTime) ||
        (newEnd > s.startTime && newEnd <= s.endTime) ||
        (newStart <= s.startTime && newEnd >= s.endTime))
    );

    if (teacherConflict) {
      return {
        success: false,
        conflictReason: `Faculty Collision: ${existing.teacherName} is already teaching "${teacherConflict.title}" at this time`
      };
    }

    // 3. Cohort Collision
    const cohortConflict = schedules.find(s => {
      if (s.id === id || s.status === 'CANCELLED' || s.date !== newDate) return false;
      const isTimeOverlap =
        (newStart >= s.startTime && newStart < s.endTime) ||
        (newEnd > s.startTime && newEnd <= s.endTime) ||
        (newStart <= s.startTime && newEnd >= s.endTime);
      if (!isTimeOverlap) return false;

      if (s.batch === existing.batch) {
        return students.some(st =>
          st.subjects.some(sub => sub.code === s.subjectCode) &&
          st.subjects.some(sub => sub.code === existing.subjectCode)
        );
      }
      return false;
    });

    if (cohortConflict) {
      return {
        success: false,
        conflictReason: `Cohort Collision: Overlaps with "${cohortConflict.title}". Same students are enrolled in both subjects!`
      };
    }

    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          date: newDate,
          startTime: newStart,
          endTime: newEnd,
          room: newRoom,
          status: 'RESCHEDULED',
          previousTime: `${s.date} ${s.startTime} - ${s.endTime}`,
          previousRoom: s.room
        };
      }
      return s;
    }));

    // Trigger visual diff and alert
    const alert: NotificationItem = {
      id: 'not-' + Date.now(),
      title: `CLASS RESCHEDULED: ${existing.subjectName} (${existing.batch})`,
      message: `Session has been moved to ${newDate} at ${newStart}-${newEnd} in ${newRoom}. Previous: ${existing.date} ${existing.startTime}.`,
      severity: 'Urgent Alert',
      targetRole: 'ALL',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readCount: 0,
      totalTargetCount: 38,
      pinned: true
    };
    setNotifications(n => [alert, ...n]);
    addAuditLog('UPDATE', `Rescheduled class ${id} to ${newDate} ${newStart} in ${newRoom}`);
    return { success: true };
  };

  const cancelClass = (id: string, reason: string) => {
    const existing = schedules.find(s => s.id === id);
    if (!existing) return;

    setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: 'CANCELLED', cancellationReason: reason } : s));

    // Auto-alert [F-SCH-504]
    const alert: NotificationItem = {
      id: 'not-' + Date.now(),
      title: `CANCELLED: ${existing.title}`,
      message: `Class scheduled for ${existing.date} ${existing.startTime} has been cancelled. Reason: ${reason}`,
      severity: 'Urgent Alert',
      targetRole: 'ALL',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readCount: 0,
      totalTargetCount: 38,
      pinned: true
    };
    setNotifications(n => [alert, ...n]);
    addAuditLog('UPDATE', `Cancelled class ${id}: ${reason}`);
  };

  // =========================================================================
  // 3-LAYER SCHEDULING & OVERRIDE METHODS
  // =========================================================================

  // Layer 1: Update Weekly Template
  const updateWeeklyTemplate = (slots: WeeklyTemplateSlot[]) => {
    setWeeklyTemplateState(slots);
    addAuditLog('UPDATE', `Updated Weekly Base Timetable (${slots.length} modular subject slots)`);
  };

  // Layer 1: Zero-Setup Rollout — saves logged single-day slots into the master weekly template
  const saveLoggedSchedulesAsWeeklyTemplate = (): { success: boolean; count: number } => {
    const extracted = extractWeeklyTemplateFromLoggedSchedules(schedules);
    if (extracted.length === 0) {
      return { success: false, count: 0 };
    }
    setWeeklyTemplateState(extracted);
    addAuditLog('CREATE', `Zero-Setup Rollout: Saved ${extracted.length} logged sessions as Default Weekly Template`);
    return { success: true, count: extracted.length };
  };

  // Layer 2: Calendar Override Management
  const addCalendarOverride = (overrideData: Omit<CalendarOverride, 'id'>) => {
    const newOverride: CalendarOverride = {
      ...overrideData,
      id: 'ovr-' + Date.now()
    };
    // Replace any existing override on the same date
    setCalendarOverridesState(prev => [
      newOverride,
      ...prev.filter(o => o.date !== newOverride.date)
    ]);
    addAuditLog('CREATE', `Added Calendar Override [${newOverride.type}] for ${newOverride.date}: ${newOverride.title}`);
  };

  const deleteCalendarOverride = (id: string) => {
    setCalendarOverridesState(prev => prev.filter(o => o.id !== id));
    addAuditLog('DELETE', `Removed calendar override ID: ${id}`);
  };

  // Layer 2 & 3: Resolve Daily Schedule for any Date
  const resolveDateSchedule = (dateStr: string): ResolvedDailySchedule => {
    return resolveDailySchedule(dateStr, weeklyTemplate, calendarOverrides, schedules);
  };

  // Roll-call attendance submission [F-ATT-601..604]
  const submitAttendance = (entryData: Omit<AttendanceEntry, 'id'>) => {
    const entry: AttendanceEntry = {
      ...entryData,
      id: 'att-' + Date.now()
    };
    setAttendanceLogs(prev => [entry, ...prev]);

    // Update student attendance stats
    setStudents(prev => prev.map(student => {
      const rec = entryData.records.find(r => r.studentId === student.id);
      if (!rec) return student;

      let newPresent = student.totalPresent;
      let newLate = student.totalLate;
      let newAbsent = student.totalAbsent;

      if (rec.status === 'PRESENT') newPresent++;
      else if (rec.status === 'LATE') newLate++;
      else if (rec.status === 'ABSENT') newAbsent++;

      const newHeld = student.totalClassesHeld + 1;
      const newRate = Number((((newPresent + 0.5 * newLate) / newHeld) * 100).toFixed(1));

      return {
        ...student,
        totalClassesHeld: newHeld,
        totalPresent: newPresent,
        totalLate: newLate,
        totalAbsent: newAbsent,
        attendanceRate: newRate
      };
    }));

    addAuditLog('ATTENDANCE_MARK', `Attendance logged for batch ${entry.batch} (${entry.records.length} students)`);
  };

  // TMA & Practical marks entry [F-MAT-703]
  const updateTmaMarks = (
    studentId: string,
    subjectCode: string,
    marks: number,
    status: 'Submitted to AI' | 'Evaluated' | 'Pending',
    feedback?: string
  ) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        subjects: s.subjects.map(sub => {
          if (sub.code !== subjectCode) return sub;
          return {
            ...sub,
            tmaMarks: marks,
            tmaStatus: status,
            tmaFeedback: feedback || sub.tmaFeedback
          };
        })
      };
    }));
    addAuditLog('UPDATE', `Updated TMA marks for student ${studentId}, subject ${subjectCode}: ${marks}/20 (${status})`);
  };

  const updatePracticalMarks = (studentId: string, subjectCode: string, marks: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        subjects: s.subjects.map(sub => {
          if (sub.code !== subjectCode) return sub;
          return {
            ...sub,
            practicalMarks: marks
          };
        })
      };
    }));
    addAuditLog('UPDATE', `Updated Practical marks for student ${studentId}, subject ${subjectCode}: ${marks}/20`);
  };

  // Syllabus checklist topic toggle [F-MAT-705]
  const updateTopicStatus = (topicId: string, status: SyllabusChecklistTopic['status']) => {
    setChecklist(prev => prev.map(t => t.id === topicId ? { ...t, status } : t));
    addAuditLog('UPDATE', `Updated topic ${topicId} progress to ${status}`);
  };

  const toggleOfflineMaterial = (materialId: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === materialId) {
        const nextState = !m.savedOffline;
        return { ...m, savedOffline: nextState };
      }
      return m;
    }));
  };

  const addStudyMaterial = (matData: Omit<StudyMaterial, 'id'>) => {
    const newMat: StudyMaterial = {
      ...matData,
      id: 'mat-' + Date.now()
    };
    setMaterials(prev => [newMat, ...prev]);
    addAuditLog('CREATE', `Uploaded study material: ${newMat.title}`);
  };

  const addNotification = (notifData: Omit<NotificationItem, 'id' | 'createdAt' | 'readCount'>) => {
    const item: NotificationItem = {
      ...notifData,
      id: 'not-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      readCount: 0
    };
    setNotifications(prev => [item, ...prev]);
    addAuditLog('CREATE', `Broadcasted notification: ${item.title}`);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    addAuditLog('DELETE', `Deleted notification ID: ${id}`);
  };

  // Dev backup / restore
  const resetDatabase = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setSchedules(INITIAL_SCHEDULES);
    setMaterials(INITIAL_MATERIALS);
    setChecklist(INITIAL_CHECKLIST);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setAttendanceLogs([]);
    setFeatures(MASTER_FEATURE_REGISTRY);
    addAuditLog('DB_OVERRIDE', 'Database reset to factory default state');
  };

  const exportDatabaseJson = () => {
    const db = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      preset: institutionPreset,
      theme: currentTheme,
      features,
      students,
      teachers,
      schedules,
      materials,
      checklist,
      notifications,
      auditLogs,
      attendanceLogs
    };
    return JSON.stringify(db, null, 2);
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.students) setStudents(parsed.students);
      if (parsed.teachers) setTeachers(parsed.teachers);
      if (parsed.schedules) setSchedules(parsed.schedules);
      if (parsed.materials) setMaterials(parsed.materials);
      if (parsed.checklist) setChecklist(parsed.checklist);
      if (parsed.notifications) setNotifications(parsed.notifications);
      if (parsed.features) setFeatures(parsed.features);
      if (parsed.preset) setInstitutionPresetState(parsed.preset);
      addAuditLog('DB_OVERRIDE', 'Database restored from imported JSON snapshot');
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        institutionPreset,
        setInstitutionPreset,
        currentTheme,
        setCurrentTheme,
        isOnline,
        setIsOnline,
        searchOpen,
        setSearchOpen,
        impersonatedStudentId,
        setImpersonatedStudentId,
        impersonatedTeacherId,
        setImpersonatedTeacherId,
        features,
        toggleFeature,
        isFeatureEnabled,
        students,
        teachers,
        schedules,
        materials,
        checklist,
        notifications,
        auditLogs,
        attendanceLogs,
        weeklyTemplate,
        calendarOverrides,
        updateWeeklyTemplate,
        saveLoggedSchedulesAsWeeklyTemplate,
        addCalendarOverride,
        deleteCalendarOverride,
        resolveDateSchedule,
        addStudent,
        updateStudent,
        deleteStudent,
        bulkDeleteStudents,
        bulkUpdateStatus,
        bulkSendTmaReminder,
        updateTeacher,
        toggleTeacherDelegation,
        addSchedule,
        rescheduleClass,
        cancelClass,
        submitAttendance,
        updateTmaMarks,
        updatePracticalMarks,
        updateTopicStatus,
        toggleOfflineMaterial,
        addStudyMaterial,
        addNotification,
        deleteNotification,
        resetDatabase,
        exportDatabaseJson,
        importDatabaseJson,
        addAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};

