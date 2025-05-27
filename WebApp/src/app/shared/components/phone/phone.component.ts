import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { SafeResourcePipe } from '../../pipes/safe-resource/safe-resource.pipe'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { NgIf } from '@angular/common'

@Component({
    selector: 'app-phone',
    imports: [
        MatButton, MatIcon, SafeResourcePipe, MatProgressSpinner, NgIf,
    ],
    templateUrl: './phone.component.html',
    styleUrl: './phone.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class PhoneComponent {
    url = input.required<string>()
    auxUrl = signal<string>('')
    iframeUrl = computed(() => this.auxUrl() || this.url())

    loading = signal<boolean>(true)
    showIFrame = signal<boolean>(true)
    reloadVisible = input(true);


    reload() {
        const base = this.iframeUrl()
        this.loading.set(true)
        this.auxUrl.set(`${base}?reload=${Date.now()}`)
    }

    stopLoading() {
        setTimeout(() => {
            this.loading.set(false)
        }, 1000)

    }

}
