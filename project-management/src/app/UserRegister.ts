export class UserRegister{

    id : number;
    username : string;
    password : string;
    name : string;

    constructor (id:number, username:string, password:string, name: string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
    }

}