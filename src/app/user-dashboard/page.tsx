'use client';

import React, { useState } from 'react';
import { DashboardCard } from '../../components/cards/DashboardCard';
import { DataTable } from '../../components/data';
import { Row } from '../../components/data/types';
import { Chip } from '../../components/info/Chip';

// Helper to create sample rows for the DataTable
const createSampleRow = (id: string, name: string, isFavorited = false): Row => ({
  id,
  isFavorited,
  cells: [
    { type: 'label', value: id, columnKey: 'number' },
    {
      type: 'favorite',
      value: name,
      columnKey: 'name',
      additionalProps: { href: `#${id}`, target: '_self' }
    },
    { type: 'date', value: new Date().toISOString(), columnKey: 'lastModified' },
    {
      type: 'link',
      value: 'Advanced Networking Series',
      columnKey: 'series',
      additionalProps: { href: `/series/${id}`, target: '_self' }
    },
    { type: 'label', value: 'Azure', columnKey: 'platform' },
    { type: 'status', value: 'In Progress', columnKey: 'status' },
    {
      type: 'actions',
      value: [
        {
          icon: 'eye',
          onClick: () => console.log('View', id),
          title: 'View'
        },
        {
          icon: 'edit',
          onClick: () => console.log('Edit', id),
          title: 'Edit'
        },
        {
          icon: 'externalLink',
          onClick: () => console.log('Open in new tab', id),
          title: 'Open'
        }
      ],
      columnKey: 'actions'
    }
  ]
});

// Column definitions for the DataTable
const columns = [
  { id: 'number', label: 'Number', width: '5%', sortable: true },
  { id: 'name', label: 'Name', width: 'auto', sortable: true },
  { id: 'lastModified', label: 'Last Modified', width: '20%', sortable: true },
  { id: 'series', label: 'Series', width: '20%', sortable: true },
  { id: 'platform', label: 'Platform', width: '15%' },
  { id: 'status', label: 'Status', width: '10%', sortable: true },
  { id: 'actions', label: 'Action', width: '15%' }
];

const tabs = [
  { id: 'instances', label: 'Lab Instances' },
  { id: 'profiles', label: 'Lab Profiles' },
  { id: 'series', label: 'Lab Series' }
];

export default function UserDashboardPage() {
  // Sample table data
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const sampleData = [
    createSampleRow('KO_001', 'Azure Virtual Networks', true),
    createSampleRow('KO_002', 'AWS VPC'),
    createSampleRow('KO_003', 'Google Cloud VPC'),
    createSampleRow('KO_004', 'IBM Cloud VPC'),
    createSampleRow('KO_005', 'Oracle Cloud Infrastructure')
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const paginationConfig = {
    currentPage,
    totalPages: Math.ceil(sampleData.length / rowsPerPage),
    rowsPerPage,
    totalRows: sampleData.length,
    onPageChange: setCurrentPage,
    onRowsPerPageChange: (val: number) => {
      setRowsPerPage(val);
      setCurrentPage(1);
    }
  };

  return (
    <div className="p-8 space-y-10">
      {/* Page Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-h4 font-semibold text-_components-text-primary">User Dashboard</h1>
        <p className="text-body-md text-_components-text-secondary">Welcome back! Here's a quick look at your recent activity.</p>
      </header>

      {/* Overview Chips */}
      <section className="flex flex-wrap gap-4">
        <Chip variant="primary">5 Active Labs</Chip>
        <Chip variant="success">12 Completed Labs</Chip>
        <Chip variant="warning">2 Labs Expiring Soon</Chip>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          variant="profile"
          title="Networking Fundamentals"
          statusLabel="In Development"
          statusTone="warning"
          number="NF_001"
          seriesName="Intro Series"
          organization="Skillable – Production"
          platform="Azure"
          created="May 12, 2025"
          modified="June 5, 2025"
        />

        <DashboardCard
          variant="profile"
          title="Cloud Security Basics"
          statusLabel="Published"
          statusTone="success"
          number="CS_014"
          seriesName="Security Series"
          organization="Skillable – Production"
          platform="AWS"
          created="March 8, 2025"
          modified="June 1, 2025"
          starred
          onStarToggle={() => console.log('Star toggled')}
        />

        <DashboardCard
          variant="profile"
          title="Kubernetes Essentials"
          statusLabel="Draft"
          statusTone="secondary"
          number="KE_003"
          seriesName="Containers Series"
          organization="Skillable – Production"
          platform="GCP"
          created="April 15, 2025"
          modified="May 30, 2025"
        />
      </section>

      {/* Data Table Section */}
      <section className="space-y-4">
        <h2 className="text-h5 font-semibold text-_components-text-primary">Your Lab Items</h2>
        <DataTable
          tabs={tabs}
          columns={columns}
          initialData={sampleData}
          pagination={paginationConfig}
          onTabChange={(tabId) => console.log('Tab changed:', tabId)}
          onMenuClick={() => console.log('Menu clicked')}
        />
      </section>
    </div>
  );
} 