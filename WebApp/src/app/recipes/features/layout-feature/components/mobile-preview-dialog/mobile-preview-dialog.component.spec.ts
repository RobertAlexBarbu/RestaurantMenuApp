import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MobilePreviewDialogComponent } from './mobile-preview-dialog.component'

describe('MobilePreviewDialogComponent', () => {
    let component: MobilePreviewDialogComponent
    let fixture: ComponentFixture<MobilePreviewDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MobilePreviewDialogComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(MobilePreviewDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
