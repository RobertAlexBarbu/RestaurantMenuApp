import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {ActiveFeaturePipe} from "../../../../shared/pipes/active-feature/active-feature.pipe";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";

@Component({
  selector: 'app-drinks-page',
  imports: [
    RouterOutlet,
    ActiveFeaturePipe,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    NgTemplateOutlet,
    ToolbarComponent,
    MatMenuTrigger
  ],
  templateUrl: './drinks-page.component.html',
  styleUrl: './drinks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DrinksPageComponent {
  private readonly router = inject(Router)


  goTo(url: string) {

    return this.router.navigateByUrl(url)
  }
}
