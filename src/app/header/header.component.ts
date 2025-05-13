import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuAbierto: boolean = false;

  // abrir mnu
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  // cerrar menu
  cerrarMenu() {
    this.menuAbierto = false;
  }
}
