import { moveItemInArray } from '@angular/cdk/drag-drop'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

export interface DragAndDropSortingState {
    items: DragAndDropSortingItem[]
}

export interface DragAndDropSortingItemWithText {
    position: number
    id: number
    text: string
}

export interface DragAndDropSortingItem {
    position: number
    id: number
}

const initialState: DragAndDropSortingState = {
    items: [],
}

// To Be provided in components that implement drag-and-drop sorting
export const DragAndDropSortingStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        drop(event: { previousIndex: number; currentIndex: number }) {
            patchState(store, (state) => {
                let newElements = [...state.items]
                moveItemInArray(
                    newElements,
                    event.previousIndex,
                    event.currentIndex,
                )
                newElements.forEach((element, index) => {
                    element.position = index + 1
                })
                return { items: newElements }
            })
        },

        moveUp(id: number) {
            patchState(store, (state) => {
                let index = state.items.findIndex((e) => e.id === id)
                if (index > 0) {
                    let newElements = [...state.items]
                    moveItemInArray(newElements, index, index - 1)
                    newElements.forEach((element, i) => {
                        element.position = i + 1
                    })
                    return { items: newElements }
                }
                return state
            })
        },

        moveDown(id: number) {
            patchState(store, (state) => {
                let index = state.items.findIndex((e) => e.id === id)
                if (index < state.items.length - 1) {
                    let newElements = [...state.items]
                    moveItemInArray(newElements, index, index + 1)
                    newElements.forEach((element, i) => {
                        element.position = i + 1
                    })
                    return { items: newElements }
                }
                return state
            })
        },

        moveTop(id: number) {
            patchState(store, (state) => {
                let index = state.items.findIndex((e) => e.id === id)
                if (index > 0) {
                    let newElements = [...state.items]
                    let [element] = newElements.splice(index, 1)
                    newElements.unshift(element)
                    newElements.forEach((element, i) => {
                        element.position = i + 1
                    })
                    return { items: newElements }
                }
                return state
            })
        },

        moveBottom(id: number) {
            patchState(store, (state) => {
                let index = state.items.findIndex((e) => e.id === id)
                if (index < state.items.length - 1) {
                    let newElements = [...state.items]
                    let [element] = newElements.splice(index, 1)
                    newElements.push(element)
                    newElements.forEach((element, i) => {
                        element.position = i + 1
                    })
                    return { items: newElements }
                }
                return state
            })
        },

        setElements(elements: DragAndDropSortingItem[]) {
            patchState(store, () => ({ items: [...elements] }))
        },
    })),
)
