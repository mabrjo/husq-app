import { Injectable } from '@angular/core';
import { Husq } from 'src/app/types/husq';
import { BehaviorSubject, Observable } from 'rxjs';
import { formatDate } from 'src/helpers/date';
import { UsersStoreService } from './users-store.service';
import { User } from 'src/app/types/user';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TimelineStoreService {

  private readonly husqsSubject = new BehaviorSubject<Husq[]>([]);
  readonly husq$ = this.husqsSubject.asObservable();

// CONSTRUCTOR
  constructor(private userStoreService: UsersStoreService, 
    private http: HttpClient,
    private environment: EnvironmentService) { 
    this.refreshHusq();
    // this.http.get(`${this.url}`).subscribe(s => {
    //   this.husqsSubject.next(s as Husq[]);
    // });
  }

  private baseUrl: string = this.environment.getValue('apiUrl');
  private url: string = this.baseUrl +"/husqs"
  // private url: string = 'http://localhost:8080/api/husqs';


  // REFRESH FUNCTION, WHICH ALSO IS CALLED ONBUILD
  refreshHusq(): void {
    this.http.get(`${this.url}`).subscribe(s => {
      this.husqsSubject.next(s as Husq[]);
    });
  }

  // GET FUNCTIONS BELOW

  getAllHusqs(): Observable<Husq[]> {
    return this.http.get(this.url, httpOptions).pipe(map(response => {
      return response as Husq[];
    }))
  }

  getReplies(parentId: number): (User & Husq)[] {
    return this.husqs.filter(husq => husq.parentId === parentId).reduce((acc, item) => {
      const user = this.userStoreService.getByID(item.userId)
      acc.push({
        ...user,
        ...item
      })
      return acc
    }, [])
  }

  get husqs(): Husq[] {
    return this.husqsSubject.getValue();
  }

  set husqs(husqs: Husq[]) {
    this.husqsSubject.next(husqs);
  }

  get husqUser(): Observable<(User & Husq)[]> {
    return this.husq$.pipe(
      map(husqs => {
        return husqs.map(husq => {
          const user = this.userStoreService.getByID(husq.userId)
          return {
            ...user,
            ...husq
          }
        })
      })
    )
  }

  // ADD UPDATE DELETE FUNCTIONS BELOW 

  addHusq(husq: Husq): void {
    console.log(husq);
    this.http.post(`${this.url}`, husq, httpOptions).subscribe((response: Husq) => {
      this.husqs = [
        ...this.husqs,
        response
      ]
    });
  }

  editHusq(husq: Husq): void {
    this.http.put(`${this.url}`, husq, httpOptions).subscribe((response) => {
      this.refreshHusq();
    });
  }

  removeHusq(husq: Husq): void {
    this.http.put(`${this.url}`, husq, httpOptions).subscribe((response) => {
      this.refreshHusq();
    });
  }


  // create boolean in husq table for remove, if husq has been deleted then show the delete message, don't actually delete husq


  // OLD REMOVE FUNCTION THAT DELETED HUSQS
  // removeHusq(id: number): void {
  //   this.http.delete(`${this.url}/${id}`, httpOptions).subscribe(respone => {
  //     this.husqsSubject.next(this.husqs.filter(husq => husq.id !== id));
  //   });
  // }

  
}