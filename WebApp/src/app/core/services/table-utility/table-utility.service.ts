import { Injectable } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'

@Injectable({
  providedIn: 'root'
})
export class TableUtilityService {
    getPaginatorRangeLabelFunction() {
        return (
            page: number,
            pageSize: number,
            length: number,
        ) => {
            length = Math.max(length, 0)
            const startIndex = page * pageSize
            const endIndex =
                startIndex < length
                    ? Math.min(startIndex + pageSize, length)
                    : startIndex + pageSize
            return `${startIndex + 1} - ${endIndex} of ${length}`
        }
    }
    setUpPaginatorIntl(pg: MatPaginatorIntl) {
        pg.itemsPerPageLabel = 'Size'
        pg.firstPageLabel = 'First Page'
        pg.nextPageLabel = 'Next Page'
        pg.previousPageLabel = 'Previous Page'
        pg.getRangeLabel = this.getPaginatorRangeLabelFunction();
    }
    

}
