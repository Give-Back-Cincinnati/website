export interface EntitySchema {
    type: string
    required: string[]
    items?: EntitySchema,
    properties: Record<string, {
        type?: string,
        schema?: $Ref,
        name?: string,
        enum?: string[],
        format?: string,
        example?: string,
        minLength?: number,
        maxLength?: number,
        readonly?: boolean
        pattern?: string
        items?: EntitySchema | { type: String },
        additionalProperties?: EntitySchema,
    }>
}

export interface EntityEnum {
    type: 'string',
    enum: string[]
}

export interface $Ref {
    $ref: string
}

export type Schema = EntitySchema | EntityEnum | $Ref | Record<'allOf', (EntitySchema | $Ref)[]>

export interface Components {
    securitySchemas: Record<string, unknown>
    schemas: Record<string, Schema>
}