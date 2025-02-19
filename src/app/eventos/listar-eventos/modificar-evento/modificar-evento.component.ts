import { Component, inject, Inject } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventoService } from '../../../services/eventos.service';
import { AutenticacionService } from '../../../services/auth.service';
import { InicioSesionComponent } from '../../../inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-modificar-evento',
  imports: [AngularMaterialModule],
  templateUrl: './modificar-evento.component.html',
  styleUrl: './modificar-evento.component.css'
})
export class ModificarEventoComponent {
  public formEvento!: FormGroup;
  servicioEventos = inject(EventoService);
  servicioAuth = inject(AutenticacionService);
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public idEvento: any,
  ) {
    this.formEvento = this.fb.group({
      id: 0,
      name: [''],
      description: [''],
      date: [''],
      location: ['']
    });
  }

  ngOnInit() {
    this.listarEventosPorId(Number(this.idEvento.id));
  }

  private listarEventosPorId(id: number) {
    this.servicioEventos.listarPorId(id).subscribe((data: any) => {
      this.formEvento.setValue({
        id: data.id,
        name: data.name,
        description: data.description,
        date: new Date(data.date).toLocaleDateString(
          'es-ES',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }
        ).split('/').reverse().join('-'),
        location: data.location
      });
    }, error => {
      console.log('Error al listar por id', error);
    });
  }
  ModificarEvento(id: number) {
    this.servicioEventos.actualizar(this.formEvento.value).subscribe(data => {
      console.log('Evento creado', data);
      this.dialog.closeAll();
    }, error => {
      console.log('Error al crear evento', error);
    });
  }

  volver() {
    this.dialog.closeAll();
  }
}
