import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    signal,
    ViewContainerRef,
} from '@angular/core'
import { AppStore } from '../../../core/stores/app.store'
import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'

import { Router, RouterOutlet } from '@angular/router'
import { fadeInAnimation } from '../../../app.animations'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { NotificationService } from '../../../core/services/notification/notification.service'
import { MatDialog } from '@angular/material/dialog'
import { TablePageComponent } from './components/table-page/table-page.component'
import { TableImportDialogComponent } from './components/table-import-dialog/table-import-dialog.component'
import { TableResetDialogComponent } from './components/table-reset-dialog/table-reset-dialog.component'
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component'
import {
    FeatureLoadingPageComponent,
} from '../../../shared/components/feature-loading-page/feature-loading-page.component'
import { ElementOverviewService } from '../../../core/http/services/element-overview/element-overview.service'
import { ElementDetailDto } from '../../../core/http/dto/element/element-detail.dto'
import { ElementCategoryDto } from '../../../core/http/dto/element-category/element-category.dto'
import { TableFeatureStore } from '../../stores/table-feature.store'
import { TableSpreadsheetService } from './services/table-spreadsheet/table-spreadsheet.service'
import { fullscreenDialogConfig } from '../../../shared/configs/dialogs.config'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActiveFeaturePipe } from '../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-table-feature',
    standalone: true,
    imports: [
        TablePageComponent,
        AsyncPipe,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
        RouterOutlet,
        MatButton,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        ToolbarComponent,
        FeatureLoadingPageComponent,
        NgTemplateOutlet,
        ActiveFeaturePipe,
    ],
    templateUrl: './table-feature.component.html',
    styleUrl: './table-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableFeatureStore],
    animations: [fadeInAnimation],
})
export class TableFeatureComponent {
    private readonly tableFeatureStore = inject(TableFeatureStore)
    private readonly appStore = inject(AppStore)
    private readonly elementOverviewService = inject(ElementOverviewService)
    private readonly router = inject(Router)
    private readonly spreadsheetService = inject(TableSpreadsheetService)
    private readonly notificationService = inject(NotificationService)
    private readonly dialog = inject(MatDialog)
    private readonly destroyRef = inject(DestroyRef)
    private readonly viewContainerRef = inject(ViewContainerRef)
    elements: ElementDetailDto[] = []
    categories: ElementCategoryDto[] = []
    spinner = signal(true)
    resetDataSpinner = signal(false)

    constructor() {
        effect(() => {
            if (!this.tableFeatureStore.init()) {
                this.spinner.set(true)
                const user = this.appStore.user()
                this.elementOverviewService.getElementsAndCategoriesByUserId(user.id)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({
                        next: (data) => {
                            this.tableFeatureStore.initialize(data)
                            this.categories = this.tableFeatureStore.categories()
                            this.elements = this.tableFeatureStore.elementsWithCategory()
                            this.spinner.set(false)
                        },
                        error: () => {
                            this.spinner.set(false)
                        },
                    })
            } else {
                this.spinner.set(false)
            }
        })
    }


    goTo(url: string) {
        return this.router.navigateByUrl(url)
    }

    // Export Import Methods
    exportTable() {
        this.spreadsheetService
            .exportElementTable(this.tableFeatureStore.categories(), this.tableFeatureStore.elementsWithCategory())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.notificationService.notify(
                        'Table exported successfully.',
                    )
                },
            })
    }

    importTable() {
        this.dialog.open(TableImportDialogComponent, {
            ...fullscreenDialogConfig,
            viewContainerRef: this.viewContainerRef,
        })
    }

    resetData() {
        this.dialog.open(TableResetDialogComponent, {
            autoFocus: false,
            viewContainerRef: this.viewContainerRef,
        })
    }
}
