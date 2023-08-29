import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  statusCode: number = 0;
  title = 'frontend';

  constructor(private http: HttpClient) {}
  

  ngOnInit() {
    console.log('hiiii')
    this.getData()
  }


  

  getData() {
    const url = 'http://localhost:3000/category';
    this.http.get(url, { observe: 'response' }).subscribe(
      (response: any) => {
        this.statusCode = response.status;
        console.log(this.statusCode);
        console.log(response.body);
        // You can access other properties of the response object as well, such as headers.
      },
      (error: any) => {
        this.statusCode = error.status;
        console.log(`this.statusCode`,this.statusCode);
        console.log(error.statusText);
        console.error('An error occurred:', error);
      }
    );
  }
}
