import {Component, inject} from '@angular/core';
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {MatButton} from "@angular/material/button";
import {MenuStoreService} from "../../../../core/stores/menu-store/menu-store.service";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {
    pageLoadAnimation,
    slideDownErrorAnimation,
    slideLeftToRightAnimation,
    slideRightToLeftAnimation
} from "../../../../app.animations";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-page',
    imports: [
        ToolbarComponent,
        MatButton,
        NgIf,
        MatIcon,
        RouterLink
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
    standalone: true,
    animations: [pageLoadAnimation, slideDownErrorAnimation, slideLeftToRightAnimation, slideRightToLeftAnimation]
})
export class HomePageComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    menuDetails = this.menuStoreService.menuDetails()
    menu = this.menuStoreService.menu()
    url = this.menuStoreService.url()
}
