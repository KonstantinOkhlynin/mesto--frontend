
import "./style.css";
import {Api} from './pages/Api.js';
import {CardList} from './pages/CardList.js';
import {FormValidator} from './pages/formValidator.js';
import {Popup} from './pages/Popup.js';
import {PopupImg} from './pages/popupImg.js';
import {PopupAvatar} from './pages/PopupAvatar.js';
import {UserInfo} from './pages/userInfo.js';

const popupCard = document.querySelector('.popupCard');
const popupUser = document.querySelector('.popupUser');
const popupAvatar = document.querySelector('.popupAvatar');
const popupImadgeCard = document.querySelector('.popupImadgeCard');

const popupCardForm = popupCard.querySelector('form');
const popupUserForm = popupUser.querySelector('form');
const popupAvatarForm = popupAvatar.querySelector('form');
const popupImadgeCardForm = popupImadgeCard.querySelector('form');

const userInfoButtonCard = popupImadgeCard.querySelector('.button user-info__button');
const userInfoButtonEdit = popupAvatar.querySelector('.user-info__button-edit');
const userinfoPhoto = popupCard.querySelector('.user-info__photo');

const userInfoName = popupUser.querySelector('.user-info__name');
const userInfoDescription = popupAvatar.querySelector('.user-info__description');
const inputNameUser = popupImadgeCard.querySelector('#nameUser');
const inputDescriptionUser = popupImadgeCard.querySelector('#descriptionUser');
const placesList = popupImadgeCard.querySelector('.places-list');

const classPopupCard = new Popup(popupCard);
const classPopupUser = new Popup(popupUser);
const classPopupAvatar = new PopupAvatar(popupAvatar);
const classPopupImadgeCard = new PopupImg(popupImadgeCard);

const UserInfo = new UserInfo(inputNameUser, inputDescriptionUser, userInfoName, userInfoDescription);

const CardList = new CardList(placesList);

const api = new Api();

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
  api.addCard();
  classPopupCard.close();
  popupCardForm.reset();
  validatorFormCard.setSubmitButtonState(false);
});

popupUserForm.addEventListener('submit', (event) => {
  event.preventDefault();
  api.updateUser();
  classPopupUser.close();
  popupUserForm.reset();
  validatorFormUser.setSubmitButtonState(false);
});

popupAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  api.updateAvatar();
  classPopupAvatar.close();
  popupAvatarForm.reset();
  validatorFormAvatar.setSubmitButtonState(false);
});


validatorFormCard.setSubmitButtonState(false);
validatorFormUser.setSubmitButtonState(false);
validatorFormAvatar.setSubmitButtonState(false);
api.getCards();
api.getUser();
api.getAvatar();
