import {ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit, output} from '@angular/core'
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import {
    DragAndDropSortingItem,
    DragAndDropSortingItemWithText,
    DragAndDropSortingStore,
} from '../../../core/stores/drag-and-drop-sorting.store'
import { AsyncPipe } from '@angular/common'
import { UtilityService } from '../../../core/services/utility/utility.service'
import { InfoTextComponent } from '../info-text/info-text.component'

@Component({
    selector: 'app-drag-and-drop-sorting',
    imports: [
        CdkDropList,
        CdkDrag,
        MatIconButton,
        MatIcon,
        MatTooltip,
        AsyncPipe,
        CdkDragHandle,
        InfoTextComponent,
    ],
    templateUrl: './drag-and-drop-sorting.component.html',
    styleUrl: './drag-and-drop-sorting.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DragAndDropSortingStore],
})
export class DragAndDropSortingComponent  {
    private readonly dragAndDropSortingStore = inject(DragAndDropSortingStore)
    private readonly utilityService = inject(UtilityService)
    isMobile = this.utilityService.isMobile()
    readonly basicInfoMessages = input(true)
    readonly elements = input<DragAndDropSortingItemWithText[]>([])
    readonly elementsOrdered = output<DragAndDropSortingItem[]>()
    bgClass = input<string>('bg-surface')

    // elements$: Observable<DragAndDropSortingItemWithText[]> =
    //     this.dragAndDropSortingStore.items$.pipe(
    //         map((e) => {
    //             this.elementsOrdered.emit(e)
    //             let elements: DragAndDropSortingItemWithText[] = []
    //             e.forEach((e) => {
    //                 let movie = this.elements().find((m) => m.id == e.id)
    //                 movie!.position = e.position
    //                 elements.push(movie!)
    //             })
    //             elements.sort((a, b) => a.position - b.position)
    //             return elements
    //         })
    //     )

    elementsSorted = computed(() => {
        const sortedItems = this.dragAndDropSortingStore.items()
        let elements: DragAndDropSortingItemWithText[] = []

        sortedItems.forEach((e) => {
            let movie = this.elements().find((m) => m.id === e.id)
            if (movie) {
                movie.position = e.position
                elements.push(movie)
            }
        })

        // Emit the ordered elements
        this.elementsOrdered.emit(elements)

        return elements.sort((a, b) => a.position - b.position)
    })


    
    constructor() {
        effect(() => {
            this.dragAndDropSortingStore.setElements(
                this.elements().map((e) => ({
                    id: e.id,
                    position: e.position,
                })),
            )
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        this.dragAndDropSortingStore.drop({
            previousIndex: event.previousIndex,
            currentIndex: event.currentIndex,
        })
    }

    moveUp(id: number) {
        this.dragAndDropSortingStore.moveUp(id)
    }

    moveDown(id: number) {
        this.dragAndDropSortingStore.moveDown(id)
    }

    moveTop(id: number) {
        this.dragAndDropSortingStore.moveTop(id)
    }

    moveBottom(id: number) {
        this.dragAndDropSortingStore.moveBottom(id)
    }
}
