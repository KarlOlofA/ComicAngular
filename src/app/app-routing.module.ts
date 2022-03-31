import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComicsComponent} from "./components/comics/comics.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";

const routes: Routes = [
  {path: "comics-component", component: ComicsComponent},
  {path: "toolbar-component", component: ToolbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
