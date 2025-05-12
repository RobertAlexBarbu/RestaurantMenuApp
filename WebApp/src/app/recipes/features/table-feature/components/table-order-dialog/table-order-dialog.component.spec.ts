import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableOrderDialogComponent } from './table-order-dialog.component'

describe('TableOrderDialogComponent', () => {
    let component: TableOrderDialogComponent
    let fixture: ComponentFixture<TableOrderDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableOrderDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableOrderDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
