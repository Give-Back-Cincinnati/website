import { config } from './config/index.js'
import { getMongoDBUriString, establishMongooseConnection } from './mongodb'
import mongoose from 'mongoose'

declare global {
    var __MONGO_URI__: string
}

const mockConnect = jest.spyOn(mongoose, 'connect')
    .mockImplementation((uri, options) => Promise.resolve(mongoose))
// limit any console messages
const mockConsoleInfo = jest.spyOn(console, 'info')
    .mockImplementation((string: string) => {})

describe('getMongoDBUriString', () => {

    it('returns a string', () => {
        expect(typeof getMongoDBUriString()).toBe('string')
    })

    it('returns a string with a protocol', () => {
        expect(getMongoDBUriString()).toContain('mongodb://')
    })

    it('returns a string with a host', () => {
        expect(getMongoDBUriString()).toContain('mongo')
    })

    it('returns a string with a database', () => {
        expect(getMongoDBUriString()).toContain('index')
    })

    it('returns a full URI', () => {
        expect(getMongoDBUriString()).toContain('mongodb://mongo/index')
    })

    it ('returns a URI with username and password', () => {
        config.mongo.username = 'username'
        config.mongo.password = 'password'
        expect(getMongoDBUriString()).toContain('mongodb://username:password@mongo/index')
    })

})

describe('establishMongooseConnection', () => {
    afterAll(() => {
        mockConnect.mockRestore()
    })

    it('returns a promise', () => {
        expect(typeof establishMongooseConnection()).toBe('object')
    })

    it('calls mongoose.connect with the uri and config options', () => {
        establishMongooseConnection()
        expect(mockConnect).toHaveBeenLastCalledWith(getMongoDBUriString(), config.mongo.options)
    })
    
})
