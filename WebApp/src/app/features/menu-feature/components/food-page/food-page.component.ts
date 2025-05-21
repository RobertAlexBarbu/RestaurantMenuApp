import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgTemplateOutlet} from "@angular/common";
import {ToolbarComponent} from "../../../../shared/components/toolbar/toolbar.component";
import {ActiveFeaturePipe} from "../../../../shared/pipes/active-feature/active-feature.pipe";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {CategoryOrderDialogComponent} from "../category-order-dialog/category-order-dialog.component";
import {responsiveDialogConfig} from "../../../../shared/configs/dialogs.config";
import {ItemOrderDialogComponent} from "../item-order-dialog/item-order-dialog.component";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";

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
    private readonly dialog = inject(MatDialog)
    private readonly viewContainerRef = inject(ViewContainerRef)
    private readonly menuStoreService = inject(MenuStoreService)
    items = this.menuStoreService.foodItems
    cats = this.menuStoreService.foodCategories



    goTo(url: string) {

    return this.router.navigateByUrl(url)
  }
  
  orderCategories() {
      this.dialog.open(CategoryOrderDialogComponent, {
          data: {
              type: 'food',
          },

          ...responsiveDialogConfig,
          viewContainerRef: this.viewContainerRef
      })
  }

    orderItems() {
        this.dialog.open(ItemOrderDialogComponent, {
            data: {
                type: 'food',
            },
            height: '630px',
            ...responsiveDialogConfig,
            viewContainerRef: this.viewContainerRef
        })
    }
}
