import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations'
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators'
import { HopscotchService } from 'ngx-hopscotch'
const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AppComponent {
  title = 'personal-dashboard';
  isImgloading: boolean = false;
  dateTime!: Observable<Date>;
  bgImgs = [
    'https://picsum.photos/seed/picsum/1200/625',
  ]
  popupTour = true;

  constructor(private _hopscotchService: HopscotchService,
    private router: Router) { }

  onClose() {
    this.popupTour = false;
  }

  public startTour(): void {
    this._hopscotchService.step(0);
    console.log('abcd');
  }

  ngOnInit() {
    // timer(0, 1000).subscribe(() => {
    //   this.dateTime = new Date();
    // })
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    )

    this._hopscotchService.configure([
      {
        stepIndex: 0,
        stepDef: {
          target: 'refresh-img',
          placement: 'left',
          content: "This is a refresh button which loads a new random image",
          title: "Here you can refresh the background-image!",
          width: 300,
          // multipage: true
          nextOnTargetClick:true
        }
      },
      {
        stepIndex: 1,
        stepDef: {
          target: 'bookmarks',
          placement: 'left',
          content: "select the tab to show all the bookmarks in your app",
          title: "Bookmarks tab!",
          onNext: () => {
            this.router.navigate(['bookmarks'])
          },
          // multipage: true,
          // xOffset: 80
          nextOnTargetClick:true
        }
      },
      // {
      //   stepIndex: 2,
      //   stepDef: {
      //     target: 'manage-bookmarks',
      //     placement: 'bottom',
      //     title: "Manage Bookmarks",
      //     content: "Here you can create, edit, delete your bookmarks",
      //     nextOnTargetClick:true,
      //     onError:()=>{
      //       console.log('er')
      //     }
      //   }
      // },
      {
        stepIndex: 2,
        stepDef: {
          target: 'todos',
          placement: 'top',
          content: "select the tab to show all the Todos in your app",
          title: "Todos tab!",
          // xOffset: 80
          nextOnTargetClick:true
        }
      },
      {
        stepIndex: 3,
        stepDef: {
          target: 'notes',
          placement: 'right',
          content: "select the tab to show all the notes in your app",
          title: "Notes tab!",
          // xOffset: 80
          nextOnTargetClick:true
        }
      },
    ])
  }

  // public ngAfterViewInit(): void {
  //   this._hopscotchService.init();
  // }

  prepareRoutes(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tabNumber']
      if (!tab) return 'secondary';
      return tab;
    }
  }

  async changeBgImage(): Promise<void> {
    this.isImgloading = true;
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })
    // if (result.url === this.bgImg) return this.changeBgImage();
    const alreadyGot = this.bgImgs.includes(result.url);
    if (alreadyGot) {
      return this.changeBgImage();
    }
    // this.bgImg = result.url;
    this.bgImgs.push(result.url);
  }

  onBgImgLoad(imgEvent: Event) {
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src;
    this.bgImgs = this.bgImgs.filter(b => b === src);
    this.isImgloading = false;
  }
}
