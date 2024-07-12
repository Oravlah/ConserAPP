import { Component, OnInit } from '@angular/core';
import { VisitasService } from 'src/app/services/visitas.service';
import { NavController } from '@ionic/angular'; // Importa el NavController si necesitas navegar después de guardar

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
    rut: ''
  };

  constructor(private visitasService: VisitasService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  guardarVisita() {
    this.visitasService.agregarVisita(this.visita).subscribe(res => {
      // Manejar respuesta si es necesario
      console.log('Visita agregada:', res);
      // Limpia el formulario o realiza otras acciones después de guardar
      this.visita = {
        nombre: '',
        departamento: '',
        torre: '',
        rut: ''
      };
      // Navegar a otra página después de guardar, si es necesario
      // this.navCtrl.navigateForward('/otra-pagina');
    }, error => {
      console.error('Error al agregar visita:', error);
      // Manejar errores si es necesario
    });
  }
}
