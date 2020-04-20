import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckSidebarComponent } from './components/deck-sidebar/deck-sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckSidebarComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
