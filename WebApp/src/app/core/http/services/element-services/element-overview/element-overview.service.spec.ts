import { TestBed } from '@angular/core/testing'

import { ElementOverviewService } from './element-overview.service'

describe('ElementOverviewService', () => {
    let service: ElementOverviewService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ElementOverviewService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
