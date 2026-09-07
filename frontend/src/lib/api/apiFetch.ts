import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const body = options?.body

  const response = await fetch(url, {
    ...options,
    body:
      typeof body === "string"
        ? JSON.stringify(snakecaseKeys(JSON.parse(body), { deep: true }))
        : body,
  })

  if (!response.ok) {
    throw new Error("API request failed")
  }

  const { data, meta } = await response.json()

  const camelizedData = camelcaseKeys(data, { deep: true })
  const camelizedMeta = meta
    ? camelcaseKeys(meta, { deep: true })
    : undefined

  if (Array.isArray(camelizedData)) {
    return {
      data: camelizedData.map(({ id, attributes }) => ({
        id,
        ...attributes,
      })),
      meta: camelizedMeta,
    } as T
  }

  return {
    data: {
      id: camelizedData.id,
      ...camelizedData.attributes,
    },
    meta: camelizedMeta,
  } as T
}