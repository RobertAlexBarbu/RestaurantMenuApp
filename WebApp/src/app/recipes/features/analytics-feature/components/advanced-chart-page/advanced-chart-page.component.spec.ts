import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdvancedChartPageComponent } from './advanced-chart-page.component'

describe('AdvancedChartPageComponent', () => {
    let component: AdvancedChartPageComponent
    let fixture: ComponentFixture<AdvancedChartPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdvancedChartPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(AdvancedChartPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
