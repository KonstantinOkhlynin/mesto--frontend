import {Card} from './Card.js';
export class CardList {
    constructor(conteiner){
        this.conteiner = conteiner;
    }
    
    appendCard = (card) => {
        this.conteiner.appendChild(card);
    }
    renderCards = (cards) =>{
            cards.forEach((card)=>{
            this.appendCard(card.createCard());
        })  
    }
}