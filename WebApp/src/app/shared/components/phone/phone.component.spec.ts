import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PhoneComponent } from './phone.component'

describe('PhoneComponent', () => {
    let component: PhoneComponent
    let fixture: ComponentFixture<PhoneComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhoneComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(PhoneComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
