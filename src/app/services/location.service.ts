import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  //region
  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}region`));
  }

  async getComuna(regionId:number){
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}comuna/` + regionId));
  }

}