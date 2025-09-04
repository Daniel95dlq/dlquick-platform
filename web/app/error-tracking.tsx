'use client';

import { useEffect } from 'react';

interface ErrorInfo {
  message: string;
  stack?: string;
  url: string;
  line?: number;
  column?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
}

export function ErrorBoundary() {
  useEffect(() => {
    // Global error handler for unhandled JavaScript errors
    const handleError = (event: ErrorEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        line: event.lineno,
        column: event.colno,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      };

      logError(errorInfo);
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorInfo: ErrorInfo = {
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      };

      logError(errorInfo);
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}

// Log error to multiple services
function logError(errorInfo: ErrorInfo) {
  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', errorInfo);
  }

  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: errorInfo.message,
      fatal: false,
      custom_map: {
        error_stack: errorInfo.stack,
        error_url: errorInfo.url,
        error_line: errorInfo.line,
        error_column: errorInfo.column,
      },
    });
  }

  // Send to custom error tracking service
  sendErrorToService(errorInfo);
}

// Send to custom monitoring service
async function sendErrorToService(errorInfo: ErrorInfo) {
  try {
    const response = await fetch('/api/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorInfo),
      keepalive: true,
    });

    if (!response.ok) {
      console.error('Failed to send error to tracking service');
    }
  } catch (err) {
    console.error('Error sending to tracking service:', err);
  }
}

// Manual error tracking for specific business logic
export function trackError(error: Error, context?: Record<string, any>) {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    ...context,
  };

  logError(errorInfo);
}

// Track user actions that might lead to errors
export function trackUserAction(action: string, details?: Record<string, any>) {
  if (window.gtag) {
    window.gtag('event', 'user_action', {
      event_category: 'user_behavior',
      event_label: action,
      custom_map: details,
    });
  }
}

// Network error tracking
export function trackNetworkError(url: string, status: number, statusText: string) {
  const errorInfo = {
    message: `Network Error: ${status} ${statusText}`,
    url: url,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  };

  if (window.gtag) {
    window.gtag('event', 'network_error', {
      event_category: 'network',
      event_label: `${status} - ${url}`,
      value: status,
    });
  }

  console.error('[Network Error]', errorInfo);
}
