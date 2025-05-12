import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Tab1PageComponent } from './tab-1-page.component'

describe('Tab1PageComponent', () => {
    let component: Tab1PageComponent
    let fixture: ComponentFixture<Tab1PageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tab1PageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(Tab1PageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
