// export type ApiResponse<T> = {
//   data?: T,
//   meta?: {
//     message?: string
//   }
// }

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

export type JsonApiDocument = {
  data?: JsonApiResource | JsonApiResource[]
  included?: JsonApiResource[]
  meta?: {
    message?: string
  }
}

export type ApiResponse<T> = {
  data?: T
  meta?: {
    message?: string
  }
}