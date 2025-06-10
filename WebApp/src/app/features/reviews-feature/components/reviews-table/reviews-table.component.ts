import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    signal,
    TrackByFunction,
    viewChild
} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {DatePipe, SlicePipe} from "@angular/common";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MenuReviewDto} from "../../../../core/http/dto/menu-dto/menu/menu-review.dto";
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource
} from "@angular/material/table";
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
    MatLabel, MatPrefix,
    MatSelect,
    MatSelectChange,
    MatSelectTrigger,
    MatSuffix
} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {pageLoadAnimation} from "../../../../app.animations";
import {
    IsVisibleButtonComponent
} from "../../../../recipes/features/table-feature/components/is-visible-button/is-visible-button.component";
import {
    ItemVisibilityButtonComponent
} from "../../../menu-feature/components/item-visibility-button/item-visibility-button.component";
import {ItemImageButtonComponent} from "../../../menu-feature/components/item-image-button/item-image-button.component";
import {
    InlinePriceInputComponent
} from "../../../menu-feature/components/inline-price-input/inline-price-input.component";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
interface TableReview extends MenuReviewDto {
    formattedDate: string;
    numericRating: number;
    displayRating: string;
}
@Component({
  selector: 'app-reviews-table',
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatSort,
        MatSortHeader,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        MatOption,
        MatSelectTrigger,
        MatSelect,
        ReactiveFormsModule,
        MatIcon,
        MatSuffix,
        MatIconButton,
        MatLabel,
        MatFormField,
        MatAutocomplete,
        SlicePipe,
        MatAutocompleteTrigger,
        MatInput,
        DatePipe,
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
        MatDatepickerToggle,
        MatDatepickerInput,
        MatDatepicker,
        MatPrefix,
    ],
  templateUrl: './reviews-table.component.html',
  styleUrl: './reviews-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe, provideNativeDateAdapter()],
    animations: [pageLoadAnimation],
    standalone: true
})
export class ReviewsTableComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly pg = inject(MatPaginatorIntl);
    private readonly datePipe = inject(DatePipe);

    readonly sorter = viewChild.required(MatSort);
    readonly paginator = viewChild.required(MatPaginator);

    // Input signal for reviews data
    reviews = input.required<MenuReviewDto[]>();

    tableWidth = 'auto';
    tableSelector = '#reviews-table';
    tableReviews: TableReview[] = [];
    dataSource: MatTableDataSource<TableReview> = new MatTableDataSource<TableReview>([]);

    displayedColumns: string[] = [
        'formattedDate',
        'rating',
        'message'
    ];

    // Select Filter Fields (for rating)
    selectFilterValue: string[] = [];
    selectFilterOptions: string[] = ['5/5 Excellent', '4/5 Very Good', '3/5 Good', '2/5 Fair', '1/5 Poor'];
    selectFilterFormControl = new FormControl();

    // Search Filter Fields (for message content)
    searchFilterOptions = signal<string[]>([]);
    searchFilterValue = '';
    visibleSearchFilterOptions = signal<string[]>([]);
    searchFilterFormControl = new FormControl();
    selectClearVisible = signal(false);

    // Date Filter Fields
    dateFilterFormControl = new FormControl();
    dateFilterValue: Date | null = null;
    dateClearVisible = signal(false);

    constructor() {
        effect(() => {
            // Transform reviews data
            this.tableReviews = this.reviews().map(review => ({
                ...review,
                formattedDate: this.datePipe.transform(review.createdAt, 'medium') || '',
                numericRating: this.getNumericRating(review.rating),
                displayRating: this.getDisplayRating(review.rating)
            }));

            this.dataSource = new MatTableDataSource(this.tableReviews);

            // Set up custom sorting for rating column
            this.dataSource.sortingDataAccessor = (data: TableReview, sortHeaderId: string) => {
                if (sortHeaderId === 'rating') {
                    return data.numericRating;
                }
                return (data as any)[sortHeaderId];
            };

            this.searchFilterOptions.set(this.tableReviews.filter(r => r.message !== '').map(r =>  r.message));

            // Apply all filters
            this.applyAllFilters();
        });

        this.searchFilterFormControl.valueChanges
            .pipe(
                startWith(''),
                map((value) => this.searchFilterHelper(value || '')),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((value) => {
                this.visibleSearchFilterOptions.set(value);
            });
    }

    ngAfterViewInit(): void {
        this.setTableWidth();
    }

    trackByFn: TrackByFunction<TableReview> = (index, item) => item.id;

    setTableWidth() {
        const table = document.querySelector(this.tableSelector);
        if (table) {
            this.tableWidth = table.scrollWidth + 'px';
        }
    }

    // Helper method to convert text rating to numeric value
    getNumericRating(rating: string): number {
        switch (rating) {
            case 'Excellent': return 5;
            case 'Very Good': return 4;
            case 'Good': return 3;
            case 'Fair': return 2;
            case 'Poor': return 1;
            default: return 0;
        }
    }

    // Helper method to create display rating
    getDisplayRating(rating: string): string {
        const numeric = this.getNumericRating(rating);
        return `${numeric}/5 ${rating}`;
    }

    // Apply all filters method
    applyAllFilters() {
        let filteredData = [...this.tableReviews];

        // Apply rating filter
        if (this.selectFilterValue.length > 0) {
            filteredData = filteredData.filter(review =>
                this.selectFilterValue.includes(review.displayRating)
            );
        }

        // Apply date filter
        if (this.dateFilterValue) {
            const selectedDate = new Date(this.dateFilterValue);
            const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            const endOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);

            filteredData = filteredData.filter(review => {
                const reviewDate = new Date(review.createdAt);
                return reviewDate >= startOfDay && reviewDate <= endOfDay;
            });
        }

        this.dataSource = new MatTableDataSource(filteredData);

        // Set up custom sorting after filtering
        this.dataSource.sortingDataAccessor = (data: TableReview, sortHeaderId: string) => {
            if (sortHeaderId === 'rating') {
                return data.numericRating;
            }
            return (data as any)[sortHeaderId];
        };

        // Apply search filter
        this.dataSource.filter = this.searchFilterValue.trim().toLowerCase();
        const searchValue = this.searchFilterFormControl.value;
        if (this.searchFilterValue) {
            this.visibleSearchFilterOptions.set(
                this.searchFilterOptions().filter(option =>
                    option.toLowerCase().includes(searchValue?.toLowerCase() || '')
                )
            );
        } else {
            this.visibleSearchFilterOptions.set(this.searchFilterOptions());
        }

        // Set Up Sorter/Paginator
        this.paginator().length = this.dataSource.filteredData.length;
        this.dataSource.sort = this.sorter();
        this.dataSource.paginator = this.paginator();
    }

    // Search Filter Methods
    applySearchFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.searchFilterValue = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.paginator().length = this.dataSource.filteredData.length;
    }

    clearSearchFilter(event: Event): void {
        event.stopPropagation();
        this.searchFilterFormControl.setValue('');
        this.visibleSearchFilterOptions.set(this.searchFilterOptions());
        const filterValue = '';
        this.searchFilterValue = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.paginator().length = this.dataSource.filteredData.length;
    }

    applySearchFilterSelect(event: MatAutocompleteSelectedEvent) {
        const filterValue = event.option.value;
        this.searchFilterValue = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.paginator().length = this.dataSource.filteredData.length;
    }

    searchFilterHelper(value: string): string[] {
        const filterValue = value.toLowerCase();
        if (value === '') {
            return this.searchFilterOptions();
        }
        return this.searchFilterOptions().filter(option =>
            option.toLowerCase().includes(filterValue)
        );
    }

    // Select Filter Methods (Rating Filter)
    applySelectFilter(event: MatSelectChange) {
        this.selectFilterValue = event.value;
        if (event.value.length === 0) {
            this.selectClearVisible.set(false);
        } else {
            this.selectClearVisible.set(true);
        }
        this.applyAllFilters();
    }

    clearSelectFilter(event: Event) {
        this.selectClearVisible.set(false);
        event.stopPropagation();
        this.selectFilterValue = [];
        this.selectFilterFormControl.setValue('');
        this.applyAllFilters();
    }

    // Date Filter Methods
    applyDateFilter(event: any) {
        this.dateFilterValue = event.value;
        if (this.dateFilterValue) {
            this.dateClearVisible.set(true);
        } else {
            this.dateClearVisible.set(false);
        }
        this.applyAllFilters();
    }

    clearDateFilter(event: Event) {
        this.dateClearVisible.set(false);
        event.stopPropagation();
        this.dateFilterValue = null;
        this.dateFilterFormControl.setValue(null);
        this.applyAllFilters();
    }

    // Rating badge color helper (updated to work with display rating)
    getRatingColor(displayRating: string): string {
        if (displayRating.includes('Excellent')) return 'bg-green-100 text-green-800';
        if (displayRating.includes('Very Good')) return 'bg-blue-100 text-blue-800';
        if (displayRating.includes('Good')) return 'bg-yellow-100 text-yellow-800';
        if (displayRating.includes('Fair')) return 'bg-orange-100 text-orange-800';
        if (displayRating.includes('Poor')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    }
}
