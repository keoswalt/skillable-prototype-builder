/*************************
 * Navigation Configuration
 *************************/

export interface MenuItem {
  label: string;
  onClick: () => void;
}

export const FIND_MENU_ITEMS: MenuItem[] = [
  { label: 'Lab profile', onClick: () => alert('Opens find lab profile page') },
  { label: 'Lab series', onClick: () => alert('Opens find lab series page') },
  { label: 'Lab instance', onClick: () => alert('Opens find lab instance page') },
  { label: 'VM profile', onClick: () => alert('Opens find VM profile page') },
  { label: 'User', onClick: () => alert('Opens find users page') },
  { label: 'Bug Report', onClick: () => alert('Opens find bug reports page') },
];

export const CREATE_MENU_ITEMS: MenuItem[] = [
  { label: 'Create lab profile', onClick: () => alert('Opens template gallery to start lab profile creation') },
  { label: 'Create lab series', onClick: () => alert('Opens create lab series page') },
  { label: 'Create VM profile', onClick: () => alert('Opens create new VM page') },
  { label: 'Create removable media', onClick: () => alert('Opens create removable media page') },
  { label: 'Create script template', onClick: () => alert('Opens create new script template page') },
]; 