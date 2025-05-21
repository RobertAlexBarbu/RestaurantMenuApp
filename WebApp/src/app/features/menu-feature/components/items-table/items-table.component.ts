import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject, input, signal,
    TrackByFunction, viewChild,
    ViewContainerRef
} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
    MatTableDataSource
} from "@angular/material/table";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {detailExpandAnimation, pageLoadAnimation} from "../../../../app.animations";

import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSelect, MatSelectChange, MatSelectTrigger} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {TableUtilityService} from "../../../../core/services/table-utility/table-utility.service";
import {ElementCategoryDto} from "../../../../core/http/dto/element-category/element-category.dto";
import {
    TableAddDialogComponent
} from "../../../../recipes/features/table-feature/components/table-add-dialog/table-add-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {InfoDialogComponent} from "../../../../shared/components/info-dialog/info-dialog.component";
import {map, startWith} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    IsVisibleButtonComponent
} from "../../../../recipes/features/table-feature/components/is-visible-button/is-visible-button.component";
import {ElementDetailDto} from "../../../../core/http/dto/element/element-detail.dto";
import {
    TableEditDialogComponent
} from "../../../../recipes/features/table-feature/components/table-edit-dialog/table-edit-dialog.component";
import {
    TableDeleteDialogComponent
} from "../../../../recipes/features/table-feature/components/table-delete-dialog/table-delete-dialog.component";
import {ItemVisibilityButtonComponent} from "../item-visibility-button/item-visibility-button.component";
import {ItemDeleteDialogComponent} from "../item-delete-dialog/item-delete-dialog.component";
import {ItemAddDialogComponent} from "../item-add-dialog/item-add-dialog.component";
import {ItemEditDialogComponent} from "../item-edit-dialog/item-edit-dialog.component";
import {ItemImageButtonComponent} from "../item-image-button/item-image-button.component";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";
import {InlinePriceInputComponent} from "../inline-price-input/inline-price-input.component";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";

interface TableItem extends MenuItemDetailDto {
    finalPosition: string, 
    categoryName: string
}

@Component({
  selector: 'app-items-table',
    imports: [
        MatIcon,
        MatCellDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatColumnDef,
        MatCell,
        MatIconButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatSortHeader,
        MatTable,
        MatSort,
        FormsModule,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatPaginator,
        MatSelect,
        MatSelectTrigger,
        MatSuffix,
        ReactiveFormsModule,
        IsVisibleButtonComponent,
        ItemVisibilityButtonComponent,
        ItemImageButtonComponent,
        InlinePriceInputComponent,

    ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
})
export class ItemsTableComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly pg = inject(MatPaginatorIntl)
    private readonly destroyRef = inject(DestroyRef)
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly tableUtilityService = inject(TableUtilityService)
    readonly sorter = viewChild.required(MatSort)
    readonly paginator = viewChild.required(MatPaginator)
    readonly type = input.required<'food' | 'drinks'>();

    tableWidth = 'auto'
    tableSelector='#table'
    expandedTableItemId: number | null = null
    tableItems: TableItem[] = []
    dataSource: MatTableDataSource<TableItem> =
        new MatTableDataSource<TableItem>([])
    displayedColumns: string[] = [
        'finalPosition',
        'name',
        'categoryName',
        'expand',

        'price',
        'actions'
    ]

    // Select Filter Fields
    selectFilterValue: string[] = []
    selectFilterOptions: MenuCategoryDto[] = []
    selectFilterFormControl = new FormControl()

    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()

    constructor() {
        effect(() => {
            // Set up table
            if(this.type() == 'food') {
                this.tableItems = this.menuStoreService.foodItemsWithCategory().map(i => {
                    return {
                        ...i,
                        categoryName: i.category.name,
                        finalPosition: i.category.position + '.' + i.position ,
                    }
                })
                this.selectFilterOptions = this.menuStoreService.foodCategories()
            } else {
                this.tableItems = this.menuStoreService.drinksItemsWithCategory().map(i => {
                    return {
                        ...i,
                        categoryName: i.category.name,
                        finalPosition: i.category.position + '.' + i.position,
                    }
                })
                this.selectFilterOptions = this.menuStoreService.drinksCategories()
            }
            
            this.dataSource = new MatTableDataSource(this.tableItems)
            this.searchFilterOptions.set(this.tableItems.map((t) => t.name))

            // Apply Select Filter
            if (this.selectFilterValue.length > 0) {
                this.selectClearVisible.set(true);
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
    selectClearVisible = signal(false);
    applySelectFilter(event: MatSelectChange) {
        this.selectFilterValue = event.value
        console.log(event.value);
        if (event.value.length == 0) {
            this.selectClearVisible.set(false);
            this.dataSource = new MatTableDataSource(this.tableItems)
            this.dataSource.sort = this.sorter()
            this.dataSource.paginator = this.paginator()
            this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
            this.paginator().length = this.dataSource.filteredData.length
        } else {
            this.selectClearVisible.set(true);
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
        this.selectClearVisible.set(false);
        event.stopPropagation()
        this.selectFilterValue = []
        this.selectFilterFormControl.setValue('')
        this.dataSource = new MatTableDataSource(this.tableItems)
        this.dataSource.sort = this.sorter()
        this.dataSource.paginator = this.paginator()
        this.dataSource.filter = this.searchFilterValue.trim().toLowerCase()
        this.paginator().length = this.dataSource.filteredData.length
    }
    
    
    // OTHER
    openAddModal() {
        this.dialog.open(ItemAddDialogComponent, {
            ...responsiveDialogConfig,
            data: {
                type: this.type()
            },
            width: "700px",
            viewContainerRef: this.viewContainerRef,
        })
    }

    openEditModal(element: MenuItemDto) {
        this.dialog.open(ItemEditDialogComponent, {
            ...responsiveDialogConfig,
            data: {
                item: element,
            },
            width: "700px",
            viewContainerRef: this.viewContainerRef,
        })
    }

    openDeleteModal(element: MenuItemDto) {
        this.dialog.open(ItemDeleteDialogComponent, {
            autoFocus: false,
            data: element,
            viewContainerRef: this.viewContainerRef,
        })
    }
}
