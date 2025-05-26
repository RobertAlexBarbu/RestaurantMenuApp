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
    {providedIn: "root"},
    withState(initialState),
    withMethods((store) => ({
        setActiveFeatures(url: string) {
            url = extractRestOfUrl(url)

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

function extractRestOfUrl(url: string): string {
    // Regex explanation:
    // ^\/                - Starts with '/'
    // (?:               - Non-capturing group (prefixes)
    //   qr\/\d+          - Either '/qr/123' (digits only)
    //   |                - OR
    //   [^\/]+           - Any chars except '/' (custom part like 'my-url-j4YSzjvG')
    // )
    // (\/.*)?            - Optional capturing group for '/rest' (returns '/test' or '')
    const match = url.match(/^\/(?:qr\/\d+|[^\/]+)(\/.*)?$/);
    return match?.[1] || ""; // Returns '/test' or ''
}

const featuresMap: Record<string, string[]> = {
    '': ['home'],
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
  '/menu/food': ['menu', 'food', 'food-items'],
  '/menu/food/categories': ['menu', 'food', 'food-categories'],
  '/menu/drinks': ['menu', 'drinks', 'drinks-items'],
  '/menu/drinks/categories': ['menu', 'drinks', 'drinks-categories'],
  '/menu/details': ['menu', 'details'],
    '/style': ['style'],
    '/analytics': ['analytics', 'analytics-basic'],
    '/reviews': ['reviews'],
    '/review': ['review'],
    '/chat': ['chat']
    

}
