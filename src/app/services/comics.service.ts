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

  data: any;
  current_comic_id = 1;
  url: string = "http://localhost:4200/" + this.current_comic_id + "/info.0.json";

  comic_history: number[] = [1]

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    })
  }

  constructor(private http: HttpClient, private loader: LoadingService) {
  }

  getRandomInt(max: number){
    return Math.floor(Math.random()*max);
  }

  randomiseNewComic(){
    this.current_comic_id = this.getRandomInt(614)
    this.rebuildURL();
    this.comic_history.push(this.current_comic_id);
  }

  getPreviousRandomComic(){
    this.current_comic_id = this.comic_history[this.comic_history.length-1]
    this.comic_history.pop()
    this.rebuildURL();
  }

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

  getComics(): Observable<Comic>{
    return this.http.get<Comic>(this.url, this.httpOptions)
  }

  rebuildURL(){
    this.url = "http://localhost:4200/" + this.current_comic_id + "/info.0.json";
  }
}
