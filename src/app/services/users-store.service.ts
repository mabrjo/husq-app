import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { BinaryOperatorExpr } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EnvironmentService } from './environment.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class UsersStoreService {


  // BEHAVIORSUBJECTS AND OBSERVABLES
  private readonly userSubject = new BehaviorSubject<User[]>([]);
  readonly user$ = this.userSubject.asObservable();

  private readonly activeUserSubject = new BehaviorSubject<User>(null);
  readonly activeUser$ = this.activeUserSubject.asObservable();

  // CONSTRUCTOR
  constructor(private http: HttpClient, 
    private router: Router, 
    private environment: EnvironmentService) {
   this.refreshUsers();
  }

  private baseUrl: string = this.environment.getValue('apiUrl');
  private url: string = this.baseUrl +"/users"

  // private url: string = 'http://localhost:8080/api/users';

  // REFRESH FUNCTION
  refreshUsers(){
    this.http.get(this.url, httpOptions).subscribe(s => {
      this.userSubject.next(s as User[]);
    });
  }

  // refreshUsers(){
  //   this.http.get(this.url, httpOptions).subscribe(this.userSubject);
  // }

  // GET FUNCTIONS 

  get users(): User[] {
    return this.userSubject.getValue();
  }

  set users(users: User[]) {
    this.userSubject.next(users);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(this.url, httpOptions).pipe(map(response => {
      return response as User[];
    }))
  }

  getByID(userId: number): User {
    return this.users.find(user => user.id === userId);
  }

  getUserByName(username: string): User {
    let user;
    this.http.get(`${this.url}/${username}`, httpOptions).pipe(map(response => user = response))
    return user;
  }

  getUserByPassword(password: string): User {
    let user;
    this.http.get(`${this.url}/${password}`, httpOptions).pipe(map(response => user = response))
    return user;
  }


  // ADD, UPDATE, DELETE FUNCTIONS BELOW
  addUser(user: User): void{
    let newUser;
    this.http.post(`${this.url}`, user, httpOptions).subscribe((response: User) => {
      this.users = [
        ...this.users,response
      ]
      this.activeUserSubject.next(response);
      this.router.navigate(["/timeline"]);
    });
  }

  updateUser(user: User): void {
    this.http.post(`${this.url}`, user, httpOptions).subscribe((response) => {
      this.refreshUsers();
    });
  }

  deleteUser(id: number): User {
    let user;
    this.http.post(`${this.url}`, user, httpOptions).subscribe(response => user = response);
    return user;
  }

  // LOGIN AND LOGOUT FUNCTIONS

  loginUser(username: string, password: string) {
    const user = this.users.find(user => user.password === password && user.name === username)
    if (user) {
      this.activeUserSubject.next(user)
    } else alert('failed attempt')

  }

  logout() {
      this.activeUserSubject.next(null)
      console.log(this.activeUserSubject.getValue());
  }

  isGuest(){
    if(!this.activeUserSubject.getValue()){
      return true;
    }
  }

  // FOLLOWERS LISTS

  isFollowing(activeUserId: number, followedUserId: number){
    return this.userSubject.value.find((u) => u.id === activeUserId).following.includes(followedUserId);
  }

  followUser(activeUserId: number, followedUserId: number){
    let updatedFollowing: User;
    updatedFollowing = this.getByID(activeUserId);
    updatedFollowing.following.push(followedUserId);
    return this.updateUser(updatedFollowing);
  }

  unFollowUser(activeUserId: number, followedUserId: number): void {
    const user = this.users.find(f => f.id === activeUserId);
    console.log(user);
    if (user && user.following.includes(followedUserId)) {
      user.following = user.following.filter(f => f !== followedUserId);
      this.updateUser(user);
      this.refreshUsers;
    }
  }

}
