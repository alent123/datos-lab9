import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';

@Component ({
  selector: 'app-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  userForm = new FormGroup({
    id: new FormControl(0),
    nombres: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
  });
  editMode = false;
  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.usuarios = this.usuarioService.getUsuarios();
  }
  onSubmit() {
    const usuario:any = this.userForm.value;
    if (this.editMode) {
      this.usuarioService.updateUsuario(usuario);
    } else {
      this.usuarioService.addUsuario(usuario);
    }
    this.resetForm();
    this.loadUsers();
  }
  onEdit(usuario: Usuario) {
    this.editMode = true;
    this.userForm.setValue(usuario);
  }
  onDelete(id: number) {
    this.usuarioService.deleteUsuario(id);
    this.loadUsers();
  }
  resetForm() {
    this.editMode = false;
    this.userForm.reset({ id:0, nombres:'', telefono:'', email:''});
  }
}      
