import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditableImageMainComponent } from './editable-image-main.component'

describe('EditableImageMainComponent', () => {
    let component: EditableImageMainComponent
    let fixture: ComponentFixture<EditableImageMainComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditableImageMainComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(EditableImageMainComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
