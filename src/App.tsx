// GRAVEL — Root App Container & Role-Based Workspace Router [Section 3.1]
import React, { useState } from 'react';
import { useAppStore } from './store';
import { AppHeader } from './components/shell/AppHeader';
import { Sidebar } from './components/shell/Sidebar';
import { MobileBottomBar } from './components/shell/MobileBottomBar';
import { GlobalSearchModal } from './components/shell/GlobalSearchModal';
import { ThemePickerModal } from './components/shell/ThemePickerModal';
import { NotificationDrawer } from './components/shell/NotificationDrawer';
import { DevWorkspace } from './components/dev/DevWorkspace';
import { AdminWorkspace } from './components/admin/AdminWorkspace';
import { TeacherWorkspace } from './components/teacher/TeacherWorkspace';
import { StudentWorkspace } from './components/student/StudentWorkspace';

export const App: React.FC = () => {
  const { currentRole } = useAppStore();

  // Active sub-navigation tab per role
  const [activeTab, setActiveTab] = useState<string>(() => {
    switch (currentRole) {
      case 'DEV': return 'dev-config';
      case 'ADMIN': return 'admin-directory';
      case 'TEACHER': return 'teacher-attendance';
      case 'STUDENT': return 'student-home';
      default: return 'admin-directory';
    }
  });

  // Modals
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sync activeTab when role changes
  React.useEffect(() => {
    switch (currentRole) {
      case 'DEV':
        setActiveTab('dev-config');
        break;
      case 'ADMIN':
        setActiveTab('admin-directory');
        break;
      case 'TEACHER':
        setActiveTab('teacher-attendance');
        break;
      case 'STUDENT':
        setActiveTab('student-home');
        break;
    }
  }, [currentRole]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-canvas)' }}>
      {/* Top Header Bar [F-UI-001, F-UI-003, F-UI-004] */}
      <AppHeader
        onOpenThemeModal={() => setThemeModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Workspace Area: Desktop 3-Zone vs Mobile Bottom Dock */}
      <div className="app-layout-desktop" style={{ flex: 1 }}>
        {/* Desktop Sidebar (hidden on small screens or custom configured) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Canvas Area */}
        <main className="app-main-canvas" style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
          {currentRole === 'DEV' && <DevWorkspace activeSubTab={activeTab} />}
          {currentRole === 'ADMIN' && <AdminWorkspace activeSubTab={activeTab} />}
          {currentRole === 'TEACHER' && <TeacherWorkspace activeSubTab={activeTab} />}
          {currentRole === 'STUDENT' && <StudentWorkspace activeSubTab={activeTab} />}
        </main>
      </div>

      {/* Mobile 5-Slot Bottom Thumb-Zone Navigation Bar [F-UI-001] */}
      {currentRole === 'STUDENT' && (
        <MobileBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <ThemePickerModal isOpen={themeModalOpen} onClose={() => setThemeModalOpen(false)} />
      <NotificationDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
};

