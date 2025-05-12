import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableDeleteCategoryDialogComponent } from './table-delete-category-dialog.component'

describe('TableDeleteCategoryDialogComponent', () => {
    let component: TableDeleteCategoryDialogComponent
    let fixture: ComponentFixture<TableDeleteCategoryDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableDeleteCategoryDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableDeleteCategoryDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
