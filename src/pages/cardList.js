import {Card} from './Card.js';
export class CardList {
    constructor(conteiner){
        this.conteiner = conteiner;
    }
    
    appendCard = (card) => {
        this.conteiner.appendChild(card);
    }
    renderCards = (data) =>{
        const cards = [];
        data.forEach((cardInfo)=>{
            const card = new Card(cardInfo);
            cards.push(card);
            card.likess();
        })

        cards.forEach((card)=>{
            this.appendCard(card.createCard());
        })  
    }
}