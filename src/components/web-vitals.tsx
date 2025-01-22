'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals({ children }: { children?: React.ReactNode }) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  return <>{children}</>;
}
