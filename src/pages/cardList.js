import {Card} from './pages/card.js';
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
            const card = new Card(cardInfo,popupImadgeCard);
            cards.push(card);
        })

        cards.forEach((card)=>{
            this.appendCard(card.createCard())
        })  
    }
}