
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://s3.amazonaws.com/api-fun/books.json';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

