import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../backend/auth-service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;


  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.authService.loginUser(this.signinForm.value.username, this.signinForm.value.password);
  }
}
