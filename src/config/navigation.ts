/*************************
 * Navigation Configuration
 *************************/

export interface MenuItem {
  label: string;
  onClick: () => void;
}

export const FIND_MENU_ITEMS: MenuItem[] = [
  { label: 'Lab instances', onClick: () => alert('Opens find lab instance page') },
  { label: 'Lab profiles', onClick: () => alert('Opens find lab profile page') },
  { label: 'Lab series', onClick: () => alert('Opens find lab series page') },
  { label: 'Organizations', onClick: () => alert('Opens find organizations page') },
  { label: 'Users', onClick: () => alert('Opens find users page') },
];

export const CREATE_MENU_ITEMS: MenuItem[] = [
  { label: 'New lab profile', onClick: () => alert('Opens template gallery to start lab profile creation') },
  { label: 'New lab series', onClick: () => alert('Opens create lab series page') },
  { label: 'New virtual machine', onClick: () => alert('Opens create new VM page') },
  { label: 'New script template', onClick: () => alert('Opens create new script template page') },
];

export const TAB_CONFIG = [
  { id: 'instance', label: 'Lab Instances' },
  { id: 'profile', label: 'Lab Profiles' },
  { id: 'series', label: 'Lab Series' },
  { id: 'template', label: 'Templates' },
] as const; 