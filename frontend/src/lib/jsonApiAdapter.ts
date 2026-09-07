import type {
  ApiResponse,
  JsonApiDocument,
  JsonApiResource,
} from "../types/api"

export class JsonApiAdapter {
  private readonly document: JsonApiDocument

  private constructor(document: JsonApiDocument) {
    this.document = document
  }

  static call<T>(
    document: JsonApiDocument,
  ): ApiResponse<T> {
    return {
      data: new JsonApiAdapter(document).adapt() as T,
      meta: document.meta,
    }
  }

  private adapt() {
    const resourceMap = this.buildResourceMap()

    if (!this.document.data) {
      return undefined
    }

    if (Array.isArray(this.document.data)) {
      return this.document.data.map((resource) =>
        this.adaptResource(resource, resourceMap),
      )
    }

    return this.adaptResource(this.document.data, resourceMap)
  }

  private buildResourceMap() {
    return new Map(
      (this.document.included ?? []).map((resource) => [
        this.resourceKey(resource),
        resource,
      ]),
    )
  }

  private adaptResource(
    resource: JsonApiResource,
    resourceMap: Map<string, JsonApiResource>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {
      id: resource.id,
      ...resource.attributes,
    }

    for (const [name, relationship] of Object.entries(
      resource.relationships ?? {},
    )) {
      result[name] = this.adaptRelationship(
        relationship.data,
        resourceMap,
      )
    }

    return result
  }

  private adaptRelationship(
    data:
      | { id: string; type: string }
      | Array<{ id: string; type: string }>
      | null,
    resourceMap: Map<string, JsonApiResource>,
  ) {
    if (data === null) {
      return null
    }

    if (Array.isArray(data)) {
      return data.map((identifier) =>
        this.adaptRelatedResource(identifier, resourceMap),
      )
    }

    return this.adaptRelatedResource(data, resourceMap)
  }

  private adaptRelatedResource(
    identifier: { id: string; type: string },
    resourceMap: Map<string, JsonApiResource>,
  ) {
    const resource = resourceMap.get(
      `${identifier.type}:${identifier.id}`,
    )

    if (!resource) {
      return {
        id: identifier.id,
      }
    }

    return this.adaptResource(resource, resourceMap)
  }

  private resourceKey(resource: JsonApiResource) {
    return `${resource.type}:${resource.id}`
  }
}