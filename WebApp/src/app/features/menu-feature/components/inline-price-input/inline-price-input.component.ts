import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';

import {debounceTime, switchMap} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuStoreService} from "../../services/menu-store/menu-store.service";
import {MenuItemService} from "../../../../core/http/services/menu-services/menu-item/menu-item.service";
import {MenuItemDto} from "../../../../core/http/dto/menu-dto/menu-item/menu-item.dto";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-inline-price-input',
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        ReactiveFormsModule
    ],
  templateUrl: './inline-price-input.component.html',
  styleUrl: './inline-price-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class InlinePriceInputComponent {
    private readonly menuStoreService = inject(MenuStoreService);
    private readonly menuItemService = inject(MenuItemService);

    item = input.required<MenuItemDto>()
    localPrice = signal<number>(0)
    loading = signal<boolean>(false)
    form = new FormControl<number>(0, {
        nonNullable: true,
    })

    constructor() {
        console.log('Rerender?')
        effect(() => {
            this.localPrice.set(this.item().price)
            this.form.setValue(this.localPrice(), { emitEvent: false }) // don't trigger valueChanges

        })
        this.form.valueChanges.pipe(debounceTime(500),
            switchMap(value => {
                this.loading.set(true)
                return this.menuItemService.updatePriceById(this.item().id, { price: value ? value : 0 })
            }))
            .subscribe({
                next: () => {
                    this.loading.set(false)
                    if (this.item().menuType == 'food') {
                        this.menuStoreService.updateFoodItemById(this.item().id, { price: this.form.getRawValue() })
                    } else {
                        this.menuStoreService.updateDrinksItemById(this.item().id, { price: this.form.getRawValue() })
                    }

                },
            })
    }
}
