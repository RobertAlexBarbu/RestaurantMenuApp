import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabsPageComponent } from './tabs-page.component'

describe('TabsPageComponent', () => {
    let component: TabsPageComponent
    let fixture: ComponentFixture<TabsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(TabsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
