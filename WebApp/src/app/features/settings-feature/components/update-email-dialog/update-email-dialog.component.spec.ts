import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UpdateEmailDialogComponent } from './update-email-dialog.component'

describe('ChangeEmailDialogComponent', () => {
    let component: UpdateEmailDialogComponent
    let fixture: ComponentFixture<UpdateEmailDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdateEmailDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(UpdateEmailDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
