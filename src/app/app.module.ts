import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule  } from './app-routing.module';
import { enableProdMode } from "@angular/core";
import { AppComponent } from './app.component';
import { GridModule,PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './components/grid/grid.component';
import { GridApiComponent } from './components/grid-api/grid-api.component';
import { HttpClientModule } from '@angular/common/http';


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GridComponent,
    GridApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PDFModule, ExcelModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
