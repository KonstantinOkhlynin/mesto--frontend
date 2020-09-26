class Card {
    constructor(cardInfo,popup) {
        this.name = cardInfo.name;
        this.link = cardInfo.link;
        this.isLike = false;
        this.popup = popup;
        this.markup = null;
    }

    like = () =>{
        this.like = !this.like;
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    removeEventListeners = (target) =>{ 
        target.querySelector('.place-card__like-icon').removeEventListener('click',this.like);
        target.querySelector('.place-card__delete-icon').removeEventListener('click',this.delete);

    }
    delete = () => {
        if (event.target.matches('.place-card__delete-icon')) {
            const placeCard = (event.target).closest('.place-card');
            this.removeEventListeners(placeCard);
            placeCard.remove(placeCard);
        }
    }
    createMarkup = () => {
        /* Можно лучше: 

        Создавать карточку не вручную через createElement, а использовать
        для этого разметку в виде шаблонной строки.

        Стоит обратить внимание, что вставка данных с помощью интерполяции шаблонной строки и insertAdjacentHTML
        может привести к уязвимости XSS, т.к. данные вставляются на страницу как обычный html, а если они придут
        с сервера в данных может быть код злоумышленника и он будет вставлен на страницу как html и исполнится.
        Поэтому необходимо фильтровать html теги во вставляемых данных (такая процедура называется HTML sanitization
          пример как это сделать есть здесь 
          https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/ )

        или вставлять данные с помощью textContent и style.backgroundImage уже после создания разметки
        элемента как показано на примере ниже:

        const template = document.createElement("div");
        template.insertAdjacentHTML('beforeend', `
          <div class="place-card">
          <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
          </div>
          <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
          </div>
          </div>`);
        const placeCard = template.firstElementChild;
        placeCard.querySelector(".place-card__name").textContent = name;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
          
          
        Так же для создания разметки можно использовать тег tempate
        https://learn.javascript.ru/template-tag
        https://frontender.info/template/
        */
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeIcon = document.createElement('button');
      
      
        placeCard.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        /*
        Отлично, что используется интерполяция строк из ES6!
        */
        placeCardImage.setAttribute('style', `background-image: url(${this.link})`);
        placeCardImage.setAttribute('data-link',
        `${this.link}`);
        placeCardImage.addEventListener('click', this.popup.open)
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = this.name;
        placeCardLikeIcon.classList.add('place-card__like-icon');
      
        placeCardLikeIcon.addEventListener('click',this.like)
        placeCardDeleteIcon.addEventListener('click', this.delete)

        placeCard.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteIcon);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeIcon);
        this.markup = placeCard;
        return placeCard;
    }
}