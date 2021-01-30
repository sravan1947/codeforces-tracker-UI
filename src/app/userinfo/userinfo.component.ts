import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';
import { CodeforcesService } from '../services/codeforces.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class UserinfoComponent implements OnInit {
  
  @ViewChild('fform') userFormDirective;
  info:any;
  data:any;
  showForm:Boolean;
  showSpinner:Boolean;
  userForm: FormGroup;
  err:Boolean;
  result:Boolean;
  
  formErrors = {
    'h1': ''  
  };
  
  validationMessages = {
    'h1': {
      'required':'Handle required.'
    }
  };
  
  constructor(private fb: FormBuilder,
    private codeforcesservice: CodeforcesService) {
    this.showForm=true;
    this.showSpinner=false;
  }

   ngOnInit() {
  this.createForm();
  }
  
  createForm() {
    this.userForm = this.fb.group({
      h1: ['', [Validators.required] ]
    });
    
    this.userForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  
  onSubmit() {
    this.data = this.userForm.value;
    console.log(this.data);
    this.showForm = false;
    this.showSpinner=true;
    this.codeforcesservice.getUserInfo({codeforces:this.data.h1})
      .subscribe(info => {
         this.info = info;
         this.showSpinner=false;
         if(info.success==true)
         {
            this.result=true;
         }
         else
         {
            this.err=true;
         }
        },
        error => console.log(error.status, error.message));
    this.userForm.reset({
      h1: ''      
    });
    this.userFormDirective.resetForm();
  }
}
