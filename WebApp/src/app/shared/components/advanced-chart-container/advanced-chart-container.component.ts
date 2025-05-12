import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-advanced-chart-container',
  imports: [],
  templateUrl: './advanced-chart-container.component.html',
  styleUrl: './advanced-chart-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone:true
})
export class AdvancedChartContainerComponent {
    rectangle = input(true);
    protected readonly input = input
}
