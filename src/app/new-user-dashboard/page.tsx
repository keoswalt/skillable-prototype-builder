"use client";

import React from "react";
import { PrimaryNav, Tabs } from "@/components/navigation";
import { Chip } from "@/components/info";
import { DropdownSelect } from "@/components/inputs";
import { Button } from "@/components/buttons/Button";
import { Icon, Icons } from "@/components/Icon";
import { Tooltip } from "@/components/info/Tooltip";
import { DashboardCard } from "@/components/cards/DashboardCard";

// Temporary: Inline new components if needed below

const tabItems = [
  { id: "lab-instances", label: "Lab Instances", content: null },
  { id: "lab-profiles", label: "Lab Profiles", content: null },
  { id: "lab-series", label: "Lab Series", content: null },
  { id: "templates", label: "Templates", content: null },
];

const sortOptions = [
  { label: "Sort", value: "sort" },
  { label: "Name", value: "name" },
  { label: "Date Created", value: "created" },
];

const filterOptions = [
  { label: "Filter", value: "filter" },
  { label: "In Development", value: "in-development" },
  { label: "Production", value: "production" },
];

const labProfiles = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: "Lab Profile Name",
  number: "KO_001",
  series: "My Lab Series",
  org: "Skillable - Production",
  platform: "Azure",
  created: "June 2, 2025",
  modified: "June 5, 2025",
  status: "In Development",
  starred: i < 2,
}));

export default function NewUserDashboard() {
  return (
    <div className="min-h-screen bg-_components-background-default">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome and Notification */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-headline text-heading-md text-_components-text-primary font-semibold">
            Welcome back, Kim.
          </h1>
          <Chip variant="warning">8 Lab Advisor Recommendations</Chip>
        </div>

        {/* Tabs */}
        <Tabs items={tabItems} className="mb-4" />

        {/* Sort & Filter Controls */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <DropdownSelect options={sortOptions} value="sort" />
          <DropdownSelect options={filterOptions} value="filter" />
        </div>

        {/* Lab Profiles List */}
        <div className="space-y-4">
          {labProfiles.map((profile, idx) => (
            <DashboardCard
              key={profile.id}
              variant="profile"
              title={profile.name}
              statusLabel={profile.status}
              statusTone="warning"
              number={profile.number}
              seriesName={profile.series}
              organization={profile.org}
              platform={profile.platform}
              created={profile.created}
              modified={profile.modified}
              starred={profile.starred}
              actions={[
                { icon: "externalLink", label: "Open", onClick: () => {} },
                { icon: "edit", label: "Edit", onClick: () => {} },
                { icon: "saveAll", label: "Clone", onClick: () => {} },
                { icon: "delete", label: "Delete", onClick: () => {} },
              ]}
              className="bg-_components-background-default border border-_components-divider-main shadow"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-body-sm text-_components-text-secondary">
          <span>
            Profiles per page: <DropdownSelect options={[{label: '10', value: '10'}]} value="10" />
          </span>
          <span>1-5 of 13</span>
          <div className="flex gap-1">
            <Button variant="outline" size="small">
              <Icon icon={Icons.chevronLeft} className="text-primary-main" />
            </Button>
            <Button variant="outline" size="small">
              <Icon icon={Icons.chevronRight} className="text-primary-main" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 