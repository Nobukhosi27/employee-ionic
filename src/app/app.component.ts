import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  


  constructor(private databaseService: DatabaseService) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    await this.databaseService.initializeDatabase();
  }
}




