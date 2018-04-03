import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {PaperComponent} from './paper/paper.component';
import {PapersComponent} from './papers/papers.component';
import {LoginComponent} from './login/login.component';
import { TwitterComponent as CallbackTwitterComponent } from './callback/twitter/twitter.component';
import {ProfileComponent} from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'paper/:paperUUID',
    component: PaperComponent,
  },
  {
    path: 'papers',
    component: PapersComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/twitter/callback',
    component: CallbackTwitterComponent,
  },
  {
    path: 'profile/:author',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
