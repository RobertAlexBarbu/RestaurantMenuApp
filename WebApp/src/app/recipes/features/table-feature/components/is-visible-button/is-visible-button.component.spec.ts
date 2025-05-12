import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IsVisibleButtonComponent } from './is-visible-button.component'

describe('IsVisibleButtonComponent', () => {
    let component: IsVisibleButtonComponent
    let fixture: ComponentFixture<IsVisibleButtonComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IsVisibleButtonComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(IsVisibleButtonComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
