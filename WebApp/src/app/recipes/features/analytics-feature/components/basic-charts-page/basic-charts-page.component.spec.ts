import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BasicChartsPageComponent } from './basic-charts-page.component'

describe('BasicChartsPageComponent', () => {
    let component: BasicChartsPageComponent
    let fixture: ComponentFixture<BasicChartsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasicChartsPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(BasicChartsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
