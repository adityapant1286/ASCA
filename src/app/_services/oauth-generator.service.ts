import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import Utils from '../util/utils';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OauthGeneratorService {

  constructor(private http: HttpClient,
              private configService: ConfigService) {}

  private retrieveTokens(authParams: Array<any>): Observable<any> {
    const observables = [];
    for (const cfg of authParams) {
      observables.push(this.http.post<any>(Utils.OAUTH_API.ENDPOINT, cfg));
    }
    return forkJoin(observables);
  }

  retrieveOAuthTokens(instanceNames: Array<any>) {

    return this.configService.findAllByNames(instanceNames, false)
                      .pipe(
                        mergeMap(foundConfigs => this.retrieveTokens(foundConfigs)),
                        catchError(this.handleError)
                      );
                      // .subscribe(tokens => {
                      //   console.log(tokens);
                      // });

  }

  private handleError(error: Response) {
    let errorMsg: string;
    switch (error.status) {
      case -1:
        errorMsg = ['(', error.status, '/', error.statusText, ')', ' Server Not Reachable.'].join('');
        break;
      default:
        errorMsg = ['(', error.status, '/', error.statusText, ')',
          ' Unknown Error while connecting with server.'].join('');
        break;
    }
    console.error(error);
    return throwError(errorMsg);
  }
}
