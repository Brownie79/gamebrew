import { Component } from '@angular/core';
import * as jszip from 'jszip';
import * as yaml from 'js-yaml';
import * as JSZip from 'jszip';

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
    console.log("Cards: ", this.cards);
    
    for(let n=0; n<deckinfo['templates'].length; n++){
      let new_template = await deck.file(`templates/${deckinfo['templates'][n]}.js`).async('string')
      this.templates[deckinfo['templates'][n]] = (new_template);
    }
    console.log("Templates: ", this.templates);
    
    const makeTemplate = this.templater`${this.templates['legends_default']}`
    console.log(makeTemplate(this.cards[0]))
  }

  templater(strings, ...keys) {
    return function(data) {
        let temp = strings.slice();
        keys.forEach((key, i) => {
            temp[i] = temp[i] + data[key];
        });
        return temp.join('');
    }
};
}
