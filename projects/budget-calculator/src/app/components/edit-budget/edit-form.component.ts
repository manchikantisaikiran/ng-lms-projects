import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { BudgetService } from '../../budget.service';
import { Spends } from '../../spends'
import { FormControl } from '@angular/forms'
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  field: Spends | undefined;
  amount = new FormControl('')
  desc = new FormControl('')
  constructor(private router: Router, private budgetService: BudgetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.field = this.budgetService.SpendsArray.find(obj => obj.id == this.route.snapshot.params.id)
    this.amount.setValue(this.field?.amount)
    this.desc.setValue(this.field?.description)
    // console.log(this.field?.description)
    // console.log(this.budgetService.SpendsArray.find(obj => obj.id == this.route.snapshot.params.id))
    // console.log(this.route.snapshot.params.id)
  }

  blur() {
    console.log('a');
    this.router.navigate(['/'])
  }

  onSave() {
    if (this.field?.id) {
      this.budgetService.updateSpends({
        id: this.field.id,
        amount: this.amount.value,
        description: this.desc.value
      })
    }
    // console.log('a')
    this.blur()
  }
}
