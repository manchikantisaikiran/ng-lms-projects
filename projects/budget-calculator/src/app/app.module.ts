import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BudgetComponent } from './components/total-budget/budget.component';
import { ProvideBudgetComponent } from './components/budget-input/provide-budget.component';
import { DisplayBudgetComponent } from './components/budget-list/display-budget.component';
import { EditFormComponent } from './components/edit-budget/edit-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BudgetComponent,
    ProvideBudgetComponent,
    DisplayBudgetComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
