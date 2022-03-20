import { Component,OnInit } from '@angular/core';
import {
  SortDescriptor,
} from "@progress/kendo-data-query";

import {
  GridDataResult,
  PageChangeEvent,
} from "@progress/kendo-angular-grid";
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-grid-api',
  templateUrl: './grid-api.component.html',
  styleUrls: ['./grid-api.component.css']
})

export class GridApiComponent implements OnInit{

  isLoading = false;
  orderByKey = "";
  dirKey = "asc";
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public pagelimtit = 10

    //sorting kendo data
    public allowUnsort = true;
    public sort: SortDescriptor[] = [
      {
        field: "",
        dir: "asc",
      },
    ];


  constructor(private _appService : AppServiceService) { 
    this.loadItems();
  }

  ngOnInit(): void {
  }

  loadItems(): void {
    let getbody = {
      page: this.currentPage,
      limit: this.pagelimtit,
      sort: "DESC",
      sort_field: "business_date_time",
      fields: [
        {
          field: "string",
          operator: "contains or matches",
          value: "string"
        }
      ]
    }

    

    this.isLoading = true;
    this._appService.fetchDataObservable(getbody).subscribe((res) =>{
      console.warn(res.data)

      this.gridView = {
        data : res.data,
        total : res.count,
      };

      this.isLoading = false;
    })
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.orderByKey = "";
    this.dirKey = "";
    this.sort = sort;
    this.dirKey = this.sort[0].dir;
    this.orderByKey = this.sort[0].field;
    this.loadItems();
}

  public pageChange(event: PageChangeEvent): void {

    console.log(event)
    this.skip = event.skip;

    if(event.skip == 0){
      this.skip= event.skip;
      this.currentPage = 1;
    } else {
      this.skip = event.skip;
      const PageNo = event.skip/event.take + 1;
      this.currentPage = PageNo;

      console.warn(PageNo)
    }
    this.loadItems();
  }

}
