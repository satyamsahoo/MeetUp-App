import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharComponent } from './first-char/first-char.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [FirstCharComponent, MyNavComponent],
  exports :[
    MyNavComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
