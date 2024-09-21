import { Component } from '@angular/core';
import { SidebarprefeituraComponent } from '../sidebarprefeitura/sidebarprefeitura.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principalprefeitura',
  standalone: true,
  imports: [SidebarprefeituraComponent, RouterOutlet],
  templateUrl: './principalprefeitura.component.html',
  styleUrl: './principalprefeitura.component.scss'
})
export class PrincipalprefeituraComponent {

}
