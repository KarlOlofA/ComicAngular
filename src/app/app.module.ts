import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* My Additions */
import { ComicsComponent } from './components/comics/comics.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
/* Main import for Angular Materials */
import {MaterialModule} from "./material/material.module";
import {ComicsService} from "./services/comics.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NetworkInterceptor} from "./interceptor/network.interceptor";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ComicsComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  providers: [
    ComicsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
