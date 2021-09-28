import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadDragons } from './guard/security.guard';
import { SessionResolver } from './resolvers/session.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
    resolve: { session: SessionResolver }
  },
  {
    path: 'dragons',
    loadChildren: () =>
      import('./views/dragons/dragons.module').then((m) => m.DragonsModule),
    canLoad: [CanLoadDragons],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
