export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(date))
    .toUpperCase()
}