import {Card} from './card'

export class Deck{ 
  all_cards: Card[]
  current_cards: Card[]
  inplay_cards: Pile
  discard: Pile
  isInfinte: boolean
  info: Meta
  cardback: string

  constructor (backhtml:string, meta: Meta, cards: Card[], isInf:boolean){
    //console.log("Making new deck...");
    this.cardback = backhtml
    this.all_cards = cards;
    this.current_cards = cards;
    this.isInfinte = isInf
    this.info = meta
  }

  Shuffle(){
    var currIndex = this.current_cards.length, tempValue, randomIndex;
    while(currIndex != 0){
      //Pick a remaining element
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      //And swap it with the current element
      tempValue = this.current_cards[currIndex];
      this.current_cards[currIndex] = this.current_cards[randomIndex];
      this.current_cards[randomIndex] = tempValue;
    }
  }

  ResetDeck(){
    this.current_cards = this.all_cards
    this.discard = {}
    this.inplay_cards = {}
  }

  DrawCard(){
    
  }

}

interface Pile{
  [cardname:string] : Card
}

export interface Meta{
  game: string,
  sdf_version: string,
  deck_name: string,
  templates: string[],
  deck: string[]
}