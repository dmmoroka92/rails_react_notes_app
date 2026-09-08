export const routes = {
  home: "/",
  folder: (slug: string) => `/folders/${slug}`,
  folders: "/folders",
  archiveNotes: "/notes/archive"
} as const