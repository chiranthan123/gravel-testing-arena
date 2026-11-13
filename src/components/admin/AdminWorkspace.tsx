// GRAVEL — Admin Master Workspace Wrapper [Section 3.3]
import React from 'react';
import { AdminDirectory } from './AdminDirectory';
import { AnalyticsStudio } from './AnalyticsStudio';
import { PermissionsMatrix } from './PermissionsMatrix';
import { OperationsStudio } from './OperationsStudio';

interface AdminWorkspaceProps {
  activeSubTab: string;
}

export const AdminWorkspace: React.FC<AdminWorkspaceProps> = ({ activeSubTab }) => {
  switch (activeSubTab) {
    case 'admin-analytics':
      return <AnalyticsStudio />;
    case 'admin-permissions':
      return <PermissionsMatrix />;
    case 'admin-operations':
      return <OperationsStudio />;
    case 'admin-directory':
    default:
      return <AdminDirectory />;
  }
};

