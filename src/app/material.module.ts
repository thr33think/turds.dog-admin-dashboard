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
  MatSnackBarModule,
  MatSelectModule,
  MatOptionModule
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
    MatSnackBarModule,

  MatSelectModule,
  MatOptionModule
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
    MatSnackBarModule,

  MatSelectModule,
  MatOptionModule
  ],
})
export class MaterialModule { }
