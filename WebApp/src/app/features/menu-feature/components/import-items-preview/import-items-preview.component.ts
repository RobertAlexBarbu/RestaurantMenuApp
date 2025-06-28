import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef, effect,
    inject,
    input, signal, TrackByFunction,
    viewChild,
    ViewContainerRef
} from '@angular/core';
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

import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption
} from "@angular/material/autocomplete";
import {
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectChange,
    MatSelectTrigger,
    MatSuffix
} from "@angular/material/select";
import {ImportMenuItemDto} from "../../services/menu-spreadsheet/menu-spreadsheet.service";
import {CreateMenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/create-menu-category.dto";

import {InlinePriceInputComponent} from "../inline-price-input/inline-price-input.component";
import {ItemImageButtonComponent} from "../item-image-button/item-image-button.component";
import {ItemVisibilityButtonComponent} from "../item-visibility-button/item-visibility-button.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {detailExpandAnimation, pageLoadAnimation} from "../../../../app.animations";
interface TableItem extends ImportMenuItemDto {
    categoryName: string;
    finalPosition: string
}
@Component({
  selector: 'app-import-items-preview',
    imports: [
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
        ReactiveFormsModule,
        MatHeaderCellDef
    ],
  templateUrl: './import-items-preview.component.html',
  styleUrl: './import-items-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
})
export class ImportItemsPreviewComponent {

    private readonly pg = inject(MatPaginatorIntl)
    private readonly tableUtilityService = inject(TableUtilityService);
    private readonly destroyRef = inject(DestroyRef)
    readonly sorter = viewChild.required(MatSort)
    readonly paginator = viewChild.required(MatPaginator)
    readonly items = input<ImportMenuItemDto[]>([])
    readonly categories = input<CreateMenuCategoryDto[]>([])
    
    expandedTableItemId: string | null = null
    tableItems: TableItem[] = []
    dataSource: MatTableDataSource<TableItem> =
        new MatTableDataSource<TableItem>([])
    displayedColumns: string[] = [
        'finalPosition',
        'name',
        'categoryName',
        'expand',
        'price',

    ]

    // Select Filter Fields
    selectFilterValue: string[] = []
    selectFilterOptions: CreateMenuCategoryDto[] = []
    selectFilterFormControl = new FormControl()

    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()

    constructor() {
        effect(() => {
                console.log(this.items());
                this.tableItems = this.items().map(i => {
                    return {
                        ...i,
                        categoryName: i.menuCategoryName,
                        finalPosition: this.categories().find(c => c.name === i.menuCategoryName)!.position + '.' + i.position ,
                    }
                })
                this.selectFilterOptions = this.categories()
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




    trackByFn: TrackByFunction<TableItem> = (a) => {
        return a
    }
    toggleExpandRow(tableItem: TableItem) {
        this.expandedTableItemId =
            this.expandedTableItemId === tableItem.finalPosition ? null : tableItem.finalPosition
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

}
