import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {username: '', password: ''};
  errMess: string;
  done:Boolean;
  
  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthService) { 
    
    }

  ngOnInit() {
  }
  onSubmit() {
    console.log('User: ', this.user);
    this.done=false;
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          this.done=true;
          setTimeout(()=>{ this.dialogRef.close(res.success);},2000);
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }

}
