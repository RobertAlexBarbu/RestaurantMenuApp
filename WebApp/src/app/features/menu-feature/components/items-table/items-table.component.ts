import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, effect,
  inject,
  input, signal, TrackByFunction,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {TableFeatureStore} from "../../../../recipes/stores/table-feature.store";
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
import {ElementCategoryDto} from "../../../../core/http/dto/element-dto/element-category/element-category.dto";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {
  TableAddDialogComponent
} from "../../../../recipes/features/table-feature/components/table-add-dialog/table-add-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {ElementDetailDto} from "../../../../core/http/dto/element-dto/element/element-detail.dto";
import {
  TableEditDialogComponent
} from "../../../../recipes/features/table-feature/components/table-edit-dialog/table-edit-dialog.component";
import {
  TableOrderDialogComponent
} from "../../../../recipes/features/table-feature/components/table-order-dialog/table-order-dialog.component";
import {
  TableDeleteDialogComponent
} from "../../../../recipes/features/table-feature/components/table-delete-dialog/table-delete-dialog.component";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MenuFeatureStore} from "../../../../core/stores/menu-feature.store";
import {
  InlineWeightInputComponent
} from "../../../../recipes/features/table-feature/components/inline-weight-input/inline-weight-input.component";
import {
  IsVisibleButtonComponent
} from "../../../../recipes/features/table-feature/components/is-visible-button/is-visible-button.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {pageLoadAnimation} from "../../../../app.animations";
import {MenuCategoryDto} from "../../../../core/http/dto/menu-dto/menu-category/menu-category.dto";


@Component({
  selector: 'app-items-table',
  imports: [
    FormsModule,
    InlineWeightInputComponent,
    IsVisibleButtonComponent,
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
    ReactiveFormsModule
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [pageLoadAnimation],

})
export class ItemsTableComponent {
  private readonly pg = inject(MatPaginatorIntl)
  private readonly destroyRef = inject(DestroyRef)
  private readonly dialog = inject(MatDialog)
  private readonly viewContainerRef = inject(ViewContainerRef)
  private readonly tableUtilityService = inject(TableUtilityService)
  readonly sorter = viewChild.required(MatSort)
  readonly paginator = viewChild.required(MatPaginator)

  // General Table Fields
  menuItems = input.required<MenuItemDto[]>();
  menuCategories = input.required<MenuCategoryDto[]>();
  tableWidth = 'auto'
  tableSelector='#table'
  expandedTableItemId: number | null = null
  tableItems: MenuItemDto[] = []
  dataSource: MatTableDataSource<MenuItemDto> =
    new MatTableDataSource<MenuItemDto>([])
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
      this.tableItems = this.menuItems();
      console.log(this.tableItems);
      setTimeout(() => {
        console.log(...this.tableItems);
        this.dataSource = new MatTableDataSource<MenuItemDto>([...this.tableItems])
      }, 10)

      this.selectFilterOptions = this.menuCategories();
      this.searchFilterOptions.set(this.tableItems.map((t) => t.name))

      // Apply Select Filter
      if (this.selectFilterValue.length > 0) {
        this.dataSource = new MatTableDataSource(
          this.tableItems.filter((e) =>
            this.selectFilterValue.includes(e.name),
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
  trackByFn: TrackByFunction<MenuItemDto> = (a) => {
    return a
  }
  toggleExpandRow(tableItem: MenuItemDto) {
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
          this.selectFilterValue.includes(e.name),
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
