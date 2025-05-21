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
    CategoryAddAdvancedDialogComponent
} from "../category-add-advanced-dialog/category-add-advanced-dialog.component";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";
import {CategoryDeleteDialogComponent} from "../category-delete-dialog/category-delete-dialog.component";
import {CategoryVisibilityButtonComponent} from "../category-visibility-button/category-visibility-button.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ImportMenuItemDto} from "../../services/menu-spreadsheet/menu-spreadsheet.service";
import {CreateMenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/create-menu-category.dto";
import {detailExpandAnimation, pageLoadAnimation} from "../../../../app.animations";
interface TableItem extends CreateMenuCategoryDto {
    totalItems: number
}
@Component({
  selector: 'app-import-categories-preview',
    imports: [
        CategoryVisibilityButtonComponent,
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
        MatSort,
        MatSortHeader,
        MatSuffix,
        MatTable,
        ReactiveFormsModule,
        MatHeaderCellDef
    ],
  templateUrl: './import-categories-preview.component.html',
  styleUrl: './import-categories-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [
        pageLoadAnimation,
        detailExpandAnimation
    ],
})
export class ImportCategoriesPreviewComponent {
    private readonly pg = inject(MatPaginatorIntl)
    private readonly destroyRef = inject(DestroyRef)
    private readonly tableUtilityService = inject(TableUtilityService)
    readonly sorter = viewChild.required(MatSort)
    readonly paginator = viewChild.required(MatPaginator)
    readonly items = input<ImportMenuItemDto[]>([])
    readonly categories = input<CreateMenuCategoryDto[]>([])


    expandedTableItemId: number | null = null
    tableItems: TableItem[] = []
    dataSource: MatTableDataSource<TableItem> =
        new MatTableDataSource<TableItem>([])
    displayedColumns: string[] = [
        'position',
        'name',
        'expand',
        'totalItems',
    ]


    // Search Filter Fields
    searchFilterOptions = signal<string[]>([])
    searchFilterValue = ''
    visibleSearchFilterOptions = signal<string[]>([])
    searchFilterFormControl = new FormControl()

    constructor() {
        effect(() => {
            // Set up table

                this.tableItems = this.categories().map(i => {
                    return {
                        ...i,
                        totalItems: this.items().filter(x => x.menuCategoryName === i.name).length
                    }
                })
 
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

 

    trackByFn: TrackByFunction<TableItem> = (a) => {
        return a
    }
    toggleExpandRow(tableItem: TableItem) {
        this.expandedTableItemId =
            this.expandedTableItemId === tableItem.position ? null : tableItem.position
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
