import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterRoutes } from './starter-collaborateur.routing';
import { StarterCollaborateurComponent } from './starter-collaborateur.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [StarterCollaborateurComponent]
})
export class StarterCollaborateurModule {}
