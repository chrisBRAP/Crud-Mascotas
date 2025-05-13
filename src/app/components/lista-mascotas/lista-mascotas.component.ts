import { Component, OnInit, ViewChild } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css'],
})
export class ListaMascotasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'raza', 'edad', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  terminoBusqueda: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public router: Router, private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  obtenerMascotas(): void {
    const mascotas = this.mascotaService.obtenerMascotas();

    if (mascotas && mascotas.length > 0) {
      this.dataSource.data = mascotas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('Datos cargados: ', this.dataSource.data); // Verificar los datos
    }
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.terminoBusqueda.trim().toLowerCase();
  }

  eliminarMascota(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: '¡Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotaService.eliminarMascota(id);
        this.obtenerMascotas();
        Swal.fire('¡Eliminado!', 'La mascota ha sido eliminada correctamente.', 'success');
      }
    });
  }

  editarMascota(id: number) {
    this.router.navigate(['/mascota/editar', id]);
  }
}
