import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../backend/auth-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup;
  pwdWarning!: String;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'username': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required]),
        'cpassword': new FormControl(''),
        'email': new FormControl('', [Validators.required]),
        'phonenumber': new FormControl('', [Validators.required]),
        'games': new FormControl('', [Validators.required]),
        'emailCheck': new FormControl('', [Validators.required]),
        'sms': new FormControl('', [Validators.required])
      })
      
  }

  onSubmit(){

    try {
      if (this.signupForm.value.password == this.signupForm.value.cpassword){
        this.authService.signupUser(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.email, this.signupForm.value.phonenumber, this.signupForm.value.games, this.signupForm.value.emailCheck, this.signupForm.value.sms);
      } else {
        throw(Error);
      }
    } catch (error) {
      console.log("Passwords do not match");
      document.getElementById('pwdMatch')!.innerHTML = ('<p style="color: red;"> Passwords do not match!</p>');

    }

  }

}
