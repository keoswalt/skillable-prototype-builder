type Theme = 'light' | 'dark' | 'system';

export function initializeTheme() {
  // Get stored theme or default to 'system'
  const storedTheme = (localStorage.getItem('theme') as Theme) || 'system';
  
  if (storedTheme === 'system') {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    
    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
          document.documentElement.classList.toggle('dark', e.matches);
        }
      });
  } else {
    // Apply stored preference
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }
}

export function setTheme(theme: Theme) {
  if (theme === 'system') {
    localStorage.removeItem('theme');
    initializeTheme();
  } else {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
} 