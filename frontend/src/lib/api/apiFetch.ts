import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

import type { ApiResponse, JsonApiDocument } from "../../types/api"
import { JsonApiAdapter } from "../jsonApiAdapter"

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

  const json = await response.json()

  const camelizedDocument = camelcaseKeys(
    json,
    { deep: true },
  ) as JsonApiDocument

  return JsonApiAdapter.call<T>(camelizedDocument)
}