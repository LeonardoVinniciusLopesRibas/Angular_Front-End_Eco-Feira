import { Component } from '@angular/core';
import { ListDemandasComponent } from '../list-demandas/list-demandas.component';
import { NewEditDemandaComponent } from '../new-edit-demanda/new-edit-demanda.component';

@Component({
  selector: 'app-demandaprefeitura',
  standalone: true,
  imports: [ListDemandasComponent, NewEditDemandaComponent],
  templateUrl: './demandaprefeitura.component.html',
  styleUrl: './demandaprefeitura.component.scss'
})
export class DemandaprefeituraComponent {

}
