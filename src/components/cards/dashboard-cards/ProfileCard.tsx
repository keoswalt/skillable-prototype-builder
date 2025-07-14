// src/components/cards/dashboard-cards/ProfileCard.tsx
// PURPOSE: A specialized card component for lab profiles that wraps the base DashboardCard
// with profile-specific data structure and default styling.

import React from 'react';
import DashboardCard, { CardAction } from '../DashboardCard';
import { ProfileData } from '../DashboardCard';

export interface ProfileCardProps extends Omit<ProfileData, 'variant'> {
  /** Adds a colored star icon on the far-left */
  starred?: boolean;
  /** Toggle handler when star icon is clicked */
  onStarToggle?: () => void;
  /** Optional array of icon buttons displayed on the right-hand side */
  actions?: CardAction[];
  /** Map of data keys to URL strings. If provided, the corresponding value renders as an <a>. */
  metaLinks?: Record<string, string>;
  /** Additional CSS classes for the root element */
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  starred,
  onStarToggle,
  actions,
  metaLinks,
  className,
  ...profileData
}) => {
  return (
    <DashboardCard
      variant="profile"
      starred={starred}
      onStarToggle={onStarToggle}
      actions={actions}
      metaLinks={metaLinks}
      className={className}
      {...profileData}
    />
  );
};

export default ProfileCard; 