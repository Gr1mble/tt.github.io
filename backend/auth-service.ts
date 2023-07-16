import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthModelSignin, AuthModelSignup} from "backend/auth-model";
import { Subject } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthService{

    private token!: string;
    private authenticatedSub = new Subject<boolean>();
    private isAuthenticated = false;
    private logoutTimer: any;

    getAuthenticatedSub(){
      return this.authenticatedSub.asObservable();  
    };

    getIsAuthenticated(){
        return this.isAuthenticated;
    }

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
        this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/signin', authData, {responseType: 'json' as const}).subscribe(res => {
            this.token = res.token;
            if(this.token){
                this.authenticatedSub.next(true);
                this.isAuthenticated = true;
                this.router.navigate(['/']);
                this.logoutTimer = setTimeout(() => {this.logOut()}, res.expiresIn * 1000);
                const now = new Date();
                const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
                this.storeLoginDetails(this.token, expiresDate);
            }
        });
    } catch (error) {
        console.log("Auth-Service Break");
    }


};

logOut(){
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logoutTimer);
    this.clearLoginDetails();
  };

  storeLoginDetails(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
  }

  clearLoginDetails(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  getLocalStorageData(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if(!token || !expiresIn){
        return;
    }
    return {
        'token': token,
        'expiresIn' : new Date(expiresIn)
    }
  }

  authenticateFromLocalStorage(){
    const localStorageData = this.getLocalStorageData();
    if(localStorageData){
        const now = new Date();
        const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

        if(expiresIn > 0){
            this.token = localStorageData.token;
            this.isAuthenticated = true;
            this.authenticatedSub.next(true);
            this.logoutTimer.setTimeout(expiresIn / 1000);
        }
    }
  }

}