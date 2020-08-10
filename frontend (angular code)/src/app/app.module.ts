import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importante Para Validaciones de FORMS
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotAdminComponent } from './components/chatbot-admin/chatbot-admin.component';
import { NiceSelectModule } from "ng-nice-select";

@NgModule({
  declarations: [
    AppComponent,
    ChatbotAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing,
    NiceSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
