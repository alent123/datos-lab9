import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { UsuarioComponent } from '../usuario/usuario.component';
import { PrestamoComponent } from '../prestamo/prestamo.component';
import { LibroComponent } from '../libro/libro.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "libros", component: LibroComponent },
  { path: "usuarios", component: UsuarioComponent },
  { path: "prestamos", component: PrestamoComponent },
];

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent { }
