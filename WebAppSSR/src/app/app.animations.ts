import { animate, keyframes, state, style, transition, trigger } from '@angular/animations'


export const fadeInAnimation = trigger('fadeIn', [
    transition('* <=> *', [
        // No initial style needed with keyframes that start at offset 0
        animate(
            '800ms cubic-bezier(0.22, 1, 0.36, 1)',
            keyframes([
                style({
                    opacity: 0,
                    transform: 'translateY(0) scale(1)',
                    offset: 0,
                }),
                style({
                    opacity: 0.5,
                    transform: 'translateY(0) scale(1)',
                    offset: 0.5,
                }),
                style({
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                    offset: 1,
                }),
            ]),
        ),
    ]),
])
export const fadeInListAnimation = trigger('fadeInList', [
    transition('* <=> *', [
        style({
            opacity: 0,
            transform: 'translateY(8px)',
        }),
        animate(
            '500ms {{delay}}ms ease-out',
            style({
                opacity: 1,
                transform: 'translateY(0)',
            }),
        ),
    ], {
        params: { delay: 50 }, // Default delay between items
    }),
])
export const slideDownErrorAnimation = trigger('slideDownError', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // Start above and invisible
        animate(
            '200ms ease-in',
            style({ transform: 'translateY(0)', opacity: 1 }),
        ), // Slide down
    ]),
    transition(':leave', [
        animate(
            '200ms ease-out',
            style({ transform: 'translateY(-100%)', opacity: 0 }),
        ), // Slide up
    ]),
])
export const messageAppearAnimation = trigger('messageAppear', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'scale(0.8)',
        }),
        animate('150ms 100ms ease-out',
            style({
                opacity: 1,
                transform: 'scale(1)',
            }),
        ),
    ]),
])
export const pageLoadAnimation = trigger('pageLoad', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-15px) translateZ(0)',
        }),
        animate(
            '350ms ease-in-out',
            keyframes([
                style({ opacity: 0, transform: 'translateY(-15px) translateZ(0)', offset: 0 }),
                style({ opacity: 0, transform: 'translateY(-15px) translateZ(0)', offset: 0.2 }),
                style({ opacity: 1, transform: 'translateY(0) translateZ(0)', offset: 1 }),
            ]),
        ),
    ]),
])
export const toolbarLoadAnimation = trigger('toolbarLoad', [
    transition(':enter', [
        style({
            opacity: 1,
            transform: 'translateY(-10px) translateZ(0)',
        }),
        animate(
            '350ms ease-in-out',
            keyframes([
                style({ opacity: 1, transform: 'translateY(-10px) translateZ(0)', offset: 0 }),
                style({ opacity: 1, transform: 'translateY(0) translateZ(0)', offset: 1 }),
            ]),
        ),
    ]),
])
export const slideRightToLeftAnimation = trigger('slideRightToLeft', [
    transition(':enter', [
        style({ transform: 'translateX(100%)' }), // Start off-screen right
        animate('0.3s ease-out', style({ transform: 'translateX(0)' })), // Slide to the natural position
    ]),
])
export const slideLeftToRightAnimation = trigger('slideLeftToRight', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }), // Start off-screen left
        animate('0.3s ease-out', style({ transform: 'translateX(0)' })), // Slide to the natural position
    ]),
])

export const detailExpandAnimation =         trigger('detailExpand', [
    state('collapsed,void', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
    ),
])
