import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableEditCategoryDialogComponent } from './table-edit-category-dialog.component'

describe('TableEditCategoryDialogComponent', () => {
    let component: TableEditCategoryDialogComponent
    let fixture: ComponentFixture<TableEditCategoryDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableEditCategoryDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableEditCategoryDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
