import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { loginGuard } from './auth/login.guard';
import { PrincipalprodutorComponent } from './components/layout/produtor/principalprodutor/principalprodutor.component';
import { NovoacessoComponent } from './components/layout/novoacesso/novoacesso.component';
import { UsuariodetailsComponent } from './components/layout/produtor/usuariodetails/usuariodetails.component';
import { AjustesComponent } from './components/layout/produtor/ajustes/ajustes.component';
import { PrincipalprefeituraComponent } from './components/layout/prefeitura/principalprefeitura/principalprefeitura.component';
import { DemandaprefeituraComponent } from './components/layout/prefeitura/demandaprefeitura/demandaprefeitura.component';
import { ProdutoprefeituradetailsComponent } from './components/layout/prefeitura/produtoprefeituradetails/produtoprefeituradetails.component';
import { ProdutoprefeituraeditnewComponent } from './components/layout/prefeitura/produtoprefeituraeditnew/produtoprefeituraeditnew.component';
import { UsuarioprefeituradetailsComponent } from './components/layout/prefeitura/usuarioprefeituradetails/usuarioprefeituradetails.component';
import { AjustesprefeituraComponent } from './components/layout/prefeitura/ajustesprefeitura/ajustesprefeitura.component';
import { GerenciardemandasComponent } from './components/layout/prefeitura/gerenciardemandas/gerenciardemandas.component';
import {GerirdemandaComponent} from "./components/layout/prefeitura/gerirdemanda/gerirdemanda.component";
import {
  EditaregerenciardemandaComponent
} from "./components/layout/prefeitura/editaregerenciardemanda/editaregerenciardemanda.component";
import {DemandaprodutorComponent} from "./components/layout/produtor/demandaprodutor/demandaprodutor.component";
import {MinhasdemandasComponent} from "./components/layout/produtor/minhasdemandas/minhasdemandas.component";


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'novoacesso', component: NovoacessoComponent},
    {path: 'admin/produtor', redirectTo: 'admin/produtor/demandas', pathMatch: 'full'},
    {path: 'admin/prefeitura', redirectTo: 'admin/prefeitura/demanda', pathMatch: 'full'},
    {
        path: 'admin/produtor', component: PrincipalprodutorComponent, canActivate: [loginGuard],
        children: [
            {path: 'usuarios', component: UsuariodetailsComponent, canActivate: [loginGuard]},
            {path: 'ajustes', component: AjustesComponent, canActivate: [loginGuard]},
            {path: 'demandas', component: DemandaprodutorComponent, canActivate: [loginGuard]},
            {path: 'myDemandas', component: MinhasdemandasComponent, canActivate: [loginGuard]}

        ]
    },{
        path: 'admin/prefeitura', component: PrincipalprefeituraComponent, canActivate: [loginGuard],
        children: [
            {path: 'demanda', component: DemandaprefeituraComponent, canActivate: [loginGuard]},
            {path: 'demanda/new', component: GerenciardemandasComponent, canActivate: [loginGuard]},
            {path: 'demanda/gerir', component: GerirdemandaComponent  , canActivate: [loginGuard]},
            {path: 'produto', component: ProdutoprefeituradetailsComponent, canActivate: [loginGuard]},
            {path: 'produto/novo', component: ProdutoprefeituraeditnewComponent, canActivate: [loginGuard]},
            {path: 'produto/edit/:id', component: ProdutoprefeituraeditnewComponent, canActivate: [loginGuard]},
            {path: 'usuarios', component: UsuarioprefeituradetailsComponent, canActivate: [loginGuard]},
            {path: 'ajustes', component: AjustesprefeituraComponent, canActivate: [loginGuard]},
            {path: 'gerenciareeditardemanda/:id', component: EditaregerenciardemandaComponent, canActivate: [loginGuard]}

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
