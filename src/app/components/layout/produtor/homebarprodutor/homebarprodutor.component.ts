import { Component } from '@angular/core';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@Component({
  selector: 'app-homebarprodutor',
  standalone: true,
  imports: [MdbDropdownModule],
  templateUrl: './homebarprodutor.component.html',
  styleUrl: './homebarprodutor.component.scss'
})
export class HomebarprodutorComponent {


  toggleNotification() {
    const number = document.getElementById('number');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const profileDropdown = document.getElementById('profile-dropdown');

    // Fecha o dropdown de imagem se estiver aberto
    if (profileDropdown && profileDropdown.classList.contains('visible')) {
      profileDropdown.classList.remove('visible');
      setTimeout(() => {
        profileDropdown.classList.add('hidden');
      }, 300);
    }

    if (number && notificationDropdown) {
      if (number.classList.contains('visible')) {
        number.classList.remove('visible');
        notificationDropdown.classList.remove('visible');

        setTimeout(() => {
          number.classList.add('hidden');
          notificationDropdown.classList.add('hidden');
        }, 300);
      } else {
        number.classList.remove('hidden');
        notificationDropdown.classList.remove('hidden');

        setTimeout(() => {
          number.classList.add('visible');
          notificationDropdown.classList.add('visible');
        }, 10);
      }
    }
  }

  toggleImage() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const number = document.getElementById('number');

    // Fecha o dropdown de notificações se estiver aberto
    if (notificationDropdown && notificationDropdown.classList.contains('visible')) {
      notificationDropdown.classList.remove('visible');
      setTimeout(() => {
        notificationDropdown.classList.add('hidden');
      }, 300);
    }

    if (profileDropdown) {
      if (profileDropdown.classList.contains('visible')) {
        profileDropdown.classList.remove('visible');

        setTimeout(() => {
          profileDropdown.classList.add('hidden');
        }, 300);
      } else {
        profileDropdown.classList.remove('hidden');

        setTimeout(() => {
          profileDropdown.classList.add('visible');
        }, 10);
      }
    }
  }



}
