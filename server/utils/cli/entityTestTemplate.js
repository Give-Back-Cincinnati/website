module.exports = function(entityName) {
    return `import mongoose from 'mongoose'
import { I${entityName}, ${entityName} } from './${entityName}'

declare global {
    var __MONGO_URI__: string
}

describe('${entityName}', () => {
    let connection: any
    beforeAll(async () => {
        connection = await mongoose.connect(global.__MONGO_URI__ as string)
    });

    beforeEach(async () => {
        await ${entityName}.deleteMany({})
    })

    afterAll(async () => {
        await connection.disconnect()
    })

    it('creates a ${entityName}', async () => {
        expect.assertions(2)
        
        const entity = await new ${entityName}({})
            .save()
        expect(entity).toBeDefined()

        const found = await ${entityName}.findById(entity._id)
        expect(found).toBeDefined()
    })

    it('updates a ${entityName}', async () => {
        expect.assertions(2)
        
        const entity = await new ${entityName}({})
            .save()
        expect(entity).toBeDefined()

        await ${entityName}.updateOne({ _id: entity._id }, { name: 'updated' })
        const found = await ${entityName}.findById(entity._id)
        expect(found?.name).toBe('updated')
    })

    it('deletes a ${entityName}', async () => {
        expect.assertions(2)
        
        const entity = await new ${entityName}({})
            .save()
        expect(entity).toBeDefined()

        await ${entityName}.deleteOne({ _id: entity._id })
        const found = await ${entityName}.findById(entity._id)
        expect(found).toBeNull()
    })
})
`}