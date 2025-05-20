import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject, signal,
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
        ReactiveFormsModule
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

    tableWidth = 'auto'
    tableSelector='#table'
    expandedTableItemId: number | null = null
    tableItems: TableItem[] = []
    dataSource: MatTableDataSource<TableItem> =
        new MatTableDataSource<TableItem>([])
    displayedColumns: string[] = [
        'finalPosition',
        'name',
        'expand',
        'categoryName',
        'price',
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
            this.tableItems = this.menuStoreService.foodItemsWithCategory().map(i => {
                return {
                    ...i, 
                    categoryName: i.category.name,
                    finalPosition: i.category.position + '.' + i.position,
                }
            })
            this.dataSource = new MatTableDataSource(this.tableItems)

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
    
    
    // OTHER
    openAddModal() {
        this.dialog.open(InfoDialogComponent, {
            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef,
        })
    }
}
