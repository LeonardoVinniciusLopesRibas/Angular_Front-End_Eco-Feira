import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { loginGuard } from './auth/login.guard';
import { PrincipalprodutorComponent } from './components/layout/produtor/principalprodutor/principalprodutor.component';
import { VisaogeralcardsprodutorComponent } from './components/layout/produtor/visaogeralcardsprodutor/visaogeralcardsprodutor.component';
import { ProdutodetailsComponent } from './components/layout/produtor/produtodetails/produtodetails.component';
import { GrupoprodutosdetailsComponent } from './components/layout/produtor/grupoprodutosdetails/grupoprodutosdetails.component';
import { GrupoprodutoseditnewComponent } from './components/layout/produtor/grupoprodutoseditnew/grupoprodutoseditnew.component';
import { NovoacessoComponent } from './components/layout/novoacesso/novoacesso.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'novoacesso', component: NovoacessoComponent}, 
    {path: 'admin/produtor', redirectTo: 'admin/produtor/centraldados', pathMatch: 'full'},
    {
        path: 'admin/produtor', component: PrincipalprodutorComponent, canActivate: [loginGuard],
        children: [
            {path: 'centraldados', component: VisaogeralcardsprodutorComponent, canActivate: [loginGuard]},
            {path: 'produto', component: ProdutodetailsComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos', component: GrupoprodutosdetailsComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/novo', component: GrupoprodutoseditnewComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/edit/:id', component: GrupoprodutoseditnewComponent, canActivate: [loginGuard]}

        ]
    }//,
    //{
    //    path: 'admin/prefeitura', component: PrefeituraComponent, canActivate: [loginGuard]
    //},
    //{
    //    path: 'admin/suporte', component: SuporteComponent, canActivate: [loginGuard]
    //}
];
