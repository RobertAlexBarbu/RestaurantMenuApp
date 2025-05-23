import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FullscreenDialogContentComponent } from './fullscreen-dialog-content.component'

describe('FullscreenDialogComponent', () => {
    let component: FullscreenDialogContentComponent
    let fixture: ComponentFixture<FullscreenDialogContentComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FullscreenDialogContentComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(FullscreenDialogContentComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
