class CardList {
    constructor(cards, targetElement){
        this.cards = cards;
        this.targetElement = targetElement;
    }
    addCard = (card) =>{
        this.cards = [...this.cards, card]
        this.appendCard(card.createMarkup());
    }
    appendCard = (card) => {
        this.targetElement.appendChild(card);
    }
    render = () =>{
        this.cards.forEach((card)=>{
            this.appendCard(card.createMarkup())
        })
    }
}