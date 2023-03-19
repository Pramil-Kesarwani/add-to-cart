import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData : any;
  loginForm!:FormGroup;
  constructor(private service:AuthService,private formBuilder:FormBuilder,private http: HttpClient,private router:Router) { 
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  // proceedlogin(){
  //   if(this.loginForm.valid){
  //     this.service.Getbycode(this.loginForm.value.username).subscribe({
  //       next:(res)=>{
  //         this.userData = res;
  //         console.log(this.userData);
  //         if(this.userData.password===this.loginForm.value.password){
  //           if(this.userData.isactive){
  //             sessionStorage.setItem('email',this.userData.email);
  //             sessionStorage.setItem('role',this.userData.role);
  //             this.router.navigate(['/products'])
  //           }else{
  //             alert('Inactive User!');
  //           }
  //         }
  //         else{
  //           alert('Invalid Credentials!');
  //         }
  //       }
  //     })
  //   }
  // }
  proceedlogin(){
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe({
      next:(data)=>{
        console.log(data);
        const res = data.find((a:any)=>{
          return a.username===this.loginForm.value.username && a.password===this.loginForm.value.password;
        });
        if(res){
          // alert('login successful');
          if(res.isactive){
            sessionStorage.setItem('username',res.username);
            sessionStorage.setItem('role',res.role);
            this.router.navigate(['/products'])
          }else{
            alert('Inactive User!');
            
          }
        }
        else{
          alert('User not found');
          
        }
      },
      error:(err)=>{
        alert('Something went wrong');
      }
    })
  }

}
