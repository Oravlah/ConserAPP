import { Component, OnInit } from '@angular/core';
import { EncomiendasService } from 'src/app/services/encomiendas.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-encomiendas',
  templateUrl: './encomiendas.page.html',
  styleUrls: ['./encomiendas.page.scss'],
})
export class EncomiendasPage implements OnInit {

  encomienda: any = {
    depto: '',
    torre: '',
    nombre_residente: '',
    conserje_q_recibe: '',
    empresa_q_envia: '',
    nombre_repartidor: '',
    rut_repartidor: '',
    descripcion: '',
    fechaIngreso: '',
    horaIngreso: ''
  };

  constructor(private encomiendasService: EncomiendasService, private alertController: AlertController) { }

  ngOnInit() {
    // Inicializar fecha y hora de ingreso automáticamente
    this.encomienda.fechaIngreso = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    this.encomienda.horaIngreso = new Date().toLocaleTimeString(); // Hora actual en formato local
  }

  async guardarEncomienda() {
    if (!this.validarFormulario()) {
      return;
    }

    this.encomiendasService.getEncomiendas().subscribe(
      encomiendas => {
        const maxId = encomiendas.length > 0 ? Math.max(...encomiendas.map(e => parseInt(e.id, 10))) : 0;
        const nuevoId = maxId + 1;
        this.encomienda.id = nuevoId.toString();

        this.encomiendasService.agregarEncomienda(this.encomienda).subscribe(res => {
          console.log('Encomienda agregada:', res);
          this.presentAlert('Éxito', 'Encomienda registrada correctamente.');
          this.limpiarFormulario();
        }, error => {
          console.error('Error al agregar encomienda:', error);
          this.presentAlert('Error', 'Ocurrió un error al registrar la encomienda.');
        });
      },
      error => {
        this.presentAlert('Error', 'No se pudo obtener la lista de encomiendas.');
      }
    );
  }

  limpiarFormulario() {
    this.encomienda = {
      depto: '',
      torre: '',
      nombre_residente: '',
      conserje_q_recibe: '',
      empresa_q_envia: '',
      nombre_repartidor: '',
      rut_repartidor: '',
      descripcion: '',
      fechaIngreso: new Date().toISOString().slice(0, 10),
      horaIngreso: new Date().toLocaleTimeString()
    };
  }

  validarFormulario(): boolean {
    if (this.encomienda.depto.length < 3 || this.encomienda.depto.length > 4) {
      this.presentAlert('Error', 'El departamento debe tener entre 3 y 4 caracteres.');
      return false;
    }
    if (this.encomienda.nombre_residente.length < 3 || this.encomienda.nombre_residente.length > 30) {
      this.presentAlert('Error', 'El nombre del residente debe tener entre 3 y 30 caracteres.');
      return false;
    }
    if (!this.encomienda.rut_repartidor.includes('-')) {
      this.presentAlert('Error', 'El RUT del repartidor debe contener un guion "-".');
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
