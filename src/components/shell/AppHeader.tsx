// GRAVEL — Top Header Bar [F-UI-001] [F-UI-003] [F-UI-004]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  Search, 
  Wifi, 
  WifiOff, 
  Palette, 
  Bell, 
  UserCheck, 
  ShieldAlert, 
  GraduationCap, 
  Users, 
  Cpu,
  Layers
} from 'lucide-react';
import { Role } from '../../types';

interface AppHeaderProps {
  onOpenThemeModal: () => void;
  onOpenNotifications: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  onOpenThemeModal,
  onOpenNotifications 
}) => {
  const { 
    currentRole, 
    setCurrentRole, 
    isOnline, 
    setSearchOpen,
    notifications,
    institutionPreset,
    impersonatedStudentId,
    impersonatedTeacherId,
    setImpersonatedStudentId,
    setImpersonatedTeacherId
  } = useAppStore();

  const unreadNotifs = notifications.length;

  return (
    <header
      className="gravel-glass"
      style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        borderBottom: 'var(--border-width) solid var(--border-hairline)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Brand & Mode Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--card-radius)',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, #1e1b4b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            G
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>GRAVEL</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '1px 5px',
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent-primary)',
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                PWA
              </span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              {institutionPreset} BLUEPRINT • AI #270123
            </div>
          </div>
        </div>
      </div>

      {/* Center Search Bar [F-UI-003] */}
      <button
        onClick={() => setSearchOpen(true)}
        className="gravel-input"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '320px',
          cursor: 'pointer',
          padding: '0.4rem 0.75rem',
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
        }}
        title="Quick search across users, records, and feature indices"
      >
        <Search size={15} style={{ color: 'var(--text-muted)' }} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search Enrolment No, Name, Topic...</span>
        <kbd
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            padding: '1px 4px',
            borderRadius: 3,
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-hairline)',
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      {/* Right Actions & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Offline Sync Status [F-UI-004] */}
        <div
          title={isOnline ? 'Online (Real-time Sync Active)' : 'Offline Vault Active (Cached locally)'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: 20,
            backgroundColor: isOnline ? 'var(--status-present-bg)' : 'var(--status-absent-bg)',
            color: isOnline ? 'var(--status-present)' : 'var(--status-absent)',
            border: `1px solid ${isOnline ? 'var(--status-present)' : 'var(--status-absent)'}`,
          }}
        >
          {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
          <span style={{ fontWeight: 600, fontSize: '0.7rem' }}>{isOnline ? 'SYNCED' : 'OFFLINE'}</span>
        </div>

        {/* Theme Hot-Swapper Button [F-UI-002] */}
        <button
          onClick={onOpenThemeModal}
          className="gravel-btn gravel-btn-outline"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
          title="Modular Theme Engine: Hot-Swap Design & Color Tokens"
        >
          <Palette size={15} style={{ color: 'var(--accent-primary)' }} />
          <span>Theme</span>
        </button>

        {/* Notifications [F-NOT-803] */}
        <button
          onClick={onOpenNotifications}
          className="gravel-btn gravel-btn-outline"
          style={{ padding: '0.35rem 0.6rem', position: 'relative' }}
          title="View Alerts & Broadcasts"
        >
          <Bell size={16} />
          {unreadNotifs > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: 'var(--status-absent)',
                color: '#fff',
                fontSize: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {unreadNotifs}
            </span>
          )}
        </button>

        {/* Role Switcher Sandbox / Impersonation [F-DEV-006] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-muted)',
            borderRadius: 'var(--card-radius)',
            padding: 2,
            border: 'var(--border-width) solid var(--border-hairline)',
          }}
        >
          {(['ADMIN', 'TEACHER', 'STUDENT', 'DEV'] as Role[]).map((r) => {
            const active = currentRole === r;
            return (
              <button
                key={r}
                onClick={() => {
                  setCurrentRole(r);
                  if (r !== 'STUDENT') setImpersonatedStudentId(null);
                  if (r !== 'TEACHER') setImpersonatedTeacherId(null);
                }}
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.72rem',
                  fontWeight: active ? 700 : 500,
                  backgroundColor: active ? 'var(--accent-primary)' : 'transparent',
                  color: active ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'calc(var(--card-radius) - 2px)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Shadow Login Indication */}
        {(impersonatedStudentId || impersonatedTeacherId) && (
          <div
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              backgroundColor: 'var(--status-late-bg)',
              color: 'var(--status-late)',
              fontSize: '0.68rem',
              fontWeight: 600,
            }}
          >
            [F-DEV-006] Impersonating
          </div>
        )}
      </div>
    </header>
  );
};
