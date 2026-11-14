
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Estructura de los datos que Angular envía a n8n
export interface Solicitud {
  nombre: string;
  cedula: string;
  fecha_ejecucion: string;
  hora_ejecucion: string;
  telefono: string;
  estado: string;
}

// Estructura de respuesta de n8n
export interface Respuesta {
  success: boolean;
  mensaje: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private http = inject(HttpClient);

  private url = 'https://certificado.app.n8n.cloud/webhook/registrar-solicitud';

  registrar(datos: Solicitud): Observable<Respuesta> {

    return this.http.post<Respuesta>(
      this.url,
      datos
    );

  }
}
