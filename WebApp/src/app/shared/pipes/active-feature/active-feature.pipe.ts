import { inject, Pipe, PipeTransform } from '@angular/core'
import { ActiveFeatureStore } from '../../../core/stores/active-feature.store'

@Pipe({
    standalone: true,
    name: 'activeFeature',
    pure: false,
})
export class ActiveFeaturePipe implements PipeTransform {
    private store = inject(ActiveFeatureStore)

    transform(feature: string): boolean {
        const features = this.store.features()
        return features.includes(feature)
    }

}
