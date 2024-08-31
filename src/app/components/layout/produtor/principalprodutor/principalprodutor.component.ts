import { Component } from '@angular/core';
import { SidebarprodutorComponent } from '../sidebarprodutor/sidebarprodutor.component';
import { HomebarprodutorComponent } from '../homebarprodutor/homebarprodutor.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principalprodutor',
  standalone: true,
  imports: [SidebarprodutorComponent, HomebarprodutorComponent, RouterOutlet],
  templateUrl: './principalprodutor.component.html',
  styleUrl: './principalprodutor.component.scss'
})
export class PrincipalprodutorComponent {

}
