import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef, effect,
    inject,
    input, signal, TrackByFunction,
    viewChild,
    ViewContainerRef
} from '@angular/core';
import {MenuItemDetailDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item-detail.dto";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {TableUtilityService} from "../../../../core/services/table-utility/table-utility.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
    MatTableDataSource
} from "@angular/material/table";
import {ElementCategoryDto} from "../../../../core/http/dto/element-category/element-category.dto";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from "@angular/material/autocomplete";
import {InlinePriceInputComponent} from "../inline-price-input/inline-price-input.component";
import {ItemImageButtonComponent} from "../item-image-button/item-image-button.component";
import {ItemVisibilityButtonComponent} from "../item-visibility-button/item-visibility-button.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {ItemAddDialogComponent} from "../item-add-dialog/item-add-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {ItemEditDialogComponent} from "../item-edit-dialog/item-edit-dialog.component";
import {ItemDeleteDialogComponent} from "../item-delete-dialog/item-delete-dialog.component";
import {detailExpandAnimation, pageLoadAnimation} from "../../../../app.animations";
import {
    CategoryAddAdvancedDialogComponent
} from "../category-add-advanced-dialog/category-add-advanced-dialog.component";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {CategoryDeleteDialogComponent} from "../category-delete-dialog/category-delete-dialog.component";
import {CategoryVisibilityButtonComponent} from "../category-visibility-button/category-visibility-button.component";
interface TableItem extends MenuCategoryDto {
    totalItems: number
}
@Component({
  selector: 'app-categories-table',
    imports: [
        FormsModule,
        InlinePriceInputComponent,
        ItemImageButtonComponent,
        ItemVisibilityButtonComponent,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatButton,
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
        MatOption,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatSelect,
        MatSelectTrigger,
        MatSort,
        MatSortHeader,
        MatSuffix,
        MatTable,
        MatHeaderCellDef,
        ReactiveFormsModule,
        CategoryVisibilityButtonComponent
    ],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
})
export class CategoriesTableComponent {
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
        'position',
        'name',
        'expand',
        'totalItems',
        'actions'
    ]
    

    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()

    constructor() {
        effect(() => {
            // Set up table
            if(this.type() == 'food') {
                this.tableItems = this.menuStoreService.foodCategories().map(i => {
                    return {
                        ...i,
                        totalItems: this.menuStoreService.foodItems().filter(x => x.menuCategoryId === i.id).length
                    }
                })
            } else {
                this.tableItems = this.menuStoreService.drinksCategories().map(i => {
                    return {
                        ...i,
                        totalItems: this.menuStoreService.drinksItems().filter(x => x.menuCategoryId === i.id).length
                    }
                })
            }

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

    openAddModal() {
        this.dialog.open(CategoryAddAdvancedDialogComponent, {

            data: {
                type: this.type()
            },
            width: '400px',
            viewContainerRef: this.viewContainerRef,
        })
    }

    openEditModal(element: MenuCategoryDto) {
        this.dialog.open(CategoryEditDialogComponent, {
            data: {
                item: element,
            },
            width: '400px',
            viewContainerRef: this.viewContainerRef,
        })
    }

    openDeleteModal(element: TableItem) {
        this.dialog.open(CategoryDeleteDialogComponent, {
            autoFocus: false,
            data: {
                category: element,
                totalItems: element.totalItems
            },
            viewContainerRef: this.viewContainerRef,
        })
    }

}
