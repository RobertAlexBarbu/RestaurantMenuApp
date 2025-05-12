import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RepositionOverlayComponent } from './reposition-overlay.component'

describe('RepositionOverlayComponent', () => {
    let component: RepositionOverlayComponent
    let fixture: ComponentFixture<RepositionOverlayComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RepositionOverlayComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(RepositionOverlayComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
