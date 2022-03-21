import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GridComponent } from './components/grid/grid.component';
import { GridApiComponent } from './components/grid-api/grid-api.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'grid', component:GridComponent},
  {path:'grid-api', component:GridApiComponent},
  {path:'bar-code', component:BarcodeComponent},
  {path:'editor', component:EditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
