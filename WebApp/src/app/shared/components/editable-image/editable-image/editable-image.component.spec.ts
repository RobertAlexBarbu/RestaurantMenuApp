import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditableImageComponent } from './editable-image.component'

describe('ProfilePictureComponent', () => {
    let component: EditableImageComponent
    let fixture: ComponentFixture<EditableImageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditableImageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(EditableImageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
