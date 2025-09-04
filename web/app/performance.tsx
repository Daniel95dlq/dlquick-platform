'use client';

import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      }).catch(err => {
        console.error('Failed to load web-vitals:', err);
      });
    }
  }, []);

  const onPerfEntry = (metric: PerformanceMetric) => {
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_map: {
          metric_rating: metric.rating,
          metric_delta: metric.delta,
        },
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // Send to custom monitoring service (optional)
    sendToAnalytics(metric);
  };

  const sendToAnalytics = (metric: PerformanceMetric) => {
    // Custom analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    });

    // Use Navigator.sendBeacon if available
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body);
    } else {
      fetch('/api/analytics/vitals', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: true,
      }).catch(err => {
        console.error('Failed to send performance metric:', err);
      });
    }
  };

  return null; // This component doesn't render anything
}

// Performance observer for additional metrics
export function initPerformanceObserver() {
  if (typeof window === 'undefined') return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            console.warn(`Long task detected: ${entry.duration}ms`);
            
            // Track long tasks in analytics
            if (window.gtag) {
              window.gtag('event', 'long_task', {
                event_category: 'performance',
                value: Math.round(entry.duration),
                custom_map: {
                  task_start: entry.startTime,
                  task_duration: entry.duration,
                },
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Performance observer not supported:', e);
    }
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined') return;

  const performance = window.performance as any;
  
  if (performance.memory) {
    const memoryInfo = {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
    };

    // Track memory usage
    if (window.gtag) {
      window.gtag('event', 'memory_usage', {
        event_category: 'performance',
        custom_map: memoryInfo,
      });
    }

    return memoryInfo;
  }

  return null;
}
