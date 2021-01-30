import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  handle = {handle: ''};
  errMess: string;
  done:Boolean;
  
  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
    private authService: AuthService) { 
    }

  ngOnInit() {
  }
  
  onSubmit() {
    this.done=false;
    this.authService.set_handle(this.handle)
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
