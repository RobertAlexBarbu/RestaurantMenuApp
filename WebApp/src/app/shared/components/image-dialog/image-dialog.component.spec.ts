import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ImageDialogComponent } from './image-dialog.component'

describe('ImageDialogComponent', () => {
    let component: ImageDialogComponent
    let fixture: ComponentFixture<ImageDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ImageDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
