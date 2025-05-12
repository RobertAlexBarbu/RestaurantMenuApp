import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ScrollNavigationButtonComponent } from './scroll-navigation-button.component'

describe('ScrollNavigationButtonComponent', () => {
    let component: ScrollNavigationButtonComponent
    let fixture: ComponentFixture<ScrollNavigationButtonComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScrollNavigationButtonComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(ScrollNavigationButtonComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
