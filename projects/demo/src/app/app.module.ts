import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PENDING_CHANGES_DEFAULT_MESSAGE } from 'ngx-pending-changes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: PENDING_CHANGES_DEFAULT_MESSAGE,
      useValue: `Pending changes! Navigate away? This message is configured in the AppModule and will appear if the component does not provide its own message.`
    }
  ]
})
export class AppModule { }
