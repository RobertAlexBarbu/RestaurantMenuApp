import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";

@Component({
  selector: 'app-analytics-feature',
    imports: [
        ToolbarComponent
    ],
  templateUrl: './analytics-feature.component.html',
  styleUrl: './analytics-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AnalyticsFeatureComponent {

}
