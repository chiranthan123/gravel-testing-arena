// GRAVEL — Mobile 5-Slot Thumb Navigation Bar [F-UI-001]
import React from 'react';
import { Home, Calendar, CheckSquare, BookOpen, User } from 'lucide-react';

interface MobileBottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'student-home', label: 'Home', icon: <Home size={18} /> },
    { id: 'student-schedule', label: 'Schedule', icon: <Calendar size={18} /> },
    { id: 'student-checklist', label: 'Checklist', icon: <CheckSquare size={18} /> },
    { id: 'student-library', label: 'Library', icon: <BookOpen size={18} /> },
    { id: 'student-profile', label: 'Profile', icon: <User size={18} /> },
  ];

  return (
    <nav className="mobile-bottom-bar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`mobile-thumb-item ${isActive ? 'active' : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

