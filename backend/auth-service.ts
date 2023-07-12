import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthModelSignin, AuthModelSignup} from "backend/auth-model";

@Injectable({providedIn:"root"})
export class AuthService{

constructor(private http: HttpClient){}

signupUser(username: string, password: string, email: string, phonenumber: string, games: boolean, emailCheck: boolean, sms: boolean){

    const authData: AuthModelSignup = {username: username, password: password, email: email, phonenumber: phonenumber, games: games, emailCheck: emailCheck, sms: sms};

    this.http.post('http://localhost:3000/signup', authData).subscribe(res => {
        console.log(res);
    })
}

loginUser(username: string, password: string){

    const authData: AuthModelSignin = {username: username, password: password};

    this.http.post('http://localhost:3000/signin', authData).subscribe(res => {
        console.log(res);
    })
}

}