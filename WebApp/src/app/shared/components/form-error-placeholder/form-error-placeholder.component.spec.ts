import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormErrorPlaceholderComponent } from './form-error-placeholder.component'

describe('FormErrorPlaceholderComponent', () => {
    let component: FormErrorPlaceholderComponent
    let fixture: ComponentFixture<FormErrorPlaceholderComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormErrorPlaceholderComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(FormErrorPlaceholderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
