import { Injectable } from '@angular/core';
import { Mascota } from '../models/mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private mascotas: Mascota[] = [];
  private nextId = 1;

  constructor() {
    this.cargarLocalStorage();
  }

  agregarMascota(mascota: Mascota) {
    mascota.id = this.nextId++;
    this.mascotas.push(mascota);
    this.guardarLocalStorage();
  }

  obtenerMascotas(): Mascota[] {
    return this.mascotas;
  }

  obtenerMascotaPorId(id: number): Mascota | undefined {
    return this.mascotas.find(m => m.id === id);
  }

  editarMascota(id: number, mascota: Mascota) {
    const index = this.mascotas.findIndex((m) => m.id === id);
    if (index !== -1) {
      const { id: _, ...mascotaSinId } = mascota;
      this.mascotas[index] = { id, ...mascotaSinId };
      this.guardarLocalStorage();
    }
  }


  eliminarMascota(id: number) {
    this.mascotas = this.mascotas.filter(m => m.id !== id);
    this.guardarLocalStorage();
  }

  private guardarLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(this.mascotas));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  private cargarLocalStorage() {
    const mascotasGuardadas = localStorage.getItem('mascotas');
    const idGuardado = localStorage.getItem('nextId');

    if (mascotasGuardadas) {
      this.mascotas = JSON.parse(mascotasGuardadas);
    }

    if (idGuardado) {
      this.nextId = parseInt(idGuardado, 10);
    }
  }
}
