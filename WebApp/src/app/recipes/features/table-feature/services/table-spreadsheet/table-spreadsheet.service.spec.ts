import { TestBed } from '@angular/core/testing'

import { TableSpreadsheetService } from './table-spreadsheet.service'

describe('TableSpreadsheetService', () => {
    let service: TableSpreadsheetService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(TableSpreadsheetService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
