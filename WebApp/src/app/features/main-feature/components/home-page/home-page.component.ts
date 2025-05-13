import {ChangeDetectionStrategy, Component, inject} from '@angular/core'

import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component'
import { pageLoadAnimation } from '../../../../app.animations'
import {AppStore} from "../../../../core/stores/app.store";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-home-page',
    standalone: true,
  imports: [ToolbarComponent, JsonPipe],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pageLoadAnimation],
})
export class HomePageComponent {
  private readonly appStore = inject(AppStore)
  menu = this.appStore.user.menu();
}
