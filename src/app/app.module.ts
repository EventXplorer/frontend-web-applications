import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResumeComponent } from './components/resume/resume.component';
import { PublishedEventComponent } from './components/published-event/published-event.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatIconModule} from'@angular/material/icon';
import{MatToolbarModule} from'@angular/material/toolbar';
import{MatListModule} from '@angular/material/list'
import{MatButtonModule} from'@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import{MatTabsModule} from'@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    PublishedEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
