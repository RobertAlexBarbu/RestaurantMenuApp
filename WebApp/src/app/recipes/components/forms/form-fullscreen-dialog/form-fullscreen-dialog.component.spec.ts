import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormFullscreenDialogComponent } from './form-fullscreen-dialog.component'

describe('FullscreenDialogComponent', () => {
    let component: FormFullscreenDialogComponent
    let fixture: ComponentFixture<FormFullscreenDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormFullscreenDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(FormFullscreenDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
