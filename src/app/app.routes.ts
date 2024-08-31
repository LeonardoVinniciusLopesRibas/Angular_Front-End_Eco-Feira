import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { loginGuard } from './auth/login.guard';
import { PrincipalprodutorComponent } from './components/layout/produtor/principalprodutor/principalprodutor.component';
import { VisaogeralcardsprodutorComponent } from './components/layout/produtor/visaogeralcardsprodutor/visaogeralcardsprodutor.component';
import { ProdutodetailsComponent } from './components/layout/produtor/produtodetails/produtodetails.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'admin/produtor', redirectTo: 'admin/produtor/centraldados', pathMatch: 'full'},
    {
        path: 'admin/produtor', component: PrincipalprodutorComponent, canActivate: [loginGuard],
        children: [
            {path: 'centraldados', component: VisaogeralcardsprodutorComponent, canActivate: [loginGuard]},
            {path: 'produto', component: ProdutodetailsComponent, canActivate: [loginGuard]}

        ]
    }//,
    //{
    //    path: 'admin/prefeitura', component: PrefeituraComponent, canActivate: [loginGuard]
    //},
    //{
    //    path: 'admin/suporte', component: SuporteComponent, canActivate: [loginGuard]
    //}
];
