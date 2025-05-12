import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalyticsFeatureComponent } from './analytics-feature.component'

describe('AnalyticsFeatureComponent', () => {
    let component: AnalyticsFeatureComponent
    let fixture: ComponentFixture<AnalyticsFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnalyticsFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AnalyticsFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
