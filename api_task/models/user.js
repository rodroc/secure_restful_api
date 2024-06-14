module.exports = class User{
    constructor(email,password,id=null){
        this.email=email
        this.password=password
        this.id=id
    }
}