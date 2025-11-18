import { Routes } from '@angular/router';
import { Form } from './pages/form/form';
import { Latihan } from './pages/latihan/latihan';
import { Home } from './pages/home/home';
import { Kalkulator } from './pages/kalkulator/kalkulator';
import { List } from './pages/user/list/list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'kalkulator', component: Kalkulator },
  { path: 'form', component: Form },
  { path: 'latihan', component: Latihan },
  { path: 'user/list', component: List },

];
