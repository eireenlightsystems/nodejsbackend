import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Fixture} from '../interfaces'
import {Observable} from 'rxjs/index'

@Injectable({
  providedIn: 'root'
})
export class FixtureService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Fixture[]> {
    return this.http.get<Fixture[]>('/api/fixture', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}
