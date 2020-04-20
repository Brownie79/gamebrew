import { Component, OnInit, ViewEncapsulation, Sanitizer } from '@angular/core';
import { DeckWorkerService } from 'src/app/services/deck-worker.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-deck-sidebar',
  templateUrl: 'deck-sidebar.html',
  styleUrls: ['./deck-sidebar.css']
})

export class DeckSidebarComponent implements OnInit {
  constructor(public deckService: DeckWorkerService, private sz:DomSanitizer) { }

  ngOnInit(): void {
  }

  async handleFileInput(files: FileList){
    for(let i = 0; i<files.length; i++){
      await this.deckService.AddDeck(files.item(i));
    }
  }

  getSanitized(html: string){
    return this.sz.bypassSecurityTrustHtml(html);
  }
}
