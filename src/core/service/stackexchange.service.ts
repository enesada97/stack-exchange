import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StackexchangeService {
  constructor(private httpClient: HttpClient) {}
  searchAdvanced(obj: any):Observable<any> {
    console.log(obj);

    obj["fromDate"]=obj["fromDate"]!=null?new Date(obj["fromDate"]).getTime():null;
    obj["toDate"]=obj["toDate"]!=null?new Date(obj["toDate"]).getTime():null;
    obj["min"]=obj["min"]!=null?new Date(obj["min"]).getTime():null;
    obj["max"]=obj["max"]!=null?new Date(obj["max"]).getTime():null;
    const propertyNames = Object.keys(obj);
    console.log(propertyNames);
    let urlParametersString="";
    propertyNames.forEach(item => {
      if (obj[item]!=undefined && obj[item]!=null) {
        console.log(obj[item]);
        urlParametersString = urlParametersString.concat("&"+item+"="+obj[item]);
      }
    });
    urlParametersString = urlParametersString.replace("&page", "page");
    urlParametersString = urlParametersString.concat("&site=stackoverflow");
    console.log(urlParametersString);
    console.log("questionsList calling");
    return this.httpClient.get<any>(environment.apiUrl+'2.3/search/advanced?'+urlParametersString);
  }
}
