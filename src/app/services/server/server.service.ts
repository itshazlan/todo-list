import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getData(url: string) {
    return this.httpClient.get(url);
  }
}
