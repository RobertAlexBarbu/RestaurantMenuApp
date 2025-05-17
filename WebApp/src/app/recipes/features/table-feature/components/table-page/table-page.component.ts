import {
    AfterViewInit,

    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    signal,
    TrackByFunction,
    viewChild,
    ViewContainerRef,
} from '@angular/core'
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
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, MatSelect, MatSelectChange, MatSelectTrigger } from '@angular/material/select'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { map, startWith } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AsyncPipe } from '@angular/common'
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { IsVisibleButtonComponent } from '../is-visible-button/is-visible-button.component'
import { MatDialog } from '@angular/material/dialog'
import { TableDeleteDialogComponent } from '../table-delete-dialog/table-delete-dialog.component'
import { TableEditDialogComponent } from '../table-edit-dialog/table-edit-dialog.component'
import { TableAddDialogComponent } from '../table-add-dialog/table-add-dialog.component'
import { TableOrderDialogComponent } from '../table-order-dialog/table-order-dialog.component'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { InlineWeightInputComponent } from '../inline-weight-input/inline-weight-input.component'
import { detailExpandAnimation, pageLoadAnimation } from '../../../../../app.animations'


import { ElementCategoryDto } from '../../../../../core/http/dto/element-dto/element-category/element-category.dto'
import { responsiveDialogConfig } from '../../../../../shared/configs/dialogs.config'
import { InfoDialogComponent } from '../../../../../shared/components/info-dialog/info-dialog.component'
import { ElementDetailDto } from '../../../../../core/http/dto/element-dto/element/element-detail.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'
import { TableUtilityService } from '../../../../../core/services/table-utility/table-utility.service'


interface TableItem extends ElementDetailDto {
    categoryName: string
    categoryId: number
    original: ElementDetailDto
}

@Component({
    selector: 'app-table-page',
    standalone: true,
    imports: [
        MatLabel,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatFormField,
        MatInput,
        MatSelect,
        MatOption,
        MatButton,
        MatIcon,
        MatPaginator,
        MatSuffix,
        MatSort,
        MatSortHeader,
        MatIconButton,
        ReactiveFormsModule,
        AsyncPipe,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatSelectTrigger,
        IsVisibleButtonComponent,
        MatPrefix,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        FormsModule,
        MatProgressSpinner,
        InlineWeightInputComponent,
    ],
    templateUrl: './table-page.component.html',
    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
    styleUrl: './table-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent implements AfterViewInit {
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly pg = inject(MatPaginatorIntl)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly tableUtilityService = inject(TableUtilityService)
    readonly sorter = viewChild.required(MatSort)
    readonly paginator = viewChild.required(MatPaginator)

    // General Table Fields
    tableWidth = 'auto'
    tableSelector='#table'
    expandedTableItemId: number | null = null
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
        'actions',
    ]

    // Select Filter Fields
    selectFilterValue: string[] = []
    selectFilterOptions: ElementCategoryDto[] = []
    selectFilterFormControl = new FormControl()

    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()

    constructor() {
        effect(() => {
            // Set up table
            this.tableItems = this.tableFeatureStore.elementsWithCategory().map((e) => ({
                ...e,
                categoryName: e.category.name,
                original: e,
            }))
            this.dataSource = new MatTableDataSource(this.tableItems)
            this.selectFilterOptions = this.tableFeatureStore.categories()
            this.searchFilterOptions.set(this.tableItems.map((t) => t.name))

            // Apply Select Filter
            if (this.selectFilterValue.length > 0) {
                this.dataSource = new MatTableDataSource(
                    this.tableItems.filter((e) =>
                        this.selectFilterValue.includes(e.categoryName),
                    ),
                )
            }

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

    ngAfterViewInit(): void {
        this.setTableWidth();
    }

    // Helper Functions
    trackByFn: TrackByFunction<TableItem> = (a) => {
        return a
    }
    toggleExpandRow(tableItem: TableItem) {
        this.expandedTableItemId =
            this.expandedTableItemId === tableItem.id ? null : tableItem.id
    }
    setTableWidth() {
        const table = document.querySelector(this.tableSelector)
        if (table) {
            this.tableWidth = table.scrollWidth + 'px'
        }
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
    // Select Filter Methods
    applySelectFilter(event: MatSelectChange) {
        this.selectFilterValue = event.value
        if (event.value.length == 0) {
            this.dataSource = new MatTableDataSource(this.tableItems)
            this.dataSource.sort = this.sorter()
            this.dataSource.paginator = this.paginator()
            this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
            this.paginator().length = this.dataSource.filteredData.length
        } else {
            this.dataSource = new MatTableDataSource(
                this.tableItems.filter((e) =>
                    this.selectFilterValue.includes(e.categoryName),
                ),
            )
            this.dataSource.sort = this.sorter()
            this.dataSource.paginator = this.paginator()
            this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
            this.paginator().length = this.dataSource.filteredData.length
        }
    }
    clearSelectFilter(event: Event) {
        event.stopPropagation()
        this.selectFilterValue = []
        this.selectFilterFormControl.setValue('')
        this.dataSource = new MatTableDataSource(this.tableItems)
        this.dataSource.sort = this.sorter()
        this.dataSource.paginator = this.paginator()
        this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
        this.paginator().length = this.dataSource.filteredData.length
    }


    // OTHER METHODS
    openAddModal() {
        this.dialog.open(TableAddDialogComponent, {
            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef,
        })
    }
    openEditModal(element: ElementDetailDto) {
        this.dialog.open(TableEditDialogComponent, {
            ...responsiveDialogConfig,
            data: {
                element: element,
            },
            viewContainerRef: this.viewContainerRef,
        })
    }
    openOrderModal() {
        this.dialog.open(TableOrderDialogComponent, {
            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef,
        })
    }
    openDeleteModal(element: ElementDetailDto) {
        this.dialog.open(TableDeleteDialogComponent, {
            autoFocus: false,
            data: element,
            viewContainerRef: this.viewContainerRef,
        })
    }

}
