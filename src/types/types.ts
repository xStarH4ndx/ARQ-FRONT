export interface Insumo {
    nombre: string;
    cantidad: number;
    medida: string;
  }
  
export interface Solicitud {
    id: number;
    asignatura: string;
    laboratorio: string;
    fechaUso: string;
    insumos: Insumo[];
    profesor: string;
}
