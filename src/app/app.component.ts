import { Component } from '@angular/core';
import * as jszip from 'jszip';
import * as yaml from 'js-yaml';

@Component({
  selector: 'app-root',
  templateUrl: "./templates/home.html",
  styles: []
})
export class AppComponent {
  fileToUpload: File = null;
  cards = []
  templates = {}
  card = ""

  async handleFileInput(files: FileList){
    this.fileToUpload = files.item(0)
    console.log(this.fileToUpload.name);
    let deck = await jszip.loadAsync(this.fileToUpload);
    console.log(deck.files);
    let deckinfo = yaml.safeLoad(await deck.file('deck.yaml').async('string'))
    console.log("Deck Info: ", deckinfo);
    //for card in deck, load cards
    for(let i=0; i< deckinfo['deck'].length; i++){
      //console.log(deckinfo['deck'][i]);
      let new_card = yaml.safeLoad(await deck.file(`cards/${deckinfo['deck'][i].split('.')[0]}.yaml`).async('string'))
      this.cards.push(new_card);
    }
    //console.log("Cards: ", this.cards);
    
    for(let n=0; n<deckinfo['templates'].length; n++){
      let new_template = await deck.file(`templates/${deckinfo['templates'][n]}.html`).async('string')
      this.templates[deckinfo['templates'][n]] = (new_template);
    }
    //console.log("Templates: ", this.templates);
    this.card = this.getCard(this.cards[0], this.templates[this.cards[0]['template']])
  }

  getCard(card:object, template:string){
    console.log("Card: ", card);
    console.log("Template: ", template);
    let new_template = template;
    Object.keys(card['data']).forEach(el => {
      new_template = new_template.replace(`%%data.${el}%%`,card['data'][el])
    })

    return new_template
  }
}
