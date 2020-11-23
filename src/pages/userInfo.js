export class UserInfo{
    constructor(inputName,inputDescription, nameUser, descriptionUser){
       this.inputName = inputName;
       this.inputDescription = inputDescription; 
       this.nameUser = nameUser;
       this.descriptionUser = descriptionUser;
    }

    loadingUser (nameServer, descriptionServer) {
        this.inputName.value = nameServer;
        this.inputDescription.value = descriptionServer;
        this.nameUser.textContent = nameServer;
        this.descriptionUser.textContent = descriptionServer;
    }

    loading() {;
        this.nameUser.textContent = this.inputName.value;
        this.descriptionUser.textContent = this.inputDescription.value;
    }
}