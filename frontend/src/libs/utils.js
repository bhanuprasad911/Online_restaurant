import {
  format,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  isAfter,
  parseISO,
  startOfWeek,
} from 'date-fns';

export function aggregateOrders(orders, range = 'daily') {
  const now = new Date();
  const grouped = {};
  let cutoffDate;

  if (range === 'daily') {
    cutoffDate = subDays(now, 6);
    for (let i = 6; i >= 0; i--) {
      const label = format(subDays(now, i), 'EEE'); // Mon, Tue, etc.
      grouped[label] = 0;
    }
  } else if (range === 'weekly') {
    cutoffDate = subWeeks(now, 6);
    for (let i = 6; i >= 0; i--) {
      const label = `week-${7 - i}`; // week-1 to week-7
      grouped[label] = 0;
    }
  } else if (range === 'monthly') {
    cutoffDate = subMonths(now, 6);
    for (let i = 6; i >= 0; i--) {
      const label = format(subMonths(now, i), 'MMM'); // Jan, Feb, etc.
      grouped[label] = 0;
    }
  } else if (range === 'yearly') {
    cutoffDate = subYears(now, 6);
    for (let i = 6; i >= 0; i--) {
      const label = format(subYears(now, i), 'yyyy'); // 2022, 2023, etc.
      grouped[label] = 0;
    }
  }

  // Aggregate revenue instead of order count
  orders.forEach(order => {
    const date = parseISO(order.createdAt);
    if (!isAfter(date, cutoffDate)) return;

    let key;
    if (range === 'daily') {
      key = format(date, 'EEE');
    } else if (range === 'weekly') {
      const weekDiff = Math.floor((now - startOfWeek(date)) / (7 * 24 * 60 * 60 * 1000));
      const weekIndex = 6 - weekDiff;
      key = `week-${7 - weekIndex}`;
    } else if (range === 'monthly') {
      key = format(date, 'MMM');
    } else if (range === 'yearly') {
      key = format(date, 'yyyy');
    }

    if (grouped.hasOwnProperty(key)) {
      grouped[key] += order.total || 0;
    }
  });

  // For weekly range: sort by week number (ascending)
  if (range === 'weekly') {
    return Object.entries(grouped)
      .map(([time, revenue]) => ({ time, revenue }))
      .sort((a, b) => {
        const aNum = parseInt(a.time.split('-')[1]);
        const bNum = parseInt(b.time.split('-')[1]);
        return aNum - bNum; // ascending: week-1 to week-7
      });
  }

  // For other ranges: no sorting needed
  return Object.entries(grouped).map(([time, revenue]) => ({
    time,
    revenue,
  }));
}













export const filterOrdersByRange = (range, orders) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate;

    switch (range) {
      case "daily":
        startDate = new Date(today);
        break;
      case "weekly":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);
        break;
      case "monthly":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "yearly":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return [];
    }

    return orders.filter((order) => {
      const created = new Date(order.createdAt);
      return created >= startDate && created <= now;
    });
  };