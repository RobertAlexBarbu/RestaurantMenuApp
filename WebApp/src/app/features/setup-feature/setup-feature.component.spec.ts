import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SetupFeatureComponent } from './setup-feature.component'

describe('SetupFeatureComponent', () => {
    let component: SetupFeatureComponent
    let fixture: ComponentFixture<SetupFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SetupFeatureComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(SetupFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
