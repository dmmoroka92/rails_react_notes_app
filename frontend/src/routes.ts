export const routes = {
  home: "/",
  folder: (slug: string) => `/folders/${slug}`
} as const