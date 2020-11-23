export class FormValidator{
    constructor(form){
        this.form = form;
        this.inputs = Array.from(this.form.elements);
    }

    checkInputValidly = (input, singleField = true) => {
        let valid = true;
        input.setCustomValidity(" ");
        const validity = input.validity;

        if(validity.valueMissing){
            input.setCustomValidity("Это обязательное поле");
            valid = false;
        };

        if(input.validity.tooShort || validity.tooLong){
        input.setCustomValidity('Должно быть от 2 до 30 символов');
        valid = false;
        }

        if(input.validity.typeMismatch && input.type == 'url'){
            input.setCustomValidity('Здесь должна быть ссылка');
            valid = false;
            }

        if (!singleField){
            const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
            if (errorElem){
                errorElem.textContent = input.validationMessage;
            }
        }
        return valid;
    }

    setSubmitButtonState = (valid) => {    
        const button = this.form.querySelector('.popup__button');
        if (valid){
            button.removeAttribute('disabled');
            button.classList.add('popup__button_valid');
            button.classList.remove('popup__button_invalid');
        } 
        else {
            button.setAttribute('disabled', 'disabled');
            button.classList.remove('popup__button_valid');
            button.classList.add('popup__button_invalid');
        }
    }
    setEventListener = () => {
       this.form.addEventListener('input', (event) => {
            const [...inputs] = event.currentTarget.elements;
            this.checkInputValidly(event.target,false);        
            if(inputs.every(this.checkInputValidly)){
                this.setSubmitButtonState(true);
            } 
            else {
                this.setSubmitButtonState(false);
            }
       })
        
    }
}