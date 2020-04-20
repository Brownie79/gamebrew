import { Injectable } from '@angular/core';
import { Deck, Meta } from '../models/deck';
import { Card } from '../models/card';
import * as jszip from 'jszip';
import * as yaml from 'js-yaml';

@Injectable({
  providedIn: 'root'
})
export class DeckWorkerService {
  decks: Deck[] = []
  constructor() { }

  async AddDeck(deckfile:File){
    let deckzip = await jszip.loadAsync(deckfile);
    let _meta: Meta = yaml.safeLoad(await deckzip.file('deck.yaml').async('string'))
    //load templates
    let templates = {}
    for(let t=0; t<_meta.templates.length; t++){
      let new_template  = await deckzip.file(`templates/${_meta['templates'][t]}.html`).async('string')
      templates[_meta.templates[t]] = new_template
    }
    //console.log("Templates: ", templates);

    let cards: Card[] = []
    for(let i=0;i<_meta.deck.length; i++){
      //This line will crash if card in deck.yaml isn't found in cards/
      let cardYaml = yaml.safeLoad(await deckzip.file(`cards/${_meta.deck[i]}.yaml`).async("string"));
      let _ns = cardYaml['namespace']
      let _html:string = templates[cardYaml['template']]
      Object.keys(cardYaml['data']).forEach(el =>{
        _html = _html.replace(`%%data.${el}%%`,cardYaml['data'][el])
      })

      let new_card:Card = {
        namespace: _ns,
        html: _html,
        data: cardYaml['data']
      }
      cards.push(new_card);
    }
    //console.log("Cards: ", cards);

    let isInf:boolean = false;
    let new_deck:Deck = new Deck(_meta,cards,isInf);
    this.decks.push(new_deck);
  }

  // Deck = {all cards, current cards, in play cards, discard}
  // Card = {data, location: player's hands|deck|discard}

  //1. Load decks from local storage on startup
  //1a. Load templates from local storage on startup
  //2. Add decks to decks array and local storage
  //2a. Add templates to array and local storage on startup
  //3. Shuffle decks
  //4. Draw a card from decks
  //// Returns the HTML of the card object

}

