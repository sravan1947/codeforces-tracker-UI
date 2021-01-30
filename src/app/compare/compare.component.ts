import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';
import { CodeforcesService } from '../services/codeforces.service';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class CompareComponent implements OnInit {
  
  @ViewChild('fform') compareFormDirective;
  info:any;
  data:any;
  showForm:Boolean;
  showSpinner:Boolean;
  compareForm: FormGroup;
  err:Boolean;
  xvc:string;
  result:Boolean;
  formErrors = {
    'h1': '',
    'h2': ''
  };
  
  validationMessages = {
    'h1': {
      'required':      'Handle required.'
    },
    'h2': {
      'required':      'Handle required.'
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
    this.compareForm = this.fb.group({
      h1: ['', [Validators.required] ],
      h2: ['', [Validators.required] ]
    });
    
    this.compareForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?: any) {
    if (!this.compareForm) { return; }
    const form = this.compareForm;
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
    this.data = this.compareForm.value;
    console.log(this.data);
    this.showForm = false;
    this.showSpinner=true;
    this.codeforcesservice.compare(this.data)
      .subscribe(info => {
         this.info = info;
         console.log(this.info.h1);
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
    this.compareForm.reset({
      h1: '',
      h2: ''
    });
    this.compareFormDirective.resetForm();
  }
  }
