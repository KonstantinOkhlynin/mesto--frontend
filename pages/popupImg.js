

class PopupImg extends Popup{
    constructor(popup){
        super(popup)
    }
    open(event) {
      
        if (event.target.classList.contains('place-card__image')){
            super.open();
            const popupImg = this.popup.querySelector('.popup__image') 
            popupImg.src = event.target.dataset.link;
        }
    }
}