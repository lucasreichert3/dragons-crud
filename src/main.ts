import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  applyPolyfills,
  defineCustomElements,
} from '@seniorsistemas/tecnologia-webcomponents/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

defineCustomElements();

// for IE support (optional)
applyPolyfills().then(() => {
  defineCustomElements();
});
