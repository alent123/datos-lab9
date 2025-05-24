import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  libroForm: FormGroup;
  libros: any[] = [];  
  editMode = false;
  editingId: number | null = null;
  constructor(private fb: FormBuilder) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]], 
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], 
      sinopsis: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.editMode && this.editingId !== null) {
      const index = this.libros.findIndex(l => l.id === this.editingId);
      if (index !== -1) {
        this.libros[index] = { id: this.editingId, ...this.libroForm.value };
      }
    } else {
      const newLibro = {
        id: Date.now(),  
        ...this.libroForm.value
      };
      this.libros.push(newLibro);
    }
    this.resetForm();
  }
  onEdit(libro: any) {
    this.libroForm.setValue({
      titulo: libro.titulo,
      isbn: libro.isbn,
      anio: libro.anio,
      sinopsis: libro.sinopsis,
      genero: libro.genero
    });
    this.editMode = true;
    this.editingId = libro.id;
  }
  onDelete(id: number) {
    this.libros = this.libros.filter(libro => libro.id !== id);
    this.resetForm();
  }
  resetForm() {
    this.libroForm.reset();
    this.editMode = false;
    this.editingId = null;
  }
}
