import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user";
import {Userinfo} from "../../shared/models/userinfo";
import {Role} from "../../shared/models/role";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit{
  UserInfoFormGroup!: FormGroup;
  user_id: number | undefined;
  user: User | undefined;
  userinfo: Userinfo | undefined;
  role : Role | undefined;



  constructor(
      private us: UsersService,
      private fb: FormBuilder,
      private auth: AuthService
  ){}
  ngOnInit() {

    this.UserInfoFormGroup = this.fb.group({
      name: [this.userinfo?.name],
      phone: [this.userinfo?.phone],
      email: [this.userinfo?.email],
      address1: [this.userinfo?.address1],
      address2: [this.userinfo?.address2],
      city: [this.userinfo?.city],
      state: [this.userinfo?.state],
      zip: [this.userinfo?.zip],
    });

    this.user_id = Number(localStorage.getItem('id'));

    this.us.getUser(this.user_id)
        .subscribe(user =>{
          this.user = user;
        });
    this.us.getUserInfo(this.user_id)
        .subscribe(userinfo =>{
          this.userinfo = userinfo;
        });
    this.us.getRole(this.user_id)
        .subscribe(role =>{
          this.role = role;
        });
  }



  updateInfo(){
    let userinfo = {
      id: this.user_id,
      name : this.UserInfoFormGroup.value.name,
      phone : this.UserInfoFormGroup.value.phone,
      email: this.UserInfoFormGroup.value.email,
      address1: this.UserInfoFormGroup.value.address1,
      address2: this.UserInfoFormGroup.value.address2,
      city: this.UserInfoFormGroup.value.city,
      state: this.UserInfoFormGroup.value.state,
      zip: this.UserInfoFormGroup.value.zip,
      user: this.user
    }
    // @ts-ignore
    this.auth.updateUserinfo(userinfo)
        .subscribe((res:{success: any; userinfo:any}) => {
          alert('Update Info Successfully')
        })
  }

  // email = new FormControl(this.UserInfoFormGroup.value.email, [Validators.required, Validators.email]);
  //
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  getErrorMessage() {
    // @ts-ignore
    if (this.userinfo?.email.hasError('required')) {
      return 'You must enter a value';
    }

    // @ts-ignore
    return this.userinfo?.email.hasError('email') ? 'Not a valid email' : '';
  }

}
