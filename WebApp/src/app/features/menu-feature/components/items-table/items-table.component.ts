import {ChangeDetectionStrategy, Component, effect, inject, TrackByFunction} from '@angular/core';
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
import {MatIconButton} from "@angular/material/button";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {detailExpandAnimation, pageLoadAnimation} from "../../../../app.animations";

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
        MatSort
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
    expandedTableItemId: number | null = null
    tableItems: MenuItemDto[] = []
    dataSource: MatTableDataSource<MenuItemDto> =
        new MatTableDataSource<MenuItemDto>([])
    displayedColumns: string[] = [
        'position',
        'name',
        'expand',
        'symbol',
        'density',
        'meltingPoint',
        'boilingPoint',
        'atomicRadius',
        'categoryName',

    ]

    constructor() {
        effect(() => {
            // Set up table
            this.tableItems = this.menuStoreService.foodItems()
            this.dataSource = new MatTableDataSource(this.tableItems)

        })
    }

    trackByFn: TrackByFunction<MenuItemDto> = (a) => {
        return a
    }
    toggleExpandRow(tableItem: MenuItemDto) {
        this.expandedTableItemId =
            this.expandedTableItemId === tableItem.id ? null : tableItem.id
    }
}
