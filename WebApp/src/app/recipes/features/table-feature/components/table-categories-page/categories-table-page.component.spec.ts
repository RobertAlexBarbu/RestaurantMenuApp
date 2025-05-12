import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategoriesTablePageComponent } from './categories-table-page.component'

describe('CategoriesTablePageComponent', () => {
    let component: CategoriesTablePageComponent
    let fixture: ComponentFixture<CategoriesTablePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CategoriesTablePageComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(CategoriesTablePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
