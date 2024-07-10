import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';
  nombreErrors: string = '';
  passwordErrors: string = '';
  aceptoTerminos: boolean = false;

  constructor(private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() { }

  validarNombre() {
    this.nombreErrors = '';
    if (!this.nombre) {
      this.nombreErrors = '• Debe ingresar un nombre de usuario o email.';
    } else if ((this.nombre.includes('@') && (this.nombre.length < 6 || this.nombre.length > 35)) || (!this.nombre.includes('@') && (this.nombre.length < 4 || this.nombre.length > 15))) {
      this.nombreErrors = this.nombre.includes('@') ? '• El email debe tener entre 6 y 35 caracteres.' : '• El nombre de usuario debe tener entre 4 y 15 caracteres.';
    } else {
      this.usuarioService.getUsuarios().subscribe(usuarios => {
        if (!usuarios.some(u => u.nombre === this.nombre || u.email === this.nombre)) {
          this.nombreErrors = '• El nombre de usuario o email no es válido.';
        }
      });
    }
  }

  validarPassword() {
    this.passwordErrors = '';
    if (!this.password) {
      this.passwordErrors = '• Debe ingresar una contraseña.';
    } else if (this.password.length < 6 || this.password.length > 18) {
      this.passwordErrors = '• La contraseña debe tener entre 6 y 18 caracteres.';
    }
  }

  validarLogin() {
    this.validarNombre();
    this.validarPassword();

    if (this.nombreErrors || this.passwordErrors) {
      return; // Si hay errores, no procedemos con el login
    }

    this.usuarioService.getUsuarios().subscribe(usuarios => {
      const usuarioValido = usuarios.find(u => (u.nombre === this.nombre || u.email === this.nombre) && u.contraseña === this.password);
      if (usuarioValido) {
        this.presentAlert('Éxito', 'Inicio de sesión correcto.');
      } else {
        this.presentAlert('Error', 'El nombre de usuario, email o contraseña no son correctos.');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
