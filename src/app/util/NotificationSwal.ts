import Swal, { SweetAlertIcon } from "sweetalert2";

export class NotificationSwal {

  static swalFire(mensagem: string, icon: SweetAlertIcon): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: icon,
      title: mensagem
    });
  }
}
