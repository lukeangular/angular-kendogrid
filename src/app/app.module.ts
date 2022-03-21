import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BarcodesModule } from '@progress/kendo-angular-barcodes';
import { QRCodeModule } from '@progress/kendo-angular-barcodes';
import { EditorModule } from "@progress/kendo-angular-editor";

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
import { BarcodeComponent } from './components/barcode/barcode.component';
import { EditorComponent } from './components/editor/editor.component';


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GridComponent,
    GridApiComponent,
    BarcodeComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PDFModule, ExcelModule,
    BarcodesModule,
    QRCodeModule,
    EditorModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
