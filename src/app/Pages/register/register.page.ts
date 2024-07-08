import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = '';
  email: string = '';
  password: string = '';
  aceptoTerminos: boolean = false;
  nombreErrors: string = '';
  emailErrors: string = '';
  passwordErrors: string = '';

  constructor(private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() { }

  async registrarUsuario() {
    if (!this.aceptoTerminos) {
      this.presentAlert('Error', 'Debe aceptar los términos y condiciones.');
      return;
    }

    const nombreValido = this.validarNombre();
    const emailValido = this.validarEmail();
    const passwordValido = this.validarPassword();

    if (!nombreValido || !emailValido || !passwordValido) {
      return; // Si hay errores, no procedemos con el registro
    }

    // Obtenemos la lista de usuarios para determinar el ID máximo
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        const maxId = usuarios.length > 0 ? Math.max(...usuarios.map(u => parseInt(u.id, 10))) : 0;
        const nuevoId = maxId + 1;

        // Procedemos a registrar el usuario con el nuevo ID
        const nuevoUsuario = {
          id: nuevoId.toString(),
          nombre: this.nombre,
          email: this.email,
          contraseña: this.password
        };

        this.usuarioService.addUsuario(nuevoUsuario).subscribe(
          response => {
            this.presentAlert('Éxito', 'Usuario registrado correctamente.');
            // Limpiamos los campos después del registro exitoso
            this.limpiarCampos();
          },
          error => {
            this.presentAlert('Error', 'Ocurrió un error al registrar el usuario.');
          }
        );
      },
      error => {
        this.presentAlert('Error', 'No se pudo obtener la lista de usuarios.');
      }
    );
  }

  validarNombre(): boolean {
    this.nombreErrors = '';
    if (this.nombre.length < 4 || this.nombre.length > 15) {
      this.nombreErrors = 'El nombre de usuario debe tener entre 4 y 15 caracteres.';
      return false;
    }
    return true;
  }

  validarEmail(): boolean {
    this.emailErrors = '';
    if (this.email.length < 6 || this.email.length > 35) {
      this.emailErrors = 'El email debe tener entre 6 y 35 caracteres.';
      return false;
    }
    // Puedes añadir más validaciones de formato de email si es necesario
    return true;
  }

  validarPassword(): boolean {
    this.passwordErrors = '';
    if (this.password.length < 6 || this.password.length > 18) {
      this.passwordErrors = 'La contraseña debe tener entre 6 y 18 caracteres.';
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
      this.passwordErrors = 'La contraseña debe contener al menos un caracter especial.';
      return false;
    }
    return true;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  limpiarCampos() {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.aceptoTerminos = false;
    this.nombreErrors = '';
    this.emailErrors = '';
    this.passwordErrors = '';
  }

  formularioValido(): boolean {
    return this.nombre.length > 0 &&
           this.email.length > 0 &&
           this.password.length > 0 &&
           this.aceptoTerminos &&
           this.validarNombre() &&
           this.validarEmail() &&
           this.validarPassword();
  }
}
