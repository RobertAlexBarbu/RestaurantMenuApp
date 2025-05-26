import {Component, inject} from '@angular/core';
import {ToolbarComponent} from "../../shared/components/toolbar/toolbar.component";
import {NgTemplateOutlet} from "@angular/common";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ActiveFeaturePipe} from "../../shared/pipes/active-feature/active-feature.pipe";

@Component({
  selector: 'app-menu-feature',
    imports: [
        ToolbarComponent,
        NgTemplateOutlet,
        MatTabNavPanel,
        RouterOutlet,
        MatTabNav,
        ActiveFeaturePipe,
        MatTabLink
    ],
  templateUrl: './menu-feature.component.html',
  styleUrl: './menu-feature.component.scss',
    standalone: true
})
export class MenuFeatureComponent {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    routeUrl = '/' + this.route.snapshot.url.join('/')
    
    goTo(url: string) {
        return this.router.navigate([url], {
            relativeTo: this.route
        })
    }

}
