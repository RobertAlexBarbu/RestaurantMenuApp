import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PreferencesPageComponent } from './preferences-page.component'

describe('PreferencesPageComponent', () => {
    let component: PreferencesPageComponent
    let fixture: ComponentFixture<PreferencesPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PreferencesPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(PreferencesPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
