import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableFeatureComponent } from './table-feature.component'

describe('TableFeatureComponent', () => {
    let component: TableFeatureComponent
    let fixture: ComponentFixture<TableFeatureComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableFeatureComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(TableFeatureComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
