export interface Path {
    parameters?: { in: string, name: string }[]
    get?: any
    post?: { requestBody: { content: { 'application/json': { schema: { $ref: string } } } } }
    patch?: any
    delete?: any
}