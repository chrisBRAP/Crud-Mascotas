import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  mascotaForm: FormGroup;
  id: number | null = null;
  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = +idParam;
      const mascota = this.mascotaService.obtenerMascotaPorId(this.id);

      if (mascota) {
        this.esEdicion = true;
        this.mascotaForm.patchValue(mascota);
      }

    }
  }

  guardarMascota(): void {
    //valid si hubo cambio en fromu
    if (this.mascotaForm.valid) {
      if (this.esEdicion && this.mascotaForm.pristine) {
        return;
      }

      const accion = this.esEdicion ? 'editar' : 'agregar';

      Swal.fire({
        title: `¿Estás seguro de que deseas ${accion} esta mascota?`,
        text: this.esEdicion ? 'Se guardarán los cambios.' : 'Se agregará una nueva mascota.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.esEdicion) {
            this.mascotaService.editarMascota(this.id!, this.mascotaForm.value);
            Swal.fire('¡Actualizado!', 'La mascota ha sido actualizada correctamente.', 'success');
          } else {
            this.mascotaService.agregarMascota(this.mascotaForm.value);
            Swal.fire('¡Agregado!', 'La mascota ha sido agregada correctamente.', 'success');
          }
          this.router.navigate(['']);
        }
      });
    }
  }


}
