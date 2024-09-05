export class UserRegister{

    id : number;
    username : string;
    password : string;
    name : string;
    organization:string;
    timezone:string;

    constructor (id:number, username:string, password:string, name: string,organization:string,timezone:string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.organization=organization;
        this.timezone=timezone
    }

}