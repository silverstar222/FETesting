import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { CocktailService } from './services/cocktail/CocktailResource.service';
import { AppRoutingModule } from './app.routing.module';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { FilterListPipe } from './pipes/list/filter_list.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    FilterListPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [
    CocktailService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
