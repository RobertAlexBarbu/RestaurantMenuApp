import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ScrollDialogComponent } from './scroll-dialog.component'

describe('ScrollDialogComponent', () => {
    let component: ScrollDialogComponent
    let fixture: ComponentFixture<ScrollDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScrollDialogComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(ScrollDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
