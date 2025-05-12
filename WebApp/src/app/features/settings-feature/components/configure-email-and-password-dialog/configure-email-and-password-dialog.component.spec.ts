import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfigureEmailAndPasswordDialogComponent } from './configure-email-and-password-dialog.component'

describe('ConfigureEmailAndPasswordDialogComponent', () => {
    let component: ConfigureEmailAndPasswordDialogComponent
    let fixture: ComponentFixture<ConfigureEmailAndPasswordDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfigureEmailAndPasswordDialogComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(
            ConfigureEmailAndPasswordDialogComponent,
        )
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
