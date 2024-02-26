import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AppComponent } from './app.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { PretComponent } from './pret/pret.component';

const routes: Routes = [{ path: '', component: BienvenueComponent },
  { path: "connexion", component: ConnexionComponent },
  { path: 'Pret', component: PretComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
