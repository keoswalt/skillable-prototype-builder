import React from 'react';
import DashboardCard, { CardAction, ProfileData } from './DashboardCard';

export type ProfileCardProps = Omit<ProfileData, 'variant'> & {
  starred?: boolean;
  onStarToggle?: () => void;
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  return <DashboardCard variant="profile" {...props} />;
};

export default ProfileCard; 