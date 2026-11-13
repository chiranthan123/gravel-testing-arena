// GRAVEL — Observation & Analytics Studio [F-GRPH-401..408] [F-MATH-301..308]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  PieChart, 
  Award, 
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { AttendanceHeatmap } from '../charts/AttendanceHeatmap';
import { TrendLineChart } from '../charts/TrendLineChart';
import { StackedAttendanceBar } from '../charts/StackedAttendanceBar';
import { ScoreRadarChart } from '../charts/ScoreRadarChart';
import { ScoreHistogram } from '../charts/ScoreHistogram';
import { ComplianceFunnel } from '../charts/ComplianceFunnel';
import { StreamDistributionDonut } from '../charts/StreamDistributionDonut';
import { ComponentScoreBar } from '../charts/ComponentScoreBar';
import { 
  calculateMeanAndStdDev, 
  calculatePearsonCorrelation, 
  calculateAttendanceMargin,
  calculatePercentileRank
} from '../../math';

export const AnalyticsStudio: React.FC = () => {
  const { students } = useAppStore();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Mathematical Analytics [F-MATH-301..307]
  const attendanceRates = students.map(s => s.attendanceRate);
  const avgScores = students.map(s => {
    const total = s.subjects.reduce((sum, sub) => sum + (sub.theoryMarks || 0), 0);
    return total / (s.subjects.length || 1);
  });

  const cohortStats = calculateMeanAndStdDev(avgScores);
  const pearsonR = calculatePearsonCorrelation(attendanceRates, avgScores);
  const studentAvg = activeStudent?.subjects.reduce((sum, sub) => sum + (sub.theoryMarks || 0), 0) / (activeStudent?.subjects.length || 1);
  const percentile = calculatePercentileRank(studentAvg, avgScores);
  const margin = activeStudent ? calculateAttendanceMargin(activeStudent.totalPresent, activeStudent.totalClassesHeld, 0.75) : null;

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700 }}>
              [F-GRPH-401..408] [F-MATH-301..308]
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Statistical Engine & Visual Diff Observation
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 2 }}>
            Observation & Analytics Studio
          </h2>
        </div>

        {/* Quick Math KPI summary cards */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="gravel-card" style={{ padding: '0.45rem 0.85rem' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>COHORT MEAN (μ)</div>
            <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {cohortStats.mean}% (σ: {cohortStats.stdDev})
            </div>
          </div>

          <div className="gravel-card" style={{ padding: '0.45rem 0.85rem' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>ATTENDANCE-TO-SCORE (r)</div>
            <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--status-present)' }}>
              r = +{pearsonR}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: MACRO INSTITUTIONAL COMPLIANCE & HEADCOUNT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
        <ComplianceFunnel />
        <StreamDistributionDonut />
      </div>

      {/* SECTION 2: ATTENDANCE & COHORT PROGRESSION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
        <AttendanceHeatmap />
        <TrendLineChart />
      </div>

      {/* SECTION 3: SUBJECT DISTRIBUTION & QUARTILES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
        <StackedAttendanceBar />
        <ScoreHistogram />
      </div>

      {/* SECTION 4: STUDENT 360 COMPARATIVE PROFILES */}
      <div className="gravel-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Individual Student Deep-Dive & Percentile Rank [F-MATH-306]
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Overlays selected learner against cohort norms
            </span>
          </div>

          {/* Student Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select Student:</span>
            <select
              className="gravel-input"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.nios.enrolmentNo}) - AR: {s.attendanceRate}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student metrics row */}
        {activeStudent && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div className="gravel-card" style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Percentile Rank (PR)</div>
              <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                {percentile}th %ile
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Top {(100 - percentile).toFixed(1)}% of batch</div>
            </div>

            <div className="gravel-card" style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Weighted AR%</div>
              <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: activeStudent.attendanceRate >= 75 ? 'var(--status-present)' : 'var(--status-absent)' }}>
                {activeStudent.attendanceRate}%
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Threshold: 75% required</div>
            </div>

            <div className="gravel-card" style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Safe Margin (M_safe)</div>
              <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {margin?.meetsThreshold ? `+${margin?.safeMargin} classes` : `Deficit: ${margin?.classesNeeded} req.`}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Classes can miss / recover</div>
            </div>

            <div className="gravel-card" style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>TMA Submissions</div>
              <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                {activeStudent.subjects.filter(s => s.tmaStatus === 'Evaluated').length} / {activeStudent.subjects.length}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Continuous assessment</div>
            </div>
          </div>
        )}

        {/* Dual Radar & Component breakdown split */}
        {activeStudent && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.25rem' }}>
            <ScoreRadarChart
              studentName={activeStudent.name}
              axes={activeStudent.subjects.map(sub => ({
                label: `${sub.code}-${sub.name.slice(0, 4)}`,
                studentScore: sub.theoryMarks || 50,
                cohortMean: 62
              }))}
            />
            <ComponentScoreBar subjects={activeStudent.subjects} />
          </div>
        )}
      </div>
    </div>
  );
};

