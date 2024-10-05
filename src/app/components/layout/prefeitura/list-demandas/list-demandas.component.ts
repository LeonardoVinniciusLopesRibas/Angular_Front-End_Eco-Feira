import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-list-demandas',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule, CommonModule, MdbRippleModule, FormsModule],
  templateUrl: './list-demandas.component.html',
  styleUrl: './list-demandas.component.scss'
})
export class ListDemandasComponent {

  query: string = '';

  recebeQuery(query: string) {
    this.query = query;
  }
}
