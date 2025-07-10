import React from 'react';
import DashboardCard, { CardAction, ProfileData } from './DashboardCard';

export type ProfileCardProps = Omit<ProfileData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
} & (
  | {
      starred: boolean;
      onStarToggle: () => void;
    }
  | {
      starred?: never;
      onStarToggle?: never;
    }
);

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  return <DashboardCard variant="profile" {...props} />;
};

export default ProfileCard; 