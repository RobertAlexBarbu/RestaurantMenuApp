import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BasicFormPageComponent } from './basic-form-page.component'

describe('BasicFormPageComponent', () => {
    let component: BasicFormPageComponent
    let fixture: ComponentFixture<BasicFormPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BasicFormPageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BasicFormPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
