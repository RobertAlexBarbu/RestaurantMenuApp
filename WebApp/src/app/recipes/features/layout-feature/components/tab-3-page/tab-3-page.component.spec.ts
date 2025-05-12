import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Tab3PageComponent } from './tab-3-page.component'

describe('Tab3PageComponent', () => {
    let component: Tab3PageComponent
    let fixture: ComponentFixture<Tab3PageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Tab3PageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(Tab3PageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
