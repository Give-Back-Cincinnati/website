export interface EntitySchema {
    type: string
    required: string[]
    properties: Record<string, {
        type: string,
        enum?: string[],
        format?: string,
        example?: string,
        minLength?: number,
        maxLength?: number,
        readonly?: boolean
        pattern?: string
    }>
}

export interface Schema {
    securitySchemas?: Record<string, unknown>
    schemas?: Record<string, EntitySchema>
}