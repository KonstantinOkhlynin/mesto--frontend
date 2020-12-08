
import "./style.css";

import {Card} from './pages/Card.js';

import {CardList} from './pages/CardList.js';
import {UserInfo} from './pages/UserInfo.js';
import {Api} from './pages/Api.js';
import {FormValidator} from './pages/FormValidator.js';
import {Popup} from './pages/Popup.js';
import {PopupImg} from './pages/PopupImg.js';
import {PopupAvatar} from './pages/PopupAvatar.js';

const popupCard = document.querySelector('.popupCard');
const popupUser = document.querySelector('.popupUser');
const popupAvatar = document.querySelector('.popupAvatar');
const popupImadgeCard = document.querySelector('.popupImadgeCard');

const popupCardForm = popupCard.querySelector('form');
const popupUserForm = popupUser.querySelector('form');
const popupAvatarForm = popupAvatar.querySelector('form');
// const popupImadgeCardForm = popupImadgeCard.querySelector('form');

const userInfoButtonCard = document.querySelector('.user-info__button');
const userInfoButtonEdit = document.querySelector('.user-info__button-edit');
const userinfoPhoto = document.querySelector('.user-info__photo');

const userInfoName = document.querySelector('.user-info__name');
const userInfoDescription = document.querySelector('.user-info__description');
const inputNameUser = document.querySelector('#nameUser');
const inputDescriptionUser = document.querySelector('#descriptionUser');
const placesList = document.querySelector('.places-list');
// const placeCardDeleteIcon = document.querySelector('.place-card__delete-icon');

const classApi = new Api();

const classPopupCard = new Popup(popupCard);
const classPopupUser = new Popup(popupUser);
const classPopupAvatar = new PopupAvatar(popupAvatar, userinfoPhoto);
const classPopupImadgeCard = new PopupImg(popupImadgeCard);

const classUserInfo = new UserInfo(inputNameUser, inputDescriptionUser, userInfoName, userInfoDescription);
const classCardList = new CardList(placesList);


const cards = [];

classApi.getCards()
        .then((initialCards)=>{   
            initialCards.forEach((cardInfo)=>{
                const card = new  Card(cardInfo, classApi, classPopupImadgeCard);
                console.dir(card);
                cards.push(card);
            })
           return classCardList.renderCards(cards);
        })







const validatorFormCard = new FormValidator(popupCardForm);
const validatorFormUser = new FormValidator(popupUserForm);
const validatorFormAvatar = new FormValidator(popupAvatarForm);

validatorFormCard.setEventListener();
validatorFormUser.setEventListener();
validatorFormAvatar.setEventListener();

userInfoButtonCard.addEventListener('click', (event) => {
  event.preventDefault();
  classPopupCard.open();
});

userInfoButtonEdit.addEventListener('click', (event) => {
  event.preventDefault();
  classPopupUser.open();
});

userinfoPhoto.addEventListener('click', (event) => {
  event.preventDefault();
  classPopupAvatar.open();
});



popupCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  classApi.addCard();
  classPopupCard.close();
  popupCardForm.reset();
  validatorFormCard.setSubmitButtonState(false);
});

popupUserForm.addEventListener('submit', (event) => {
  event.preventDefault();
  classApi.updateUser();
  classUserInfo.loading();
  classPopupUser.close();
  validatorFormUser.setSubmitButtonState(false);
});

popupAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  classApi.updateAvatar();
  classPopupAvatar.close();
  popupAvatarForm.reset();
  validatorFormAvatar.setSubmitButtonState(false);
});


validatorFormCard.setSubmitButtonState(false);
validatorFormUser.setSubmitButtonState(false);
validatorFormAvatar.setSubmitButtonState(false);
classApi.getUser()
.then((user) => {
  classUserInfo.loadingUser(user.name, user.about);
});
classApi.getAvatar()
.then((user) => {
  classPopupAvatar.editAvatar(user.avatar);
});

