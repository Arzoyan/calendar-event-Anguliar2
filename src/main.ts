import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CalendarComponent } from './app/calendar/calendar.component'; // Ensure it's used if needed
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure the import matches the export name
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Ensure 'routes' matches your actual export
    provideAnimations(),
    provideHttpClient(),
  ]
});
