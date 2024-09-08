import { Component } from '@angular/core';
import { SidebarprodutorComponent } from '../sidebarprodutor/sidebarprodutor.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principalprodutor',
  standalone: true,
  imports: [SidebarprodutorComponent, RouterOutlet],
  templateUrl: './principalprodutor.component.html',
  styleUrl: './principalprodutor.component.scss'
})
export class PrincipalprodutorComponent {

}
