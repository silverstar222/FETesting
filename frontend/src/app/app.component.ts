import { Component, OnInit } from '@angular/core';
import {
  style,
  animate,
  query,
  group,
  trigger,
  transition,
  // ...
} from '@angular/animations';

const slideLeft = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 ,transform: 'translate3d(0%,0,0)' }), {optional: true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(-100%,0,0)' }), {optional: true}),
  group([
    query(':leave', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(100%,0,0)' })), // y: '-100%'
    ]), {optional: true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)' })),
    ]), {optional: true})
  ])
]

const slideRight = [
  query(':leave', style({ position: 'absolute', left: 0, right: 0 , transform: 'translate3d(0%,0,0)'}), {optional:true}),
  query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)'}), {optional:true}),

  group([
    query(':leave', group([
      animate('250ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(-250px,0,0)', opacity: 0 })), // y: '-100%'
    ]), {optional:true}),
    query(':enter', group([
      animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translate3d(0%,0,0)', opacity: 1 })),
    ]), {optional:true})
  ])
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimations', [
      transition('* <=> *', slideRight)
    ])
  ]
})
export class AppComponent {

  prepareRouteTransition(outlet) {
    console.log(outlet);
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
