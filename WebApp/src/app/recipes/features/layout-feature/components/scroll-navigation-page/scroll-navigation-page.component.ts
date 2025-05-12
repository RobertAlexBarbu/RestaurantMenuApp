import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { CardComponent } from '../../../../../shared/components/card/card.component'
import { fadeInAnimation, pageLoadAnimation } from '../../../../../app.animations'
import { RepositionOverlayComponent } from '../../../../components/reposition-overlay/reposition-overlay.component'
import { NgTemplateOutlet } from '@angular/common'
import { ToolbarComponent } from '../../../../../shared/components/toolbar/toolbar.component'
import {
    ScrollNavigationButtonComponent,
} from '../../../../../shared/components/scroll-navigation-button/scroll-navigation-button.component'


@Component({
    selector: 'app-scroll-navigation-page',
    imports: [
        MatButton,
        MatIcon,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        CardComponent,
        MatIconButton,
        RepositionOverlayComponent,
        NgTemplateOutlet,
        ToolbarComponent,
        ScrollNavigationButtonComponent,

    ],
    templateUrl: './scroll-navigation-page.component.html',
    styleUrl: './scroll-navigation-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: [fadeInAnimation, pageLoadAnimation],
})
export class ScrollNavigationPageComponent {

    sections = [
        'Section 1',
        'Section 2',
        'Section 3',
        'Section 4',
        'Section 5',
        'Section 6',
        'Section 7',
        'Section 8',
        'Section 9',
        'Section 10',
    ]
    currentSection = signal<string>('Title Section')


    setSection(section: string) {
        this.currentSection.set(section)
    }
}
