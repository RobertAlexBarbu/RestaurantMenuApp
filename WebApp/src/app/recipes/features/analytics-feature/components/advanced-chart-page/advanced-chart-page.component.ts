import { ChangeDetectionStrategy, Component } from '@angular/core'

import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { BarChartComponent } from '../../../../components/charts/bar-chart/bar-chart.component'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'
import {
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { PieChartComponent } from '../../../../components/charts/pie-chart/pie-chart.component'
import { MatButton } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import {
    AdvancedChartContainerComponent
} from '../../../../../shared/components/advanced-chart-container/advanced-chart-container.component'

@Component({
    selector: 'app-advanced-chart-page',
    imports: [
        BarChartComponent,
        CardComponent,
        MatLabel,
        MatSelect,
        MatFormField,
        MatOption,
        MatDateRangeInput,
        MatDatepickerToggle,
        MatDateRangePicker,
        MatHint,
        MatStartDate,
        MatEndDate,
        MatSuffix,
        PieChartComponent,
        MatButton,
        MatIconModule,
        AdvancedChartContainerComponent,
    ],
    templateUrl: './advanced-chart-page.component.html',
    styleUrl: './advanced-chart-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    providers: [provideNativeDateAdapter()],
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class AdvancedChartPageComponent {

}
