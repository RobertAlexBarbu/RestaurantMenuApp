import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ScrollService } from '../../core/services/scroll/scroll.service'
import { CdkScrollable } from '@angular/cdk/scrolling'
import { LogoComponent } from '../../shared/components/logo/logo.component'
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component'

@Component({
    selector: 'app-main-feature',
    standalone: true,
    imports: [RouterOutlet, CdkScrollable, LogoComponent, NavigationBarComponent],
    templateUrl: './main-feature.component.html',
    styleUrl: './main-feature.component.scss',
    providers: [ScrollService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFeatureComponent {

}
