import dayjs from "../core/dayjs";

export function formatDateTime(timestamp: Date | string | number): string {
  const date = dayjs(timestamp);

  return date.format("DD MMMM YYYY [Time] hh:mm A");
}
