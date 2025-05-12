import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InlineWeightInputComponent } from './inline-weight-input.component'

describe('InlineInputComponent', () => {
    let component: InlineWeightInputComponent
    let fixture: ComponentFixture<InlineWeightInputComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InlineWeightInputComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(InlineWeightInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
