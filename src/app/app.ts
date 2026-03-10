import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // El CommonModule es vital para que Angular entienda ciclos como el *ngFor
  imports: [CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Inyectamos el servicio HttpClient 
  private http = inject(HttpClient);

  // Creamos una variable para guardar los personajes (empieza como lista vacía)
  personajes: any[] = [];
  personajesFiltrados: any[] = [];
  // Creamos una variable para guardar el personaje seleccionado. 
  // null significa que al inicio no hay nadie seleccionado.
  personajeSeleccionado: any = null;

  // Esta función recibe los datos del personaje que clickeaste
  verDetalles(p: any) {
    console.log('Hiciste clic en:', p.name);
    this.personajeSeleccionado = p; 
    // Al asignarle el personaje a la variable, deja de ser 'null'
  }

  // Esta función sirve para "limpiar" la variable y que el cuadro se cierre
  cerrarModal() {
    this.personajeSeleccionado = null;
  }

  // Este método se ejecuta automáticamente cuando la página carga
  ngOnInit() {
    this.obtenerDatos();
  }

  // La función que hace la magia
  obtenerDatos() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe(respuesta => {
        // Guardamos solo los 'results', que es donde vienen los personajes
        this.personajes = respuesta.results;
        this.personajesFiltrados = respuesta.results;
        
      });
  }

  // Función para buscar
  buscar(evento: any) {
    const texto = evento.target.value.toLowerCase();
    // Filtramos la lista original y guardamos el resultado en la filtrada
    this.personajesFiltrados = this.personajes.filter(p => 
      p.name.toLowerCase().includes(texto)
    );
  }  
}