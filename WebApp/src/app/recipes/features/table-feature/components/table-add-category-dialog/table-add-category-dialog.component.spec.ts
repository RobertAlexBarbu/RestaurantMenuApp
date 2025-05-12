import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableAddCategoryDialogComponent } from './table-add-category-dialog.component'

describe('TableAddCategoryDialogComponent', () => {
    let component: TableAddCategoryDialogComponent
    let fixture: ComponentFixture<TableAddCategoryDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableAddCategoryDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableAddCategoryDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
