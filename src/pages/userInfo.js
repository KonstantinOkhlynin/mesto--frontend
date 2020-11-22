export class UserInfo{
    constructor(inputName,inputDescription, nameUser, descriptionUser){
       this.inputName = inputName;
       this.inputDescription = inputDescription; 
       this.nameUser = nameUser;
       this.descriptionUser = descriptionUser;
    }

    loadingUser (nameServer, descriptionServer) {
        this.inputName = nameServer;
        this.inputDescription = descriptionServer;
        this.nameUser.textContent = this.inputName;
        this.descriptionUser.textContent = this.inputDescription;
    }
}