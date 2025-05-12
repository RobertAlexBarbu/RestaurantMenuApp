import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UpdatePasswordDialogComponent } from './update-password-dialog.component'

describe('ChangePasswordDialogComponent', () => {
    let component: UpdatePasswordDialogComponent
    let fixture: ComponentFixture<UpdatePasswordDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdatePasswordDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(UpdatePasswordDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
