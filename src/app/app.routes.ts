import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { loginGuard } from './auth/login.guard';
import { PrincipalprodutorComponent } from './components/layout/produtor/principalprodutor/principalprodutor.component';
import { VisaogeralcardsprodutorComponent } from './components/layout/produtor/visaogeralcardsprodutor/visaogeralcardsprodutor.component';
import { ProdutodetailsComponent } from './components/layout/produtor/produtodetails/produtodetails.component';
import { GrupoprodutosdetailsComponent } from './components/layout/produtor/grupoprodutosdetails/grupoprodutosdetails.component';
import { GrupoprodutoseditnewComponent } from './components/layout/produtor/grupoprodutoseditnew/grupoprodutoseditnew.component';
import { NovoacessoComponent } from './components/layout/novoacesso/novoacesso.component';
import { UsuariodetailsComponent } from './components/layout/produtor/usuariodetails/usuariodetails.component';
import { ProdutoeditnewComponent } from './components/layout/produtor/produtoeditnew/produtoeditnew.component';
import { AjustesComponent } from './components/layout/produtor/ajustes/ajustes.component';
import { PrincipalprefeituraComponent } from './components/layout/prefeitura/principalprefeitura/principalprefeitura.component';
import { DemandaprefeituraComponent } from './components/layout/prefeitura/demandaprefeitura/demandaprefeitura.component';
import { ProdutoprefeituradetailsComponent } from './components/layout/prefeitura/produtoprefeituradetails/produtoprefeituradetails.component';
import { ProdutoprefeituraeditnewComponent } from './components/layout/prefeitura/produtoprefeituraeditnew/produtoprefeituraeditnew.component';
import { UsuarioprefeituradetailsComponent } from './components/layout/prefeitura/usuarioprefeituradetails/usuarioprefeituradetails.component';
import { AjustesprefeituraComponent } from './components/layout/prefeitura/ajustesprefeitura/ajustesprefeitura.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {path: 'novoacesso', component: NovoacessoComponent}, 
    {path: 'admin/produtor', redirectTo: 'admin/produtor/centraldados', pathMatch: 'full'},
    {path: 'admin/prefeitura', redirectTo: 'admin/prefeitura/demanda', pathMatch: 'full'},
    {
        path: 'admin/produtor', component: PrincipalprodutorComponent, canActivate: [loginGuard],
        children: [
            {path: 'centraldados', component: VisaogeralcardsprodutorComponent, canActivate: [loginGuard]},
            {path: 'produto', component: ProdutodetailsComponent, canActivate: [loginGuard]},
            {path: 'produto/novo', component: ProdutoeditnewComponent, canActivate: [loginGuard]},
            {path: 'produto/edit/:id', component: ProdutoeditnewComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos', component: GrupoprodutosdetailsComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/novo', component: GrupoprodutoseditnewComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/edit/:id', component: GrupoprodutoseditnewComponent, canActivate: [loginGuard]},
            {path: 'usuarios', component: UsuariodetailsComponent, canActivate: [loginGuard]},
            {path: 'ajustes', component: AjustesComponent, canActivate: [loginGuard]}

        ]
    },{
        path: 'admin/prefeitura', component: PrincipalprefeituraComponent, canActivate: [loginGuard],
        children: [
            {path: 'demanda', component: DemandaprefeituraComponent, canActivate: [loginGuard]},
            {path: 'produto', component: ProdutoprefeituradetailsComponent, canActivate: [loginGuard]},
            {path: 'produto/novo', component: ProdutoprefeituraeditnewComponent, canActivate: [loginGuard]},
            {path: 'produto/edit/:id', component: ProdutoprefeituraeditnewComponent, canActivate: [loginGuard]},
            {path: 'usuarios', component: UsuarioprefeituradetailsComponent, canActivate: [loginGuard]},
            {path: 'ajustes', component: AjustesprefeituraComponent, canActivate: [loginGuard]}

        ]
    }
    
    
    
    
    //,
    //{
    //    path: 'admin/prefeitura', component: PrefeituraComponent, canActivate: [loginGuard]
    //},
    //{
    //    path: 'admin/suporte', component: SuporteComponent, canActivate: [loginGuard]
    //}
];
