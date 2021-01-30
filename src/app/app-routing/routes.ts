import { Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MyinfoComponent } from '../myinfo/myinfo.component';
import { CompareComponent } from '../compare/compare.component';
import { UserinfoComponent } from '../userinfo/userinfo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'myinfo',     component: MyinfoComponent },
  { path: 'compare',     component: CompareComponent },
  { path: 'userinfo',     component: UserinfoComponent }
];
