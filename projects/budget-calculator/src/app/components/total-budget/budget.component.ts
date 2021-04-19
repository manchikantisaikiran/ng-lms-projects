import { Component, Input, OnInit } from '@angular/core';
import { BudgetService } from '../../budget.service';
import { Spends } from '../../spends';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budget:number;
  @Input() spend!:Spends[];

  constructor(private budgetService:BudgetService) {
      // this.budget = this.budgetService.budgetObservable
      this.budget = 0;
  }

  budgetChanged(e?:string){
    this.budget = this.budgetService.getBudget()
   console.log(this.budget);  
  }
  // budgetChanged(e:Event){
  //   console.log(e)
  //   console.log('abcd')
  // }

  ngOnChanges(){
    console.log('abcdefgj');
    
    this.budgetChanged()
  }

  ngOnInit(): void {
  }

}
