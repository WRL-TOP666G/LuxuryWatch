import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerFormGroup!: FormGroup;
  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router
  ){}

  ngOnInit(){
    this.registerFormGroup = this.fb.group({
      username: ['', [ Validators.required]],
      passwordGroup: this.fb.group({
        password: ['',[Validators.required]],
        confirmPassword: '' // required to put something
      }, {validators: [RegisterComponent.passwordValidator]})
    });

  }

  //destructure twice : {a, b},    ,   future use -> {[key: string]: string}
  static passwordValidator({value: {password, confirmPassword}}: FormGroup): null | {passwordNotMatch: string}{
    return password === confirmPassword ? null : {passwordNotMatch: 'Password and confirm password must be the same'};
  }

  register(){
    // console.log(this.registerFormGroup.value);
    // console.log(this.registerFormGroup.value.username);
    // console.log(this.registerFormGroup.value.passwordGroup.password);
    let user = {
      username : this.registerFormGroup.value.username,
      password : this.registerFormGroup.value.passwordGroup.password
    }
    this.auth.register(user)
        .subscribe((res:{success: any; user:any}) => {
          console.log('success')
          this.router.navigate(['/login']).catch();
        })
  }
}
