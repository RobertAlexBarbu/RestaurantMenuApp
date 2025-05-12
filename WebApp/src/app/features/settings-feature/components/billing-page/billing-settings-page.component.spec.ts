import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BillingSettingsPageComponent } from './billing-settings-page.component'

describe('BillingSettingsPageComponent', () => {
    let component: BillingSettingsPageComponent
    let fixture: ComponentFixture<BillingSettingsPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BillingSettingsPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BillingSettingsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
