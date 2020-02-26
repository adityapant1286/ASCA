import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Utils from '../util/utils';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  loadConfigs(configs: any) {

    return this.http.post<any>(Utils.CONFIGS_API.ENDPOINT, configs)
                    .pipe(
                      catchError(this.handleError)
                    );
  }

  findAll() {
    return this.http.get<[]>(Utils.CONFIGS_API.ENDPOINT)
                    .pipe(
                      map(configs => configs),
                      catchError(this.handleError)
                    );
  }

  findAllByNames(names: Array<any>, requiredOnly = true) {

    const qParams = new HttpParams()
                    .set('names', names.join(','))
                    .set('requiredOnly', '' + requiredOnly);

    return this.http.get<Array<any>>(Utils.CONFIGS_API.ENDPOINT, { params: qParams })
                    .pipe(
                      map(configs => configs),
                      catchError(this.handleError)
                    );
  }

  private handleError(error: Response) {
    let errorMsg: string;
    switch (error.status) {
      case -1: errorMsg = '(' + error.status + '/' + error.statusText + ')' + ' Server Not Reachable.'; break;
      default: errorMsg = '(' + error.status + '/' + error.statusText + ')' + ' Unknown Error while connecting with server.'; break;
    }
    console.error(error);
    return throwError(errorMsg);
  }

}
