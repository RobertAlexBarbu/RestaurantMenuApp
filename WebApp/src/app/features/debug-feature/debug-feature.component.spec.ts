import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DebugFeatureComponent } from './debug-feature.component'

describe('DebugFeatureComponent', () => {
    let component: DebugFeatureComponent
    let fixture: ComponentFixture<DebugFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DebugFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DebugFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
