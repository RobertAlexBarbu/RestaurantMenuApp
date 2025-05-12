import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { ElementDto } from '../../core/http/dto/element/element.dto'
import { ElementCategoryDto } from '../../core/http/dto/element-category/element-category.dto'
import { computed } from '@angular/core'
import { ElementsAndCategoriesDto } from '../../core/http/dto/element-overview/elements-and-categories.dto'
import { ElementDetailDto } from '../../core/http/dto/element/element-detail.dto'
import { PositionDto } from '../../core/http/dto/other/position.dto'
import { UpdateVisibilityDto } from '../../core/http/dto/element/update-visibility.dto'
import { UpdateWeightDto } from '../../core/http/dto/element/update-weight.dto'
import { UpdateElementDto } from '../../core/http/dto/element/update-element.dto'
import { UpdateElementCategoryDto } from '../../core/http/dto/element-category/update-element-category.dto'


export interface TableFeatureStore {
    elements: ElementDto[]
    categories: ElementCategoryDto[]
    init: boolean
}

export const initialTableFeatureState: TableFeatureStore = {
    elements: [],
    categories: [],
    init: false,
}

export const TableFeatureStore = signalStore(
    withState(initialTableFeatureState),
    withComputed((state) => {
        const categoryMap = computed(() =>
            new Map(state.categories().map((c) => [c.id, c])),
        )
        const elementsWithCategory = computed(() => {
            return state.elements().map((e) => ({
                ...e,
                category: categoryMap().get(e.categoryId) ?? { id: -1, name: 'No Category' } as ElementCategoryDto,
            }))
        })

        return { categoryMap, elementsWithCategory }
    }),
    withMethods((store) => ({
        initialize(value: ElementsAndCategoriesDto) {
            patchState(store, () => ({
                elements: [...value.elements],
                categories: [...value.categories],
                init: true,
            }))
        },

        setInit(init: boolean) {
            patchState(store, () => ({
                init
            }))
        },

        setCategories(categories: ElementCategoryDto[]) {
            patchState(store, () => ({
                categories: categories,
            }))
        },

        setElements(elements: ElementDto[]) {
            patchState(store, () => ({
                elements: elements,
            }))
        },

        addElement(elementDetailDto: ElementDetailDto) {
            patchState(store, (state) => ({
                elements: [...state.elements, elementDetailDto],
            }))
        },
        addCategory(elementCategoryDto: ElementCategoryDto) {
            patchState(store, (state) => ({
                categories: [...state.categories, elementCategoryDto],
            }))
        },

        updateElementPositions(positions: PositionDto[]) {
            const positionMap = new Map(
                positions.map((p) => [p.id, p.position]),
            )

            patchState(store, (state) => ({
                elements: state.elements
                    .map((e) => ({
                        ...e,
                        position: positionMap.get(e.id) ?? e.position,
                    }))
                    .sort((a, b) => a.position - b.position),
            }))
        },
        updateElementVisibilityById(elementId: number, updateVisiblityDto: UpdateVisibilityDto) {
            patchState(store, (state) => ({
                elements: state.elements.map((e) => {
                    if (e.id === elementId) {
                        return {
                            ...e,
                            ...updateVisiblityDto,
                        }
                    }
                    return e
                }),
            }))
        },
        updateElementWeightById(elementId: number, updateWeightDto: UpdateWeightDto) {
            patchState(store, (state) => ({
                elements: state.elements.map((e) => {
                    if (e.id === elementId) {
                        return {
                            ...e,
                            ...updateWeightDto,
                        }
                    }
                    return e
                }),
            }))
        },
        updateElementById(elementId: number, updateElementDto: UpdateElementDto) {
            patchState(store, (state) => ({
                elements: state.elements.map((element) =>
                    element.id === elementId
                        ? { ...element, ...updateElementDto }
                        : element,
                ),
            }))
        },
        updateCategoryById(categoryId: number, updateCategoryDto: UpdateElementCategoryDto) {
            patchState(store, (state) => ({
                categories: state.categories.map((category) =>
                    category.id === categoryId
                        ? { ...category, ...updateCategoryDto }
                        : category,
                ),
            }))
        },

        deleteElementById(elementId: number) {
            patchState(store, (state) => ({
                elements: state.elements
                    .filter((e) => e.id !== elementId)
                    .map((e, index) => ({ ...e, position: index + 1 })),
            }))
        },
        deleteCategoryById(categoryId: number) {
            patchState(store, (state) => ({
                // Remove the category
                categories: state.categories
                    .filter((c) => c.id !== categoryId)
                    .map((c, index) => ({ ...c, position: index + 1 })),
                // Also remove all elements that have the deleted category
                elements: state.elements
                    .filter((e) => e.categoryId !== categoryId)
                    .map((e, index) => ({ ...e, position: index + 1 })),
            }))
        },

    })),
)
