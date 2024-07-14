import { Component, OnInit } from '@angular/core';
import { VisitasService } from 'src/app/services/visitas.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {

  visita: any = {
    nombre: '',
    departamento: '',
    torre: '',
    rut: '',
    fechaIngreso: '',
    horaIngreso: ''
  };

  constructor(private visitasService: VisitasService, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    // Inicializar fecha y hora de ingreso automáticamente
    this.visita.fechaIngreso = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    this.visita.horaIngreso = new Date().toLocaleTimeString(); // Hora actual en formato local
  }

  async guardarVisita() {
    if (!this.validarFormulario()) {
      return;
    }

    this.visitasService.getVisitas().subscribe(
      visitas => {
        const maxId = visitas.length > 0 ? Math.max(...visitas.map(v => parseInt(v.id, 10))) : 0;
        const nuevoId = maxId + 1;
        this.visita.id = nuevoId.toString();

        this.visitasService.agregarVisita(this.visita).subscribe(res => {
          console.log('Visita agregada:', res);
          this.presentAlert('Éxito', 'Visita registrada correctamente.');
          this.limpiarFormulario();
        }, error => {
          console.error('Error al agregar visita:', error);
          this.presentAlert('Error', 'Ocurrió un error al registrar la visita.');
        });
      },
      error => {
        this.presentAlert('Error', 'No se pudo obtener la lista de visitas.');
      }
    );
  }

  limpiarFormulario() {
    this.visita = {
      nombre: '',
      departamento: '',
      torre: '',
      rut: '',
      fechaIngreso: new Date().toISOString().slice(0, 10),
      horaIngreso: new Date().toLocaleTimeString()
    };
  }

  validarFormulario(): boolean {
    if (this.visita.nombre.length < 3 || this.visita.nombre.length > 30) {
      this.presentAlert('Error', 'El nombre debe tener entre 3 y 30 caracteres.');
      return false;
    }
    if (this.visita.departamento.length < 3 || this.visita.departamento.length > 4) {
      this.presentAlert('Error', 'El departamento debe tener entre 3 y 4 caracteres.');
      return false;
    }
    if (!this.visita.rut.includes('-')) {
      this.presentAlert('Error', 'El RUT debe contener un guion "-".');
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
