import { ChangeDetectionStrategy, Component } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import { BarChartComponent } from '../../../../components/charts/bar-chart/bar-chart.component'
import { BubbleChartComponent } from '../../../../components/charts/bubble-chart/bubble-chart.component'
import { DonutChartComponent } from '../../../../components/charts/donut-chart/donut-chart.component'
import {
    HorizontalBarChartComponent,
} from '../../../../components/charts/horizontal-bar-chart/horizontal-bar-chart.component'
import { LineChartComponent } from '../../../../components/charts/line-chart/line-chart.component'
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component'

@Component({
    selector: 'app-basic-charts-page',
    imports: [
        BarChartComponent,
        BubbleChartComponent,
        DonutChartComponent,
        HorizontalBarChartComponent,
        LineChartComponent,
        PieChartComponent,
        CardComponent,
    ],
    templateUrl: './basic-charts-page.component.html',
    styleUrl: './basic-charts-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class BasicChartsPageComponent {

}
