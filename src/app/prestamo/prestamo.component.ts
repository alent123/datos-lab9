import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibroComponent } from '../libro/libro.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-prestamo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LibroComponent, UsuarioComponent], 
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent {

  prestamoForm: FormGroup;
  prestamos: any[] = [];
  libros: any[] = [];  
  usuarios: any[] = [];  
  editMode = false;
  editingId: number | null = null;
  constructor(private fb: FormBuilder) {
    this.prestamoForm = this.fb.group({
      libro: ['', Validators.required],
      usuario: ['', Validators.required],
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.editMode && this.editingId !== null) {
      const index = this.prestamos.findIndex(p => p.id === this.editingId);
      if (index !== -1) {
        this.prestamos[index] = { id: this.editingId, ...this.prestamoForm.value };
      }
    } else {
      const newPrestamo = {
        id: Date.now(), 
        ...this.prestamoForm.value
      };
      this.prestamos.push(newPrestamo);
    }
    this.resetForm();
  }
  onEdit(prestamo: any) {
    this.prestamoForm.setValue({
      libro: prestamo.libro,
      usuario: prestamo.usuario,
      fechaPrestamo: prestamo.fechaPrestamo,
      fechaDevolucion: prestamo.fechaDevolucion,
      estado: prestamo.estado,
    });
    this.editMode = true;
    this.editingId = prestamo.id;
  }
  onDelete(id: number) {
    this.prestamos = this.prestamos.filter(prestamo => prestamo.id !== id);
    this.resetForm();
  }
  resetForm() {
    this.prestamoForm.reset();
    this.editMode = false;
    this.editingId = null;
  }
}
