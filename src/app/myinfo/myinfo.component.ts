import { Component, OnInit, Inject  } from '@angular/core';
import { CodeforcesService } from '../services/codeforces.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MyinfoComponent implements OnInit {

    
    info: any;
    errMess: string;
    err:Boolean;
    result:Boolean;
    constructor(private codeforcesService: CodeforcesService,
    @Inject('baseURL') private baseURL) { }
    
  ngOnInit() {
  
  this.codeforcesService.getMyInfo()
      .subscribe(info => 
      {
      this.info = info;
      if(info.success==true)
      {
        this.result=true;
      }
      else
      {
        this.err=true;
      }
     },
        errmess => this.errMess = <any>errmess);
  }

}
