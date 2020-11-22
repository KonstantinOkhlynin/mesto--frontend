export class Api{
    constructor(){
        this.url = `http://nomoreparties.co/cohort12`;
    }

    getCards = ()=>{
        fetch (`${this.url}/cards`, { 
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            }
        })
        .then((card) => {
            return card.json();
        })
        .then((card) => {
            CardList.renderCards(card);
        }) 
    }

    addCard = ()=>{
        fetch (`${this.url}/cards`, { 
            method: 'POST',
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            },
            body: JSON.stringify({
                name: document.forms.card.elements.name.value,
                link: document.forms.card.elements.link.value
              })
        })
    }

    getUser = ()=>{
        fetch (`${this.url}/users/me`, { 
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            }
        })
        .then((user) => {
            return user.json();
        })
        .then((user) => {
            UserInfo.loadingUser(user.name, user.about);
        }) 
    }

    updateUser = ()=>{
        fetch (`${this.url}/users/me`, { 
            method: 'PATCH',
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            },
            body: JSON.stringify({
                name: document.forms.user.elements.name.value,
                about: document.forms.user.elements.description.value
              })
        })
    }

    getAvatar = ()=>{
        fetch (`${this.url}/users/me/avatar`, { 
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            }
        })
        .then((avatar) => {
            return avatar.json();
        })
        .then((avatar) => {
            classPopupAvatar.editAvatar(avatar);
        }) 
    }

    updateAvatar = ()=>{
        fetch (`${this.url}/users/me/avatar`, { 
            method: 'PATCH',
            headers: {
                authorization: 'a52cee62-1a4c-4ffb-bcca-6afcb9f95180'
            },
            body: JSON.stringify({
                avatar: document.forms.avatar.elements.link.value,
              })
        })
    }


}