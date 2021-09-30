import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    ToastrModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    SimpleModalModule.forRoot(
      { container: document.body },
      {
        ...defaultSimpleModalOptions,
        closeOnEscape: true,
        closeOnClickOutside: true,
      }
    ),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
