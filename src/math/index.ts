// GRAVEL — Mathematical & Statistical Analytics Engine [F-MATH-301..308]

/**
 * [F-MATH-301] Weighted Attendance Rate (AR)
 * AR = ((N_present + w * N_late) / N_total) * 100
 * @param present Count of present sessions
 * @param late Count of late sessions
 * @param total Total conducted sessions
 * @param weight Late weight (default 0.5)
 */
export function calculateAttendanceRate(
  present: number,
  late: number,
  total: number,
  weight: number = 0.5
): number {
  if (total <= 0) return 100;
  const ar = ((present + weight * late) / total) * 100;
  return Number(Math.min(100, Math.max(0, ar)).toFixed(1));
}

/**
 * [F-MATH-302] Safe Margin & Consecutive Classes Needed
 * M_safe = floor((N_present - T * N_total) / T)
 * C_req = ceil((T * N_total - N_present) / (1 - T))
 */
export function calculateAttendanceMargin(
  present: number,
  total: number,
  targetThreshold: number = 0.75
): { safeMargin: number; classesNeeded: number; meetsThreshold: boolean } {
  if (total <= 0) {
    return { safeMargin: 0, classesNeeded: 0, meetsThreshold: true };
  }

  const currentRate = present / total;
  if (currentRate >= targetThreshold) {
    const safeMargin = Math.floor((present - targetThreshold * total) / targetThreshold);
    return {
      safeMargin: Math.max(0, safeMargin),
      classesNeeded: 0,
      meetsThreshold: true
    };
  } else {
    const deficit = targetThreshold * total - present;
    const classesNeeded = Math.ceil(deficit / (1 - targetThreshold));
    return {
      safeMargin: 0,
      classesNeeded: Math.max(0, classesNeeded),
      meetsThreshold: false
    };
  }
}

/**
 * [F-MATH-303] NIOS Composite Subject Score & TMA Weightage Engine
 * Enforces NIOS Passing Criteria: >= 33% aggregate AND >= 33% each component
 */
export function calculateNiosSubjectScore(subject: {
  hasPractical: boolean;
  theoryMarks?: number; // raw out of 100 or 80
  practicalMarks?: number; // raw out of 20
  tmaMarks?: number; // raw out of 20
  tocMarksCarried?: number;
}): {
  theoryContribution: number;
  tmaContribution: number;
  practicalContribution: number;
  totalScore: number;
  isPassed: boolean;
  failingComponents: string[];
} {
  const tmaRaw = subject.tmaMarks ?? 0;
  const theoryRaw = subject.theoryMarks ?? 0;
  const practicalRaw = subject.practicalMarks ?? 0;

  let theoryScaled = 0;
  let tmaScaled = 0;
  let practicalScaled = 0;
  const failing: string[] = [];

  if (!subject.hasPractical) {
    // Non-Practical: Max Theory 100 scaled to 80 + TMA 20
    theoryScaled = (theoryRaw / 100) * 80;
    tmaScaled = (tmaRaw / 20) * 20; // 20%
    const theoryCombined = theoryScaled + tmaScaled;
    if (theoryCombined < 33) failing.push('Theory + TMA (<33%)');
  } else {
    // Practical: Max Theory 80 scaled to 64 + TMA 16 + Practical 20
    theoryScaled = (theoryRaw / 80) * 64;
    tmaScaled = (tmaRaw / 20) * 16;
    practicalScaled = practicalRaw;

    const theoryTma = theoryScaled + tmaScaled;
    if (theoryTma < 26.4) failing.push('Theory (<33% of 80)');
    if (practicalScaled < 6.6) failing.push('Practical (<33% of 20)');
  }

  const total = Number((theoryScaled + tmaScaled + practicalScaled + (subject.tocMarksCarried ?? 0)).toFixed(1));
  const isPassed = total >= 33 && failing.length === 0;

  return {
    theoryContribution: Number(theoryScaled.toFixed(1)),
    tmaContribution: Number(tmaScaled.toFixed(1)),
    practicalContribution: Number(practicalScaled.toFixed(1)),
    totalScore: Math.min(100, total),
    isPassed,
    failingComponents: failing
  };
}

/**
 * [F-MATH-304] NIOS 5-Session Formative Practical PCP Aggregator
 * M_PCP = sum(p_k for k=1..5)
 */
export function aggregatePcpMarks(sessions: number[]): number {
  return sessions.slice(0, 5).reduce((acc, curr) => acc + (curr || 0), 0);
}

/**
 * [F-MATH-305] Cohort Mean (mu) and Standard Deviation (sigma)
 */
export function calculateMeanAndStdDev(values: number[]): { mean: number; stdDev: number } {
  if (values.length === 0) return { mean: 0, stdDev: 0 };
  const n = values.length;
  const mean = values.reduce((sum, v) => sum + v, 0) / n;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / n;
  return {
    mean: Number(mean.toFixed(1)),
    stdDev: Number(Math.sqrt(variance).toFixed(1))
  };
}

/**
 * [F-MATH-306] Student Percentile Rank (PR)
 * PR = ((L + 0.5 * S) / N) * 100
 */
export function calculatePercentileRank(studentScore: number, allScores: number[]): number {
  if (allScores.length === 0) return 100;
  let lowerCount = 0;
  let sameCount = 0;
  for (const s of allScores) {
    if (s < studentScore) lowerCount++;
    else if (s === studentScore) sameCount++;
  }
  const pr = ((lowerCount + 0.5 * sameCount) / allScores.length) * 100;
  return Number(pr.toFixed(1));
}

/**
 * [F-MATH-307] Attendance-to-Performance Pearson Correlation (r)
 */
export function calculatePearsonCorrelation(
  attendanceRates: number[],
  scores: number[]
): number {
  const n = Math.min(attendanceRates.length, scores.length);
  if (n < 2) return 0;

  const x = attendanceRates.slice(0, n);
  const y = scores.slice(0, n);

  const xMean = x.reduce((a, b) => a + b, 0) / n;
  const yMean = y.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denomX = 0;
  let denomY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - xMean;
    const dy = y[i] - yMean;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }

  const denominator = Math.sqrt(denomX * denomY);
  if (denominator === 0) return 0;
  return Number((numerator / denominator).toFixed(3));
}

/**
 * [F-MATH-308] College SGPA Engine
 * SGPA = sum(C_j * G_j) / sum(C_j)
 */
export function calculateSgpa(courses: Array<{ credit: number; gradePoint: number }>): number {
  const totalCredits = courses.reduce((sum, c) => sum + c.credit, 0);
  if (totalCredits === 0) return 0;
  const weightedPoints = courses.reduce((sum, c) => sum + c.credit * c.gradePoint, 0);
  return Number((weightedPoints / totalCredits).toFixed(2));
}

