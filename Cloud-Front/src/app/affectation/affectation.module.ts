import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardsRoutes } from './affectation.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  
} from './affectation.component';


@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        FlexLayoutModule,
        NgApexchartsModule,
        RouterModule.forChild(DashboardsRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        

  ]
})
export class AffectationModule {}
