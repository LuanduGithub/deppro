import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comun } from './../../models/modelsComunes';
import { CategoriaService } from './../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categoriasList: Array<Comun>;
  categoriaSeleccionada: Comun[];
  agregarCategoriaFormGroup: FormGroup;
  editarCategoriaFormGroup: FormGroup;

  @Input() agregar = false;
  @Input() editar = false;
  constructor(
    private categoriaService: CategoriaService
  ) {


  }
  ngOnInit() {
    this.getCategoriaList();
    this.agregarCategoriaFormGroup = new FormGroup({
      categoriaNombre: new FormControl('', [ Validators.required ]),
    });
    this.editarCategoriaFormGroup = new FormGroup({
      editarCategoriaNombre: new FormControl('', [ Validators.required ]),
      editarCategoriaNombreNuevo: new FormControl('', [ Validators.required ]),
    });

 }
  getCategoriaList() {
    this.categoriaService.getCategorias().subscribe(categoria => {
      const categoriasList = categoria.msg;
      this.categoriasList = categoriasList.sort(this.getSortOrder('nombre'));
    });
  }

/**
 * fn: ordenar alfabeticamente el arreglo
 * @param prop --> es el nombre por el cual queremos ordenar el arreglo
 */
  getSortOrder(prop) {
    return (a, b) => {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
  }


  onSubmitAgregar(formGroup) {
    const id = 0;
    const nombre = this.agregarCategoriaFormGroup.value.categoriaNombre;
    this.categoriaService.postCategoria(id, nombre).subscribe(() => {
      this.getCategoriaList();
      this.setValueVacio();
    });
  }

  onSubmitEditar(formGroup) {
    const id = this.categoriaSeleccionada[0].id;
    const nombre = this.editarCategoriaFormGroup.value.editarCategoriaNombreNuevo;
    this.categoriaService.postCategoria(id, nombre).subscribe(() => {
      this.getCategoriaList();
      this.setValueVacio();
      this.categoriaSeleccionada = undefined;
    });
  }



  editCategoriaNombreSelected(val) {
    if (val) {
      this.categoriaSeleccionada = this.categoriasList.filter( n => n.id === val);
      const nombre = this.categoriaSeleccionada[0].nombre;
      this.editarCategoriaFormGroup.controls.editarCategoriaNombreNuevo.setValue(nombre);
      this.editarCategoriaFormGroup.controls.editarCategoriaNombreNuevo.enable();
    }
  }


  setValueVacio() {
    if (this.agregar) {
      this.agregarCategoriaFormGroup.controls.categoriaNombre.setValue('');
      this.agregarCategoriaFormGroup.controls.categoriaNombre.setValue('');
    }
    if (this.editar) {
      this.editarCategoriaFormGroup.controls.editarCategoriaNombre.setValue('');
      this.editarCategoriaFormGroup.controls.editarCategoriaNombreNuevo.setValue('');
      this.editarCategoriaFormGroup.controls.editarCategoriaNombreNuevo.disable();
    }
  }

}
