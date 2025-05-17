import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

import { BehaviorSubject } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { AsyncPipe } from '@angular/common'

import { ElementService } from '../../../../../core/http/services/element-services/element/element.service'
import { ElementDetailDto } from '../../../../../core/http/dto/element-dto/element/element-detail.dto'
import { TableFeatureStore } from '../../../../stores/table-feature.store'

@Component({
    selector: 'app-is-visible-button',
    standalone: true,
    imports: [MatIconButton, MatIcon, AsyncPipe],
    templateUrl: './is-visible-button.component.html',
    styleUrl: './is-visible-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsVisibleButtonComponent {
    private readonly basicFeatureStore = inject(TableFeatureStore)
    private readonly elementService = inject(ElementService)
    private readonly destroyRef = inject(DestroyRef)
    spinner$ = new BehaviorSubject<boolean>(false)
    readonly element = input.required<ElementDetailDto>()

    toggleVisibility(isVisible: boolean): void {
        if (isVisible) {
            this.makeInvisible()
        } else {
            this.makeVisible()
        }
    }

    makeVisible() {
        this.spinner$.next(true)
        this.elementService
            .updateVisibilityById(this.element().id, {
                isVisible: true,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.updateElementVisibilityById(
                        this.element().id, { isVisible: true },
                    )
                    this.spinner$.next(false)
                },
            })
    }

    makeInvisible() {
        this.spinner$.next(true)
        this.elementService
            .updateVisibilityById(this.element().id, {
                isVisible: false,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.basicFeatureStore.updateElementVisibilityById(
                        this.element().id, { isVisible: false },
                    )
                    this.spinner$.next(false)
                },
            })
    }
}
