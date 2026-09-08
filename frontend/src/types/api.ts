export type JsonApiIdentifier = {
  id: string
  type: string
}

export type JsonApiRelationship = {
  data: JsonApiIdentifier | JsonApiIdentifier[] | null
}

export type JsonApiResource = {
  id: string
  type: string
  attributes?: Record<string, unknown>
  relationships?: Record<string, JsonApiRelationship>
}

export type Pagination = {
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  totalPages: number
  totalCount: number
  perPage: number
}

export type JsonApiMeta = {
  message?: string
  pagination?: Pagination
}

export type JsonApiDocument = {
  data?: JsonApiResource | JsonApiResource[]
  included?: JsonApiResource[]
  meta?: JsonApiMeta
}

export type ApiResponse<T> = {
  data?: T
  meta?: JsonApiMeta
}