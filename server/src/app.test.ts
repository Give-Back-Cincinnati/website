import { server } from './app'

describe('server', () => {

    afterAll(() => {
        server.close()
    })

    it('is listening', () => {
        expect(server.listening).toBe(true)
    })
})
