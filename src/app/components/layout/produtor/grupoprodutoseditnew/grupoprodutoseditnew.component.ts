import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-grupoprodutoseditnew',
  standalone: true,
  imports: [MdbRippleModule, FormsModule],
  templateUrl: './grupoprodutoseditnew.component.html',
  styleUrl: './grupoprodutoseditnew.component.scss'
})
export class GrupoprodutoseditnewComponent {

  descricao!: string;

  salvar(descricao: string){
    alert(descricao);
  }
}
