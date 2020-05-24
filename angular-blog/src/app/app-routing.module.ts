import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//1. Create a route that maps the URL pattern edit/:id to EditComponent by importing ./edit/edit.component
import { EditComponent } from './edit/edit.component';
// import { ListComponent } from './list/list.component';
//2. adding the mapping to routes
const routes: Routes = [
    { path: 'edit/:id', component: EditComponent }
    // ,
    // { path: '', component: ListComponent }
     // { path: 'preview/:id', component: PreviewComponent }
];


@NgModule({
  // imports: [RouterModule.forRoot(routes)],     // Replace RouterModule.forRoot(routes) with RouterModule.forRoot(routes, {useHash: true}).
  imports: [RouterModule.forRoot(routes, {useHash:true})],//{useHash: true} ensures that the app routing path is encoded as URL fragment identifier behind a hash symbol.
  exports: [RouterModule]
})
export class AppRoutingModule { }
