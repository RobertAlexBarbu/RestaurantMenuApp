import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminFeatureComponent } from './admin-feature.component'

describe('AdminFeatureComponent', () => {
    let component: AdminFeatureComponent
    let fixture: ComponentFixture<AdminFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(AdminFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
