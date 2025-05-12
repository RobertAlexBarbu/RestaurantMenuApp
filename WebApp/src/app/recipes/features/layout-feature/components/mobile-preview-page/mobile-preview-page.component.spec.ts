import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MobilePreviewPageComponent } from './mobile-preview-page.component'

describe('MobilePreviewPageComponent', () => {
    let component: MobilePreviewPageComponent
    let fixture: ComponentFixture<MobilePreviewPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MobilePreviewPageComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(MobilePreviewPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
