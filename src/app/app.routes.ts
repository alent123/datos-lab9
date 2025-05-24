import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PrestamoComponent } from './prestamo/prestamo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'libros', component: LibroComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'prestamos', component: PrestamoComponent },
];
