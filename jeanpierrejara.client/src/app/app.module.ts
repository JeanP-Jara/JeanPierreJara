import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PersonalListComponent } from './personal/components/personal-list/personal-list.component';
import { PersonalEditComponent } from './personal/components/personal-edit/personal-edit.component';
import { HijosListComponent } from './personal/components/hijos-list/hijos-list.component';
import { HijosEditComponent } from './personal/components/hijos-edit/hijos-edit.component';


import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertPopUpComponent } from './common/components/alert-pop-up/alert-pop-up.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AlertMensajeComponent } from './common/components/alert-mensaje/alert-mensaje.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalListComponent,
    PersonalEditComponent,
    HijosListComponent,
    HijosEditComponent,
    AlertPopUpComponent,
    AlertMensajeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,

  ],
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
