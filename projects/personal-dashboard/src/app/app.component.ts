import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [

        query(':enter,:leave', [
          style({
            position: 'absolute',
            top: 0,
            width: '100%',
            // display:'block'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform:'translateX(-80px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity:0,
              transform:'translateX(80px)'
            }),
            animate('250ms 100ms ease-out', style({
              opacity: 1,
              transform:'translateX(0)'
            }))
          ], { optional: true }),
        ])
      ]),
      transition(':decrement', [

        query(':enter,:leave', [
          style({
            position: 'absolute',
            top: 0,
            width: '100%',
            // display:'block'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform:'translateX(80px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              opacity:0,
              transform:'translateX(-80px)'
            }),
            animate('250ms 100ms ease-out', style({
              opacity: 1,
              transform:'translateX(0)'
            }))
          ], { optional: true }),
        ])
      ]),
    ])
  ]
})

export class AppComponent {
  title = 'personal-dashboard';

  prepareRoutes(outlet: RouterOutlet) {
    if (outlet.isActivated)
      return outlet.activatedRouteData['tabNumber']
    return undefined;
  }

}
