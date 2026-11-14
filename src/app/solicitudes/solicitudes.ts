
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  SolicitudService,
  Solicitud,
  Respuesta
} from '../services/solicitud';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.css'
})
export class SolicitudesComponent {

  constructor(
    private servicio: SolicitudService
  ) {}

  solicitud: Solicitud = {
    nombre: '',
    cedula: '',
    fecha_ejecucion: '',
    hora_ejecucion: '',
    telefono: '',
    estado: 'pendiente'
  };

  mensaje: string = '';

  registrar(): void {

    // Validar campos obligatorios
    if (
      !this.solicitud.nombre ||
      !this.solicitud.cedula ||
      !this.solicitud.fecha_ejecucion ||
      !this.solicitud.hora_ejecucion ||
      !this.solicitud.telefono
    ) {

      this.mensaje = 'Complete todos los campos';
      return;
    }

    // Validar fecha futura
    const fechaHora = new Date(
      `${this.solicitud.fecha_ejecucion}T${this.solicitud.hora_ejecucion}:00`
    );

    if (fechaHora <= new Date()) {

      this.mensaje = 'Seleccione una fecha futura';
      return;
    }

    // Enviar información a n8n
    this.servicio.registrar(this.solicitud)
      .subscribe({

        next: (respuesta: Respuesta) => {

          this.mensaje = respuesta.mensaje;

          // Limpiar formulario
          this.solicitud = {
            nombre: '',
            cedula: '',
            fecha_ejecucion: '',
            hora_ejecucion: '',
            telefono: '',
            estado: 'pendiente'
          };

        },

       error: (error) => {
        console.error('Error completo:', error);
        console.error('Estado HTTP:', error.status);
        console.error('Respuesta del servidor:', error.error);

        this.mensaje =
          error.error?.message ||
          error.error?.mensaje ||
          `Error al registrar. Código HTTP: ${error.status}`;
      }

      });

  }

}
