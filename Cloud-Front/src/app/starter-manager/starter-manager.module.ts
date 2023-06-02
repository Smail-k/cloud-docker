import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterRoutes } from './starter-manager.routing';
import { StarterManagerComponent } from './starter-manager.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [StarterManagerComponent]
})
export class StarterManagerModule {}
