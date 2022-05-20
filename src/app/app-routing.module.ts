import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';

const routes: Routes = [
  {path : "", component: HomePageComponent},  
  {path : "detail/:id", component : ArticleDetailComponent},
  {path:'**', component: HomePageComponent}
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
