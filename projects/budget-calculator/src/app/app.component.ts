import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from './budget.service';
import { Spends } from './spends'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'budget-calculator';
  // currentRoute;
  updatedSpends: Spends[] = []
  constructor(private budgetService: BudgetService) {
    // this.currentRoute = this.router.url
    // console.log(this.currentRoute)
  }

  updatedSpendsFunc() {
    return this.updatedSpends = this.budgetService.SpendsArray
  }

  getCurrentRoute() {
    console.log(this.budgetService.getCurrentRoute());
    return this.budgetService.getCurrentRoute() !== '/'
  }

}
