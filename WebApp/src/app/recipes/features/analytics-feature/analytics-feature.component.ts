import { ChangeDetectionStrategy, Component, inject } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../app.animations'
import { ChartJsService } from '../../../core/services/chart-js/chart-js.service'
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component'
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs'
import { Router, RouterOutlet } from '@angular/router'
import {
    HorizontalBarChartComponent,
} from '../../components/charts/horizontal-bar-chart/horizontal-bar-chart.component'
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component'
import { BubbleChartComponent } from '../../components/charts/bubble-chart/bubble-chart.component'
import { DonutChartComponent } from '../../components/charts/donut-chart/donut-chart.component'
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component'
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component'
import { NgTemplateOutlet } from '@angular/common'
import { ActiveFeaturePipe } from '../../../shared/pipes/active-feature/active-feature.pipe'

@Component({
    selector: 'app-analytics-feature',
    standalone: true,
    imports: [
        BarChartComponent,
        BubbleChartComponent,
        DonutChartComponent,
        HorizontalBarChartComponent,
        LineChartComponent,
        PieChartComponent,
        ToolbarComponent,
        MatTabLink,
        MatTabNav,
        MatTabNavPanel,
        RouterOutlet,
        NgTemplateOutlet,
        ActiveFeaturePipe,
    ],
    templateUrl: './analytics-feature.component.html',
    styleUrl: './analytics-feature.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation, pageLoadAnimation],
    providers: [ChartJsService],
})
export class AnalyticsFeatureComponent {
    private readonly router = inject(Router)


    goTo(url: string) {
        return this.router.navigateByUrl(url)
    }
}
