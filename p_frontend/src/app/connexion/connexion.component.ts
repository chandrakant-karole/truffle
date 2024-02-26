import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor() { }
  email: string | undefined;
  password: string | undefined;
  ngOnInit(): void {
  }
  onSubmit() {
    // Ici, vous pouvez utiliser les valeurs de this.email et this.password pour effectuer les actions de connexion
    console.log('Adresse email:', this.email);
    console.log('Mot de passe:', this.password);
  }
}
