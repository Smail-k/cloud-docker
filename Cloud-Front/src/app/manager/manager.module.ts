import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './manager.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  
} from './manager.component';

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
export class ManagerModule {}
