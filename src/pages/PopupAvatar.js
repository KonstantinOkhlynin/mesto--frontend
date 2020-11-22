export class PopupAvatar extends Popup {
  constructor(popup, conteinerAvatar){
    super(popup);
    this.conteinerAvatar = conteinerAvatar;
  }
   editAvatar (link) {
    this.conteinerAvatar.style.backgroundImage = `url('${link}')`;
   }

}
