// GRAVEL — Notification & Broadcast Drawer [F-NOT-801..803]
import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { X, Bell, Pin, Trash2, Send, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, addNotification, deleteNotification, currentRole } = useAppStore();

  const [composerOpen, setComposerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSeverity, setNewSeverity] = useState<NotificationItem['severity']>('Info');
  const [newDeadline, setNewDeadline] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMessage) return;

    addNotification({
      title: newTitle,
      message: newMessage,
      severity: newSeverity,
      targetRole: 'ALL',
      pinned: true,
      totalTargetCount: 42,
      deadlineDate: newDeadline || undefined
    });

    setNewTitle('');
    setNewMessage('');
    setNewDeadline('');
    setComposerOpen(false);
  };

  const getSeverityPill = (sev: NotificationItem['severity']) => {
    switch (sev) {
      case 'NIOS Deadline Warning':
        return <span className="status-pill status-pill-absent">DEADLINE ALERT</span>;
      case 'Urgent Alert':
        return <span className="status-pill status-pill-absent">URGENT</span>;
      case 'Academic':
        return <span className="status-pill status-pill-late">ACADEMIC</span>;
      default:
        return <span className="status-pill" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}>NOTICE</span>;
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
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
            <Bell size={20} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Broadcasts & Alerts [F-NOT-801..803]</h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Institutional Notifications & Deadline Dispatcher
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Toolbar */}
        {(currentRole === 'DEV' || currentRole === 'ADMIN' || currentRole === 'TEACHER') && (
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: 'var(--border-width) solid var(--border-hairline)' }}>
            <button
              onClick={() => setComposerOpen(!composerOpen)}
              className="gravel-btn gravel-btn-primary"
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <Send size={14} />
              {composerOpen ? 'Cancel Compose' : '+ Compose New Broadcast [F-NOT-801]'}
            </button>
          </div>
        )}

        {/* Composer Form */}
        {composerOpen && (
          <form
            onSubmit={handleSend}
            className="gravel-card"
            style={{ margin: '1rem', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Dispatch Broadcast Alert</h4>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>
                Notice Title
              </label>
              <input
                type="text"
                className="gravel-input"
                style={{ width: '100%' }}
                placeholder="e.g. TMA Final Date Extension..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>
                Severity Level
              </label>
              <select
                className="gravel-input"
                style={{ width: '100%' }}
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value as any)}
              >
                <option value="Info">Info Notice</option>
                <option value="Academic">Academic Notice</option>
                <option value="Urgent Alert">Urgent Alert</option>
                <option value="NIOS Deadline Warning">NIOS Deadline Warning</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>
                Optional Deadline Date
              </label>
              <input
                type="date"
                className="gravel-input"
                style={{ width: '100%' }}
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 2 }}>
                Message Body
              </label>
              <textarea
                className="gravel-input"
                style={{ width: '100%', minHeight: '70px', resize: 'vertical' }}
                placeholder="Provide complete instructions..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="gravel-btn gravel-btn-primary" style={{ alignSelf: 'flex-end' }}>
              Broadcast Now
            </button>
          </form>
        )}

        {/* Notifications List */}
        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notifications.map((n) => (
            <div key={n.id} className="gravel-card" style={{ padding: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {getSeverityPill(n.severity)}
                  {n.pinned && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.65rem', color: 'var(--accent-primary)' }}>
                      <Pin size={11} /> PINNED
                    </span>
                  )}
                </div>
                {(currentRole === 'DEV' || currentRole === 'ADMIN') && (
                  <button
                    onClick={() => deleteNotification(n.id)}
                    title="Revoke / Delete Notice"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>
                {n.title}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 8 }}>
                {n.message}
              </p>

              {n.deadlineDate && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.72rem',
                    color: 'var(--status-absent)',
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  <Calendar size={13} /> Deadline: {n.deadlineDate}
                </div>
              )}

              {/* Read Receipts [F-NOT-803] */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: 6,
                }}
              >
                <span>Posted: {n.createdAt}</span>
                <span className="font-mono">
                  Seen by {n.readCount} / {n.totalTargetCount}
                </span>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No active broadcast notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

