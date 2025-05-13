import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListaMascotasComponent } from './components/lista-mascotas/lista-mascotas.component';


const routes: Routes = [
  { path: '', redirectTo: '/mascotas', pathMatch: 'full' },
  { path: 'mascotas', component: ListaMascotasComponent },
  { path: 'mascota/nueva', component: AgregarEditarMascotaComponent },
  { path: 'mascota/editar/:id', component: AgregarEditarMascotaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
