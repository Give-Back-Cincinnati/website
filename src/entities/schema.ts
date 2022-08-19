export interface EntitySchema {
    type: string
    required: string[]
    properties: Record<string, { type: string, format?: string, example?: string, minLength?: number, maxLength?: number }>
}

export interface Schema {
    securitySchemas?: Record<string, unknown>
    schemas?: Record<string, EntitySchema>
}