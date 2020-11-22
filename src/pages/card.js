export class Card {
    constructor(cardInfo,popup) {
        this.name = cardInfo.name;
        this.link = cardInfo.link;
        this.likes = cardInfo.likes;
        this.isLike = false;
        this.popup = popup;
        this.markup = null;
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
        placeCardImage.addEventListener('click', this.popup.open)
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = this.name;
        placeCardLikeIcon.classList.add('place-card__like-icon');
        placeCardLikeCount.classList.add('place-card__like-count');
        placeCardLikeCount.textContent = this.likes;
        placecardLikes.classList.add('place-card__likes');
      
        placeCardLikeIcon.addEventListener('click',this.like)
        placeCardDeleteIcon.addEventListener('click', this.delete)

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


  like = () =>{
      this.like = !this.like;
      event.target.classList.toggle('place-card__like-icon_liked');
  }

  removeEventListeners = (target) =>{ 
      target.querySelector('.place-card__like-icon').removeEventListener('click',this.like);
      target.querySelector('.place-card__delete-icon').removeEventListener('click',this.delete);

  }
  removeLike = () => {
      if (event.target.matches('.place-card__delete-icon')) {
          const placeCard = (event.target).closest('.place-card');
          this.removeEventListeners(placeCard);
          placeCard.remove(placeCard);
      }
  }
}