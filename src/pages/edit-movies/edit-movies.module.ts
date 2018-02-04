import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMoviesPage } from './edit-movies';

@NgModule({
  declarations: [
    EditMoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMoviesPage),
  ],
})
export class EditMoviesPageModule {}
