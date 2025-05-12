import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddSelectDialogComponent } from './add-select-dialog.component'

describe('AddSelectDialogComponent', () => {
    let component: AddSelectDialogComponent
    let fixture: ComponentFixture<AddSelectDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddSelectDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AddSelectDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
