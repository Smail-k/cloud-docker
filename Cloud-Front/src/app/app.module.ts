
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { ProjetDialogContentComponent } from './projet/projet.component'; 
import { ManagerDialogContentComponent } from './manager/manager.component'; 
import { TacheAffecterDialogContentComponent, TacheCheckDialogContentComponent } from './affectation/affectation.component';
import { CollaborateurDialogContentComponent } from './collaborateur/collaborateur.component'; 
import { TacheDialogContentComponent } from './tache/tache.component';
import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { LoginComponent } from './login/login.component';  
import { AuthGuard } from './auth.guard';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProjetComponent } from './projet/projet.component';
import { TacheComponent } from './tache/tache.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ManagerComponent } from './manager/manager.component';
import { AffectationComponent } from './affectation/affectation.component';
import { MyserviceService } from './myservice.service';
import { StarterManagerComponent } from './starter-manager/starter-manager.component';
import { StarterCollaborateurComponent } from './starter-collaborateur/starter-collaborateur.component';
import { environment } from 'src/environments/environment';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    VerticalAppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    VerticalAppSidebarComponent,
    AppBreadcrumbComponent,
    HorizontalAppHeaderComponent,
    ProjetDialogContentComponent,
    ManagerDialogContentComponent,
    TacheCheckDialogContentComponent,
    TacheDialogContentComponent,
    TacheAffecterDialogContentComponent,
    CollaborateurDialogContentComponent,
    HorizontalAppSidebarComponent,
    LoginComponent,
    ProjetComponent,
    TacheComponent,
    CollaborateurComponent,
    ManagerComponent,
    AffectationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
   MyserviceService,
   AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
