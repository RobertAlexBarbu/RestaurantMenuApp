import { TestBed } from '@angular/core/testing'

import { ElementCategoryService } from './element-category.service'

describe('ElementCategoryService', () => {
    let service: ElementCategoryService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ElementCategoryService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
