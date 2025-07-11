'use client';

/*************************
 * Dashboard Error Page
 *************************/

import { Button } from '@/components/buttons/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
          <p className="text-gray-600 mb-4">
            We encountered an error while loading the dashboard.
          </p>
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
} 