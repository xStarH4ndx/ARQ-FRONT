export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  enabled: boolean;
  accountLocked: boolean;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
}

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
