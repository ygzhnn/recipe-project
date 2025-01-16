import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { ProjectsComponent } from './core/components/projects/projects.component';
import { AboutPageComponent } from './core/components/about-page/about-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutPageComponent },
  { 
    path: 'recipe-demo', 
    loadChildren: () => import('./features/demos/recipe-demo/recipe-demo.module').then(m => m.RecipeDemoModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
