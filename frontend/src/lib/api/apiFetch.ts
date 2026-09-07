import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

import type { ApiResponse } from "../../types/api"

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const body = options?.body

  const response = await fetch(url, {
    ...options,
    body:
      typeof body === "string"
        ? JSON.stringify(
            snakecaseKeys(JSON.parse(body), { deep: true }),
          )
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

  // Response contains no data, e.g. DELETE
  if (data === undefined) {
    return {
      meta: camelizedMeta,
    }
  }   

  if (Array.isArray(camelizedData)) {
    return {
      data: camelizedData.map(({ id, attributes }) => ({
        id,
        ...attributes,
      })),
      meta: camelizedMeta,
    } as ApiResponse<T>
  }

  return {
    data: {
      id: camelizedData.id,
      ...camelizedData.attributes,
    },
    meta: camelizedMeta,
  } as ApiResponse<T>
}