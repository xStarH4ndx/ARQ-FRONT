export interface Insumo {
  nombre: string;
  unidadMedida: string;
}

export interface SolicitudInsumo {
  cantidad: number;
  insumo: Insumo;
}

export interface Profesor {
  nombre: string;
  apellido: string;
}

export interface Asignatura {
  nombre: string;
}

export interface Laboratorio {
  nombre: string;
}

export interface Solicitud {
  id: string;
  fechaUso: string;
  horario: string;
  cantGrupos: number;
  estado: boolean;
  usuario: Profesor;
  asignatura: Asignatura;
  laboratorio: Laboratorio;
  insumos: SolicitudInsumo[];
}
