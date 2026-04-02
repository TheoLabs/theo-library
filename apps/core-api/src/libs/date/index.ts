import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export function today(format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs().tz().format(format);
}

export function add(
  date: Date | string,
  amount: number,
  unit: 'minute' | 'day',
  format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(date).tz().add(amount, unit).format(format);
}

export function subtract(
  date: Date | string,
  amount: number,
  unit: 'minute' | 'day' | 'month',
  format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(date).tz().subtract(amount, unit).format(format);
}

export function startOfDay(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).tz().startOf('day').format(format);
}

export function endOfDay(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).tz().endOf('day').format(format);
}
