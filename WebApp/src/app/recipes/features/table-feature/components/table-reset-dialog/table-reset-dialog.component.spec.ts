import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableResetDialogComponent } from './table-reset-dialog.component'

describe('TableResetDialogComponent', () => {
    let component: TableResetDialogComponent
    let fixture: ComponentFixture<TableResetDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableResetDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableResetDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
