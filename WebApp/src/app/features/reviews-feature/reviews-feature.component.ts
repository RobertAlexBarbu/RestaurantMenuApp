import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";

@Component({
  selector: 'app-reviews-feature',
    imports: [
        ToolbarComponent
    ],
  templateUrl: './reviews-feature.component.html',
  styleUrl: './reviews-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ReviewsFeatureComponent {

}
