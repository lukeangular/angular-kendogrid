import { Injectable } from '@angular/core';
import {config} from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import {DataTablesResponse, RootMarketList} from 'src/app/app-models/app-models.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AppServiceService {



  constructor(private http:HttpClient) { }

  fetchDataObservable(getbody) : Observable<RootMarketList>{
    return this.http.post<RootMarketList>(config.market_list, getbody)
  }
}
