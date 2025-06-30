import { DEFAULT_CONFIGURATION } from './constants';
import type { CollectionEntry } from 'astro:content';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Default to UTC to prevent timezone issues
  });

  // Ensure we're parsing the date correctly
  return formatter.format(new Date(date));
};

export const generateAbsoluteUrl = (path: string) =>
  DEFAULT_CONFIGURATION.baseUrl.concat(path);

export const isDevelopment = () => import.meta.env.MODE === 'development';

export const includeDraft = (draft: boolean) => {
  if (isDevelopment()) return true;
  return draft !== true;
};

// export const sortJobsByDate = (jobs: CollectionEntry<'jobs'>[]) => {
//   // Convert "Now" to current year, otherwise returns the year as is
//   const getEndYear = (job: CollectionEntry<'jobs'>) =>
//     job.data.to === 'Now' ? new Date().getFullYear() : job.data.to;

//   return jobs.sort((current, next) => {
//     // Compare end years first, then fall back to start years if end years are equal
//     const [currentEnd, nextEnd] = [getEndYear(current), getEndYear(next)];
//     return nextEnd - currentEnd || next.data.from - current.data.from;
//   });
// };

export const sortJobsByDate = (jobs: CollectionEntry<'jobs'>[]) => {
  return jobs.sort((a, b) => {
    const aEnd = a.data.to === 'Now' ? new Date() : new Date(`${a.data.to} 1`);
    const bEnd = b.data.to === 'Now' ? new Date() : new Date(`${b.data.to} 1`);

    if (bEnd.getTime() !== aEnd.getTime()) {
      return bEnd.getTime() - aEnd.getTime();
    }

    const aStart = new Date(`${a.data.from} 1`);
    const bStart = new Date(`${b.data.from} 1`);

    return bStart.getTime() - aStart.getTime();
  });
};

export const getDurationInMonths = (from: string, to?: string): string => {
  const fromDate = new Date(`${from}-01`);
  const toDate = to === 'Now' || !to ? new Date() : new Date(`${to}-01`);

  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months + 1; // +1 for inclusive counting
  const resultYears = Math.floor(totalMonths / 12);
  const resultMonths = totalMonths % 12;

  const yearLabel = resultYears > 0 ? `${resultYears} year${resultYears > 1 ? 's' : ''}` : '';
  const monthLabel = resultMonths > 0 ? `${resultMonths} month${resultMonths > 1 ? 's' : ''}` : '';

  return [yearLabel, monthLabel].filter(Boolean).join(' ');
};