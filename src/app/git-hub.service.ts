import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Followers } from './followers';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GitHubService {

  urlUser: string = "https://api.github.com/users/octocat";
  urlFollowers: string = "https://api.github.com/users/octocat/followers";
  constructor(private http: Http) { }

  getUser(): Observable<User> {
    return this.http.get(this.urlUser).map(res=>res.json());
  }
  getFollowers(): Observable<Followers[]> {
    return this.http.get(this.urlFollowers).map(res=>res.json());
  }
}
