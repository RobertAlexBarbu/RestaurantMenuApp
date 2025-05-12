import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed, Signal } from '@angular/core'
import { PositionDto } from '../../core/http/dto/other/position.dto'


export interface EntityDto {
    id: number;
    name: string;
    position: number;
    categoryId: number;
}

export interface EntityDetailDto {
    id: number;
    name: string;
    position: number;
    categoryId: number;
    category: EntityCategoryDto;
}

export interface EntityCategoryDto {
    id: number;
    name: string;
    position: number;
}

export interface BasicEntityStore {
    entities: EntityDto[];
    categories: EntityCategoryDto[];
    init: boolean;
}

export const initialBasicEntityState: BasicEntityStore = {
    entities: [],
    categories: [],
    init: false,
}

export const sortByCategoryElementPosition = (categories: EntityCategoryDto[]) => {
    const categoryPositionMap = new Map<number, number>(
        categories.map((c) => [c.id, c.position]),
    )
    return (a: EntityDto, b: EntityDto) => {
        const catPosA = categoryPositionMap.get(a.categoryId) ?? 0
        const catPosB = categoryPositionMap.get(b.categoryId) ?? 0

        if (catPosA !== catPosB) {
            return catPosA - catPosB // Sort first by category position
        }

        return a.position - b.position // Then sort by entity position inside category
    }
}

export const BasicEntityStore = signalStore(
    withState(initialBasicEntityState),
    withComputed((state): {
        categoryMap: Signal<Map<number, EntityCategoryDto>>;
        entitiesWithCategory: Signal<EntityDetailDto[]>;
    } => {
        const categoryMap = computed(() => {
            return new Map(state.categories().map((c) => [c.id, c]))
        })
        const entitiesWithCategory = computed(() => {
            return state.entities().map((e) => ({
                ...e,
                category: categoryMap().get(e.categoryId)!,
            }))
        })
        return { categoryMap, entitiesWithCategory }
    }),
    withMethods((store) => ({
        initialize(value: { entities: EntityDto[]; categories: EntityCategoryDto[] }) {
            patchState(store, () => ({
                entities: [...value.entities],
                categories: [...value.categories],
                init: true,
            }))
        },

        setInit(init: boolean) {
            patchState(store, () => ({
                init
            }))
        },

        addEntity(entityDto: EntityDto) {
            patchState(store, (state) => ({
                entities: [...state.entities, entityDto],
            }))
        },

        addCategory(categoryDto: EntityCategoryDto) {
            patchState(store, (state) => ({
                categories: [...state.categories, categoryDto],
            }))
        },

        updateEntityPositions(categoryId: number, positions: PositionDto[]) {
            const positionMap = new Map(positions.map((p) => [p.id, p.position]))
            patchState(store, (state) => ({
                entities: state.entities
                    .map((e) =>
                        e.categoryId === categoryId
                            ? { ...e, position: positionMap.get(e.id) ?? e.position }
                            : e,
                    )
                    .sort(sortByCategoryElementPosition(state.categories)),
            }))
        },

        updateCategoryPositions(positions: PositionDto[]) {
            const positionMap = new Map(positions.map((p) => [p.id, p.position]))
            patchState(store, (state) => {
                const newCategories = state.categories
                    .map((c) => ({
                        ...c,
                        position: positionMap.get(c.id) ?? c.position,
                    }))
                    .sort((a, b) => a.position - b.position)

                const newEntities = [...state.entities].sort(sortByCategoryElementPosition(newCategories))
                return {
                    categories: newCategories,
                    entities: newEntities,
                }
            })
        },

        updateEntityById(entityId: number, updateEntityDto: Partial<EntityDto>) {
            patchState(store, (state) => ({
                entities: state.entities.map((entity) =>
                    entity.id === entityId ? { ...entity, ...updateEntityDto } : entity,
                ),
            }))
        },

        updateCategoryById(categoryId: number, updateCategoryDto: Partial<EntityCategoryDto>) {
            patchState(store, (state) => ({
                categories: state.categories.map((category) =>
                    category.id === categoryId ? { ...category, ...updateCategoryDto } : category,
                ),
            }))
        },

        deleteEntityById(entityId: number) {
            patchState(store, (state) => {
                const entityToDelete = state.entities.find(e => e.id === entityId)
                if (!entityToDelete) return state
                let index = 0
                const newEntities = state.entities
                    .filter((e) => e.id !== entityId)
                    .map((e) => {
                        if (e.categoryId === entityToDelete.categoryId) {
                            index++
                            return { ...e, position: index }
                        }
                        return e
                    })

                return {
                    ...state,
                    entities: newEntities.sort(sortByCategoryElementPosition(state.categories)),
                }
            })
        },

        deleteCategoryById(categoryId: number) {
            patchState(store, (state) => {
                const newCategories = state.categories
                    .filter((c) => c.id !== categoryId)
                    .map((c, index) => ({ ...c, position: index + 1 })) // Reorder positions

                const newEntities = state.entities
                    .filter((e) => e.categoryId !== categoryId)
                    .sort(sortByCategoryElementPosition(newCategories))

                return {
                    categories: newCategories,
                    entities: newEntities,
                }
            })
        },
    })),
)
