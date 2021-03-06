import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TurdApInterceptor } from './services/turds-api.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CardsComponent } from './views/cards/cards.component';

import { TurdApiService } from './services/turds-api.service';
import { InfoModalComponent } from './views/cards/info-modal/info-modal.component';
import { OptionsBarComponent } from './views/cards/options-bar/options-bar.component';
import { ConfirmationComponent } from './views/cards/info-modal/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CardsComponent,
    InfoModalComponent,
    OptionsBarComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    TurdApiService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TurdApInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent],
  entryComponents: [InfoModalComponent, ConfirmationComponent]
})
export class AppModule { }
