import {Popup} from './popup.js';
export class PopupProfile extends Popup{
    constructor(popup){
        super(popup)
    }
    open({name, job}) {
        super.open();
        this.popup.querySelector('#nameProfile').value = name;
        this.popup.querySelector('#descriptionProfile').value = job;
        
    }
}