import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideStorage,Storage } from '@ionic/storage-angular';
import { DatabaseService } from './app/services/database.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: Storage, useClass: Storage },
      SQLite, 
    DatabaseService,
  ],
}).then(async (appRef) => {

  const databaseService = appRef.injector.get(DatabaseService);
  await databaseService.initializeDatabase();


});


