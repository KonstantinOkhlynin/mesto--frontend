import "./style.css";
;(async ()=>{
    const nameField = document.querySelector('#nameProfile');
    const descriptionField = document.querySelector('#descriptionProfile');

    const api = new Api('a52cee62-1a4c-4ffb-bcca-6afcb9f95180','cohort12');

    const newCard = document.querySelector('#popupNewCard'),
        editProfile = document.querySelector('#popupEditProfile'),
        increaseImage = document.querySelector('#popupIncreaseImadge')

    const popupNewCard = new Popup(newCard),
        popupEditProfile = new PopupProfile(editProfile),
        popupIncreaseImage = new PopupImg(increaseImage);

    const userInfoNameNode = document.querySelector('.user-info__name'),
        userInfoJobNode = document.querySelector('.user-info__job');
    
    const userInfo = new UserInfo(userInfoNameNode,userInfoJobNode);
    let gettingUserInfo;

    const cards = [];

    api.getUserInfo()
            .then((info)=>{
                gettingUserInfo=info
                userInfo.setUserInfo(gettingUserInfo.name, gettingUserInfo.about);
                userInfo.updateUserInfo();
            })
            .catch((e)=>{console.log(e); gettingUserInfo = {name:'unknown',info:'unknown'}});


    let initialCards;
    let cardList
    api.getCards()
        .then((initialCards)=>{   
            initialCards.forEach((cardInfo)=>{
                const card = new Card(cardInfo,popupIncreaseImage);
                console.dir(card);
                cards.push(card);
            });
            cardList = new CardList(cards,placesList);
            cardList.render();
        })
        .catch((e)=>{console.log(e); initialCards = []});

    const placesList = document.querySelector('.places-list');


    const newCardButton = document.querySelector('.user-info__button');
    newCardButton.addEventListener('click', popupNewCard.open);


    const editProfileButton = document.querySelector('.user-info__button-edit');
    editProfileButton.addEventListener('click', ()=>{popupEditProfile.open(userInfo.getUserInfo())});

    const newCardValidator = new FormValidator(newCard.querySelector('form')),
        profileValidator = new FormValidator(editProfile.querySelector('form'));

    newCardValidator.setEventListener();
    profileValidator.setEventListener();


    const editProfileForm = editProfile.querySelector('form');
    const newCardForm = newCard.querySelector('form');
    editProfileForm.addEventListener('submit', async (event)=>{
        event.preventDefault();
        const name = nameField.value,
            about = descriptionField.value;
        api.updateUserInfo({name, about})
            .then((info)=>{
                userInfo.setUserInfo(info.name, info.about);
                userInfo.updateUserInfo();
                popupEditProfile.close();
            })
            .catch((e)=>{alert(`Update Error ${e}`)});
    })

    newCardForm.addEventListener('submit',  (event) => {
        event.preventDefault();
        const name = newCardForm.querySelector('#nameCard');
        const link = newCardForm.querySelector('#imageCard');
        const cardInfo= {name: name.value, link:link.value};
        const card = new Card(cardInfo, popupIncreaseImage);
        cardList.addCard(card);
        newCardValidator.setSubmitButtonState(false);
        name.value = '';
        link.value = '';
        popupNewCard.close()
    })
})()


const numbers = [2, 3, 5];
const doubledNumbers = numbers.map(number => number * 2); // Стрелочная функция. Не запнётся ли на ней Internet Explorer

console.log(doubledNumbers); // 4, 6, 10 

/*
    Класс Api создан и запросы на сервер выполняются, отлично, что Вы попробовали
    использовать async/await, но с ним есть проблемы:

    Надо исправить:
    - никогда не используйте await в функции инициализации скрипта, это выполняет
    блокировку работы скрипта, пока запрос не выполнится, а на странице может быть ещё много логики 
    которая не связана с этим запрос. В крайнем случае вызывайте эту загрузку в самом конце скрипта

    - совмещать await с then/catch не имеет смысла, привел пример правильной организации
    для отправки данных пользователя. При использовании async/await - then там вообще не нужен
    А обработка ошибок должна выполняться блоком try/catch

    Можно лучше:
    - для загрузки начальных данных используйте Promise.all - запросы выполняются параллельно, что ускоряет
    загрузку, по сравнению с тем, как это сделано сейчас



*/

/*
  Отлично, замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после получения с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserData(),
      api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      })
      
  Успехов в дальнейшем обучении!
*/

/* REVIEW:

Все критические ошибки были исправлены, отличная работа! 
Спасибо за усилия и старания, удачи в следующем спринте и успехов в дальнейшем обучении 🖤

*/