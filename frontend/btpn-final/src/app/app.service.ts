import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService{
private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http:Http){

    }
    getAll(){
        return this.http.get('http://localhost:8080/employee/getAll')
        .map(response => {
            return response.json();
        });
    }
    searchName(name){
        let searchParams = new URLSearchParams();
        searchParams.append("name",name);
        return this.http.get('http://localhost:8080/employee/findByName', {search:searchParams})
      .map(response => {
        return response.json();
      });
    }

    getContactById(id){
        return this.http.get('http://localhost:8080/employee/getById/'+id)
      .map(response => {
        return response.json();
      });
    }

    onDelete(id){
        return this.http.delete('http://localhost:8080/employee/delete/' + id)
      .map(response => {
        return response.json();
      });     
    }
    post(id){
    console.log(id);
    return this.http.post('http://localhost:8080/employee/add', JSON.stringify(id), {headers: this.headers}).subscribe();  
  }
  getLocations(){
      return this.http.get('http://localhost:8080/locations/all').
      map(response => {
        return response.json();
      });
    }
 sorting(sort){
   return this.http.get('http://localhost:8080/employee/sortBy/'+ sort).
   map(response => {
     console.log(response.json());
     return response.json();
   });
 }
}