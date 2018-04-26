import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './views/cards/cards.component';

const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  // { path: 'hero/:id', component: HeroDetailComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
