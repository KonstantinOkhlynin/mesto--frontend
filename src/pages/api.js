export class Api{
    constructor(token,group){
        this.token = token;
        /*
            Можно лучше: адрес с сервера передавать в конструктор класса
        */
        this.base = `https://nomoreparties.co/${group}`;
    }

    getResource = async (url)=>{
        const res = await  fetch (`${this.base}/${url}`, { 
            method: 'GET',
            headers: {
                authorization: `${this.token}`
            }
        });
        if (!res.ok){
            throw new Error(res.status);
        }

        return await res.json();
    }

    patchData  = async (url,body='')=>{
        const res = await  fetch (`${this.base}/${url}`, { 
            method: 'PATCH',
            headers: {
                authorization: `${this.token}`,
                'Content-Type': 'application/json'
            },
            body: body
        });
        if (!res.ok){
            throw new Error(res.status);
        }

        return await res.json();
    }

    getUserInfo = async ()=> {
        const res = await this.getResource('users/me');
        const {name, about} = res;
        return {name,about}
    }
    updateUserInfo = async (info)=> {
        const res = await this.patchData('users/me',JSON.stringify(info));
        const {name, about} = res;
        return {name,about}
    }
    getCards = async ()=> {
        const res = await this.getResource('cards');
        return res
    }
}