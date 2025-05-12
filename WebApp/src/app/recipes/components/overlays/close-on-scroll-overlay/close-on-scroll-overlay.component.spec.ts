import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CloseOnScrollOverlayComponent } from './close-on-scroll-overlay.component'

describe('CloseOnScrollOverlayComponent', () => {
    let component: CloseOnScrollOverlayComponent
    let fixture: ComponentFixture<CloseOnScrollOverlayComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CloseOnScrollOverlayComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CloseOnScrollOverlayComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
