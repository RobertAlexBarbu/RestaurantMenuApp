import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableImportDialogComponent } from './table-import-dialog.component'

describe('TableImportDialogComponent', () => {
    let component: TableImportDialogComponent
    let fixture: ComponentFixture<TableImportDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableImportDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableImportDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
