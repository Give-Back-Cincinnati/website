module.exports = function (entityName) {
return `import { Schema, model } from 'mongoose'

export interface I${entityName} {
    name: string
}

export const ${entityName.toLowerCase()}Schema = new Schema({
    name: String
})

export const ${entityName} = model<I${entityName}>('${entityName}', ${entityName.toLowerCase()}Schema)
`
}
