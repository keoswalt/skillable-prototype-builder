'use client';

import { useEffect } from 'react';
import { initializeTheme } from './theme';

export default function ThemeInitializer() {
  useEffect(() => {
    initializeTheme();
  }, []);

  // This component doesn't render anything
  return null;
} 