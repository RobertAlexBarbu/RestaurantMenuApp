import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AccountPageComponent } from './account-page.component'

describe('GeneralSettingsPageComponent', () => {
    let component: AccountPageComponent
    let fixture: ComponentFixture<AccountPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AccountPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AccountPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
