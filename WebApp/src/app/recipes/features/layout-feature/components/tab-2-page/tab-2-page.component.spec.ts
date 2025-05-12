import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Tab2PageComponent } from './tab-2-page.component'

describe('Tab2PageComponent', () => {
    let component: Tab2PageComponent
    let fixture: ComponentFixture<Tab2PageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tab2PageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(Tab2PageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
