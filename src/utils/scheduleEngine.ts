// GRAVEL — NIOS 3-Layer Timetable, Calendar Override & Drop-In Matching Engine
// Layer 1: Modular Subject-Slot Weekly Template (Base Schedule)
// Layer 2: Calendar Override Engine (NORMAL, HOLIDAY, DAY_SWAP, EVENT)
// Layer 3: Personalized Student View, Drop-In Arrival & Subject-Level Attendance

import {
  DayOfWeek,
  WeeklyTemplateSlot,
  CalendarOverride,
  OverrideType,
  ResolvedDailySchedule,
  ScheduleEvent,
  StudentRecord,
  StudentDropInCheckIn
} from '../types';

export const MODULAR_TIME_SLOTS = [
  { label: 'Morning Block 1', startTime: '09:00', endTime: '10:30' },
  { label: 'Morning Block 2', startTime: '10:30', endTime: '12:00' },
  { label: 'Afternoon Block 1', startTime: '13:00', endTime: '14:30' },
  { label: 'Afternoon Block 2', startTime: '14:30', endTime: '16:00' },
  { label: 'Evening Doubt / Tutorial', startTime: '16:00', endTime: '17:00' },
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * Helper to determine DayOfWeek from YYYY-MM-DD
 */
export function getDayOfWeekFromDate(dateStr: string): DayOfWeek {
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayIndex = dateObj.getDay(); // 0 is Sunday, 1 is Monday ...
  const mapping: Record<number, DayOfWeek> = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    0: 'Sunday' as any, // Sunday centre closed or special event
  };
  return mapping[dayIndex] || 'Monday';
}

/**
 * Layer 1: Generate Default Modular Weekly Base Template
 * NIOS students attend by subject block, so each slot binds Subject + Teacher + Room.
 */
export function generateDefaultWeeklyTemplate(): WeeklyTemplateSlot[] {
  return [
    // MONDAY
    {
      id: 'tpl-mon-1',
      dayOfWeek: 'Monday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '302',
      subjectName: 'English (Class 12)',
      teacherId: 'tch-004',
      teacherName: 'Sunita Mehra',
      room: 'Room 101',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-mon-2',
      dayOfWeek: 'Monday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '311',
      subjectName: 'Mathematics (Class 12)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 204',
      sessionType: 'NIOS Theory PCP'
    },
    {
      id: 'tpl-mon-3',
      dayOfWeek: 'Monday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '312',
      subjectName: 'Physics (Class 12)',
      teacherId: 'tch-002',
      teacherName: 'Prof. Ananya Gupta',
      room: 'Science Lab 1',
      sessionType: 'NIOS Mandatory Practical PCP'
    },
    {
      id: 'tpl-mon-4',
      dayOfWeek: 'Monday',
      slotLabel: 'Afternoon Block 2 (14:30 - 16:00)',
      startTime: '14:30',
      endTime: '16:00',
      subjectCode: '330',
      subjectName: 'Computer Science (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'Regular Lecture'
    },

    // TUESDAY
    {
      id: 'tpl-tue-1',
      dayOfWeek: 'Tuesday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '211',
      subjectName: 'Mathematics (Class 10)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 102',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-tue-2',
      dayOfWeek: 'Tuesday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '313',
      subjectName: 'Chemistry (Class 12)',
      teacherId: 'tch-003',
      teacherName: 'Rajesh Verma',
      room: 'Chemistry Lab',
      sessionType: 'NIOS Mandatory Practical PCP'
    },
    {
      id: 'tpl-tue-3',
      dayOfWeek: 'Tuesday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '311',
      subjectName: 'Mathematics (Class 12)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 204',
      sessionType: 'Doubt Clearing'
    },
    {
      id: 'tpl-tue-4',
      dayOfWeek: 'Tuesday',
      slotLabel: 'Afternoon Block 2 (14:30 - 16:00)',
      startTime: '14:30',
      endTime: '16:00',
      subjectCode: '336',
      subjectName: 'Data Entry Operations (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'NIOS Theory PCP'
    },

    // WEDNESDAY
    {
      id: 'tpl-wed-1',
      dayOfWeek: 'Wednesday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '302',
      subjectName: 'English (Class 12)',
      teacherId: 'tch-004',
      teacherName: 'Sunita Mehra',
      room: 'Room 101',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-wed-2',
      dayOfWeek: 'Wednesday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '312',
      subjectName: 'Physics (Class 12)',
      teacherId: 'tch-002',
      teacherName: 'Prof. Ananya Gupta',
      room: 'Room 204',
      sessionType: 'NIOS Theory PCP'
    },
    {
      id: 'tpl-wed-3',
      dayOfWeek: 'Wednesday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '212',
      subjectName: 'Science & Technology (Class 10)',
      teacherId: 'tch-003',
      teacherName: 'Rajesh Verma',
      room: 'Science Lab 1',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-wed-4',
      dayOfWeek: 'Wednesday',
      slotLabel: 'Afternoon Block 2 (14:30 - 16:00)',
      startTime: '14:30',
      endTime: '16:00',
      subjectCode: '330',
      subjectName: 'Computer Science (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'NIOS Mandatory Practical PCP'
    },

    // THURSDAY
    {
      id: 'tpl-thu-1',
      dayOfWeek: 'Thursday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '313',
      subjectName: 'Chemistry (Class 12)',
      teacherId: 'tch-003',
      teacherName: 'Rajesh Verma',
      room: 'Room 204',
      sessionType: 'NIOS Theory PCP'
    },
    {
      id: 'tpl-thu-2',
      dayOfWeek: 'Thursday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '311',
      subjectName: 'Mathematics (Class 12)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 102',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-thu-3',
      dayOfWeek: 'Thursday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '201',
      subjectName: 'Hindi (Class 10)',
      teacherId: 'tch-004',
      teacherName: 'Sunita Mehra',
      room: 'Room 101',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-thu-4',
      dayOfWeek: 'Thursday',
      slotLabel: 'Afternoon Block 2 (14:30 - 16:00)',
      startTime: '14:30',
      endTime: '16:00',
      subjectCode: '336',
      subjectName: 'Data Entry Operations (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'NIOS Mandatory Practical PCP'
    },

    // FRIDAY
    {
      id: 'tpl-fri-1',
      dayOfWeek: 'Friday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '312',
      subjectName: 'Physics (Class 12)',
      teacherId: 'tch-002',
      teacherName: 'Prof. Ananya Gupta',
      room: 'Science Lab 1',
      sessionType: 'Doubt Clearing'
    },
    {
      id: 'tpl-fri-2',
      dayOfWeek: 'Friday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '311',
      subjectName: 'Mathematics (Class 12)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 204',
      sessionType: 'NIOS Theory PCP'
    },
    {
      id: 'tpl-fri-3',
      dayOfWeek: 'Friday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '302',
      subjectName: 'English (Class 12)',
      teacherId: 'tch-004',
      teacherName: 'Sunita Mehra',
      room: 'Room 101',
      sessionType: 'Regular Lecture'
    },
    {
      id: 'tpl-fri-4',
      dayOfWeek: 'Friday',
      slotLabel: 'Afternoon Block 2 (14:30 - 16:00)',
      startTime: '14:30',
      endTime: '16:00',
      subjectCode: '330',
      subjectName: 'Computer Science (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'Mock/Internal Exam'
    },

    // SATURDAY (Shortened / Review & Practical Track)
    {
      id: 'tpl-sat-1',
      dayOfWeek: 'Saturday',
      slotLabel: 'Morning Block 1 (09:00 - 10:30)',
      startTime: '09:00',
      endTime: '10:30',
      subjectCode: '311',
      subjectName: 'Mathematics (Class 12)',
      teacherId: 'tch-001',
      teacherName: 'Dr. Ramesh Chandra',
      room: 'Room 204',
      sessionType: 'Doubt Clearing'
    },
    {
      id: 'tpl-sat-2',
      dayOfWeek: 'Saturday',
      slotLabel: 'Morning Block 2 (10:30 - 12:00)',
      startTime: '10:30',
      endTime: '12:00',
      subjectCode: '312',
      subjectName: 'Physics (Class 12)',
      teacherId: 'tch-002',
      teacherName: 'Prof. Ananya Gupta',
      room: 'Science Lab 1',
      sessionType: 'NIOS Mandatory Practical PCP'
    },
    {
      id: 'tpl-sat-3',
      dayOfWeek: 'Saturday',
      slotLabel: 'Afternoon Block 1 (13:00 - 14:30)',
      startTime: '13:00',
      endTime: '14:30',
      subjectCode: '336',
      subjectName: 'Data Entry Operations (Class 12)',
      teacherId: 'tch-005',
      teacherName: 'Vikas Sharma',
      room: 'Computer Lab 1',
      sessionType: 'NIOS Mandatory Practical PCP'
    }
  ];
}

/**
 * Layer 1: Zero-Setup Rollout
 * Staff simply log today's and tomorrow's slots; this helper converts
 * logged dates into the Default Weekly Template by day of week.
 */
export function extractWeeklyTemplateFromLoggedSchedules(
  loggedSchedules: ScheduleEvent[]
): WeeklyTemplateSlot[] {
  const templateSlots: WeeklyTemplateSlot[] = [];

  loggedSchedules.forEach((sch) => {
    if (sch.status === 'CANCELLED') return;
    const day = getDayOfWeekFromDate(sch.date);

    // Prevent duplicate slot collision in template
    const exists = templateSlots.some(
      t => t.dayOfWeek === day && t.startTime === sch.startTime && t.room === sch.room
    );

    if (!exists) {
      templateSlots.push({
        id: `tpl-${day.toLowerCase()}-${sch.subjectCode}-${sch.startTime.replace(':', '')}`,
        dayOfWeek: day,
        slotLabel: `${sch.startTime} - ${sch.endTime} (${sch.subjectCode})`,
        startTime: sch.startTime,
        endTime: sch.endTime,
        subjectCode: sch.subjectCode,
        subjectName: sch.subjectName,
        teacherId: sch.teacherId,
        teacherName: sch.teacherName,
        room: sch.room,
        sessionType: sch.sessionType
      });
    }
  });

  return templateSlots;
}

/**
 * Layer 2: Default Sample Event Calendar with KSIT-Style Rules
 * Includes Holiday, Day-Swap, and Special Milestone Events.
 */
export function getDefaultCalendarOverrides(): CalendarOverride[] {
  return [
    {
      id: 'ovr-001',
      date: '2026-11-15',
      type: 'HOLIDAY',
      title: 'Guru Nanak Jayanti / Regional Holiday',
      description: 'Coaching centre closed. All regular lecture blocks suppressed. No attendance logged.'
    },
    {
      id: 'ovr-002',
      date: '2026-11-14',
      type: 'DAY_SWAP',
      title: 'Saturday — Follow Tuesday Timetable',
      targetDayOfWeek: 'Tuesday',
      description: 'Compensates for upcoming mid-week holiday by running full Tuesday lecture blocks on Saturday.'
    },
    {
      id: 'ovr-003',
      date: '2026-11-18',
      type: 'EVENT',
      title: 'NIOS TMA Submission & Portal Verification Drive',
      description: 'Non-lecture milestone drive for all learners to upload solved TMAs to the NIOS student portal.',
      eventDetails: {
        eventName: 'Mandatory TMA Portal Upload Workshop',
        description: 'Staff assisting students with 20% TMA scanning and digital portal verification.',
        room: 'Computer Lab 1 & Main Seminar Hall',
        coordinator: 'Dr. Ramesh Chandra (Centre AI Coord)',
        timings: '10:00 AM - 04:00 PM'
      }
    },
    {
      id: 'ovr-004',
      date: '2026-11-25',
      type: 'EVENT',
      title: 'Practical Lab File Verification & Mock Viva',
      description: 'Formative assessment check for Physics, Chemistry & Data Entry record books.',
      eventDetails: {
        eventName: 'Practical Record Book Pre-Submission Audit',
        description: 'Pre-exam viva assessment with NIOS practical evaluation rubrics.',
        room: 'Science Lab 1',
        coordinator: 'Prof. Ananya Gupta',
        timings: '11:00 AM - 03:30 PM'
      }
    }
  ];
}

/**
 * Layer 2: Calendar Override Engine
 * Evaluates date against calendar rules (NORMAL, HOLIDAY, DAY_SWAP, EVENT)
 * and resolves the exact day's operational slots.
 */
export function resolveDailySchedule(
  targetDate: string,
  weeklyTemplate: WeeklyTemplateSlot[],
  overrides: CalendarOverride[],
  dateSpecificSchedules: ScheduleEvent[] = []
): ResolvedDailySchedule {
  const standardDay = getDayOfWeekFromDate(targetDate);
  const override = overrides.find(o => o.date === targetDate);

  // 1. HOLIDAY: Suppress all lectures, centre closed
  if (override && override.type === 'HOLIDAY') {
    return {
      date: targetDate,
      dayOfWeek: standardDay,
      state: 'HOLIDAY',
      overrideInfo: override,
      isHoliday: true,
      slots: []
    };
  }

  // 2. DAY_SWAP: Inject target day's timetable into today (e.g. Saturday follows Tuesday)
  let effectiveDay: DayOfWeek = standardDay;
  if (override && override.type === 'DAY_SWAP' && override.targetDayOfWeek) {
    effectiveDay = override.targetDayOfWeek;
  }

  // 3. SPECIAL EVENT: Milestone event overlay
  if (override && override.type === 'EVENT') {
    const eventSlot: ScheduleEvent = {
      id: `ev-${override.id}`,
      title: override.eventDetails?.eventName || override.title,
      subjectCode: 'EVENT',
      subjectName: 'NIOS Centre Milestone Activity',
      batch: 'All Enrolled Batches',
      teacherId: 'tch-admin',
      teacherName: override.eventDetails?.coordinator || 'Centre Administrator',
      date: targetDate,
      startTime: override.eventDetails?.timings?.split(' - ')[0] || '10:00',
      endTime: override.eventDetails?.timings?.split(' - ')[1] || '16:00',
      room: override.eventDetails?.room || 'Main Hall / Labs',
      sessionType: 'NIOS Theory PCP',
      status: 'SCHEDULED',
      isSpecialEvent: true
    };

    return {
      date: targetDate,
      dayOfWeek: standardDay,
      state: 'EVENT',
      overrideInfo: override,
      isHoliday: false,
      slots: [eventSlot]
    };
  }

  // 4. NORMAL or DAY_SWAP: Resolve template slots for effectiveDay
  const templateSlotsForDay = weeklyTemplate.filter(t => t.dayOfWeek === effectiveDay);

  // Map template slots into ScheduleEvent objects for targetDate
  const resolvedSlots: ScheduleEvent[] = templateSlotsForDay.map(tpl => ({
    id: `res-${targetDate}-${tpl.id}`,
    title: `${tpl.subjectCode} - ${tpl.subjectName}`,
    subjectCode: tpl.subjectCode,
    subjectName: tpl.subjectName,
    batch: 'Standard Enrolled Batch',
    teacherId: tpl.teacherId,
    teacherName: tpl.teacherName,
    date: targetDate,
    startTime: tpl.startTime,
    endTime: tpl.endTime,
    room: tpl.room,
    sessionType: tpl.sessionType,
    status: 'SCHEDULED'
  }));

  // Merge any date-specific custom schedules/reschedules logged for this exact date
  const extraForDate = dateSpecificSchedules.filter(s => s.date === targetDate);
  extraForDate.forEach(extra => {
    const existingIndex = resolvedSlots.findIndex(
      r => r.startTime === extra.startTime && r.room.toLowerCase() === extra.room.toLowerCase()
    );
    if (existingIndex >= 0) {
      resolvedSlots[existingIndex] = extra; // Date-specific schedule overrides template
    } else {
      resolvedSlots.push(extra);
    }
  });

  // Sort chronologically by startTime
  resolvedSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return {
    date: targetDate,
    dayOfWeek: standardDay,
    state: override ? override.type : 'NORMAL',
    overrideInfo: override,
    isHoliday: false,
    slots: resolvedSlots
  };
}

/**
 * Layer 3: Personalized Student View
 * Filters the resolved daily schedule strictly to the student's enrolled subjects.
 */
export function getFilteredStudentAgenda(
  student: StudentRecord,
  resolvedDaily: ResolvedDailySchedule
): ScheduleEvent[] {
  if (resolvedDaily.isHoliday) return [];
  if (resolvedDaily.state === 'EVENT') return resolvedDaily.slots;

  const enrolledCodes = student.subjects.map(s => s.code);
  return resolvedDaily.slots.filter(slot => enrolledCodes.includes(slot.subjectCode));
}

/**
 * Helper to convert "HH:mm" to minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) return 0;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

/**
 * Helper to convert minutes from midnight to "HH:mm" or "hh:mm AM/PM"
 */
export function minutesToTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m < 10 ? `0${m}` : m;
  return `${displayH}:${displayM} ${ampm}`;
}

/**
 * Layer 3: Front-Desk / Kiosk Drop-In Arrival Matcher
 * When student walks in at `arrivalTime` (e.g. 10:25 AM):
 * - Identifies "Expected Now" slot (starting within ±25 mins or in session)
 * - Identifies "Next Slot Today"
 * - Calculates "Gap Time" between slots and issues study lounge recommendations.
 */
export function matchStudentDropIn(
  student: StudentRecord,
  arrivalTime: string, // "HH:mm" e.g. "10:25"
  studentTodaySlots: ScheduleEvent[]
): StudentDropInCheckIn {
  const arrMins = timeToMinutes(arrivalTime);

  if (!studentTodaySlots || studentTodaySlots.length === 0) {
    return {
      studentId: student.id,
      studentName: student.name,
      enrolmentNo: student.nios.enrolmentNo,
      arrivalTime,
      status: 'NO_CLASS_NOW',
      gapNotice: 'No lectures scheduled for your registered subjects today.'
    };
  }

  // Find slot that is either in progress or starts within 25 minutes
  let expectedSlot: ScheduleEvent | undefined;
  let nextSlotToday: ScheduleEvent | undefined;
  let minNextDiff = Infinity;

  for (const slot of studentTodaySlots) {
    const sStart = timeToMinutes(slot.startTime);
    const sEnd = timeToMinutes(slot.endTime);

    // In session or starting within 25 mins
    if ((arrMins >= sStart - 25 && arrMins <= sEnd)) {
      expectedSlot = slot;
      break;
    }
  }

  // Find next upcoming slot after arrival time
  for (const slot of studentTodaySlots) {
    if (slot.id === expectedSlot?.id) continue;
    const sStart = timeToMinutes(slot.startTime);
    if (sStart > arrMins) {
      const diff = sStart - arrMins;
      if (diff < minNextDiff) {
        minNextDiff = diff;
        nextSlotToday = slot;
      }
    }
  }

  // Calculate gap time between expectedSlot and nextSlotToday
  let gapMinutes: number | undefined;
  let gapNotice: string | undefined;

  if (expectedSlot && nextSlotToday) {
    const expEnd = timeToMinutes(expectedSlot.endTime);
    const nextStart = timeToMinutes(nextSlotToday.startTime);
    if (nextStart > expEnd) {
      gapMinutes = nextStart - expEnd;
      const hours = (gapMinutes / 60).toFixed(1);
      gapNotice = `Gap Time (${hours} hrs break): Student has free window between ${expectedSlot.endTime} and ${nextSlotToday.startTime}. Recommend self-study / TMA desk space in library.`;
    }
  } else if (!expectedSlot && nextSlotToday) {
    const nextStart = timeToMinutes(nextSlotToday.startTime);
    gapMinutes = nextStart - arrMins;
    const hours = (gapMinutes / 60).toFixed(1);
    gapNotice = `Early Arrival (${hours} hrs before next lecture): Next class begins at ${nextSlotToday.startTime} (${nextSlotToday.room}).`;
  }

  return {
    studentId: student.id,
    studentName: student.name,
    enrolmentNo: student.nios.enrolmentNo,
    arrivalTime,
    expectedSlot,
    nextSlotToday,
    gapMinutes,
    gapNotice,
    status: expectedSlot ? 'EXPECTED' : nextSlotToday ? 'EARLY' : 'NO_CLASS_NOW'
  };
}

