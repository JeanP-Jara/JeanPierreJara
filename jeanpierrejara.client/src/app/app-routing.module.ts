import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalEditComponent } from './personal/components/personal-edit/personal-edit.component';
import { PersonalListComponent } from './personal/components/personal-list/personal-list.component';
import { AppComponent } from './app.component';
import { HijosListComponent } from './personal/components/hijos-list/hijos-list.component';

const routes: Routes = [
  { path: '', component: PersonalListComponent },
  { path: 'hijos/:idPersonal', component: HijosListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
