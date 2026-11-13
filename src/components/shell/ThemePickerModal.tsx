// GRAVEL — Modular Theme Hot-Swapper Modal [F-UI-002]
import React from 'react';
import { useAppStore } from '../../store';
import { THEMES_META } from '../../theme/themes';
import { ThemeId } from '../../types';
import { X, CheckCircle, Sun, Moon, Palette } from 'lucide-react';

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePickerModal: React.FC<ThemePickerModalProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setCurrentTheme } = useAppStore();

  if (!isOpen) return null;

  const themesList = Object.values(THEMES_META);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: '680px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem',
            borderBottom: 'var(--border-width) solid var(--border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Modular Theme Engine [F-UI-002]</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                3 UI Design Directions x Light & Dark Modes (WCAG AAA/AA Contrast Compliance)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme Grid */}
        <div
          style={{
            padding: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            maxHeight: '65vh',
            overflowY: 'auto',
          }}
        >
          {themesList.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setCurrentTheme(t.id as ThemeId)}
                className="gravel-card"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  border: isSelected
                    ? '2px solid var(--accent-primary)'
                    : 'var(--border-width) solid var(--border-hairline)',
                  position: 'relative',
                  backgroundColor: 'var(--bg-surface-primary)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: 'var(--accent-primary)',
                    }}
                  >
                    <CheckCircle size={18} />
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 4 }}>
                  {t.mode === 'light' ? <Sun size={15} style={{ color: '#EAB308' }} /> : <Moon size={15} style={{ color: '#38BDF8' }} />}
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {t.design}
                  </span>
                </div>

                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>
                  {t.name}
                </div>

                {/* Swatch palette preview */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: 10 }}>
                  <div
                    title="Canvas Base"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: t.canvasBg,
                      border: '1px solid rgba(128,128,128,0.3)',
                    }}
                  />
                  <div
                    title="Surface Card"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: t.surfaceBg,
                      border: '1px solid rgba(128,128,128,0.3)',
                    }}
                  />
                  <div
                    title="Primary Accent"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: t.primaryAccent,
                    }}
                  />
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                    Radius: {t.cardRadius}
                  </span>
                </div>
              </div>
            );
          })}
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
            Active Tokens: <strong style={{ color: 'var(--text-primary)' }}>{currentTheme}</strong>
          </span>
          <button onClick={onClose} className="gravel-btn gravel-btn-primary" style={{ padding: '0.4rem 1rem' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

