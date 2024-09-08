import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideEnvironmentNgxMask(),
    ...appConfig.providers || [],  // Mantenha outros provedores do appConfig, se houver
    provideHttpClient(withInterceptors([])), provideAnimationsAsync(), // Injeta o HttpClient globalmente
  ]
}).catch((err) => console.error(err));
