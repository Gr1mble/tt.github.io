import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthModelSignin, AuthModelSignup} from "backend/auth-model";

@Injectable({providedIn:"root"})
export class AuthService{

    private token!: string;

    getToken(){
        return this.token;
    }

constructor(private http: HttpClient, private router: Router){}

signupUser(username: string, password: string, email: string, phonenumber: string, games: boolean, emailCheck: boolean, sms: boolean){


    const authData: AuthModelSignup = {username: username, password: password, email: email, phonenumber: phonenumber, games: games, emailCheck: emailCheck, sms: sms};

    try {
        this.http.post('http://localhost:3000/signup', authData, {responseType: 'json' as const}).subscribe(res => {
            return this.router.navigate(['/signin']);
    })
    } catch (error) {
        console.log("Auth-Service Break");
    }
    
}

loginUser(username: string, password: string){

    const authData: AuthModelSignin = {username: username, password: password};

    try {
        this.http.post<{token: string}>('http://localhost:3000/signin', authData, {responseType: 'json' as const}).subscribe(res => {
            this.token = res.token;
            if(this.token){
                //this.authenticatedSub.next(true);
                //this.isAuthenticated = true;
                this.router.navigate(['/']);
            }
        });
    } catch (error) {
        console.log("Auth-Service Break");
    }


}

}