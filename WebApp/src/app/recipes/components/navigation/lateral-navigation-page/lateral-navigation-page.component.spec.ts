import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LateralNavigationPageComponent } from './lateral-navigation-page.component'

describe('LateralNavigationPageComponent', () => {
    let component: LateralNavigationPageComponent
    let fixture: ComponentFixture<LateralNavigationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LateralNavigationPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LateralNavigationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
