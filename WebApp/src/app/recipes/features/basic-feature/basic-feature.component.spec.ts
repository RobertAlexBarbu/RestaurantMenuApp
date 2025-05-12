import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BasicFeatureComponent } from './basic-feature.component'

describe('Feature1Component', () => {
    let component: BasicFeatureComponent
    let fixture: ComponentFixture<BasicFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasicFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BasicFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
