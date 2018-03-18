import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';
import {PaperComponent} from './paper/paper.component';
import {PapersComponent} from './papers/papers.component';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
