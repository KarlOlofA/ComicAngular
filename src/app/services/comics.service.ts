import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoadingService} from "./loading.service";

export interface Comic{
  alt: string,
  day: string,
  img: string,
  link: string,
  month: string,
  news: string,
  num: number,
  safe_title: string,
  title: string
  transcript: string,
  year: string
}

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  /* Current Comic */
  current_comic_id = 1;
  /* URL of the current comic data */
  url: string = "http://localhost:4200/" + this.current_comic_id + "/info.0.json";

  /* Used to keep track of the randomly selected comics. This could be blank as well*/
  comic_history: number[] = [1]

  /* Header tags that i want to send with the http request*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    })
  }

  constructor(private http: HttpClient, private loader: LoadingService) {}

  /* Func for random number. Used to get a random comic*/
  getRandomInt(max: number){
    return Math.floor(Math.random()*max);
  }

  /* Get new random comic */
  randomiseNewComic(){
    this.current_comic_id = this.getRandomInt(614)
    this.rebuildURL();
    this.comic_history.push(this.current_comic_id);
  }

  /* get previous random comic */
  getPreviousRandomComic(){
    if(this.comic_history.length == 0)
      return;
    if (this.comic_history[this.comic_history.length-1] == this.current_comic_id){
      this.current_comic_id = this.comic_history[this.comic_history.length-2]
      this.comic_history.pop()
      this.comic_history.pop()
    }
    else{
      this.current_comic_id = this.comic_history[this.comic_history.length-1]
      this.comic_history.pop()
    }
    this.rebuildURL();
  }

  /* Used for navigating the comics */
  setCurrentComicID(value: number){
    if (value < 0){
      if (this.current_comic_id > 1)
        this.current_comic_id += value;
    }
    else if (value > 0){
      if (this.current_comic_id < 614)
        this.current_comic_id += value;
    }
    else
      console.log("Invalid Alteration")
    this.rebuildURL();
  }

  /* http request to get data from API */
  getComics(): Observable<Comic>{
    return this.http.get<Comic>(this.url, this.httpOptions)
  }

  /* Called when needing to rebuild the URL for a new comic */
  rebuildURL(){
    this.url = "http://localhost:4200/" + this.current_comic_id + "/info.0.json";
  }
}
