import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { environment } from 'src/environments/environment';
import { AuthenticationModule } from './authentication/authentication.module';
import { httpInterceptorProviders } from './authentication/http-interceptors';
import { RecommendationSystemModule } from './recommendation-system/recommendation-system.module';
import { RecommendationSystemRoutingModule } from './recommendation-system/recommendation-system-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxJsonapiModule.forRoot({
      url: environment.BACK_END_HOST
    }),
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    RecommendationSystemModule,
    RecommendationSystemRoutingModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
