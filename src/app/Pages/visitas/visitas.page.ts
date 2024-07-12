import { Component, OnInit } from '@angular/core';
import { VisitasService } from 'src/app/services/visitas.service';
import { NavController, AlertController } from '@ionic/angular';

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

  constructor(
    private visitasService: VisitasService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.inicializarFechaYHora();
  }

  inicializarFechaYHora() {
    // Inicializar fecha y hora de ingreso automáticamente
    this.visita.fechaIngreso = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    this.visita.horaIngreso = new Date().toLocaleTimeString(); // Hora actual en formato local
  }

  guardarVisita() {
    // Obtener el máximo ID de las visitas existentes
    this.visitasService.getVisitas().subscribe(
      visitas => {
        const maxId = visitas.length > 0 ? Math.max(...visitas.map(v => parseInt(v.id, 10))) : 0;
        const nuevoId = maxId + 1;

        // Asignar el nuevo ID y proceder a registrar la visita
        this.visita.id = nuevoId.toString();
        this.visitasService.agregarVisita(this.visita).subscribe(
          response => {
            this.presentAlert('Éxito', 'Visita registrada correctamente.');
            this.limpiarFormulario();
          },
          error => {
            this.presentAlert('Error', 'Ocurrió un error al registrar la visita.');
          }
        );
      },
      error => {
        this.presentAlert('Error', 'No se pudo obtener la lista de visitas.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  limpiarFormulario() {
    // Limpia el formulario y reinicia la fecha y hora de ingreso
    this.visita = {
      nombre: '',
      departamento: '',
      torre: '',
      rut: '',
      fechaIngreso: new Date().toISOString().slice(0, 10),
      horaIngreso: new Date().toLocaleTimeString()
    };
  }

}
