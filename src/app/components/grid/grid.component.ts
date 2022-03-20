import { Component, OnInit } from '@angular/core';
import { process, State } from "@progress/kendo-data-query";
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { product } from "./product";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  public gridData : any [] = product;

  constructor() { }

  ngOnInit(): void {

    console.log(product)
  }

  // public state: State = {
  //   skip: 0,
  //   take: 10,

  //   // Initial filter descriptor
  //   // filter: {
  //   //   logic: "and",
  //   //   filters: [{ field: "ProductName", operator: "contains", value: "Chef" }],
  //   // },
  // };

  // public gridData: GridDataResult = process(product, this.state);


  // public dataStateChange(state: DataStateChangeEvent): void {
  //   this.state = state;
  //   this.gridData = process(product, this.state);
  // }

}
