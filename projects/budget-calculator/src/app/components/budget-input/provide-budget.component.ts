import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms'
import { BudgetService } from '../../budget.service';
import { Spends } from '../../spends';

@Component({
  selector: 'app-provide-budget',
  templateUrl: './provide-budget.component.html',
  styleUrls: ['./provide-budget.component.css']
})
export class ProvideBudgetComponent {
  amount = new FormControl('')
  desc = new FormControl('')
  // spendsChanged:boolean = false;
  spendsChanged: number = 0;
  @Input() updatedSpends!: Spends[];
  @Output() budgetChanged = new EventEmitter<string>()
  constructor(private BudgetServ: BudgetService) {
  }

  budgetChangedFromDisplay() {
    this.budgetChanged.emit('')
  }

  addHandler(e: Event) {
    e.preventDefault()
    if (isNaN(this.amount.value)) return;
    console.log(this.amount.value, this.desc.value)
    this.BudgetServ.setBudget(+this.amount.value);
    this.BudgetServ.setSpends(this.amount.value, this.desc.value)
    this.budgetChanged.emit('')
    this.amount.setValue('');
    this.desc.setValue('');
    // this.getBudgetFromService()
    this.spendsChanged++
  }

  ngOnChanges() {
    console.log(this.updatedSpends)
  }

  // acknowledged(){
  //   this.spendsChanged = false;
  // }

  ngOnInit(): void {
  }

}
