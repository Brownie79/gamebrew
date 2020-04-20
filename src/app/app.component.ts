import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: "./home.html",
  styles: []
})
export class AppComponent {
  fileToUpload: File = null;
  cards = []
  templates = {}
  card = ""

  constructor(){}

}
