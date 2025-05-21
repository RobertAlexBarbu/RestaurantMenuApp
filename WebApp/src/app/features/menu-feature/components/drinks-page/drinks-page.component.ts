import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {ActiveFeaturePipe} from "../../../../shared/pipes/active-feature/active-feature.pipe";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {CategoryOrderDialogComponent} from "../category-order-dialog/category-order-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {ItemOrderDialogComponent} from "../item-order-dialog/item-order-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";

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
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly menuStoreService = inject(MenuStoreService)
    items = this.menuStoreService.drinksItems
    cats = this.menuStoreService.drinksCategories


  goTo(url: string) {
    return this.router.navigateByUrl(url)
  }

    orderCategories() {
        this.dialog.open(CategoryOrderDialogComponent, {
            data: {
                type: 'drinks',
            },

            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef
        })
    }

    orderItems() {
        this.dialog.open(ItemOrderDialogComponent, {
            data: {
                type: 'drinks',
            },
            height: '630px',
            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef
        })
    }
}
