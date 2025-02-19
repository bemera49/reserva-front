// Creamos el servicio para enviar peticiones al servidor
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { Eventos } from '../models/Evento';
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private path: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.path = this.sharedService.APIUrl;
  }

  public listarTodos() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Eventos>(this.path + '/events', { headers });
  }


  public listarPorId(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Eventos>(this.path + '/events/' + id, { headers });
  }

  public registrar(evento: Eventos) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(this.path + '/events', evento, { headers });
  }

  public actualizar(evento: Eventos) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<void>(this.path + '/events/' + evento.id, evento, { headers });
  }

  public eliminar(id: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(this.path + '/events/' + id, { headers });
  }

  public crearReserva(reserva: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(this.path + '/events/'+ reserva.evento +'/reservations', reserva, { headers });
  }

}
