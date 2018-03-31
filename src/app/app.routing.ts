import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';
import {PaperComponent} from './paper/paper.component';
import {PapersComponent} from './papers/papers.component';
import {LoginComponent} from './login/login.component';

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
