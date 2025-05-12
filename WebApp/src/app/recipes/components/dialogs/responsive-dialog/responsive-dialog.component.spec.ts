import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResponsiveDialogComponent } from './responsive-dialog.component'

describe('ResponsiveDialogComponent', () => {
    let component: ResponsiveDialogComponent
    let fixture: ComponentFixture<ResponsiveDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResponsiveDialogComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(ResponsiveDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
