import { TestBed } from '@angular/core/testing'
import { CanActivateFn } from '@angular/router'

import { isSetupCompleteGuard } from './is-setup-complete.guard'

describe('isSetupCompleteGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => isSetupCompleteGuard(...guardParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('should be created', () => {
        expect(executeGuard).toBeTruthy()
    })
})
