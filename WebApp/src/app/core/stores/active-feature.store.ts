import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

export interface ActiveFeatureState {
    name: string
    subfeatureName: string,
    features: string[]
}

const initialState: ActiveFeatureState = {
    name: '',
    subfeatureName: '',
    features: [],
}

export const ActiveFeatureStore = signalStore(
    withState(initialState),
    withMethods((store) => ({
        setActiveFeatures(url: string) {
            patchState(store, (state) => {
                let features: string[] = []
                if (featuresMap[url] !== undefined) {
                    features = [...featuresMap[url]]
                }


                console.log(features)

                return {
                    ...state,
                    features: [...features], // To avoid duplicates
                }
            })
        },
    })),
)

const featuresMap: Record<string, string[]> = {
    '/': ['home'],
    '/basic/form': ['basic', 'form'],
    '/basic/components': ['basic', 'components'],
    '/basic/ai': ['basic', 'ai'],
    '/table/elements': ['table', 'elements'],
    '/table/categories': ['table', 'categories'],
    '/analytics/basic': ['analytics', 'analytics-basic'],
    '/analytics/advanced': ['analytics', 'advanced'],
    '/layout/tabs/page1': ['layout', 'tabs', 'tabs-page-1'],
    '/layout/tabs/page2': ['layout', 'tabs', 'tabs-page-2'],
    '/layout/tabs/page3': ['layout', 'tabs', 'tabs-page-3'],
    '/layout/scroll': ['layout', 'scroll'],
    '/layout/mobile': ['layout', 'mobile'],
    '/debug': ['debug'],
    '/settings/account': ['settings', 'account'],
    '/settings/preferences': ['settings', 'preferences'],
    '/settings/billing': ['settings', 'billing'],
  '/menu/food/items': ['menu', 'food', 'food-items'],
  '/menu/food/categories': ['menu', 'food', 'food-categories'],
  '/menu/drinks/items': ['menu', 'drinks', 'drinks-items'],
  '/menu/drinks/categories': ['menu', 'drinks', 'drinks-categories'],
  '/menu/details': ['menu', 'details']

}
