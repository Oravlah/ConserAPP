import { Component, OnInit } from '@angular/core';
import { MudanzasService } from 'src/app/services/mudanzas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mudanzas',
  templateUrl: './mudanzas.page.html',
  styleUrls: ['./mudanzas.page.scss'],
})
export class MudanzasPage implements OnInit {

  mudanza: any = {
    id: '',
    nombre_residente: '',
    depto: '',
    torre: '',
    fecha_mudanza: '',
    hora_mudanza: ''
  };

  constructor(private mudanzasService: MudanzasService, private alertController: AlertController) { }

  ngOnInit() {
    // Inicializar fecha y hora de mudanza automáticamente
    this.mudanza.fecha_mudanza = this.formatDate(new Date());
    this.mudanza.hora_mudanza = this.formatTime(new Date());
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async guardarMudanza() {
    if (!this.validarFormulario()) {
      return;
    }

    this.mudanzasService.getMudanzas().subscribe(
      mudanzas => {
        const maxId = mudanzas.length > 0 ? Math.max(...mudanzas.map(e => parseInt(e.id, 10))) : 0;
        const nuevoId = maxId + 1;
        this.mudanza.id = nuevoId.toString();

        this.mudanzasService.agregarMudanza(this.mudanza).subscribe(res => {
          console.log('Mudanza agregada:', res);
          this.presentAlert('Éxito', 'Mudanza registrada correctamente.');
          this.limpiarFormulario();
        }, error => {
          console.error('Error al agregar mudanza:', error);
          this.presentAlert('Error', 'Ocurrió un error al registrar la mudanza.');
        });
      },
      error => {
        this.presentAlert('Error', 'No se pudo obtener la lista de mudanzas.');
      }
    );
  }

  limpiarFormulario() {
    this.mudanza = {
      id: '',
      nombre_residente: '',
      depto: '',
      torre: '',
      fecha_mudanza: this.formatDate(new Date()),
      hora_mudanza: this.formatTime(new Date())
    };
  }

  validarFormulario(): boolean {
    if (this.mudanza.nombre_residente.length < 3 || this.mudanza.nombre_residente.length > 18) {
      this.presentAlert('Error', 'El nombre del residente debe tener entre 3 y 18 caracteres.');
      return false;
    }
    if (this.mudanza.depto.length < 3 || this.mudanza.depto.length > 4) {
      this.presentAlert('Error', 'El departamento debe tener entre 3 y 4 caracteres.');
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

}
