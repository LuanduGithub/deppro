import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comun } from './../../models/modelsComunes';
import { CategoriaService } from './../../services/categoria.service';
import { LoadingController } from '@ionic/angular';
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
  categorias: any;
  loading: any;
  constructor(
    private categoriaService: CategoriaService,
    private loadingController: LoadingController
  ) {


  }
  ngOnInit() {
    this.getCategoriaList();
    this.agregarCategoriaFormGroup = new FormGroup({
      categoriaNombre: new FormControl('', [ Validators.required ]),
    });
    this.editarCategoriaFormGroup = new FormGroup({
      editarCategoriaNombre: new FormControl('', [ Validators.required ]),
      editarCategoriaNombreNuevo: new FormControl({value : '', disabled: true}, Validators.required ),
    });

 }
  getCategoriaList() {
    this.categorias = this.categoriaService.getCategorias().subscribe(categoria => {
      const categoriasList = categoria.msg;
      this.categoriasList = categoriasList.sort(this.getSortOrder('nombre'));
    });
  }

  ionViewWillLeave() {
    this.categorias.unsubscribe();
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
    this.presentLoading('Agregando Categoria');
    const id = 0;
    const nombre = this.agregarCategoriaFormGroup.value.categoriaNombre;
    this.categoriaService.postCategoria(id, nombre).subscribe(() => {
      this.getCategoriaList();
      this.setValueVacio();
      this.dismissLoading();
    });
  }

  onSubmitEditar(formGroup) {
    this.presentLoading('Editando Categoria');
    const id = this.categoriaSeleccionada[0].id;
    const nombre = this.editarCategoriaFormGroup.value.editarCategoriaNombreNuevo;
    this.categoriaService.postCategoria(id, nombre).subscribe(() => {
      this.getCategoriaList();
      this.setValueVacio();
      this.categoriaSeleccionada = undefined;
      this.dismissLoading();
    });
  }



  editCategoriaNombreSelected(val) {
    if (val) {
      const valNumber = parseInt(val, 10);
      this.categoriaSeleccionada = this.categoriasList.filter( n => n.id === valNumber);
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

  async presentLoading(message = '') {
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      cssClass: 'custom-class custom-loading text-capitalize',
      spinner: 'dots'
    });
    await this.loading.present();
  }
  async dismissLoading() {
    await this.loading.dismiss();
  }

}
