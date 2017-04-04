import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';

import { NavBarComponent } from './nav-bar/nav-bar.component'; 
import { HomepageComponent } from './homepage/homepage.component'; 

const appRoutes: Routes = [
  { path: '/', component: HomepageComponent },
  { path: '/something',      component: NavBarComponent },
  // Todo: create a pagenotfound component
  // { path: '**', component: PageNotFoundComponent } 
];


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    NavBarComponent, 
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
