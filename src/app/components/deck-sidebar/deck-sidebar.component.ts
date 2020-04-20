import { Component, OnInit } from '@angular/core';
import { DeckWorkerService } from 'src/app/services/deck-worker.service';

@Component({
  selector: 'app-deck-sidebar',
  templateUrl: 'deck-sidebar.html',
  styleUrls: ['./deck-sidebar.css']
})
export class DeckSidebarComponent implements OnInit {
  deckshtml:string =  "";
  constructor(private deckService: DeckWorkerService) { }

  ngOnInit(): void {
  }

  async handleFileInput(files: FileList){
    for(let i = 0; i<files.length; i++){
      this.deckService.AddDeck(files.item(i)); //no need to await this, decks will load in the background
    }
  }
}
