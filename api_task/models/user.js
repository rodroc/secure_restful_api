// module.exports = {
//     User:{
//         id:'id',
//         email:'email'
//     }
// }

// export class User{
    // id
    // email
// }

module.exports = class User{
    constructor(email,password,id=null){
        this.email=email
        this.password=password
        this.id=id
    }
}