import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableImportPreviewCategoriesComponent } from './table-import-preview-categories.component'

describe('TableImportPreviewCategoriesComponent', () => {
    let component: TableImportPreviewCategoriesComponent
    let fixture: ComponentFixture<TableImportPreviewCategoriesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableImportPreviewCategoriesComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(TableImportPreviewCategoriesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
