import React, { useState } from 'react';
import { DataTable } from '.';
import { Icons } from '../Icon';
import { Row, CellData } from './types';

// Use a fixed ISO timestamp to ensure server- and client-side render produce identical output, preventing hydration mismatch.
const FIXED_TIMESTAMP = '2025-06-05T12:00:00.000Z';

const createSampleRow = (id: string, name: string, isFavorited = false): Row => ({
  id,
  isFavorited,
  cells: [
    {
      type: 'label',
      value: id,
      columnKey: 'number'
    },
    {
      type: 'favorite',
      value: name,
      columnKey: 'name',
      additionalProps: {
        href: `https://google.com`,
        target: '_blank'
      }
    },
    {
      type: 'date',
      value: FIXED_TIMESTAMP,
      columnKey: 'lastModified'
    },
    {
      type: 'link',
      value: 'Advanced Networking Series',
      columnKey: 'series',
      additionalProps: {
        href: `/series/${id}`,
        target: '_self'
      }
    },
    {
      type: 'label',
      value: 'IBM | ESX',
      columnKey: 'platform'
    },
    {
      type: 'status',
      value: 'Complete',
      columnKey: 'status'
    },
    {
      type: 'actions',
      value: [
        {
          icon: 'edit',
          onClick: () => console.log('Edit', id),
          title: 'Edit'
        },
        {
          icon: 'gradCap',
          onClick: () => console.log('Edit Instructions', id),
          title: 'Edit Instructions'
        },
        {
          icon: 'saveAll',
          onClick: () => console.log('Save As', id),
          title: 'Save As'
        },
        {
          icon: 'externalLink',
          onClick: () => console.log('Launch Lab', id),
          title: 'Launch Lab'
        }
      ],
      columnKey: 'actions'
    }
  ]
});

export const DataTableExample: React.FC = () => {
  const tabs = [
    { id: 'instances', label: 'Lab Instances' },
    { id: 'profiles', label: 'Lab Profiles' },
    { id: 'series', label: 'Lab Series' }
  ];

  const columns = [
    { id: 'number', label: 'Number', width: '5%', sortable: true },
    { id: 'name', label: 'Name', width: 'auto', sortable: true },
    { id: 'lastModified', label: 'Last Modified', width: '20%', sortable: true },
    { id: 'series', label: 'Series', width: '20%', sortable: true },
    { id: 'platform', label: 'Platform', width: '15%' },
    { id: 'status', label: 'Status', width: '10%', sortable: true },
    { id: 'actions', label: 'Action', width: '15%' }
  ];

  const sampleData = [
    createSampleRow('KO_004', 'IBM Cloud VPC', true),
    createSampleRow('KO_001', 'Azure Virtual Networks'),
    createSampleRow('KO_005', 'Oracle Cloud Infrastructure'),
    createSampleRow('KO_003', 'Google Cloud VPC'),
    createSampleRow('KO_006', 'DigitalOcean VPC', true),
    createSampleRow('KO_008', 'VMware Cloud on AWS'),
    createSampleRow('KO_009', 'Cisco ACI'),
    createSampleRow('KO_010', 'Mikrotik Router'),
    createSampleRow('KO_007', 'Alibaba Cloud VPC'),
    createSampleRow('KO_002', 'AWS VPC'),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginationConfig = {
    currentPage,
    totalPages: Math.ceil(sampleData.length / rowsPerPage),
    rowsPerPage,
    totalRows: sampleData.length,
    onPageChange: setCurrentPage,
    onRowsPerPageChange: (newRowsPerPage: number) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to first page when changing rows per page
    }
  };

  return (
    <div className="">
      <DataTable
        tabs={tabs}
        columns={columns}
        initialData={sampleData}
        pagination={paginationConfig}
        onTabChange={(tabId) => console.log('Tab changed:', tabId)}
        onMenuClick={() => console.log('Menu clicked')}
      />
    </div>
  );
};

export default DataTableExample; 