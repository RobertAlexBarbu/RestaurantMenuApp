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
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { map, startWith } from 'rxjs'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption,
} from '@angular/material/autocomplete'
import { AsyncPipe } from '@angular/common'
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { TableAddCategoryDialogComponent } from '../table-add-category-dialog/table-add-category-dialog.component'
import { MatSelect, MatSelectChange, MatSelectTrigger } from '@angular/material/select'
import { IsVisibleButtonComponent } from '../is-visible-button/is-visible-button.component'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { TableEditCategoryDialogComponent } from '../table-edit-category-dialog/table-edit-category-dialog.component'

import {
    TableDeleteCategoryDialogComponent,
} from '../table-delete-category-dialog/table-delete-category-dialog.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ElementCategoryDto } from '../../../../../core/http/dto/element-category/element-category.dto'
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { pageLoadAnimation } from '../../../../../app.animations'

import { AppStore } from '../../../../../core/stores/app.store'
import { ElementService } from '../../../../../core/http/services/element/element.service'
import { MatDialog } from '@angular/material/dialog'
import { NotificationService } from '../../../../../core/services/notification/notification.service'

import { ElementDetailDto } from '../../../../../core/http/dto/element/element-detail.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'
import { TableUtilityService } from '../../../../../core/services/table-utility/table-utility.service'


interface TableItem extends ElementCategoryDto {
    categoryName: string
    totalElements: number
    original: ElementCategoryDto
}

@Component({
    selector: 'app-table-categories-page',
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
    ],
    standalone: true,
    templateUrl: './categories-table-page.component.html',
    styleUrl: './categories-table-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pageLoadAnimation],
})
export class CategoriesTablePageComponent  implements AfterViewInit {
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
    displayedColumns: string[] = ['name', 'totalElements', 'actions']

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
            const elements = this.tableFeatureStore.elements()
            this.tableItems = this.tableFeatureStore.categories().map(    (c) => ({
                ...c,
                totalElements: elements.filter((e) => e.categoryId === c.id)
                    .length,
                categoryName: c.name,
                original: c,
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
    
    ngAfterViewInit() {
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
    
    // private readonly basicFeatureStore = inject(TableFeatureStore)
    // private readonly appStore = inject(AppStore)
    // private readonly elementService = inject(ElementService)
    // private readonly pg = inject(MatPaginatorIntl)
    // private readonly destroyRef = inject(DestroyRef)
    // private readonly dialog = inject(MatDialog)
    // private readonly viewContainerRef = inject(ViewContainerRef)
    // private readonly notificationService = inject(NotificationService)
    //
    // // Table Fields
    // tableWidth = 'auto'
    // dataSource: MatTableDataSource<CategoryTableElement> =
    //     new MatTableDataSource<CategoryTableElement>([])
    // elements: ElementDetailDto[] = []
    // categories: CategoryTableElement[] = []
    // displayedColumns: string[] = ['name', 'totalElements', 'actions']
    //
    // // Sorter Fields
    // readonly sort = viewChild.required(MatSort)
    //
    // // Paginator Fields
    // readonly paginator = viewChild.required(MatPaginator)
    //
    // // Search Fields
    // autocompleteOptions = signal<string[]>([])
    // searchValue = ''
    // visibleAutocompleteOptions = signal<string[]>([])
    // search = new FormControl()
    //
    // constructor() {
    //     effect(() => {
    //         // Table Code
    //         const elements = this.basicFeatureStore.elementsWithCategory()
    //         const categories = this.basicFeatureStore.categories()
    //         const tableData: CategoryTableElement[] = categories.map((c) => ({
    //             ...c,
    //             totalElements: elements.filter((e) => e.categoryId === c.id)
    //                 .length,
    //             categoryName: c.name,
    //             original: c,
    //         }))
    //         this.categories = tableData
    //         this.dataSource = new MatTableDataSource(tableData)
    //         this.elements = elements
    //
    //         // Search Code
    //         this.autocompleteOptions.set(categories.map((e) => e.name))
    //         this.dataSource.filter = this.searchValue.trim().toLowerCase()
    //         this.paginator().length = this.dataSource.filteredData.length
    //         const searchValue = this.search.value
    //         if (this.searchValue) {
    //             this.visibleAutocompleteOptions.set(
    //                 this.autocompleteOptions().filter((option) =>
    //                     option.toLowerCase().includes(searchValue.toLowerCase()),
    //                 ),
    //             )
    //         } else {
    //             this.visibleAutocompleteOptions.set(this.autocompleteOptions())
    //         }
    //
    //         // Paginator/Sorter Code
    //         this.dataSource.sort = this.sort()
    //         this.dataSource.paginator = this.paginator()
    //     })
    //     // Paginator i18n
    //     this.pg.itemsPerPageLabel = 'Size'
    //     this.pg.firstPageLabel = 'First Page'
    //     this.pg.nextPageLabel = 'Next Page'
    //     this.pg.previousPageLabel = 'Previous Page'
    //     this.pg.getRangeLabel = (
    //         page: number,
    //         pageSize: number,
    //         length: number,
    //     ) => {
    //         length = Math.max(length, 0)
    //         const startIndex = page * pageSize
    //         const endIndex =
    //             startIndex < length
    //                 ? Math.min(startIndex + pageSize, length)
    //                 : startIndex + pageSize
    //         return `${startIndex + 1} - ${endIndex} of ${length}`
    //     }
    // }
    //
    // ngAfterViewInit() {
    //     // Sorter Paginator Code
    //     this.dataSource.sort = this.sort()
    //     this.dataSource.paginator = this.paginator()
    //     // Set up Table Layout
    //     const table = document.querySelector('#table2')
    //     if (table) {
    //         this.tableWidth = table.scrollWidth + 'px'
    //     }
    //     // Search Code
    //     this.search.valueChanges
    //         .pipe(
    //             startWith(''),
    //             map((value) => this._filter(value || '')),
    //             takeUntilDestroyed(this.destroyRef),
    //         )
    //         .subscribe((value) => {
    //             this.visibleAutocompleteOptions.set(value)
    //         })
    // }
    //
    // ngOnInit() {
    // }
    //
    // // Search Methods
    // applySearch(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value
    //     this.searchValue = filterValue
    //     this.dataSource.filter = filterValue.trim().toLowerCase()
    //     this.paginator().length = this.dataSource.filteredData.length
    // }
    //
    // clearSearch(event: Event): void {
    //     event.stopPropagation()
    //     this.search.setValue('')
    //     const filterValue = ''
    //     this.dataSource.filter = filterValue.trim().toLowerCase()
    //     this.paginator().length = this.dataSource.filteredData.length
    // }
    //
    // applyAutocompleteSelect(event: MatAutocompleteSelectedEvent) {
    //     const filterValue = event.option.value
    //     this.searchValue = filterValue
    //     this.dataSource.filter = filterValue.trim().toLowerCase()
    //     this.paginator().length = this.dataSource.filteredData.length
    // }
    //
    // _filter(value: string): string[] {
    //     const filterValue = value.toLowerCase()
    //     if (value == '') {
    //         return this.autocompleteOptions()
    //     }
    //     return this.autocompleteOptions().filter((option) =>
    //         option.toLowerCase().includes(filterValue),
    //     )
    // }
    
    // Other methods
    openAddModal(): void {
        this.dialog.open(TableAddCategoryDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
        })

    }
    openEditModal(category: ElementCategoryDto): void {
        this.dialog.open(TableEditCategoryDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
            data: category,
        })
    }
    openDeleteModal(category: ElementCategoryDto, totalElements: number): void {
        this.dialog.open(TableDeleteCategoryDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
            data: {
                category: category,
                totalElements: totalElements,
            },
        })
    }
    
}
