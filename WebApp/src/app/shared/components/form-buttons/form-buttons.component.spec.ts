import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormButtonsComponent } from './form-buttons.component'

describe('FormButtonsComponent', () => {
    let component: FormButtonsComponent
    let fixture: ComponentFixture<FormButtonsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormButtonsComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(FormButtonsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
