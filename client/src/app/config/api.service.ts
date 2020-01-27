import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUser: string = 'http://localhost:4001/api/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUser}`);
  }

  getUser(user): Observable<any> {
    return this.http.post<any>(`${this.apiUser}/getUser`, user);
  }

  addUser(user): Observable<any> {
    return this.http.post<any>(`${this.apiUser}/add`, user)
  }

  updateUser(user): Observable<any> {
    return this.http.put<any>(`${this.apiUser}/modify`, user)
  }

  deleteUser(id: string): Observable<any> {
    // const httpParams = new HttpParams().set('id', id)
    // const option = { params: httpParams}
    // return this.http.delete(`${this.apiUser}/delete`, option)
    return this.http.delete<any>(`${this.apiUser}/delete/${id}`)
  }
}
