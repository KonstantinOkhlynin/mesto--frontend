export class Card {
    constructor(cardInfo, api, popup) {
        this.name = cardInfo.name;
        this.link = cardInfo.link;
        this.likes = cardInfo.likes;
        this.cardId = cardInfo._id;
        this.ownerId = cardInfo.owner._id;
        this.owner = cardInfo.owner;
        this.isLike = false;
        this.Api = api;
        this.popup = popup;
    }
    
    createCard = () => {
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placecardLikes = document.createElement('div');
        const placeCardLikeIcon = document.createElement('button');
        const placeCardLikeCount = document.createElement('p');
      
      
        placeCard.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        placeCardImage.setAttribute('style', `background-image: url(${this.link})`);
        placeCardImage.setAttribute('data-link',
        `${this.link}`);
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDeleteIcon.setAttribute('data-id', this.cardId);
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = this.name;
        placeCardLikeIcon.classList.add('place-card__like-icon');
        placeCardLikeCount.classList.add('place-card__like-count');
        placeCardLikeCount.textContent = this.likes.length;
        placecardLikes.classList.add('place-card__likes');
      
        placeCardLikeIcon.addEventListener('click', this.like);
        placeCardDeleteIcon.addEventListener('click', this.removeCard);
        placeCardImage.addEventListener('click', this.popup.open)
        
        // отрисовка активной кнопки удаления если карточка может быть удалена
        // console.log(this._data);
        if (this.owner && this.ownerId === "b16cda09e23c061669f7026b") {
          placeCardDeleteIcon.setAttribute('style', 'display: block');
      }
      // отрисовка активных лайков на лайкнутые карточки
      if (this.likes.find(item => item._id === "b16cda09e23c061669f7026b")) {
        placeCardLikeIcon.classList.add('place-card__like-icon_liked');
      }

     this.count = placeCardLikeCount;

        placeCard.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteIcon);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placecardLikes);
        placecardLikes.appendChild(placeCardLikeIcon);
        placecardLikes.appendChild(placeCardLikeCount);
        return placeCard;
        
    }


  like = (event) =>{
    const likeCount = event.target.closest('.place-card__likes').querySelector('.place-card__like-count');
    if (!event.target.matches('.place-card__like-icon_liked')) {
        this.Api.likeCard(this.cardId)
        .then(result => {
          likeCount.textContent = result.likes.length;
          event.target.classList.add('place-card__like-icon_liked');
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        this.Api.disLikeCard(this.cardId)
        .then(result => {
          likeCount.textContent = result.likes.length;
          event.target.classList.remove('place-card__like-icon_liked');
        })
        .catch((err) => {
          console.log(err);
        });
        
      }
  }

  openImg(event) {
    const popupImadgeCard = document.querySelector('.popupImadgeCard')
    if (!event.target.matches('.place-card__image')){
        super.open();
        const popupImg = popupImadgeCard.querySelector('.popup__image') 
        popupImg.src = event.target.dataset.link;
    }
}

  
  removeCard = (event) => {
      console.log(this.cardId);
      if (confirm('Вы действительно хотите удалить эту карточку?')) {
      if (event.target.matches('.place-card__delete-icon')) {
         this.Api.deleteCard(this.cardId);
          const placeCard = (event.target).closest('.place-card');
          this.removeEventListeners(placeCard);
          placeCard.remove(placeCard);
      }
    }
  }
}