'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '../../../components/buttons/Button';
import { Chip } from '../../../components/info/Chip';
import { Tabs } from '../../../components/navigation/Tabs';
import { Divider } from '../../../components/dividers/Divider';
import { DropdownSelect } from '../../../components/inputs/DropdownSelect';
import { Icon, Icons } from '../../../components/Icon';

// Mock data for the prototype
const labData = {
  id: 'JM41620306',
  status: 'In Development',
  title: 'Creating Your First Graph',
  description: 'The learning objective of this Lab is for users to create their first basic graph within Excel.',
  metadata: {
    duration: '120 Minutes (15 Minute Extension)',
    proficiency: 'Intermediate',
    product: 'Azure',
    platform: 'VM-ESX',
    series: 'Microsoft Excel Basics',
    organization: 'CompTIA (Production)',
    parent: 'Lab Profile Name',
    theme: 'Skillable - V2'
  },
  performance: {
    launches: 91,
    completions: 67,
    cancels: 21,
    avgDuration: '51:09',
    avgLaunches: 1.8,
    avgScore: 94.8
  },
  details: {
    creator: 'John Williams June 13, 2024',
    createdFrom: 'ESX Basic Lab Template 2.1',
    modifiedBy: 'John Williams August 13, 2024',
    owner: 'John Williams',
    publishedToPublic: 'Yes',
    publishedToOrg: 'Yes',
    theme: 'CompTIA Internal Theme',
    ltiUrl: 'https://labondemand.com/LTI/Launch/170514',
    evaluation: 'Skill Academy'
  },
  skills: [
    'Adding a Graph to a File',
    'Microsoft Graph Basics',
    'Editing a Graph in Excel',
    'Line Graphs in Excel',
    'Conditional Formatting a Table',
    'Bar Graphs in Excel'
  ],
  resources: [
    { type: 'PDF Document', name: 'Instructions Packet v1.pdf' },
    { type: 'External Link', name: 'https://www.testpage.com/resource' },
    { type: 'External Link', name: 'https://www.testpage.com/resource' }
  ],
  launchLinks: [
    {
      name: 'Test Link',
      url: 'https://labondemand.com/launch/1234567890abcdef',
      created: 'June 19, 2024 11:19 AM',
      expired: 'August 1, 2024 11:19 AM',
      enabled: 'Yes',
      launchUrls: [
        'https://labondemand.com/launch/url1',
        'https://labondemand.com/launch/url2',
        'https://labondemand.com/launch/url3'
      ]
    }
  ],
  tags: [
    { name: 'Tag name', value: 'Tag Value', expires: '01/04/2025' },
    { name: 'Collection [Exam]', value: 'Advanced Deploy VMware vSphere', expires: '01/04/2025' },
    { name: 'Tag Name Here', value: '', expires: '' },
    { name: 'Tag Name Here', value: '', expires: '' },
    { name: 'Tag Name Here', value: '', expires: '' },
    { name: 'Tag Name Here', value: '', expires: '' }
  ]
};

// Memoized components for performance
const MetadataItem = React.memo(({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-body-sm text-_components-text-secondary">{label}</span>
    <span className="text-body-sm text-_components-text-primary font-medium">{value}</span>
  </div>
));

const PerformanceMetric = React.memo(({ value, label }: { value: string | number; label: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-_components-text-primary mb-1">{value}</div>
    <div className="text-body-xs text-_components-text-secondary uppercase tracking-wide">{label}</div>
  </div>
));

const SkillTag = React.memo(({ skill, onRemove }: { skill: string; onRemove: (skill: string) => void }) => (
  <Chip
    size="small"
    onDelete={() => onRemove(skill)}
    variant="secondary"
  >
    {skill}
  </Chip>
));

const ResourceCard = React.memo(({ resource }: { resource: { type: string; name: string } }) => (
  <div className="border border-_components-divider-main rounded-lg p-4 hover:bg-_components-background-contrast-sm transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-body-sm font-medium text-_components-text-primary">{resource.type}</div>
        <div className="text-body-sm text-_components-text-secondary mt-1">{resource.name}</div>
      </div>
      <Icon icon={Icons.externalLink} className="h-4 w-4 text-_components-text-secondary" />
    </div>
  </div>
));

const LaunchLinkSection = React.memo(({ link }: { link: typeof labData.launchLinks[0] }) => (
  <div className="border border-_components-divider-main rounded-lg p-4 mb-4">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-body-lg font-semibold text-_components-text-primary">{link.name}</h4>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-_components-text-secondary">Launch URL:</span>
        <div className="flex items-center space-x-2">
          <span className="text-body-sm text-_components-text-primary font-mono bg-_components-background-contrast-sm px-2 py-1 rounded">
            {link.url.substring(0, 40)}...
          </span>
          <Button variant="secondary" size="small">Copy</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-body-sm text-_components-text-secondary">Created:</span>
          <div className="text-body-sm text-_components-text-primary">{link.created}</div>
        </div>
        <div>
          <span className="text-body-sm text-_components-text-secondary">Expired:</span>
          <div className="text-body-sm text-_components-text-primary">{link.expired}</div>
        </div>
      </div>
      
      <div>
        <span className="text-body-sm text-_components-text-secondary">Enabled:</span>
        <div className="text-body-sm text-_components-text-primary">{link.enabled}</div>
      </div>
      
      <div>
        <span className="text-body-sm text-_components-text-secondary mb-2 block">Launch URL List:</span>
        <div className="space-y-2">
          {link.launchUrls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-body-sm text-_components-text-primary font-mono bg-_components-background-contrast-sm px-2 py-1 rounded flex-1">
                {url}
              </span>
              <Button variant="secondary" size="small">Copy</Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2 pt-2">
        <Button variant="secondary" size="small">See Instances</Button>
        <Button variant="secondary" size="small">Edit</Button>
        <Button variant="secondary" size="small">Delete</Button>
      </div>
    </div>
  </div>
));

export default function LabProfilePage() {
  const [skills, setSkills] = useState(labData.skills);
  const [isFavorite, setIsFavorite] = useState(false);

  // Memoized tab content
  const tabContent = useMemo(() => [
    {
      id: 'general',
      label: 'General',
      content: (
        <div className="space-y-6">
          {/* Performance Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-lg font-semibold text-_components-text-primary">Performance</h3>
              <Button variant="text" size="small">Find Instances</Button>
            </div>
            <div className="grid grid-cols-3 gap-6 p-6 bg-_components-background-contrast-sm rounded-lg">
              <PerformanceMetric value={labData.performance.launches} label="Launches" />
              <PerformanceMetric value={labData.performance.completions} label="Completions" />
              <PerformanceMetric value={labData.performance.cancels} label="Cancels" />
              <PerformanceMetric value={labData.performance.avgDuration} label="Avg. Duration" />
              <PerformanceMetric value={labData.performance.avgLaunches} label="Avg. Launches" />
              <PerformanceMetric value={`${labData.performance.avgScore}%`} label="Avg. Score" />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-body-lg font-semibold text-_components-text-primary mb-4">Details</h3>
            <div className="space-y-2">
              <MetadataItem label="Creator" value={labData.details.creator} />
              <MetadataItem label="Created From" value={labData.details.createdFrom} />
              <MetadataItem label="Modified by" value={labData.details.modifiedBy} />
              <MetadataItem label="Owner" value={labData.details.owner} />
              <MetadataItem label="Published to Public Template Gallery" value={labData.details.publishedToPublic} />
              <MetadataItem label="Published to Organization Template Gallery" value={labData.details.publishedToOrg} />
              <MetadataItem label="Theme" value={labData.details.theme} />
              <MetadataItem label="LTI Launch URL" value={labData.details.ltiUrl} />
              <MetadataItem label="Evaluation" value={labData.details.evaluation} />
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-lg font-semibold text-_components-text-primary">Skills</h3>
              <Button variant="text" size="small">+ Add Skill</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  onRemove={(skillToRemove) => setSkills(skills.filter(s => s !== skillToRemove))}
                />
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-lg font-semibold text-_components-text-primary">Resources</h3>
              <Button variant="text" size="small">Edit</Button>
            </div>
            <div className="space-y-3">
              {labData.resources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </div>

          {/* Customized Launch Links Section */}
          <div>
            <h3 className="text-body-lg font-semibold text-_components-text-primary mb-4">Customized Launch Links</h3>
            {labData.launchLinks.map((link, index) => (
              <LaunchLinkSection key={index} link={link} />
            ))}
          </div>

          {/* Tags Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-lg font-semibold text-_components-text-primary">Tags</h3>
              <Button variant="text" size="small">Edit</Button>
            </div>
            <div className="space-y-3">
              {labData.tags.map((tag, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-body-sm text-_components-text-primary">
                    {tag.name}: {tag.value}
                  </span>
                                  {tag.expires && (
                  <Chip
                    className="bg-gray-100 text-gray-800 border-gray-200"
                  >
                    Expires {tag.expires}
                  </Chip>
                )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'environment',
      label: 'Environment',
      content: (
        <div className="p-6 text-center text-_components-text-secondary">
          <Icon icon={Icons.settings} className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Environment configuration settings will be displayed here.</p>
        </div>
      )
    },
    {
      id: 'bugReports',
      label: 'Bug Reports',
      content: (
        <div className="p-6 text-center text-_components-text-secondary">
          <Icon icon={Icons.bug} className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Bug reports and issues will be displayed here.</p>
        </div>
      )
    },
    {
      id: 'billing',
      label: 'Billing',
      content: (
        <div className="p-6 text-center text-_components-text-secondary">
          <Icon icon={Icons.creditCard} className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Billing information and usage metrics will be displayed here.</p>
        </div>
      )
    },
    {
      id: 'notes',
      label: 'Notes',
      content: (
        <div className="p-6 text-center text-_components-text-secondary">
          <Icon icon={Icons.note} className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Notes and comments will be displayed here.</p>
        </div>
      )
    }
  ], [skills]);



  return (
    <div className="min-h-screen bg-_components-background-default">
      {/* Secondary Action Bar */}
      <div className="border-b border-_components-divider-main px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="small">
              Edit Profile
            </Button>
            <Button variant="outline" size="small">
              Edit Instructions
            </Button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-md transition-colors ${
                isFavorite 
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : 'text-_components-text-secondary hover:text-_components-text-primary'
              }`}
            >
              <Icon icon={Icons.star} className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md text-_components-text-secondary hover:text-_components-text-primary transition-colors">
              <Icon icon={Icons.more} className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownSelect
              options={[
                { value: 'base-en', label: 'Base Instruction Set (en)' }
              ]}
              value="base-en"
              onChange={() => {}}
              className="w-48"
            />
            <Chip
              size="small"
              icon={Icons.edit}
            >
              {labData.metadata.theme}
            </Chip>
            <Button variant="primary" size="medium">
              Launch Lab
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-[1920px] mx-auto">
        {/* Left Panel - Snapshot (30%) */}
        <div className="w-[30%] p-6 border-r border-_components-divider-main">
          <div className="space-y-6">
            {/* Lab Status and ID */}
            <div>
              <div className="flex items-center justify-start gap-2 mb-2">
                <span className="text-body-xs font-mono text-_components-text-primary">{labData.id}</span>
                <Chip
                  size="small" className="bg-gray-100 text-gray-800 border-gray-200"
                >
                  {labData.status}
                </Chip>
              </div>
            </div>

            {/* Lab Title */}
            <div>
              <h1 className="text-2xl font-bold text-_components-text-primary mb-4">
                {labData.title}
              </h1>
              <p className="text-body-sm text-_components-text-secondary leading-relaxed">
                {labData.description}
              </p>
            </div>

            {/* Lab Metadata */}
            <div className="space-y-4">
              <MetadataItem label="Duration" value={labData.metadata.duration} />
              <MetadataItem label="Proficiency" value={labData.metadata.proficiency} />
              <MetadataItem label="Product" value={labData.metadata.product} />
              <MetadataItem label="Platform" value={labData.metadata.platform} />
              
              <Divider />
              
              <MetadataItem label="Series" value={labData.metadata.series} />
              <MetadataItem label="Organization" value={labData.metadata.organization} />
              <MetadataItem label="Parent" value={labData.metadata.parent} />
              <MetadataItem label="Theme" value={labData.metadata.theme} />
            </div>
          </div>
        </div>

        {/* Right Panel - Detailed Content (70%) */}
        <div className="w-[70%] p-6">
          <Tabs
            items={tabContent}
            defaultIndex={0}
            className="mb-6"
          />
        </div>
      </div>
    </div>
  );
} 