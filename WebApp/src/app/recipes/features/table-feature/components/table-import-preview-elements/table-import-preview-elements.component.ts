import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    signal,
    TrackByFunction,
    viewChild,
} from '@angular/core'

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
} from '@angular/material/table'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { InlineWeightInputComponent } from '../inline-weight-input/inline-weight-input.component'
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { MatInput } from '@angular/material/input'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { detailExpandAnimation, fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ImportElementDto } from '../../../../../core/http/dto/element/import-element.dto'
import { TableUtilityService } from '../../../../../core/services/table-utility/table-utility.service'
import { map, startWith } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption,
} from '@angular/material/autocomplete'

interface TableItem extends ImportElementDto {
    
}
@Component({
    selector: 'app-table-import-preview-elements',
    imports: [
        InlineWeightInputComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatPaginator,
        MatPrefix,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatSuffix,
        MatTable,
        ReactiveFormsModule,
        MatHeaderCellDef,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatOption,
    ],
    templateUrl: './table-import-preview-elements.component.html',
    styleUrl: './table-import-preview-elements.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
})
export class TableImportPreviewElementsComponent {
    private readonly pg = inject(MatPaginatorIntl)
    private readonly tableUtilityService = inject(TableUtilityService);
    private readonly destroyRef = inject(DestroyRef)
    readonly sorter = viewChild.required(MatSort)
    readonly paginator = viewChild.required(MatPaginator)
    readonly elements = input<ImportElementDto[]>([])

    // General Table Fields
    expandedTableItemId: string | null = null
    tableItems: TableItem[] = []
    dataSource: MatTableDataSource<TableItem> =
        new MatTableDataSource<TableItem>([])
    displayedColumns: string[] = [
        'position',
        'name',
        'expand',
        'weight',
        'symbol',
        'density',
        'meltingPoint',
        'boilingPoint',
        'atomicRadius',
        'categoryName',
    ]

    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()


    constructor() {
        effect(() => {
            // Set up table
            this.tableItems = this.elements();
            this.dataSource = new MatTableDataSource(this.tableItems)
            this.searchFilterOptions.set(this.tableItems.map((t) => t.name))
            
            // Apply Search Filter
            this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
            const searchValue = this.searchFilterFormControl.value
            if (this.searchFilterValue) {
                this.visibleSearchFilterOptions.set(
                    this.searchFilterOptions().filter((option) =>
                        option.toLowerCase().includes(searchValue.toLowerCase()),
                    ),
                )
            } else {
                this.visibleSearchFilterOptions.set(this.searchFilterOptions())
            }

            // Set Up Sorter/Paginator
            this.paginator().length = this.dataSource.filteredData.length
            this.dataSource.sort = this.sorter()
            this.dataSource.paginator = this.paginator()
        })
        this.tableUtilityService.setUpPaginatorIntl(this.pg);

        this.searchFilterFormControl.valueChanges
            .pipe(
                startWith(''),
                map((value) => this.searchFilterHelper(value || '')),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((value) => {
                this.visibleSearchFilterOptions.set(value)
            })
    }



    toggleExpandRow(tableItem: TableItem) {
        this.expandedTableItemId =
            this.expandedTableItemId === tableItem.name ? null : tableItem.name
    }


    // Search Filter Methods
    applySearchFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.searchFilterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator().length = this.dataSource.filteredData.length
    }
    clearSearchFilter(event: Event): void {
        event.stopPropagation()
        this.searchFilterFormControl.setValue('')
        this.visibleSearchFilterOptions.set(this.searchFilterOptions())
        const filterValue = ''
        this.searchFilterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator().length = this.dataSource.filteredData.length
    }
    applySearchFilterSelect(event: MatAutocompleteSelectedEvent) {
        const filterValue = event.option.value
        this.searchFilterValue = filterValue
        this.dataSource.filter = filterValue.trim().toLowerCase()
        this.paginator().length = this.dataSource.filteredData.length
    }
    searchFilterHelper(value: string): string[] {
        const filterValue = value.toLowerCase()
        if (value == '') {
            return this.searchFilterOptions()
        }
        return this.searchFilterOptions().filter((option) =>
            option.toLowerCase().includes(filterValue),
        )
    }

}
