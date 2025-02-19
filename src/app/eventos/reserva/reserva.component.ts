import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoService } from '../../services/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-reserva',
  imports: [AngularMaterialModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  public formReserva!: FormGroup;
  servicioEventos = inject(EventoService);
  listEventos: any = [];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.formReserva = this.fb.group({
      user_name: [''],
      user_email: [''],
      seats: [''],
      evento: ['']
    });
  }

  ngOnInit() {
    this.listarEventos();
  }

  listarEventos() {
    this.servicioEventos.listarTodos().subscribe((data:any) => {
      console.log(data);
      this.listEventos = data.data;
    });
  }

  crearReserva() {
    this.servicioEventos.crearReserva(this.formReserva.value).subscribe((data:any) => {
      console.log(data);
      this.dialog.closeAll();
    });
  }

  volver() {
    this.dialog.closeAll();
  }
}
