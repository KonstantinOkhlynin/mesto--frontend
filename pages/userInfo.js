class UserInfo{
    constructor(userInfoName, userInfoJob ){
        this.name = 'Jaques Causteau2';
        this.job = 'Sailor, Researcher';
        this.userInfoJob = userInfoJob;
        this.userInfoName = userInfoName;
    }

    setUserInfo = (name, job) => {
        this.name = name;
        this.job = job;
    }

    getUserInfo = () => {
        const {name,job}=this;
        return {name, job}
    }
    updateUserInfo = () => {
        const {userInfoName, userInfoJob} = this;
        userInfoName.textContent = this.name;
        userInfoJob.textContent = this.job;
    }
}