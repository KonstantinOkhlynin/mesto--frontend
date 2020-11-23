import {classApi} from '../index.js';
export class Card {
    constructor(cardInfo,popup) {
        this.name = cardInfo.name;
        this.link = cardInfo.link;
        this.likes = cardInfo.likes;
        this.cardId = cardInfo._id;
        this.ownerId = cardInfo.owner._id;
        this.isLike = false;
        this.popup = popup;
        this.markup = null;
        this.Api = classApi;
    }
    likess = () => {
        const placeCardLikeIcon = document.querySelector('.place-card__like-icon')
    this.likes.forEach(item => {
        if (item._id === this.ownerId) {
          placeCardLikeIcon.add('place-card__like-icon_liked');
        }
      });
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


        placeCard.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteIcon);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placecardLikes);
        placecardLikes.appendChild(placeCardLikeIcon);
        placecardLikes.appendChild(placeCardLikeCount);
        this.markup = placeCard;
        return placeCard;
    }


  like = (event) =>{
    if (!event.target.matches('.place-card__like-icon_liked')) {
        this.Api.likeCard(this.cardId)
            //   likeCount.textContent = result.likes.length;
              event.target.classList.add('place-card__like-icon_liked');
        
      } else {
        this.Api.disLikeCard(this.cardId)
            //   likeCount.textContent = result.likes.length;
              event.target.classList.remove('place-card__like-icon_liked');
        
      }
  }

  removeEventListeners = (target) =>{ 
      target.querySelector('.place-card__like-icon').removeEventListener('click',this.like);
      target.querySelector('.place-card__delete-icon').removeEventListener('click',this.delete);

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