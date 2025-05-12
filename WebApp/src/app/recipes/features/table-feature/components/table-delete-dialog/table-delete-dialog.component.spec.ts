import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableDeleteDialogComponent } from './table-delete-dialog.component'

describe('TableDeleteDialogComponent', () => {
    let component: TableDeleteDialogComponent
    let fixture: ComponentFixture<TableDeleteDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableDeleteDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableDeleteDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
