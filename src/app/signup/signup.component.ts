import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!:FormGroup;
  constructor(private service:AuthService ,private formbuilder:FormBuilder,private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username : ['',Validators.required],
      phone:[''],
      role:[''],
      email:['',Validators.required],
      password:['',Validators.required],
      isactive:[true]
    }) 
  }
  preceedregistration(){
    if(this.signupForm.valid){
      this.service.Proceedregister(this.signupForm.value).subscribe({
        next:(res)=>{
          alert('Registration Successful,Thank you!');
          console.log(res);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert('OOPs,Something went wrong! Pls try again later.');
        }
      })
    }
    else{
      alert('Please enter valid credentials.');
    }
  }
  // signUp(){
  //   this.http.post("http://localhost:3000/signupUsers",this.signupForm.value).subscribe({
  //     next:(res)=>{
  //       alert("signUp successful");
  //       this.signupForm.reset();
  //       this.router.navigate(['login']);
  //     },
  //     error:(err)=>{
  //       alert(err);
        
  //     }
  //   })
  // }

}
