import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Spends } from './spends'

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget: number = 0;
  id: number = 0;
  SpendsArray: Spends[] = [];
  currentRoute: string = ''
  // budgetObservable = new Observable(observer => observer.next(this.budget));
  constructor(private router: Router) { }

  getCurrentRoute() {
    this.currentRoute = this.router.url
    return this.currentRoute
  }

  setBudget(amount: number) {
    console.log(amount)
    this.budget += amount
    console.log('in budget', this.budget)
    // this.budgetObservable = this.createBudgetObservable();
  }

  setSpends(amount: number, desc: string) {
    this.SpendsArray.push({
      id: ++this.id,
      amount,
      description: desc
    })
  }

  updateSpends(field: Spends | undefined) {
    if (field !== undefined) {
      const newArray = this.SpendsArray.map(obj => {
        // console.log(field)
        if (obj.id === field.id) {
          // console.log('came')
          obj.amount = field.amount;
          obj.description = field.description
        }
        // console.log(obj)
        return obj
      })
      // console.log(newArray)
      this.SpendsArray = newArray;
      console.log(this.SpendsArray);
      
      this.budget = this.SpendsArray.reduce((total, obj) => (+obj.amount) + total, 0)
      console.log(this.budget);

      // console.log(this.SpendsArray)
    }
  }

  filterArray(id: number) {
    this.SpendsArray = this.SpendsArray.filter(obj => obj.id !== id)
  }

  getSpends() {
    return this.SpendsArray
  }

  getBudget(): number {
    return this.budget;
  }

  createBudgetObservable() {
    // return this.budgetObservable;
  }

  ngOnInit() {
    // this.budgetObservable = this.createBudgetObservable();
  }
}
