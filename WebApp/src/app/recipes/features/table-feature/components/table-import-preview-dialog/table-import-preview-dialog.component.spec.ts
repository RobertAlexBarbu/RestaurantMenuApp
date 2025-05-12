import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableImportPreviewDialogComponent } from './table-import-preview-dialog.component'

describe('TableImportPreviewDialogComponent', () => {
    let component: TableImportPreviewDialogComponent
    let fixture: ComponentFixture<TableImportPreviewDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableImportPreviewDialogComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(TableImportPreviewDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
