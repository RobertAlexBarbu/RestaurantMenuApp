import { TestBed } from '@angular/core/testing'
import { CanActivateFn } from '@angular/router'

import { isNotAuthGuard } from './is-not-auth.guard'

describe('isNotAuthGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => isNotAuthGuard(...guardParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('should be created', () => {
        expect(executeGuard).toBeTruthy()
    })
})
