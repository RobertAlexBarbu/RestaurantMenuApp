import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DropdownNavigationPageComponent } from './dropdown-navigation-page.component'

describe('DropdownNavigationPageComponent', () => {
    let component: DropdownNavigationPageComponent
    let fixture: ComponentFixture<DropdownNavigationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DropdownNavigationPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(DropdownNavigationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
