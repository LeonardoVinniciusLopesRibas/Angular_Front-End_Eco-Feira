import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { CentralDadosListComponent } from './components/central_dados/central-dados-list/central-dados-list.component';
import { ProdutosDetailsComponent } from './components/produtos/produtos-details/produtos-details.component';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import { GrupoProdutosListComponent } from './components/grupo-produtos/grupo-produtos-list/grupo-produtos-list.component';
import { GrupoProdutosDetailsComponent } from './components/grupo-produtos/grupo-produtos-details/grupo-produtos-details.component';
import { CentralDemandasListComponent } from './components/central-demandas-list/central-demandas-list.component';
import { RelatorioComponent } from './components/relatorios/relatorio/relatorio.component';
import { AjustesComponent } from './components/ajustes/ajustes/ajustes.component';
import { PrefeituraComponent } from './components/layout/prefeitura/prefeitura.component';
import { SuporteComponent } from './components/layout/suporte/suporte.component';
import { loginGuard } from './auth/login.guard';
import { PrincipalprodutorComponent } from './components/layout/produtor/principalprodutor/principalprodutor.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {
        path: 'admin/produtor', component: PrincipalprodutorComponent, canActivate: [loginGuard],
        children: [
            {path: 'centraldados', component: CentralDadosListComponent, canActivate: [loginGuard]},
            {path: 'produtos', component: ProdutosListComponent, canActivate: [loginGuard]},
            {path: 'produtos/novo', component: ProdutosDetailsComponent, canActivate: [loginGuard]},
            {path: 'produtos/edit/:id', component: ProdutosDetailsComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos', component: GrupoProdutosListComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/novo', component: GrupoProdutosDetailsComponent, canActivate: [loginGuard]},
            {path: 'grupoprodutos/edit/:id', component: GrupoProdutosDetailsComponent, canActivate: [loginGuard]},
            {path: 'centraldemandas', component: CentralDemandasListComponent, canActivate: [loginGuard]},
            {path: 'ajustes', component: AjustesComponent, canActivate: [loginGuard]},
            {path: 'relatorio', component: RelatorioComponent, canActivate: [loginGuard]}

        ]
    },
    {
        path: 'admin/prefeitura', component: PrefeituraComponent, canActivate: [loginGuard]
    },
    {
        path: 'admin/suporte', component: SuporteComponent, canActivate: [loginGuard]
    }
];
