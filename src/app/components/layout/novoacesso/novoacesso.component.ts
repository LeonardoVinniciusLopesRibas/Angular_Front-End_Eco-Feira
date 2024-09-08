import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
import { NovoacessoService } from '../../../services/novoacesso/novoacesso.service';
import { validaCNPJ } from '../../../util/validaCnpj';
import { Novoacesso } from '../../../model/novoacesso/novoacesso';
import { ValidaEmail } from '../../../util/validaEmail';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-novoacesso',
  standalone: true,
  imports: [NgxMaskDirective, FormsModule, RouterLink],
  providers: [provideNgxMask()],
  templateUrl: './novoacesso.component.html',
  styleUrl: './novoacesso.component.scss'
})
export class NovoacessoComponent {

  novoAcesso: Novoacesso = new Novoacesso();
  novoacessoService = inject(NovoacessoService);
  router = inject(Router);
  
  

  onSubmit() {
    if(!ValidaEmail.validarEmail(this.novoAcesso.email)) {
      Swal.fire({
        title: 'E-mail não informado ou inválido!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.novoAcesso.email = '';
    }else if(this.novoAcesso.senha.trim().length < 6){
      Swal.fire({
        title: 'Senha deve conter no mínimo 6 caracteres!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else if(!validaCNPJ.validarCNPJ(this.novoAcesso.cnpj)) {
      Swal.fire({
        title: 'Cnpj não informado ou inválido!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.novoAcesso.cnpj = '';
    }else {
      this.novoacessoService.post(this.novoAcesso).subscribe({
        next: res => {
          Swal.fire({
            title: 'Enviado com sucesso!',
            text: 'Solicite aceite a seu administrador!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.novoAcesso.email = '';
          this.novoAcesso.senha = '';
          this.novoAcesso.cnpj = '';
          this.router.navigate(['/login']);
        },
        error: erro => {
          const errorMessage = erro.error || 'Erro desconhecido';

          Swal.fire({
            title: 'Erro ao enviar!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok',
          });

          console.error(erro);
        }
      });
      
    }
  }
  
}
