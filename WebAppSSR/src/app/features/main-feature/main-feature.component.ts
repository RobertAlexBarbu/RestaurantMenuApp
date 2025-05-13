import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-feature',
  imports: [],
  templateUrl: './main-feature.component.html',
  styleUrl: './main-feature.component.scss',

    standalone: true
})
export class MainFeatureComponent {
    private readonly route =inject(ActivatedRoute);
    rt = this.route.snapshot;
}
