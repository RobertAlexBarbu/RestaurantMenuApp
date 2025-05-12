import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableImportPreviewElementsComponent } from './table-import-preview-elements.component'

describe('TableImportPreviewElementsComponent', () => {
    let component: TableImportPreviewElementsComponent
    let fixture: ComponentFixture<TableImportPreviewElementsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableImportPreviewElementsComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(TableImportPreviewElementsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
