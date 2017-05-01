import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Employee } from './employee.model';
import { Location } from 'app/location.model';

@Injectable()
export class AppService{

  private employee:Employee
  constructor(private http: Http) {  }
private headers = new Headers({'Content-Type': 'application/json'});
    
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
 filterByGender(gender) {
    let genderParams = new URLSearchParams();
    genderParams.append("gender", gender);
    return this.http.get('http://localhost:8080/employee/filterGender', { search: genderParams })
      .map(response => {
        return response.json();
      });
  }

  filterByLocation(location) {
    let locationParams = new URLSearchParams();
    locationParams.append("location", location);
    return this.http.get('http://localhost:8080/employee/filterLocation', { search: locationParams })
      .map(response => {
        return response.json();
      });
  }

  filterByLocationAndGender(location, gender) {
    let locationParams = new URLSearchParams();
    locationParams.append("location", location);
    locationParams.append("gender", gender);
    return this.http.get('http://localhost:8080/employee/filterLocationAndGender', { search: locationParams })
      .map(response => {
        return response.json();
      });
  }
  addContact(employee: Employee): Observable<Employee> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = 'http://localhost:8080/employee/add';
      return this.http.post(url, JSON.stringify(employee), { headers: headers })
        .map(response => response.json());

  }
  //  addContact(contactData){
  //   contactData.location={"id":"","city":contactData.location};
  //   return this.http.post('http://localhost:8080/employee/add',contactData).
  //   map(() => {
  //     return "";
  //   });
  // }

  updateContact(id,contactData){
    return this.http.post('http://localhost:8080/employee/update/'+id ,contactData).
    map(() => {
      return "";
    });
  }
}