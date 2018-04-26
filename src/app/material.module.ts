import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatRadioModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,

    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,

    MatRadioModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
})
export class MaterialModule { }
