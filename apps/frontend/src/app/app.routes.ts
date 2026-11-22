import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Início — Frontend Template',
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Página não encontrada — Frontend Template',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não encontrada — Frontend Template',
  },
];
