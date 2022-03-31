import { Component, OnInit } from '@angular/core';
import {ComicsService} from "../../services/comics.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent implements OnInit {

 /* Comic Data */
  comic = {
    alt: "",
    day: "",
    img: "",
    link: "",
    month: "",
    news: "",
    num: 0,
    safe_title: "",
    title: "",
    transcript: "",
    year: "",
  }

  /* Used for loading spinner */
  loading$ = this.loader.loading$;

  vertical_drop_icon = "more_vert"

  previous_random_icon = "arrow_back"
  random_comic_button = "widgets"
  developers_list_button = "engineering"

  developers = ["Karl Andersson", "Some other person", "Example 3"];

  // Logic for calling an HTTP service
  constructor(private comicService: ComicsService, private loader: LoadingService) {
    this.getComicData()
  }

  getComicData(){
    this.comicService.getComics().subscribe(response =>{
      this.comic.img = response.img
      this.comic.title = response.title
      this.comic.transcript = response.transcript
      this.comic.alt = response.alt
      this.comic.num = response.num
    })
  }

  /*Random Comic*/
  getNewRandomComic(){
    this.comicService.randomiseNewComic()
    this.getComicData()
  }
  getPreviousRandomComic(){
    this.comicService.getPreviousRandomComic()
    this.getComicData()
  }
  /*Comic Navigation*/
  getNextComic(){
    this.comicService.setCurrentComicID(1)
    this.getComicData()
  }
  getPreviousComic(){
    this.comicService.setCurrentComicID(-1)
    this.getComicData()
  }

  ngOnInit(): void {
  }

}
