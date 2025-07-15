"use client";

import React from 'react';
import { DashboardCardExample } from '@/components/cards/dashboard/DashboardCardExample';

export default function TestInteractiveCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interactive Dashboard Cards Test</h1>
          <p className="text-gray-600 mb-6">
            This page demonstrates the new interactive dashboard cards functionality. 
            Each card below has different click behaviors configured:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-8">
            <li><strong>Instance Card:</strong> URL navigation (opens in new tab)</li>
            <li><strong>Profile Card:</strong> Custom alert message</li>
            <li><strong>Series Card:</strong> Callback function with console log</li>
            <li><strong>Template Card:</strong> Simple alert</li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Interactive Features:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Hover over cards to see visual feedback</li>
              <li>• Click anywhere on the card (except buttons/links) to trigger the configured behavior</li>
              <li>• Use keyboard navigation (Tab + Enter/Space) for accessibility</li>
              <li>• Individual metadata links and action buttons still work independently</li>
            </ul>
          </div>
        </div>
        
        <DashboardCardExample />
      </div>
    </div>
  );
} 