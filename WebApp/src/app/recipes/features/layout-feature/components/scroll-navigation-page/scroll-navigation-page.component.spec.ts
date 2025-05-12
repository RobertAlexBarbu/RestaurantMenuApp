import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ScrollNavigationPageComponent } from './scroll-navigation-page.component'

describe('ScrollNavigationPageComponent', () => {
    let component: ScrollNavigationPageComponent
    let fixture: ComponentFixture<ScrollNavigationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScrollNavigationPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(ScrollNavigationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
