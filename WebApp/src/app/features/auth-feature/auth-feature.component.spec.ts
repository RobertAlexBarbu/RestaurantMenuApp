import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthFeatureComponent } from './auth-feature.component'

describe('AuthFeatureComponent', () => {
    let component: AuthFeatureComponent
    let fixture: ComponentFixture<AuthFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuthFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AuthFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
