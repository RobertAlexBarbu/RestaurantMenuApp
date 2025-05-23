import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeatureLoadingPageComponent } from './feature-loading-page.component'

describe('FeatureLoadingPageComponent', () => {
    let component: FeatureLoadingPageComponent
    let fixture: ComponentFixture<FeatureLoadingPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FeatureLoadingPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(FeatureLoadingPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
