import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { BudgetService } from '../../budget.service';
import { Spends } from '../../spends'
import { Router } from '@angular/router'

@Component({
  selector: 'app-display-budget',
  templateUrl: './display-budget.component.html',
  styleUrls: ['./display-budget.component.css']
})
export class DisplayBudgetComponent implements OnInit {
  // @Input() spendsChanged!:boolean;
  // @Input() spendsUpdated!: number; 
  @Input() updatedSpends!:Spends[];
  @Input() spendsChanged!: number;
  @Output() budgetChanged = new EventEmitter()
  incomeArray: Spends[] = [];
  expenseArray: Spends[] = [];
  // @Output() acknowledge = new EventEmitter<string>()
  constructor(private budgerService: BudgetService, private router: Router) {
    console.log(this.spendsChanged)
  }

  deleteField(id: number, arrtype: string) {
    if (arrtype === 'income') {
      this.incomeArray = this.incomeArray.filter(obj => {
        if (obj.id === id) {
          this.budgerService.setBudget(obj.amount * -1)
        }
        return obj.id !== id;
      })
    } else if (arrtype === 'expense') {
      this.expenseArray = this.expenseArray.filter(obj => {
        if (obj.id === id) {
          this.budgerService.setBudget(obj.amount * -1)
        }
        return obj.id !== id;
      })
    }
    this.budgerService.filterArray(id)
    console.log(id)
    this.budgetChanged.emit('')
  }

  filterArrays() {
    this.incomeArray = this.budgerService.getSpends().filter(obj => obj.amount >= 0)
    this.expenseArray = this.budgerService.getSpends().filter(obj => obj.amount < 0)
  }

  ngOnChanges() {
    // console.log(this.spendsChanged)
    this.filterArrays()
    // this.spendsChanged = false;
    // console.log(this.spendsChanged);
  }

  // ngAfterViewChecked(){
  //   this.acknowledge.emit('')
  // } 

  editForm(id:number) {
    this.router.navigate(['editform',{id:id}])
  }

  ngOnInit(): void {
  }

}
