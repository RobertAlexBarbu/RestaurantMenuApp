import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabsNavigationPageComponent } from './tabs-navigation-page.component'

describe('DrawerNavigationPageComponent', () => {
    let component: TabsNavigationPageComponent
    let fixture: ComponentFixture<TabsNavigationPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsNavigationPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TabsNavigationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
