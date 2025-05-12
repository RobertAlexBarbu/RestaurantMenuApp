import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed, Signal } from '@angular/core'
import { PositionDto } from '../../core/http/dto/other/position.dto'


export interface EntityDto {
    id: number;
    name: string;
    position: number;
    categoryId: number
}

export interface EntityDetailDto {
    id: number;
    name: string;
    position: number;
    categoryId: number
    category: EntityCategoryDto;
}

export interface EntityCategoryDto {
    id: number;
    name: string;
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

export const BasicEntityStore = signalStore(
    withState(initialBasicEntityState),
    withComputed((state): {
        categoryMap: Signal<Map<number, EntityCategoryDto>>,
        entitiesWithCategory: Signal<EntityDetailDto[]>
    } => {
        // Compute a category map for fast lookup of categories by their ID
        const categoryMap = computed(() => {
            return new Map(state.categories().map((c) => [c.id, c])) // Map each category's ID to its category object
        })
        // Compute entities with their associated category
        const entitiesWithCategory = computed(() => {
            return state.entities().map((e) => ({
                ...e,
                category: categoryMap().get(e.categoryId)!,
            }))
        })
        // Return the computed properties
        return { categoryMap, entitiesWithCategory }
    }),
    withMethods((store) => ({
        initialize(value: { entities: EntityDto[], categories: EntityCategoryDto[] }) {
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

        setEntities(entityDtos: EntityDto[]) {
            patchState(store, () => ({
                entities: [...entityDtos],
            }))
        },

        setCategories(entityCategoryDtos: EntityCategoryDto[]) {
            patchState(store, () => ({
                categories: [...entityCategoryDtos],
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

        updateEntityPositions(positions: PositionDto[]) {
            const positionMap = new Map(positions.map((p) => [p.id, p.position])) // Map entity ID to new position
            patchState(store, (state) => ({
                entities: state.entities
                    .map((e) => ({
                        ...e,
                        position: positionMap.get(e.id) ?? e.position,
                    }))
                    .sort((a, b) => a.position - b.position), // Sort entities based on their position
            }))
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
            patchState(store, (state) => ({
                entities: state.entities
                    .filter((e) => e.id !== entityId)
                    .map((e, index) => ({ ...e, position: index + 1 })), // Reorder entities after deletion
            }))
        },

        deleteCategoryById(categoryId: number) {
            patchState(store, (state) => ({
                categories: state.categories
                    .filter((c) => c.id !== categoryId),
                // Also remove all entities associated with the deleted category
                entities: state.entities
                    .filter((e) => e.categoryId !== categoryId)
                    .map((e, index) => ({ ...e, position: index + 1 })), // Reorder remaining entities
            }))
        },
    })),
)