import { SafeResourcePipe } from './safe-resource.pipe'

describe('SafeResourcePipe', () => {
    it('create an instance', () => {
        const pipe = new SafeResourcePipe()
        expect(pipe).toBeTruthy()
    })
})
