import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import { GitHubService } from './git-hub.service';
import { User } from './user';
import { Followers } from './followers';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  form: FormGroup;
  user: User = null;

  constructor(fb: FormBuilder, gitHubService: GitHubService) {
    //    var element = $("#search");
    //var observable = Observable.fromEvent(element, "keyup");
    this.form = fb.group({ search: [] });
    let search = this.form.get("search");
    search.valueChanges.debounceTime(400).map(str => (<string>str).replace(' ', '-')).subscribe(x => console.log(x));
    var observable = Observable.from([1, 2, 3]);
    var startDates = [];
    var startDate = new Date();
    for (var day = -2; day <= 2; day++) {
      var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + day);
      startDates.push(date);
    }
    Observable.from(startDates).map(date => {
      console.log("Getting deals for date " + date);
      return [1, 2, 3];
    }).subscribe(x => console.log(x));

    Observable.of(1).subscribe(x => console.log("OF" + x));
    Observable.of(1, 2, 3).subscribe(x => console.log("OF" + x));
    Observable.of([1, 2, 3]).subscribe(x => console.log("OF" + x));
    Observable.empty().subscribe(x => console.log("EMPTY " + x));
    Observable.range(1, 5).subscribe(x => console.log("RANGE" + x));
    Observable.from([1, 2, 3]).subscribe(x => console.log("ARRAY" + x));

    Observable.interval(5000).flatMap(x => {
      console.log("Loading news");
      return Observable.of([1, 2, 3]);
    }).subscribe(news => console.log(news));

    var userStream = Observable.of({ userId: 1, username: 'Deyvison' }).delay(2000);
    var tweetsStream = Observable.of([1, 2, 3]).delay(1500);
    Observable.forkJoin(userStream, tweetsStream).map(joined => new Object({ user: joined[0], tweets: joined[1] }))
      .subscribe(result => console.log(result));
    var observable2 = Observable.throw(new Error("ERRROOOOOR"));
    observable2.subscribe(x => console.log(x), error => console.error(error));
    var count = -3;
    var ajaxCall = Observable.of('url').flatMap(() => {
      if (++count < 2)
        return Observable.throw(new Error("Request Failed"));
      return Observable.of([5, 6, 7]);
    });

    ajaxCall.retry(3).subscribe(x => { console.log(x); console.log(count); }, erro => console.error(erro));

    Observable.throw(new Error("FALHOUUU")).catch(err => {
      console.log(err);
      var localDataStream = Observable.of([9, 10, 11]);
      return localDataStream;
    }).subscribe(x => console.log(x));

    var remoteStream = Observable.of([90, 87, 7]).delay(5000);
    remoteStream.timeout(1000).subscribe(x => console.log(x), err => console.error(err));

    Observable.from([56, 22, 60]).subscribe(x => console.log(x), error => console.error(error),
      () => console.log("completado"));

    Observable.throw(new Error("ERO SENNIN"))
      .finally(() => console.log("finally"))
      .subscribe(x => console.log(x),
      error => console.log(error),
      () => console.log("completado 2"));

    Observable.forkJoin(gitHubService.getUser(), gitHubService.getFollowers())
      .map(result => {
        var user = new User();
        user.login = result[0].login;
        user.name = result[0].name;
        user.avatar_url = result[0].avatar_url;
        user.followers = result[1];
        return user;
      })
      .subscribe(result =>
        this.user = result
      );
  }
}
