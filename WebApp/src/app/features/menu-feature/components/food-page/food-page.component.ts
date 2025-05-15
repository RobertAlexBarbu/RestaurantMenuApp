import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {ActiveFeaturePipe} from "../../../../shared/pipes/active-feature/active-feature.pipe";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";

@Component({
  selector: 'app-food-page',
  imports: [
    RouterOutlet,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    NgTemplateOutlet,
    ToolbarComponent,
    MatMenuTrigger,
    ActiveFeaturePipe,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FoodPageComponent {
  private readonly router = inject(Router)


  goTo(url: string) {

    return this.router.navigateByUrl(url)
  }
}
