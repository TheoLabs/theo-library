import dayjs from "dayjs";
import "dayjs/locale/ko";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { type CalendarDate } from "@theo-library/shared";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.locale("ko");

export function format(
  date: Date | CalendarDate,
  format: "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" = "YYYY-MM-DD",
) {
  return dayjs(date).tz().format(format);
}

export function today(
  date?: Date | CalendarDate,
  format: "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" = "YYYY-MM-DD",
) {
  return dayjs(date).tz().startOf("day").format(format);
}

export function add(
  date: Date | CalendarDate,
  day: number,
  unit: "day" | "month" | "year" = "day",
  format: "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" = "YYYY-MM-DD",
) {
  return dayjs(date).tz().add(day, unit).format(format);
}

export default dayjs;
